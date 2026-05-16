import { neon } from "@neondatabase/serverless";

const appHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Choice Novel</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #0b1020; color: #e8ecf7; }
    .wrap { max-width: 980px; margin: 0 auto; padding: 20px; }
    .card { background: #151d35; border: 1px solid #2a355d; border-radius: 12px; padding: 16px; margin-bottom: 16px; }
    h1, h2 { margin-top: 0; }
    input, textarea, select, button { width: 100%; margin-top: 8px; margin-bottom: 8px; padding: 10px; border-radius: 8px; border: 1px solid #344270; background: #0f1730; color: #e8ecf7; }
    button { cursor: pointer; background: #3557ff; border: none; font-weight: 700; }
    button.secondary { background: #2a355d; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .chapter { white-space: pre-wrap; line-height: 1.5; }
    .choices button { text-align: left; }
    .muted { opacity: .8; font-size: .9em; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>AI Online Novel (Cloudflare Worker + Neon)</h1>
    <div class="card">
      <h2>New Novel</h2>
      <textarea id="plot" placeholder="Plot"></textarea>
      <textarea id="ability" placeholder="System ability"></textarea>
      <input id="tags" placeholder="Tags (comma separated)" />
      <input id="genre" placeholder="Genre" />
      <button id="createBtn">Create Novel + Generate Chapter 1</button>
      <p class="muted">Important choice event appears roughly every 5 chapters on average.</p>
    </div>

    <div class="card" id="novelArea" style="display:none;">
      <h2 id="title">Novel</h2>
      <p id="meta" class="muted"></p>
      <div id="chapters"></div>
      <button id="nextBtn">Generate Next Chapter</button>
    </div>
  </div>

<script>
let currentNovelId = null;
let refreshTimer = null;

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function chapterBlock(ch) {
  const choices = (ch.choices || [])
    .map(c => '<button onclick="choose(' + ch.id + ', ' + c.id + ')">' + escapeHtml(c.choice_text) + '</button>')
    .join('');
  return '<div class="card"><h3>Chapter ' + ch.chapter_number + '</h3><div class="chapter">' + escapeHtml(ch.content) + '</div>' + (choices ? '<div class="choices"><h4>Choose</h4>' + choices + '</div>' : '') + '</div>';
}

async function refreshNovel() {
  if (!currentNovelId) return;
  const res = await fetch('/api/novel/' + currentNovelId);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to load novel');
  document.getElementById('novelArea').style.display = 'block';
  document.getElementById('title').textContent = 'Novel #' + data.novel.id;
  document.getElementById('meta').textContent = data.novel.genre + ' | tags: ' + data.novel.tags.join(', ');
  document.getElementById('chapters').innerHTML = data.chapters.map(chapterBlock).join('');
}

async function choose(chapterId, choiceId) {
  const btns = document.querySelectorAll('.choices button');
  btns.forEach(b => b.disabled = true);
  const res = await fetch('/api/choose', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ novelId: currentNovelId, chapterId, choiceId })
  });
  if (!res.ok) {
    const data = await res.json();
    alert(data.error || 'Failed to save choice');
  }
  await refreshNovel();
}
window.choose = choose;

document.getElementById('createBtn').onclick = async () => {
  const payload = {
    plot: document.getElementById('plot').value,
    systemAbility: document.getElementById('ability').value,
    tags: document.getElementById('tags').value,
    genre: document.getElementById('genre').value
  };
  const res = await fetch('/api/novel', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    alert(data.error || 'Failed to create novel');
    return;
  }
  currentNovelId = data.novelId;
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(() => refreshNovel().catch(() => {}), 5000);
  await refreshNovel();
};

document.getElementById('nextBtn').onclick = async () => {
  const res = await fetch('/api/chapter/next', {
    method: 'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ novelId: currentNovelId })
  });
  if (!res.ok) {
    const data = await res.json();
    alert(data.error || 'Failed to generate chapter');
  }
  await refreshNovel();
};
</script>
</body>
</html>`;

async function initDb(sql) {
  await sql`CREATE TABLE IF NOT EXISTS novels (
    id SERIAL PRIMARY KEY,
    plot TEXT NOT NULL,
    system_ability TEXT NOT NULL,
    tags JSONB NOT NULL,
    genre TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS chapters (
    id SERIAL PRIMARY KEY,
    novel_id INTEGER REFERENCES novels(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    has_important_choice BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS choices (
    id SERIAL PRIMARY KEY,
    chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
    choice_text TEXT NOT NULL,
    selected_count INTEGER DEFAULT 0
  )`;
  await sql`CREATE TABLE IF NOT EXISTS novel_stats (
    novel_id INTEGER PRIMARY KEY REFERENCES novels(id) ON DELETE CASCADE,
    total_chapters INTEGER DEFAULT 0,
    total_choices_presented INTEGER DEFAULT 0,
    total_choices_selected INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`;
}

async function callModel(env, prompt) {
  const base = env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  const model = env.OPENAI_MODEL || "gpt-4.1-mini";
  const r = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.9,
      messages: [
        { role: "system", content: "You write immersive web-novel chapters. Return STRICT JSON only." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!r.ok) throw new Error(`Model error: ${r.status} ${await r.text()}`);
  const data = await r.json();
  try {
    return JSON.parse(data.choices?.[0]?.message?.content || "{}");
  } catch {
    return { chapter: String(data.choices?.[0]?.message?.content || ""), choices: [] };
  }
}

function buildPrompt(novel, chapterNumber, lastSummary, mustChoice) {
  return `Novel Setup:\nPlot: ${novel.plot}\nSystem ability: ${novel.system_ability}\nGenre: ${novel.genre}\nTags: ${novel.tags.join(', ')}\nPrevious summary: ${lastSummary || 'none'}\n\nWrite chapter ${chapterNumber} with 500-900 words.\n${mustChoice ? 'Include one critical decision point and exactly 3 choices.' : 'No choice needed this chapter unless naturally needed.'}\nReturn JSON: {"chapter":"...","choices":["..."],"summary":"short continuity summary"}.`;
}

async function generateChapter(env, sql, novelId, forcedContext = null) {
  const novelRows = await sql`SELECT * FROM novels WHERE id=${novelId}`;
  if (!novelRows.length) throw new Error("Novel not found");
  const novel = novelRows[0];

  const chapterRows = await sql`SELECT * FROM chapters WHERE novel_id=${novelId} ORDER BY chapter_number ASC`;
  const chapterNumber = chapterRows.length + 1;
  const mustChoice = chapterNumber === 1 || chapterNumber - (Math.floor((chapterNumber - 1) / 5) * 5) === 0 || Math.random() < 0.15;

  const lastSummary = forcedContext || (chapterRows.length ? chapterRows[chapterRows.length - 1].content.slice(-400) : "");
  const response = await callModel(env, buildPrompt(novel, chapterNumber, lastSummary, mustChoice));

  const chapterText = response.chapter || "Chapter generation failed but story continues.";
  const chapterInsert = await sql`
    INSERT INTO chapters (novel_id, chapter_number, content, has_important_choice)
    VALUES (${novelId}, ${chapterNumber}, ${chapterText}, ${mustChoice})
    RETURNING id`;

  const chapterId = chapterInsert[0].id;
  const choices = Array.isArray(response.choices) ? response.choices.filter(Boolean).slice(0, 3) : [];
  for (const c of choices) {
    await sql`INSERT INTO choices (chapter_id, choice_text) VALUES (${chapterId}, ${String(c)})`;
  }

  const totalChoices = choices.length;
  await sql`
    INSERT INTO novel_stats (novel_id, total_chapters, total_choices_presented)
    VALUES (${novelId}, 1, ${totalChoices})
    ON CONFLICT (novel_id)
    DO UPDATE SET
      total_chapters = novel_stats.total_chapters + 1,
      total_choices_presented = novel_stats.total_choices_presented + ${totalChoices},
      updated_at = NOW()`;
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!env.DATABASE_URL) return Response.json({ error: "Missing DATABASE_URL secret" }, { status: 500 });
    if (!env.OPENAI_API_KEY) return Response.json({ error: "Missing OPENAI_API_KEY secret" }, { status: 500 });
    const sql = neon(env.DATABASE_URL);
    await initDb(sql);

    try {
      if (url.pathname === "/") {
        return new Response(appHtml, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
      }

      if (url.pathname === "/api/novel" && req.method === "POST") {
        const body = await req.json();
        if (!String(body.plot || "").trim()) return Response.json({ error: "plot is required" }, { status: 400 });
        const tags = String(body.tags || "").split(",").map(s => s.trim()).filter(Boolean);
        const row = await sql`
          INSERT INTO novels (plot, system_ability, tags, genre)
          VALUES (${body.plot || "Untitled plot"}, ${body.systemAbility || "No system"}, ${JSON.stringify(tags)}, ${body.genre || "Fantasy"})
          RETURNING id`;
        const novelId = row[0].id;
        await generateChapter(env, sql, novelId);
        return Response.json({ novelId });
      }

      if (url.pathname.startsWith("/api/novel/") && req.method === "GET") {
        const novelId = Number(url.pathname.split("/").pop());
        const novelRows = await sql`SELECT * FROM novels WHERE id=${novelId}`;
        if (!novelRows.length) return Response.json({ error: "Not found" }, { status: 404 });
        const chapters = await sql`
          SELECT c.id, c.chapter_number, c.content,
            COALESCE(json_agg(json_build_object('id',ch.id,'choice_text',ch.choice_text))
            FILTER (WHERE ch.id IS NOT NULL), '[]') AS choices
          FROM chapters c
          LEFT JOIN choices ch ON ch.chapter_id = c.id
          WHERE c.novel_id=${novelId}
          GROUP BY c.id
          ORDER BY c.chapter_number`;
        const novel = novelRows[0];
        return Response.json({
          novel: { ...novel, tags: novel.tags || [] },
          chapters
        });
      }

      if (url.pathname === "/api/chapter/next" && req.method === "POST") {
        const { novelId } = await req.json();
        await generateChapter(env, sql, novelId);
        return Response.json({ ok: true });
      }

      if (url.pathname === "/api/choose" && req.method === "POST") {
        const { novelId, chapterId, choiceId } = await req.json();
        const choiceRows = await sql`SELECT * FROM choices WHERE id=${choiceId} AND chapter_id=${chapterId}`;
        if (!choiceRows.length) return Response.json({ error: "Invalid choice" }, { status: 400 });

        await sql`UPDATE choices SET selected_count = selected_count + 1 WHERE id=${choiceId}`;
        await sql`UPDATE novel_stats SET total_choices_selected = total_choices_selected + 1, updated_at = NOW() WHERE novel_id=${novelId}`;

        const context = `Player selected: ${choiceRows[0].choice_text}`;
        await generateChapter(env, sql, novelId, context);
        return Response.json({ ok: true });
      }

      return new Response("Not found", { status: 404 });
    } catch (e) {
      return Response.json({ error: String(e.message || e) }, { status: 500 });
    }
  }
};
