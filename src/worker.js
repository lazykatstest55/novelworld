import { neon } from "@neondatabase/serverless";
import { appHtml } from "./html.js";

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
  const base = env.OPENAI_BASE_URL || env.CEREBRAS_BASE_URL || "https://api.cerebras.ai/v1";
  const model = env.OPENAI_MODEL || env.CEREBRAS_MODEL || "zai-glm-4.7";
  const key = env.OPENAI_API_KEY || env.CEREBRAS_API_KEY;
  const r = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      temperature: 0.9,
      messages: [
        { role: "system", content: "You are a master Chinese web-novel editor and author. Return STRICT JSON only." },
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
  return `You are an acclaimed Chinese web novel author specializing in Xianxia, Xuanhuan, and LitRPG/System novels. 
Write Chapter ${chapterNumber} of our interactive novel.

Novel Setup:
- Genre: ${novel.genre}
- Story Premise/Plot: ${novel.plot}
- Protagonist's System / Cultivation Ability: ${novel.system_ability}
- Tags: ${novel.tags ? novel.tags.join(', ') : 'none'}
- Story Continuity / Previous Context: ${lastSummary || 'This is Chapter 1. Establish the protagonist, their starting humble background or crisis, their system awakening, and set the grand cultivation backdrop.'}

Directives (Chinese Web Novel Style):
1. Tone & Tropes: Immersive, exciting, fast-paced. Emphasize cultivation levels, arrogant young masters, martial techniques, Schemes, and jaw-dropping reactions from onlookers.
2. Protagonist System/Ability: Integrate the protagonist's ability ("${novel.system_ability}") prominently with system message prompts (e.g., "[System: Arrogance slapped! +10 Cultivation Points]").
3. Word Count: 500-900 words. Keep paragraphs short and punchy.
4. Chapter Flow: Build dramatic tension, leading to a breakthrough, conflict, or scheme.
5. Choices: ${mustChoice ? 'This is a CRITICAL path choice. You MUST provide exactly 3 choices for the next move, distinct and interesting (e.g., Ruthless elimination, Cunning retreat, Hidden breakthrough).' : 'No choice prompt is needed this chapter.'}

Format your response as a STRICT JSON object:
{
  "chapter": "Write the full story text of the chapter here. Use \\\\n\\\\n for paragraphs.",
  "choices": [${mustChoice ? '"Choice 1", "Choice 2", "Choice 3"' : ''}],
  "summary": "A brief continuity summary of events in this chapter."
}`;
}

async function generateChapter(env, sql, novelId, forcedContext = null) {
  const novelRows = await sql`SELECT * FROM novels WHERE id=${novelId}`;
  if (!novelRows.length) throw new Error("Novel not found");
  const novel = novelRows[0];

  const chapterRows = await sql`SELECT * FROM chapters WHERE novel_id=${novelId} ORDER BY chapter_number ASC`;
  const chapterNumber = chapterRows.length + 1;
  const mustChoice = chapterNumber === 1 || chapterNumber % 5 === 0 || Math.random() < 0.15;

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

let dbInitialized = false;

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!env.DATABASE_URL) return Response.json({ error: "Missing DATABASE_URL secret" }, { status: 500 });
    if (!env.OPENAI_API_KEY && !env.CEREBRAS_API_KEY) {
      return Response.json({ error: "Missing OPENAI_API_KEY or CEREBRAS_API_KEY secret" }, { status: 500 });
    }
    const sql = neon(env.DATABASE_URL);
    
    if (!dbInitialized) {
      await initDb(sql);
      dbInitialized = true;
    }

    try {
      const pathParts = url.pathname.split("/").filter(Boolean);
      if (url.pathname === "/" || (pathParts[0] === "novel" && pathParts.length >= 2)) {
        return new Response(appHtml, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
      }

      if (url.pathname === "/api/novels" && req.method === "GET") {
        const rows = await sql`
          SELECT n.id, n.genre, n.plot, n.tags, n.created_at,
                 COALESCE(ns.total_chapters, 0) AS total_chapters
          FROM novels n
          LEFT JOIN novel_stats ns ON ns.novel_id = n.id
          ORDER BY n.created_at DESC
          LIMIT 10`;
        return Response.json({ novels: rows });
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
            COALESCE(json_agg(json_build_object('id',ch.id,'choice_text',ch.choice_text,'selected_count',ch.selected_count))
            FILTER (WHERE ch.id IS NOT NULL), '[]'::json) AS choices
          FROM chapters c
          LEFT JOIN choices ch ON ch.chapter_id = c.id
          WHERE c.novel_id=${novelId}
          GROUP BY c.id
          ORDER BY c.chapter_number`;
        const novel = novelRows[0];
        const statsRows = await sql`SELECT * FROM novel_stats WHERE novel_id=${novelId}`;
        const stats = statsRows[0] || { total_chapters: 0, total_choices_presented: 0, total_choices_selected: 0 };
        return Response.json({
          novel: { ...novel, tags: novel.tags || [] },
          chapters,
          stats
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

      if (url.pathname === "/api/enhance-prompt" && req.method === "POST") {
        const body = await req.json();
        const rawPlot = String(body.plot || "").trim();
        const genre = String(body.genre || "").trim();
        if (!rawPlot) {
          return Response.json({ error: "plot is required to enhance" }, { status: 400 });
        }
        
        const prompt = `You are a professional web novel editor. Your task is to rewrite the user story premise into a highly compelling, dramatic, and immersive plot outline.
The style must resemble popular translated Chinese web novels (Xianxia cultivation, Eastern Xuanhuan, Wuxia martial arts, or System/LitRPG).

Rough Premise: "${rawPlot}"
Target Genre: "${genre}"

Requirements:
1. Make it incredibly engaging with classic Eastern tropes (e.g., rebirth/reincarnation, hidden depths, celestial systems, power progression, sects, ancient mysteries).
2. Keep it concise (1 to 2 short paragraphs, roughly 80-150 words total).
3. Introduce powerful dramatic tension, a clear hook/conflict, and a hint of the grand scale of the world.
4. Return ONLY a JSON object: {"enhanced": "Enhanced premise text goes here..."}. DO NOT write any conversational prefix, suffix, or markdown formatting around the JSON.`;

        const response = await callModel(env, prompt);
        const enhancedPlot = response.enhanced || response.chapter || rawPlot;
        return Response.json({ enhanced: enhancedPlot });
      }

      return new Response("Not found", { status: 404 });
    } catch (e) {
      return Response.json({ error: String(e.message || e) }, { status: 500 });
    }
  }
};
