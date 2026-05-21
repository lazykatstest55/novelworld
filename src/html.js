export const appHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Celestial NovelWorld AI — Defiant Cultivation Generator</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Lora:ital,wght@0,400..700;1,400..700&family=Outfit:wght@300..900&display=swap');
    
    :root {
      --bg-dark: #05040d;
      --bg-light: #120b24;
      --gold-primary: #f59e0b;
      --gold-secondary: #d97706;
      --violet-glow: rgba(139, 92, 246, 0.15);
      --violet-border: rgba(167, 139, 250, 0.2);
      --text-muted: #94a3b8;
      --text-light: #f1f5f9;
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    body {
      font-family: 'Outfit', system-ui, -apple-system, sans-serif;
      margin: 0;
      background: radial-gradient(circle at 50% 0%, #150a26 0%, var(--bg-dark) 100%);
      background-attachment: fixed;
      color: #cbd5e1;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    
    /* Decorative Background Particle Mist */
    body::before {
      content: '';
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: 
        radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 90px 220px, #fff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 130px 270px, #fff, rgba(0,0,0,0));
      background-size: 200px 300px;
      opacity: 0.12;
      pointer-events: none;
      z-index: 0;
    }

    /* Wrap & Layouts */
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
      position: relative;
      z-index: 1;
    }

    header {
      text-align: center;
      margin-bottom: 50px;
    }

    header h1 {
      font-family: 'Cinzel', serif;
      font-size: 3.2rem;
      font-weight: 900;
      margin: 0 0 10px 0;
      background: linear-gradient(135deg, #ffd700 0%, #ff8c00 50%, #d8b4fe 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.05em;
      filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.2));
      display: inline-block;
    }

    header .subtitle {
      color: var(--text-muted);
      font-size: 1.15rem;
      margin: 0;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
    }

    /* Glassmorphism Cards */
    .card {
      background: rgba(15, 10, 30, 0.5);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--violet-border);
      border-radius: 20px;
      padding: 35px;
      margin-bottom: 40px;
      box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.4);
      transition: var(--transition);
      position: relative;
      overflow: hidden;
    }

    .card::after {
      content: '';
      position: absolute;
      top: -50%; left: -50%; width: 200%; height: 200%;
      background: radial-gradient(circle, rgba(167, 139, 250, 0.03) 0%, transparent 70%);
      pointer-events: none;
    }

    .card:hover {
      border-color: rgba(245, 158, 11, 0.3);
      box-shadow: 0 15px 50px -10px rgba(139, 92, 246, 0.2);
      transform: translateY(-2px);
    }

    h2 {
      font-family: 'Cinzel', serif;
      font-size: 1.6rem;
      font-weight: 700;
      margin-top: 0;
      margin-bottom: 25px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 12px;
      letter-spacing: 0.02em;
    }

    h2 span.icon {
      color: var(--gold-primary);
      filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.5));
    }

    /* Forms inputs */
    .form-group {
      margin-bottom: 24px;
    }

    label {
      display: block;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--gold-primary);
      margin-bottom: 8px;
    }

    input, textarea, select {
      width: 100%;
      padding: 14px 18px;
      border-radius: 12px;
      border: 1px solid var(--violet-border);
      background: rgba(8, 5, 18, 0.7);
      color: var(--text-light);
      font-family: inherit;
      font-size: 0.95rem;
      box-sizing: border-box;
      transition: var(--transition);
    }

    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: var(--gold-primary);
      background: rgba(12, 8, 28, 0.9);
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.15);
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    /* Buttons */
    button {
      width: 100%;
      padding: 16px 24px;
      border-radius: 12px;
      border: none;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.05rem;
      letter-spacing: 0.05em;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      transition: var(--transition);
      box-sizing: border-box;
    }

    button.primary {
      background: linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f59e0b 100%);
      background-size: 200% auto;
      color: #ffffff;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
    }

    button.primary:hover:not(:disabled) {
      background-position: right center;
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(245, 158, 11, 0.35);
    }

    button.primary:active:not(:disabled) {
      transform: translateY(0);
    }

    button.secondary {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--violet-border);
      color: #e2e8f0;
    }

    button.secondary:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }

    button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    /* Ascended Archives Grid */
    .archives-title {
      font-family: 'Cinzel', serif;
      font-size: 1.8rem;
      margin-bottom: 20px;
      text-align: center;
      color: #fff;
      letter-spacing: 0.05em;
    }

    .archives-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
      margin-top: 25px;
    }

    @media (min-width: 640px) {
      .archives-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .archive-card {
      background: rgba(18, 11, 36, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 22px;
      transition: var(--transition);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      box-sizing: border-box;
    }

    .archive-card:hover {
      background: rgba(139, 92, 246, 0.08);
      border-color: var(--gold-primary);
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(245, 158, 11, 0.1);
    }

    .archive-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      gap: 8px;
    }

    .archive-title {
      font-family: 'Cinzel', serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.3;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .archive-genre {
      font-size: 0.7rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(245, 158, 11, 0.12);
      color: var(--gold-primary);
      border: 1px solid rgba(245, 158, 11, 0.2);
      white-space: nowrap;
    }

    .archive-plot {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 18px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .archive-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 12px;
      font-size: 0.8rem;
    }

    .archive-chapters {
      color: #c084fc;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .archive-resume {
      color: var(--gold-primary);
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .archive-resume::after {
      content: ' →';
      transition: var(--transition);
    }

    .archive-card:hover .archive-resume::after {
      transform: translateX(3px);
    }

    /* DEDICATED READER LAYOUT */
    .reader-navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      position: sticky;
      top: 0;
      background: rgba(5, 4, 13, 0.85);
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      z-index: 100;
      margin-bottom: 40px;
    }

    .nav-btn {
      width: auto;
      padding: 8px 16px;
      font-size: 0.85rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--violet-border);
      color: #cbd5e1;
    }

    .nav-btn:hover {
      background: rgba(245, 158, 11, 0.1);
      border-color: var(--gold-primary);
      color: #fff;
    }

    .nav-title {
      font-family: 'Cinzel', serif;
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--gold-primary);
      text-shadow: 0 0 10px rgba(245, 158, 11, 0.2);
    }

    .stats-container {
      display: flex;
      gap: 12px;
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

    .stat-badge.gold {
      background: rgba(245, 158, 11, 0.08);
      border-color: rgba(245, 158, 11, 0.25);
      color: #fbbf24;
    }

    .stat-badge.purple {
      background: rgba(139, 92, 246, 0.08);
      border-color: rgba(139, 92, 246, 0.25);
      color: #c084fc;
    }

    /* DISTRACTION FREE READER CONTAINER */
    .reader-wrap {
      max-width: 760px;
      margin: 0 auto;
      padding: 0 20px 80px 20px;
      position: relative;
    }

    .novel-meta-card {
      text-align: center;
      margin-bottom: 50px;
    }

    .novel-epic-title {
      font-family: 'Cinzel', serif;
      font-size: 2.8rem;
      font-weight: 900;
      color: #ffffff;
      margin: 0 0 16px 0;
      line-height: 1.25;
      background: linear-gradient(to bottom, #ffffff 40%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 10px rgba(0,0,0,0.5));
    }

    .badges-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 15px;
    }

    .badge {
      font-size: 0.8rem;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      color: #94a3b8;
    }

    .badge.genre {
      background: rgba(167, 139, 250, 0.1);
      border-color: rgba(167, 139, 250, 0.2);
      color: #c084fc;
      text-transform: capitalize;
    }

    .badge.gold-finger {
      background: rgba(245, 158, 11, 0.08);
      border-color: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
    }

    /* CHAPTER RENDERING */
    .chapter-block {
      background: rgba(15, 10, 30, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 24px;
      padding: 40px 50px;
      margin-bottom: 45px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @media (max-width: 600px) {
      .chapter-block {
        padding: 30px 20px;
      }
    }

    .chapter-heading {
      font-family: 'Cinzel', serif;
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--gold-primary);
      text-align: center;
      margin-top: 0;
      margin-bottom: 30px;
      border-bottom: 1px solid rgba(245, 158, 11, 0.15);
      padding-bottom: 16px;
      letter-spacing: 0.05em;
      position: relative;
    }

    .chapter-heading::after {
      content: '✦';
      position: absolute;
      bottom: -9px;
      left: 50%;
      transform: translateX(-50%);
      background: #110925;
      padding: 0 10px;
      color: var(--gold-primary);
      font-size: 0.9rem;
    }

    .chapter-content {
      font-family: 'Lora', Georgia, serif;
      font-size: 1.15rem;
      line-height: 1.9;
      color: #e2e8f0;
      text-align: justify;
      word-wrap: break-word;
    }

    .chapter-content p {
      margin-top: 0;
      margin-bottom: 24px;
      text-indent: 2em;
    }

    /* Custom styling for system boxes inside chapters */
    .chapter-content p:contains('[System'),
    .chapter-content p:contains('[Ding!'),
    .chapter-content p:has-text-bracket {
      /* Handled programmatically via helper function */
    }

    .system-box {
      font-family: 'Outfit', sans-serif !important;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(219, 39, 119, 0.1) 100%) !important;
      border: 1px solid rgba(167, 139, 250, 0.35) !important;
      border-radius: 10px !important;
      padding: 16px 20px !important;
      color: #e9d5ff !important;
      text-indent: 0 !important;
      margin: 25px 0 !important;
      font-weight: 600 !important;
      box-shadow: 0 0 15px rgba(124, 58, 237, 0.15) !important;
      font-size: 0.95rem !important;
      letter-spacing: 0.02em !important;
    }

    /* CHOICE BUTTONS */
    .dao-diverge-block {
      background: rgba(245, 158, 11, 0.04);
      border: 1px solid rgba(245, 158, 11, 0.2);
      border-radius: 20px;
      padding: 30px;
      margin-top: 40px;
      text-align: center;
      animation: pulseGold 3s infinite alternate;
    }

    .dao-title {
      font-family: 'Cinzel', serif;
      font-size: 1.25rem;
      color: var(--gold-primary);
      margin: 0 0 20px 0;
      letter-spacing: 0.05em;
      font-weight: 700;
    }

    .choices-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .choice-card-btn {
      text-align: left;
      padding: 16px 22px;
      background: rgba(18, 11, 36, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      color: #cbd5e1;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.5;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: var(--transition);
    }

    .choice-card-btn:hover:not(:disabled) {
      background: rgba(245, 158, 11, 0.08);
      border-color: var(--gold-primary);
      color: #ffffff;
      transform: translateX(4px);
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.15);
    }

    .choice-card-btn.selected {
      background: rgba(16, 185, 129, 0.1) !important;
      border-color: rgba(16, 185, 129, 0.4) !important;
      color: #10b981 !important;
      font-weight: 700;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.15) !important;
    }

    .choice-card-btn.selected::before {
      content: '✦';
      color: #10b981;
      filter: drop-shadow(0 0 5px #10b981);
    }

    .choice-card-btn.unselected {
      opacity: 0.35;
    }

    /* GENERATING LOADING PORTAL */
    .portal-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      text-align: center;
      color: #ffffff;
      padding: 40px 20px;
    }

    .cultivation-crest {
      position: relative;
      width: 180px;
      height: 180px;
      margin-bottom: 50px;
    }

    .crest-ring {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 50%;
      border: 2px solid transparent;
      transition: var(--transition);
    }

    .crest-ring.outer {
      border-color: var(--gold-primary);
      border-style: dashed;
      animation: spinClockwise 12s linear infinite;
      filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.4));
    }

    .crest-ring.middle {
      top: 15px; left: 15px; right: 15px; bottom: 15px;
      border-color: #a78bfa;
      border-top-color: transparent;
      border-bottom-color: transparent;
      animation: spinCounterClockwise 8s linear infinite;
      filter: drop-shadow(0 0 12px rgba(167, 139, 250, 0.5));
    }

    .crest-ring.inner {
      top: 35px; left: 35px; right: 35px; bottom: 35px;
      border-color: #ec4899;
      border-left-color: transparent;
      border-right-color: transparent;
      animation: spinClockwise 4s linear infinite;
      filter: drop-shadow(0 0 8px rgba(236, 72, 153, 0.5));
    }

    .crest-center {
      position: absolute;
      top: 55px; left: 55px; width: 70px; height: 70px;
      border-radius: 50%;
      background: radial-gradient(circle, #ffd700 0%, #ff8c00 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.2rem;
      animation: pulseScale 2s infinite ease-in-out;
      box-shadow: 0 0 30px rgba(251, 191, 36, 0.8);
    }

    .portal-title {
      font-family: 'Cinzel', serif;
      font-size: 2.2rem;
      margin: 0 0 16px 0;
      letter-spacing: 0.05em;
      background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.2));
    }

    .portal-subtitle {
      color: #a78bfa;
      font-size: 1.2rem;
      font-weight: 600;
      min-height: 30px;
      margin-bottom: 12px;
      letter-spacing: 0.02em;
    }

    .portal-desc {
      color: var(--text-muted);
      max-width: 480px;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
    }

    /* SHIMMER PLACEHOLDER */
    .shimmer-card {
      border-color: rgba(245, 158, 11, 0.15) !important;
      background: rgba(18, 11, 36, 0.4) !important;
      padding: 40px 50px;
      border-radius: 24px;
      margin-top: 40px;
    }

    .shimmer-line {
      height: 16px;
      margin-bottom: 15px;
      background: linear-gradient(90deg, rgba(28, 20, 54, 0.5) 25%, rgba(68, 50, 117, 0.8) 50%, rgba(28, 20, 54, 0.5) 75%);
      background-size: 200% 100%;
      animation: shimmerAnimation 1.8s infinite;
      border-radius: 4px;
    }

    /* KEYFRAMES */
    @keyframes spinClockwise {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes spinCounterClockwise {
      0% { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }

    @keyframes pulseScale {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 25px rgba(251, 191, 36, 0.8)); }
      50% { transform: scale(1.1); filter: drop-shadow(0 0 40px rgba(251, 191, 36, 1)); }
    }

    @keyframes pulseGold {
      0% { border-color: rgba(245, 158, 11, 0.2); box-shadow: 0 0 10px rgba(245, 158, 11, 0.05); }
      100% { border-color: rgba(245, 158, 11, 0.4); box-shadow: 0 0 25px rgba(245, 158, 11, 0.15); }
    }

    @keyframes shimmerAnimation {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Decorative element dividers */
    .sect-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px 0;
      gap: 15px;
    }
    .sect-line {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(245, 158, 11, 0.3) 50%, transparent);
      flex: 1;
    }
    .sect-symbol {
      color: var(--gold-primary);
      font-size: 1.2rem;
    }

    .error-container {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 12px;
      padding: 24px;
      color: #fca5a5;
      text-align: center;
      max-width: 500px;
      margin: 40px auto;
    }
  </style>
