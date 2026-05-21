import { neon } from "@neondatabase/serverless";

const appHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NovelWorld AI — Immersive Choice-Driven Storytelling</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Outfit:wght@300..900&display=swap');
    
    body {
      font-family: 'Outfit', system-ui, -apple-system, sans-serif;
      margin: 0;
      background: radial-gradient(circle at 50% 0%, #151030 0%, #05040d 100%);
      background-attachment: fixed;
      color: #cbd5e1;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }
    
    .wrap {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    h1 {
      font-size: 2.6rem;
      font-weight: 900;
      margin: 0 0 8px 0;
      background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }
    
    .subtitle {
      color: #94a3b8;
      font-size: 1.05rem;
      margin: 0;
    }
    
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
      align-items: start;
    }
    
    @media (min-width: 900px) {
      .grid {
        grid-template-columns: 380px 1fr;
      }
    }
    
    .card {
      background: rgba(18, 14, 43, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .card:hover {
      border-color: rgba(139, 92, 246, 0.25);
      box-shadow: 0 12px 40px -10px rgba(139, 92, 246, 0.15);
    }
    
    h2 {
      font-size: 1.4rem;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 20px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #a78bfa;
      margin-bottom: 6px;
    }
    
    input, textarea, select {
      width: 100%;
      padding: 12px 16px;
      margin-bottom: 16px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(10, 8, 25, 0.7);
      color: #f1f5f9;
      font-family: inherit;
      font-size: 0.95rem;
      box-sizing: border-box;
      transition: all 0.2s ease;
    }
    
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #8b5cf6;
      background: rgba(15, 12, 38, 0.9);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
    }
    
    textarea {
      resize: vertical;
      min-height: 90px;
    }
    
    button {
      width: 100%;
      padding: 14px 20px;
      border-radius: 10px;
      border: none;
      font-family: inherit;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
    }
    
    button.primary {
      background: linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%);
      color: #ffffff;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.25);
    }
    
    button.primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(139, 92, 246, 0.4);
    }
    
    button.primary:active:not(:disabled) {
      transform: translateY(0);
    }
    
    button.secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
    }
    
    button.secondary:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.15);
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .muted {
      color: #64748b;
      font-size: 0.85rem;
      margin: 8px 0 0 0;
    }
    
    /* Stats Bar */
    .stats-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }
    
    .stat-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #cbd5e1;
    }
    
    .stat-badge.purple {
      background: rgba(139, 92, 246, 0.1);
      border-color: rgba(139, 92, 246, 0.2);
      color: #c084fc;
    }
    
    .stat-badge.pink {
      background: rgba(236, 72, 153, 0.1);
      border-color: rgba(236, 72, 153, 0.2);
      color: #f472b6;
    }
    
    /* Recent Stories Scroll List */
    .recent-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 250px;
      overflow-y: auto;
      padding-right: 4px;
    }
    
    .recent-list::-webkit-scrollbar {
      width: 6px;
    }
    
    .recent-list::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
    }
    
    .recent-item {
      padding: 12px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.04);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .recent-item:hover {
      background: rgba(139, 92, 246, 0.08);
      border-color: rgba(139, 92, 246, 0.2);
      transform: translateX(2px);
    }
    
    .recent-item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    
    .recent-title {
      font-weight: 700;
      color: #fff;
      font-size: 0.9rem;
    }
    
    .recent-genre {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(236, 72, 153, 0.15);
      color: #f472b6;
      border: 1px solid rgba(236, 72, 153, 0.2);
    }
    
    .recent-plot {
      font-size: 0.8rem;
      color: #94a3b8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .recent-chapters {
      font-size: 0.75rem;
      color: #a78bfa;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    /* Chapters Feed */
    .chapter-card {
      margin-bottom: 30px;
      animation: fadeIn 0.5s ease-out forwards;
    }
    
    .chapter-header {
      font-size: 1.25rem;
      font-weight: 800;
      color: #c084fc;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .chapter-body {
      font-family: 'Lora', Georgia, serif;
      font-size: 1.12rem;
      line-height: 1.75;
      color: #e2e8f0;
      white-space: pre-wrap;
      letter-spacing: 0.01em;
    }
    
    /* Choices */
    .choices-section {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .choices-title {
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #a78bfa;
      margin-bottom: 12px;
    }
    
    .choices-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    .choice-btn {
      text-align: left;
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      color: #cbd5e1;
      font-weight: 500;
      font-size: 0.95rem;
      line-height: 1.4;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
    }
    
    .choice-btn:hover:not(:disabled) {
      background: rgba(139, 92, 246, 0.1);
      border-color: rgba(139, 92, 246, 0.35);
      color: #ffffff;
      transform: translateX(4px);
    }
    
    .choice-btn.selected {
      background: rgba(16, 185, 129, 0.12) !important;
      border-color: rgba(16, 185, 129, 0.4) !important;
      color: #10b981 !important;
      font-weight: 700;
      box-shadow: 0 0 15px rgba(16, 185, 129, 0.1);
    }
    
    .choice-btn.selected::before {
      content: '✦';
      color: #10b981;
    }
    
    .choice-btn.unselected {
      opacity: 0.45;
    }
    
    /* Shimmer Skeleton */
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .shimmer-card {
      border-color: rgba(139, 92, 246, 0.15) !important;
      background: rgba(18, 14, 43, 0.4) !important;
    }
    
    .shimmer-title, .shimmer-line {
      background: linear-gradient(90deg, rgba(28, 24, 54, 0.5) 25%, rgba(42, 37, 82, 0.8) 50%, rgba(28, 24, 54, 0.5) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.6s infinite;
      border-radius: 4px;
    }
    
    .shimmer-title {
      height: 24px;
      width: 140px;
      margin-bottom: 24px;
    }
    
    .shimmer-line {
      height: 16px;
      margin-bottom: 12px;
    }
    
    /* Badges */
    .badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
    }
    
    .badge.genre {
      background: rgba(139, 92, 246, 0.15);
      border-color: rgba(139, 92, 246, 0.25);
      color: #a78bfa;
    }
    
    /* Empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      text-align: center;
    }
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 20px;
      filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3));
    }
    
    .empty-state h3 {
      font-size: 1.5rem;
      margin: 0 0 10px 0;
      color: #fff;
    }
    
    .empty-state p {
      color: #94a3b8;
      max-width: 420px;
      margin: 0;
      font-size: 1rem;
      line-height: 1.5;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Section Divider */
    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.06);
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>NovelWorld AI</h1>
      <p class="subtitle">An interactive choice-driven web-novel engine powered by AI</p>
    </header>
    
    <div class="grid">
      <!-- Left Column / Controls & Sidebar -->
      <div>
        <div class="card">
          <h2><span>✨</span> Forge New Story</h2>
          
          <label for="genre">Genre</label>
          <select id="genre">
            <option value="Fantasy">High Fantasy</option>
            <option value="Sci-Fi">Space Opera / Sci-Fi</option>
            <option value="Cyberpunk">Gritty Cyberpunk</option>
            <option value="Mystery">Noir Mystery</option>
            <option value="Horror">Gothic Horror</option>
            <option value="Isekai">Isekai / GameLit</option>
          </select>
          
          <label for="plot">Premise / Plot Outline</label>
          <textarea id="plot" placeholder="Brief outline of the world or starting hook. E.g. A disgraced inquisitor uncovers an ancient biomechanical conspiracy in a holy city."></textarea>
          
          <label for="ability">Protagonist System Ability</label>
          <textarea id="ability" placeholder="A unique rule, power, or RPG interface. E.g. Can read the memory of inanimate objects."></textarea>
          
          <label for="tags">Tags (comma-separated)</label>
          <input id="tags" placeholder="cyberpunk, dystopia, magic, mystery" />
          
          <button id="createBtn" class="primary">
            <span>⚔️</span> Forge Novel & Play
          </button>
          <p class="muted" style="text-align: center; font-size: 0.75rem;">Important choices appear roughly every 5 chapters.</p>
        </div>
        
        <div class="card">
          <h2><span>📖</span> Recent Chronicles</h2>
          <div class="recent-list" id="recentNovelsList">
            <div style="text-align:center; padding: 20px; color:#64748b;">Loading history...</div>
          </div>
        </div>
      </div>
      
      <!-- Right Column / Content Reader -->
      <div id="rightCol">
        <!-- Empty State (No Novel Loaded) -->
        <div class="card empty-state" id="emptyState">
          <div class="empty-icon">🪐</div>
          <h3>Your Adventure Awaits</h3>
          <p>Configure a premise on the left to forge an entirely new dynamic universe, or pick a chronicle from the history below to continue reading.</p>
        </div>
        
        <!-- Novel Area (Hidden by default) -->
        <div id="novelArea" style="display:none;">
          <div class="card" style="margin-bottom: 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 12px; margin-bottom: 16px;">
              <h2 id="novelTitle" style="margin:0;">Novel</h2>
              <div style="display:flex; gap: 8px;" id="novelBadges"></div>
            </div>
            
            <div class="stats-bar">
              <div class="stat-badge purple">
                <span>📖</span> <span id="statChapters">0 Chapters</span>
              </div>
              <div class="stat-badge pink">
                <span>🧭</span> <span id="statChoices">0 Choices Made</span>
              </div>
              <div class="stat-badge">
                <span>🧬</span> <span id="statPresented">0 Presented</span>
              </div>
            </div>
          </div>
          
          <!-- Chapters Container -->
          <div id="chaptersFeed"></div>
          
          <!-- Generation Shimmer Placeholder -->
          <div class="card shimmer-card" id="shimmerCard" style="display:none;">
            <div class="shimmer-title"></div>
            <div class="shimmer-line"></div>
            <div class="shimmer-line"></div>
            <div class="shimmer-line" style="width: 80%;"></div>
            <div class="shimmer-line"></div>
          </div>
          
          <!-- Bottom Action Buttons (for non-choice chapters) -->
          <div id="bottomAction" style="margin-top: 20px;">
            <button id="nextBtn" class="primary" style="display:none;">
              <span>🔮</span> Generate Next Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    let currentNovelId = null;
    let isGenerating = false;

    function escapeHtml(s) {
      return String(s || "")
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    // Helper to style choices based on chapter history
    function renderChoices(ch, isLatest) {
      const choicesList = ch.choices || [];
      if (choicesList.length === 0) return '';
      
      // Determine if a choice has been selected previously
      // The choice with selected_count > 0 was chosen
      const hasChosen = choicesList.some(c => c.selected_count > 0);
      
      const buttonsHtml = choicesList.map(c => {
        let btnClass = 'choice-btn';
        let disabledAttr = '';
        
        if (!isLatest && hasChosen) {
          if (c.selected_count > 0) {
            btnClass += ' selected';
          } else {
            btnClass += ' unselected';
          }
          disabledAttr = 'disabled';
        } else if (isGenerating) {
          disabledAttr = 'disabled';
        }
        
        return '<button class="' + btnClass + '" ' + disabledAttr + ' onclick="choose(' + ch.id + ', ' + c.id + ')">' + escapeHtml(c.choice_text) + '</button>';
      }).join('');
      
      return '<div class="choices-section"><div class="choices-title">Develop Storyline</div><div class="choices-list">' + buttonsHtml + '</div></div>';
    }

    function chapterBlock(ch, index, array) {
      const isLatest = index === array.length - 1;
      const choicesHtml = renderChoices(ch, isLatest);
      
      // Split content by paragraphs and wrap in p tags
      const formattedContent = ch.content.split('\\n\\n')
        .map(p => p.trim())
        .filter(Boolean)
        .map(p => '<p>' + escapeHtml(p) + '</p>')
        .join('');

      return '<div class="card chapter-card"><h3>Chapter ' + ch.chapter_number + '</h3><div class="chapter">' + formattedContent + '</div>' + choicesHtml + '</div>';
    }

    async function loadNovel(novelId) {
      if (!novelId) return;
      currentNovelId = novelId;
      
      try {
        const res = await fetch('/api/novel/' + novelId);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load novel');
        
        // Hide empty state and show novel area
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('novelArea').style.display = 'block';
        
        // Populate Title and Badges
        document.getElementById('novelTitle').textContent = 'Chronicle #' + data.novel.id;
        
        let badgesHtml = '<span class="badge genre">' + escapeHtml(data.novel.genre) + '</span>';
        if (data.novel.tags && data.novel.tags.length > 0) {
          data.novel.tags.forEach(t => {
            badgesHtml += '<span class="badge">' + escapeHtml(t) + '</span>';
          });
        }
        document.getElementById('novelBadges').innerHTML = badgesHtml;
        
        // Render Stats
        document.getElementById('statChapters').textContent = (data.stats.total_chapters || 0) + ' Chapters';
        document.getElementById('statChoices').textContent = (data.stats.total_choices_selected || 0) + ' Choices Made';
        document.getElementById('statPresented').textContent = (data.stats.total_choices_presented || 0) + ' Choices Present';
        
        // Render Chapters
        const chaptersHtml = data.chapters.map((ch, idx, arr) => chapterBlock(ch, idx, arr)).join('');
        document.getElementById('chaptersFeed').innerHTML = chaptersHtml;
        
        // Control "Next Chapter" button visibility
        // Only show if the latest chapter has no choices and we are not currently generating
        const latestChapter = data.chapters[data.chapters.length - 1];
        const hasChoices = latestChapter && latestChapter.choices && latestChapter.choices.length > 0;
        
        const nextBtn = document.getElementById('nextBtn');
        if (!hasChoices && !isGenerating) {
          nextBtn.style.display = 'flex';
        } else {
          nextBtn.style.display = 'none';
        }
        
        // Auto Scroll to bottom of right column
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
        
        // Refresh sidebar list to reflect correct status
        fetchRecentNovels().catch(() => {});
        
      } catch (e) {
        alert(e.message || 'Failed to load chronicle');
      }
    }

    async function choose(chapterId, choiceId) {
      if (isGenerating || !currentNovelId) return;
      
      isGenerating = true;
      toggleGeneratingState(true);
      
      try {
        const res = await fetch('/api/choose', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ novelId: currentNovelId, chapterId, choiceId })
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to submit choice');
        }
        
        await loadNovel(currentNovelId);
      } catch (e) {
        alert(e.message);
      } finally {
        isGenerating = false;
        toggleGeneratingState(false);
      }
    }

    async function fetchRecentNovels() {
      try {
        const res = await fetch('/api/novels');
        const data = await res.json();
        if (!res.ok) return;
        
        const listDiv = document.getElementById('recentNovelsList');
        if (data.novels.length === 0) {
          listDiv.innerHTML = '<div style="text-align:center; padding: 20px; color:#64748b;">No stories found. Create one to start!</div>';
          return;
        }
        
        listDiv.innerHTML = data.novels.map(n => {
          const isSelected = n.id === currentNovelId ? 'style="border-color: rgba(139,92,246,0.4); background: rgba(139,92,246,0.06);"' : '';
          return '<div class="recent-item" ' + isSelected + ' onclick="loadNovel(' + n.id + ')">' +
            '<div class="recent-item-header">' +
              '<span class="recent-title">Chronicle #' + n.id + '</span>' +
              '<span class="recent-genre">' + escapeHtml(n.genre) + '</span>' +
            '</div>' +
            '<div class="recent-plot">' + escapeHtml(n.plot) + '</div>' +
            '<div class="recent-chapters">📖 ' + n.total_chapters + ' Chapters</div>' +
          '</div>';
        }).join('');
      } catch (e) {
        // Suppress or handle background list fetch error
      }
    }

    function toggleGeneratingState(loading) {
      const createBtn = document.getElementById('createBtn');
      const nextBtn = document.getElementById('nextBtn');
      const shimmer = document.getElementById('shimmerCard');
      
      // Disable buttons
      createBtn.disabled = loading;
      nextBtn.disabled = loading;
      
      if (loading) {
        createBtn.innerHTML = '<span>⚡</span> Generating Universe...';
        nextBtn.innerHTML = '<span>⚡</span> Writing Chapter...';
        shimmer.style.display = 'block';
        nextBtn.style.display = 'none'; // hide during load
        
        // Disable any interactive choice button
        document.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);
        
        // Smooth scroll to the shimmer card
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      } else {
        createBtn.innerHTML = '<span>⚔️</span> Forge Novel & Play';
        nextBtn.innerHTML = '<span>🔮</span> Generate Next Chapter';
        shimmer.style.display = 'none';
      }
    }

    document.getElementById('createBtn').onclick = async () => {
      if (isGenerating) return;
      
      const payload = {
        plot: document.getElementById('plot').value,
        systemAbility: document.getElementById('ability').value,
        tags: document.getElementById('tags').value,
        genre: document.getElementById('genre').value
      };
      
      if (!payload.plot.trim()) {
        alert('Please enter a story premise/plot outline.');
        return;
      }
      
      isGenerating = true;
      toggleGeneratingState(true);
      
      try {
        const res = await fetch('/api/novel', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create story');
        
        await loadNovel(data.novelId);
      } catch (e) {
        alert(e.message);
      } finally {
        isGenerating = false;
        toggleGeneratingState(false);
      }
    };

    document.getElementById('nextBtn').onclick = async () => {
      if (isGenerating || !currentNovelId) return;
      
      isGenerating = true;
      toggleGeneratingState(true);
      
      try {
        const res = await fetch('/api/chapter/next', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ novelId: currentNovelId })
        });
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to generate chapter');
        }
        
        await loadNovel(currentNovelId);
      } catch (e) {
        alert(e.message);
      } finally {
        isGenerating = false;
        toggleGeneratingState(false);
      }
    };

    // Load initial states
    window.onload = () => {
      fetchRecentNovels().catch(() => {});
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
  const model = env.OPENAI_MODEL || "gpt-4o-mini";
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
    if (!env.OPENAI_API_KEY) return Response.json({ error: "Missing OPENAI_API_KEY secret" }, { status: 500 });
    const sql = neon(env.DATABASE_URL);
    
    if (!dbInitialized) {
      await initDb(sql);
      dbInitialized = true;
    }

    try {
      if (url.pathname === "/") {
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

      return new Response("Not found", { status: 404 });
    } catch (e) {
      return Response.json({ error: String(e.message || e) }, { status: 500 });
    }
  }
};