</head>
<body>

  <!-- VIEW 1: HOME PAGE / DASHBOARD (Centralized Hub) -->
  <div id="landingView" style="display: none;">
    <div class="container">
      <header>
        <h1>NovelWorld</h1>
        <p class="subtitle">Celestial Cultivation & Eastern Fantasy AI Engine</p>
      </header>
      
      <div class="card" style="max-width: 760px; margin: 0 auto 50px auto;">
        <h2><span class="icon">✨</span> Forge Divine Path</h2>
        
        <div class="form-group">
          <label for="genre">Xian Sect Genre</label>
          <select id="genre">
            <option value="Xianxia (Cultivation)">Xianxia (Cultivation)</option>
            <option value="Xuanhuan (Eastern Fantasy)">Xuanhuan (Eastern Fantasy)</option>
            <option value="Wuxia (Martial Arts)">Wuxia (Martial Arts)</option>
            <option value="System / LitRPG">System / LitRPG</option>
            <option value="Urban Cultivator / Face-slapping">Urban Cultivator / Face-slapping</option>
            <option value="Ancient Court Intrigue">Ancient Court Intrigue</option>
          </select>
        </div>
        
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label for="plot" style="margin: 0;">Primordial Plot Outline</label>
            <button id="enhanceBtn" type="button" class="secondary" style="width: auto; padding: 4px 10px; font-size: 0.75rem; margin: 0; display: flex; align-items: center; gap: 4px; border-radius: 6px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%); border: 1px solid rgba(139, 92, 246, 0.3); color: #e9d5ff;">
              <span>✨</span> Divine Insight (Enhance)
            </button>
          </div>
          <textarea id="plot" placeholder="Outline the starting crisis or goal. E.g. A disgraced disciple reborn with a forbidden celestial sealing system seeks revenge against the ancient orthodoxy..."></textarea>
        </div>
        
        <div class="form-group">
          <label for="ability">Protagonist's Golden Finger / System Ability</label>
          <textarea id="ability" placeholder="Describe the unique rule, cheat, or system. E.g. A system that awards cultivation levels for slapping arrogant young masters..."></textarea>
        </div>
        
        <div class="form-group">
          <label for="tags">Ancient Seals / Tags (comma-separated)</label>
          <input id="tags" placeholder="cultivation, system, ruthless-mc, face-slapping, fast-paced" />
        </div>
        
        <button id="createBtn" class="primary">
          <span>⚔️</span> Forge Universe & Ascend
        </button>
      </div>

      <div class="sect-divider">
        <div class="sect-line"></div>
        <div class="sect-symbol">☯</div>
        <div class="sect-line"></div>
      </div>

      <div style="max-width: 900px; margin: 0 auto;">
        <h3 class="archives-title">📜 Ascended Archives</h3>
        <div class="archives-grid" id="recentNovelsGrid">
          <div style="grid-column: 1/-1; text-align:center; padding: 30px; color:var(--text-muted);">Retrieving archive scripts...</div>
        </div>
      </div>
    </div>
  </div>

  <!-- VIEW 2: LOADING / NEW TAB GENERATOR -->
  <div id="generatingView" style="display: none;">
    <div class="portal-container">
      <div class="cultivation-crest">
        <div class="crest-ring outer"></div>
        <div class="crest-ring middle"></div>
        <div class="crest-ring inner"></div>
        <div class="crest-center">☯</div>
      </div>
      
      <h2 class="portal-title">Forging Celestial Universe</h2>
      <div class="portal-subtitle" id="portalAction">Gathering Primordial Qi...</div>
      <p class="portal-desc">Inscribing the laws of the Heavenly Dao and materializing your 1000+ word starting chapter. Do not close this window, the scroll is loading...</p>
      
      <div id="portalError" style="display:none;"></div>
    </div>
  </div>

  <!-- VIEW 3: DEDICATED IMMERSIVE READER VIEW -->
  <div id="readingView" style="display: none;">
    <div class="reader-navbar">
      <button class="nav-btn" onclick="goToHub()">⬅ Return to Sect Hub</button>
      <div class="nav-title">DEFIANT PATH READER</div>
      <div class="stats-container">
        <div class="stat-badge purple">
          <span>📖</span> <span id="statChapters">0 Chapters</span>
        </div>
        <div class="stat-badge gold">
          <span>🛡️</span> <span id="statStage">Qi Condensation</span>
        </div>
      </div>
    </div>

    <div class="reader-wrap">
      <div class="novel-meta-card">
        <h1 class="novel-epic-title" id="novelTitle">Loading...</h1>
        <div class="badges-row" id="novelBadges"></div>
      </div>

      <!-- Feed of chapters -->
      <div id="chaptersFeed"></div>

      <!-- Shimmer loading placeholder -->
      <div class="shimmer-card" id="shimmerCard" style="display: none;">
        <div class="shimmer-line" style="width: 40%; height: 26px; margin: 0 auto 30px auto;"></div>
        <div class="shimmer-line"></div>
        <div class="shimmer-line"></div>
        <div class="shimmer-line" style="width: 85%;"></div>
        <div class="shimmer-line"></div>
        <div class="shimmer-line"></div>
        <div class="shimmer-line" style="width: 90%;"></div>
        <div class="shimmer-line"></div>
      </div>

      <!-- Strategy Choices Block -->
      <div class="dao-diverge-block" id="choicesBlock" style="display: none;">
        <h3 class="dao-title">The Heavenly Dao Diverges. Choose Your Action:</h3>
        <div class="choices-grid" id="choicesList"></div>
      </div>

      <!-- Bottom Next Chapter button (non-choice paths) -->
      <div id="nextBtnBlock" style="margin-top: 40px; display: none;">
        <button id="nextBtn" class="primary" style="box-shadow: 0 0 25px rgba(245, 158, 11, 0.2);">
          <span>🔮</span> Channel Primordial Qi (Next Chapter)
        </button>
      </div>
    </div>
  </div>

  <script>
    let currentNovelId = null;
    let isGenerating = false;
    
    // Cycle loading phrases
    const loadingPhrases = [
      "Gathering Primordial Qi from the void...",
      "Inscribing Heavenly Dao Laws in the database...",
      "Awakening host's ancient soul-bloodline...",
      "Manifesting the Golden Finger System...",
      "Generating 1,000+ words of peerless combat...",
      "Awakening arrogant young masters for face-slapping...",
      "Refining the primary celestial cultivation pill..."
    ];
    let phraseInterval = null;

    function escapeHtml(s) {
      return String(s || "")
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    // Helper to format system status announcements [System: ...] or [Ding! ...]
    function formatChapterText(text) {
      const paragraphs = text.split(/\\n\\n|\\\\n\\\\n/)
        .map(p => p.trim())
        .filter(Boolean);

      return paragraphs.map(p => {
        // Detect system notices, brackets, or Ding!
        if (p.startsWith('[') && p.includes(']')) {
          return '<div class="system-box">' + escapeHtml(p) + '</div>';
        }
        return '<p>' + escapeHtml(p) + '</p>';
      }).join('');
    }

    // Return custom cultivation titles based on chapter number
    function getCultivationStage(chapters) {
      const c = chapters || 0;
      if (c <= 1) return "Qi Condensation I";
      if (c === 2) return "Qi Condensation V";
      if (c === 3) return "Foundation Establishment I";
      if (c === 4) return "Foundation Establishment IX";
      if (c === 5) return "Core Formation I";
      if (c === 6) return "Core Formation V";
      if (c === 7) return "Nascent Soul I";
      if (c === 8) return "Nascent Soul IX";
      if (c === 9) return "Soul Transformation";
      return "Ascended Divinity (Immortal)";
    }

    function goToHub() {
      window.location.href = '/';
    }

    async function fetchRecentNovels() {
      try {
        const res = await fetch('/api/novels');
        const data = await res.json();
        if (!res.ok) return;
        
        const grid = document.getElementById('recentNovelsGrid');
        if (data.novels.length === 0) {
          grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 40px; color:var(--text-muted);">No scrolls found in the Archives. Forge a new destiny card above!</div>';
          return;
        }
        
        grid.innerHTML = data.novels.map(n => {
          const title = n.title && n.title !== 'Forging Destiny...' ? n.title : ('Ascendant Path #' + n.id);
          const snippet = n.plot;
          return '<div class="archive-card" onclick="resumeNovel(' + n.id + ')">' +
            '<div>' +
              '<div class="archive-header">' +
                '<span class="archive-genre">' + escapeHtml(n.genre) + '</span>' +
              '</div>' +
              '<h4 class="archive-title">' + escapeHtml(title) + '</h4>' +
              '<p class="archive-plot">' + escapeHtml(snippet) + '</p>' +
            '</div>' +
            '<div class="archive-footer">' +
              '<span class="archive-chapters">📖 ' + n.total_chapters + ' Chapters</span>' +
              '<span class="archive-resume">Resume Path</span>' +
            '</div>' +
          '</div>';
        }).join('');
      } catch (e) {
        console.error(e);
      }
    }

    function resumeNovel(id) {
      window.open('/novel/' + id, '_blank');
    }

    // Chapter template builder
    function renderChapter(ch) {
      const formatted = formatChapterText(ch.content);
      return '<div class="chapter-block" id="chapter-' + ch.chapter_number + '">' +
        '<h3 class="chapter-heading">Chapter ' + ch.chapter_number + '</h3>' +
        '<div class="chapter-content">' + formatted + '</div>' +
      '</div>';
    }

    async function loadNovel(novelId) {
      currentNovelId = novelId;
      document.getElementById('landingView').style.display = 'none';
      document.getElementById('generatingView').style.display = 'none';
      document.getElementById('readingView').style.display = 'block';

      try {
        const res = await fetch('/api/novel/' + novelId);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load novel script');

        const title = data.novel.title && data.novel.title !== 'Forging Destiny...' ? data.novel.title : ('Ascendant Path #' + data.novel.id);
        document.getElementById('novelTitle').textContent = title;
        document.title = title + ' — Immersive Reading Mode';

        // Badges
        let badgesHtml = '<span class="badge genre">' + escapeHtml(data.novel.genre) + '</span>';
        if (data.novel.system_ability) {
          badgesHtml += '<span class="badge gold-finger">⚡ System: ' + escapeHtml(data.novel.system_ability.slice(0, 45)) + (data.novel.system_ability.length > 45 ? '...' : '') + '</span>';
        }
        if (data.novel.tags) {
          data.novel.tags.forEach(t => {
            badgesHtml += '<span class="badge">' + escapeHtml(t) + '</span>';
          });
        }
        document.getElementById('novelBadges').innerHTML = badgesHtml;

        // Stats
        const chaptersCount = data.chapters.length;
        document.getElementById('statChapters').textContent = chaptersCount + ' Chapters';
        document.getElementById('statStage').textContent = getCultivationStage(chaptersCount);

        // Chapters List
        const feedHtml = data.chapters.map(renderChapter).join('');
        document.getElementById('chaptersFeed').innerHTML = feedHtml;

        // Evaluate choices / next buttons
        const latestChapter = data.chapters[chaptersCount - 1];
        const choices = latestChapter ? latestChapter.choices : [];
        const hasChoices = choices && choices.length > 0;

        const choicesBlock = document.getElementById('choicesBlock');
        const nextBtnBlock = document.getElementById('nextBtnBlock');

        if (hasChoices) {
          choicesBlock.style.display = 'block';
          nextBtnBlock.style.display = 'none';
          
          // Render Choice Buttons
          const chosen = choices.some(c => c.selected_count > 0);
          
          document.getElementById('choicesList').innerHTML = choices.map(c => {
            let cls = 'choice-card-btn';
            let dis = '';
            if (chosen) {
              dis = 'disabled';
              if (c.selected_count > 0) {
                cls += ' selected';
              } else {
                cls += ' unselected';
              }
            } else if (isGenerating) {
              dis = 'disabled';
            }
            return '<button class="' + cls + '" ' + dis + ' onclick="choosePath(' + latestChapter.id + ', ' + c.id + ')">' + escapeHtml(c.choice_text) + '</button>';
          }).join('');
        } else {
          choicesBlock.style.display = 'none';
          if (!isGenerating) {
            nextBtnBlock.style.display = 'block';
          } else {
            nextBtnBlock.style.display = 'none';
          }
        }

        // Smooth scroll to bottom
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 150);

      } catch (e) {
        alert(e.message || 'Error loading novel script');
      }
    }

    async function choosePath(chapterId, choiceId) {
      if (isGenerating || !currentNovelId) return;
      isGenerating = true;
      toggleReaderGenerating(true);

      try {
        const res = await fetch('/api/choose', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ novelId: currentNovelId, chapterId, choiceId })
        });
        if (!res.ok) throw new Error('Choice submission failed');
        await loadNovel(currentNovelId);
      } catch (e) {
        alert(e.message);
      } finally {
        isGenerating = false;
        toggleReaderGenerating(false);
      }
    }

    function toggleReaderGenerating(loading) {
      const shimmer = document.getElementById('shimmerCard');
      const nextBtnBlock = document.getElementById('nextBtnBlock');
      const choicesBlock = document.getElementById('choicesBlock');

      if (loading) {
        shimmer.style.display = 'block';
        nextBtnBlock.style.display = 'none';
        
        // Disable choices
        document.querySelectorAll('.choice-card-btn').forEach(btn => btn.disabled = true);
        
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
      } else {
        shimmer.style.display = 'none';
      }
    }

    document.getElementById('nextBtn').onclick = async () => {
      if (isGenerating || !currentNovelId) return;
      isGenerating = true;
      toggleReaderGenerating(true);

      try {
        const res = await fetch('/api/chapter/next', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ novelId: currentNovelId })
        });
        if (!res.ok) throw new Error('Chapter generation failed');
        await loadNovel(currentNovelId);
      } catch (e) {
        alert(e.message);
      } finally {
        isGenerating = false;
        toggleReaderGenerating(false);
      }
    };

    // GENERATION BACKEND TRIGGER (Inside New Tab)
    async function startAutomaticGeneration() {
      const payloadStr = localStorage.getItem('pending_novel_creation');
      if (!payloadStr) {
        document.getElementById('portalAction').textContent = 'Error: No formation parameters found';
        document.getElementById('portalError').innerHTML = '<div class="error-container"><h3>Form parameters missing</h3><p>Could not locate the creation script. Please go back to the hub and forge again.</p><button class="nav-btn" onclick="goToHub()" style="margin-top:15px; width:auto; display:inline-block;">Return to Hub</button></div>';
        document.getElementById('portalError').style.display = 'block';
        return;
      }
      localStorage.removeItem('pending_novel_creation');
      const payload = JSON.parse(payloadStr);

      // Start phrase rotation
      let phraseIdx = 0;
      phraseInterval = setInterval(() => {
        phraseIdx = (phraseIdx + 1) % loadingPhrases.length;
        document.getElementById('portalAction').textContent = loadingPhrases[phraseIdx];
      }, 2500);

      try {
        const res = await fetch('/api/novel', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'The alignment of stars failed');

        clearInterval(phraseInterval);
        
        // Update URL and transition smoothly
        const expectedPath = '/novel/' + data.novelId;
        history.replaceState(null, '', expectedPath);
        await loadNovel(data.novelId);
      } catch (e) {
        clearInterval(phraseInterval);
        document.getElementById('portalAction').textContent = 'Celestial Tribulation Struck!';
        document.getElementById('portalError').innerHTML = '<div class="error-container"><h3>Forming Error</h3><p>' + escapeHtml(e.message) + '</p><button class="nav-btn" onclick="goToHub()" style="margin-top:15px; width:auto; display:inline-block;">Return to Hub</button></div>';
        document.getElementById('portalError').style.display = 'block';
      }
    }

    // HOME PAGE ACTION
    document.getElementById('createBtn').onclick = () => {
      const plot = document.getElementById('plot').value.trim();
      const ability = document.getElementById('ability').value.trim();
      const tags = document.getElementById('tags').value.trim();
      const genre = document.getElementById('genre').value;

      if (!plot) {
        alert('Please specify the starting plot outline.');
        return;
      }

      const payload = { plot, systemAbility: ability, tags, genre };
      localStorage.setItem('pending_novel_creation', JSON.stringify(payload));
      
      // Clear inputs
      document.getElementById('plot').value = '';
      document.getElementById('ability').value = '';
      document.getElementById('tags').value = '';

      // Immediately open new tab to /novel/generating
      window.open('/novel/generating', '_blank');
      
      // Refresh current dashboard archives
      setTimeout(fetchRecentNovels, 1000);
    };

    // HOME PAGE: ENHANCE STORY PREMISE
    document.getElementById('enhanceBtn').onclick = async () => {
      const plotEl = document.getElementById('plot');
      const plotText = plotEl.value.trim();
      const genre = document.getElementById('genre').value;
      
      if (!plotText) {
        alert('Please outline a brief story premise first to call upon Divine Insight.');
        return;
      }
      
      const btn = document.getElementById('enhanceBtn');
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span>⚡</span> Aligning Stars...';
      
      try {
        const res = await fetch('/api/enhance-prompt', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ plot: plotText, genre: genre })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Sect vision blurred');
        
        if (data.enhanced) {
          plotEl.value = data.enhanced;
          
          plotEl.style.transition = 'none';
          plotEl.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.4)';
          plotEl.style.borderColor = '#ffd700';
          setTimeout(() => {
            plotEl.style.transition = 'var(--transition)';
            plotEl.style.boxShadow = '';
            plotEl.style.borderColor = '';
          }, 1000);
        }
      } catch (e) {
        alert(e.message);
      } finally {
        btn.disabled = false;
        btn.innerHTML = orig;
      }
    };

    function handleRouting() {
      const path = window.location.pathname;
      const parts = path.split('/').filter(Boolean);
      
      if (parts[0] === 'novel' && parts[1]) {
        if (parts[1] === 'generating') {
          // Dedicated Generating Loading state
          document.getElementById('landingView').style.display = 'none';
          document.getElementById('readingView').style.display = 'none';
          document.getElementById('generatingView').style.display = 'block';
          document.title = 'Forging Celestial Universe — novelworld';
          startAutomaticGeneration();
        } else {
          // Immersive Reader State
          const novelId = parseInt(parts[1], 10);
          if (!isNaN(novelId)) {
            loadNovel(novelId);
          } else {
            window.location.href = '/';
          }
        }
      } else {
        // Centralized Sect Hub Dashboard
        document.getElementById('readingView').style.display = 'none';
        document.getElementById('generatingView').style.display = 'none';
        document.getElementById('landingView').style.display = 'block';
        document.title = 'Celestial NovelWorld AI — Sect Hub';
        fetchRecentNovels();
      }
    }

    window.onload = handleRouting;
    window.onpopstate = handleRouting;
  </script>
</body>
</html>`;
