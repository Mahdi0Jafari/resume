'use client'

import { useState } from 'react'

type Category = 'all' | 'ai' | 'social' | 'tools'

export default function EcosystemShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const isVisible = (cat: Category) => {
    return activeCategory === 'all' || activeCategory === cat
  }

  const getCount = (cat: Category) => {
    switch (cat) {
      case 'ai': return 2
      case 'social': return 2
      case 'tools': return 4
      default: return 8
    }
  }

  return (
    <section id="projects" aria-label="Live Production Ecosystem" className="col-span-full flex flex-col gap-4 my-2">
      <h2 className="sr-only">Live Production Ecosystem (8 Authentic Products)</h2>
      {/* Control Bar: Category Filters */}
      <div className="control-bar">
        <div className="filter-tabs">
          <button
            type="button"
            className={`filter-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Products (8)
          </button>
          <button
            type="button"
            className={`filter-tab ${activeCategory === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveCategory('ai')}
          >
            AI & Quant (2)
          </button>
          <button
            type="button"
            className={`filter-tab ${activeCategory === 'social' ? 'active' : ''}`}
            onClick={() => setActiveCategory('social')}
          >
            Social & Comms (2)
          </button>
          <button
            type="button"
            className={`filter-tab ${activeCategory === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveCategory('tools')}
          >
            Tools & OS (4)
          </button>
        </div>

        <div className="total-counter">
          <span>{getCount(activeCategory)} Production Microcosms</span>
        </div>
      </div>

      {/* 2-Column Responsive Authentic Showcase Grid */}
      <div className="projects-grid" id="projects-container">
        {/* LYRAZ CARD */}
        {isVisible('tools') && (
<a href="https://lyraz.ir/landing" target="_blank" rel="noopener noreferrer" className="card-lyraz-authentic" data-category="tools">
        
        {/*  Exact Top Header from Lyraz Landing  */}
        <div className="lyraz-header">
          <div className="lyraz-brand-mark">
            <img src="/logos/lyraz.svg" alt="Lyraz Favicon Logo" className="lyraz-brand-logo" width="24" height="24" loading="lazy" decoding="async" />
            <span className="lyraz-wordmark">lyraz</span>
          </div>

          {/*  Exact Geometric Double-Loop Emblem from Lyraz Landing  */}
          <div className="lyraz-center-emblem">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111215" strokeWidth="1.4">
              <rect x="3.5" y="9.5" width="17" height="5" rx="2.5" transform="rotate(45 12 12)" />
              <rect x="3.5" y="9.5" width="17" height="5" rx="2.5" transform="rotate(-45 12 12)" />
            </svg>
          </div>

          {/*  Telegram Bot Badge  */}
          <div className="lyraz-bot-badge">
            <i className="ri-telegram-fill" style={{ color: "#2AABEE" }}></i>
            <span>@LyrazBot</span>
          </div>
        </div>

        {/*  Exact Gigantic Headline from Lyraz Landing  */}
        <h3 className="lyraz-hero-headline">
          TURN YOUR WORDS TO <br /><span>SYMPHONY</span>
        </h3>

        {/*  Exact Satellite Chips from Lyraz Landing  */}
        <div className="lyraz-satellite-row">
          <div className="lyraz-satellite-chip">
            <i className="ri-disc-line" style={{ color: "#84cc16" }}></i>
            <span>Lossless 320K</span>
          </div>
          <div className="lyraz-satellite-chip">
            <i className="ri-mic-line" style={{ color: "#9333ea" }}></i>
            <span>Live Lyrics</span>
          </div>
          <div className="lyraz-satellite-chip">
            <div className="lyraz-eq-box">
              <span className="lyraz-bar-1"></span>
              <span className="lyraz-bar-2"></span>
              <span className="lyraz-bar-3"></span>
              <span className="lyraz-bar-4"></span>
            </div>
            <span>Live Audio</span>
          </div>
        </div>

        {/*  Exact Narrative from Lyraz Landing  */}
        <p className="lyraz-desc-text">
          Turn prompts, Spotify tracks, and room requests into synchronized 320kbps lossless audio with real-time live lyrics on any screen.
        </p>

        {/*  Exact CTA Button & Tech Meta from Lyraz Landing  */}
        <div className="lyraz-footer">
          <div className="lyraz-tech-tags">
            <span>Web Audio API</span> • <span>WebSockets</span> • <span>Spotify Sync</span>
          </div>
          <span className="lyraz-btn-lime">
            <span>OPEN WEB PLAYER</span>
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </div>

      </a>
        )}

        {/* NAJVA CARD */}
        {isVisible('social') && (
<a href="https://najvagram.ir/" target="_blank" rel="noopener noreferrer" className="card-najva-authentic" data-category="social">
        
        {/*  Najvagram Exact Header  */}
        <div className="najva-header">
          <div className="najva-brand-group">
            <div className="najva-icon-box-glass">
              <img src="/logos/najva.svg" alt="Najva Logo" className="najva-brand-logo" width="24" height="24" loading="lazy" decoding="async" />
            </div>
            <div className="najva-brand-text">
              <span className="najva-brand-title">Najvagram</span>
              <span className="najva-brand-sub">najvagram.ir</span>
            </div>
          </div>
          <div className="najva-status-pill">
            <i className="ri-subway-fill"></i>
            <span>قطار غریبه‌ها</span>
          </div>
        </div>

        {/*  Najvagram Dual Headline & Narrative Block  */}
        <div className="najva-hero-block">
          <div className="najva-hero-title-group">
            <div className="najva-hero-title-fa">
              <span className="najva-txt-white">ما اینجا همه</span> <span className="najva-txt-pink">غریبه‌ایم.</span>
            </div>
            <div className="najva-hero-title-en">HERE, WE ARE ALL STRANGERS.</div>
          </div>
          <p className="najva-quote-desc">
            درست مثل دو مسافر در یک کوپه قطار. بدون نام، بدون فردا. <span className="najva-highlight">رازی بگو، سبک شو و پیاده شو.</span> اینجا قضاوت جا می‌ماند.
          </p>
        </div>

        {/*  Najvagram Exact .btn-entry UI Component Slice  */}
        <div className="najva-btn-entry-slice">
          <div className="najva-shimmer"></div>
          <div className="najva-entry-left">
            <div className="najva-key-circle">
              <i className="ri-key-2-fill"></i>
            </div>
            <div className="najva-entry-text-group">
              <span className="najva-entry-title">ورود به کوپه / Enter Compartment</span>
              <span className="najva-entry-sub">با کلید عبور (Access Key) • HKDF-AES256</span>
            </div>
          </div>
          <i className="ri-arrow-right-line najva-entry-arrow"></i>
        </div>

        {/*  Najvagram Exact Central Station Radar Slice (from landing.html)  */}
        <div className="najva-station-slice">
          <div className="najva-station-left">
            <div className="najva-radar-avatar">
              <i className="ri-global-line"></i>
              <div className="najva-radar-dot-wrap">
                <span className="najva-ping"></span>
                <span className="najva-dot"></span>
              </div>
            </div>
            <div className="najva-station-info">
              <span className="najva-station-title">ایستگاه مرکزی</span>
              <span className="najva-station-meta">
                <i className="ri-eye-off-line"></i>
                <span>ناشناس مطلق • Live Transit</span>
              </span>
            </div>
          </div>
          <span className="najva-station-sub-en">ZERO-LOG // E2EE</span>
        </div>

        {/*  Najvagram Footer & Tech Meta  */}
        <div className="najva-footer">
          <div className="najva-tech-tags">
            <span className="najva-tag">Flask</span>
            <span className="najva-tag">AES-256</span>
            <span className="najva-tag">WebSockets</span>
            <span className="najva-tag">Shadow Mode</span>
          </div>
          <span className="najva-launch-action">
            <span>BOARD TRANSIT</span>
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </div>

      </a>
        )}

        {/* KHONSHU CARD */}
        {isVisible('ai') && (
<a href="https://khonshu.ir/" target="_blank" rel="noopener noreferrer" className="card-khonshu-authentic" data-category="ai">
        
        {/*  Top macOS Window Header with Traffic Lights & Logo  */}
        <div className="khonshu-window-header">
          <div className="khonshu-brand-left">
            <div className="khonshu-traffic-lights">
              <span className="t-dot red"></span>
              <span className="t-dot yellow"></span>
              <span className="t-dot green"></span>
            </div>
            <div className="khonshu-logo-box">
              <img src="/logos/khonshu.svg" alt="Khonshu Logo" className="khonshu-logo-img" width="20" height="20" loading="lazy" decoding="async" />
            </div>
            <div className="khonshu-brand-text">
              <span className="khonshu-brand-title">Khonshu</span>
              <span className="khonshu-brand-sub">khonshu.ir // QUANT TERMINAL</span>
            </div>
          </div>
          <div className="khonshu-latency-badge">
            <i className="ri-pulse-line"></i>
            <span>14ms • CORTEX_WS</span>
          </div>
        </div>

        {/*  Total Portfolio Balance Header Slice (from Header.tsx)  */}
        <div className="khonshu-balance-bar">
          <div className="khonshu-balance-left">
            <span className="khonshu-balance-label">Total Portfolio Balance</span>
            <div className="khonshu-balance-val-row">
              <span className="khonshu-balance-val">$128,450.00</span>
              <span className="khonshu-pnl-chip">
                <i className="ri-arrow-up-line"></i>
                <span>+24.80%</span>
              </span>
            </div>
          </div>
          <div className="khonshu-tab-pill-group">
            <span className="khonshu-tab-pill active">Overview</span>
            <span className="khonshu-tab-pill inactive">Positions</span>
          </div>
        </div>

        {/*  Live Active Position & Orderbook Execution Slice (from ActiveOperations.tsx)  */}
        <div className="khonshu-position-slice">
          <div className="khonshu-pos-top-row">
            <div className="khonshu-pair-side">
              <span className="khonshu-pair-name">BTC/USDT</span>
              <span className="khonshu-side-badge">LONG 10x</span>
            </div>
            <div className="khonshu-systemic-chips">
              <span className="khonshu-badge-in-trade">
                <i className="ri-crosshair-2-line"></i>
                <span>IN TRADE</span>
              </span>
              <span className="khonshu-badge-vol-shock">
                <i className="ri-sound-module-line"></i>
                <span>VOL SHOCK</span>
              </span>
            </div>
          </div>

          <div className="khonshu-metrics-grid">
            <div className="khonshu-metric-cell">
              <span className="khonshu-metric-lbl">Entry Price</span>
              <span className="khonshu-metric-val">$64,280.00</span>
            </div>
            <div className="khonshu-metric-cell">
              <span className="khonshu-metric-lbl">Mark Price</span>
              <span className="khonshu-metric-val">$67,420.50</span>
            </div>
            <div className="khonshu-metric-cell">
              <span className="khonshu-metric-lbl">Floating PnL</span>
              <span className="khonshu-metric-val green">+$3,140.50</span>
            </div>
          </div>

          <div className="khonshu-cortex-signal-line">
            <span><span className="signal-tag">[CORTEX AI]</span> Bullish Divergence</span>
            <span>TOXIC FLOW: 0.02%</span>
          </div>
        </div>

        {/*  Khonshu Footer & Tech Meta  */}
        <div className="khonshu-footer">
          <div className="khonshu-tech-tags">
            <span className="khonshu-tag">FastAPI</span>
            <span className="khonshu-tag">WebSocket</span>
            <span className="khonshu-tag">Tailwind v4</span>
            <span className="khonshu-tag">OKLCH</span>
          </div>
          <span className="khonshu-btn-indigo">
            <span>OPEN TERMINAL</span>
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </div>

      </a>
        )}

        {/* DONESPACE CARD */}
        {isVisible('tools') && (
<a href="https://donespace.ir/" target="_blank" rel="noopener noreferrer" className="card-donespace-authentic" data-category="tools">
        
        {/*  DoneSpace Top Header  */}
        <div className="donespace-header">
          <div className="donespace-brand-left">
            <div className="donespace-logo-box">
              <img src="/logos/donespace.svg" alt="DoneSpace Logo" className="donespace-logo-img" width="24" height="24" loading="lazy" decoding="async" />
            </div>
            <div className="donespace-brand-text">
              <span className="donespace-brand-title">DoneSpace</span>
              <span className="donespace-brand-sub">donespace.ir</span>
            </div>
          </div>
          <div className="donespace-status-badge">
            <i className="ri-home-smile-line"></i>
            <span>Household OS</span>
          </div>
        </div>

        {/*  DoneSpace Hero Headline & Playfair Serif (from landing.html)  */}
        <div className="donespace-hero-block">
          <h3 className="donespace-hero-headline">
            Smart Chore Tracker & <br />
            <span className="donespace-serif-italic">Shared Household Manager</span>
          </h3>
          <p className="donespace-hero-desc">
            Shared living platform designed to eliminate chore friction, plan weekly meals, and sync seamlessly with Google Calendar.
          </p>
        </div>

        {/*  DoneSpace Bento Slice (Queue + XP + Meal from landing.html)  */}
        <div className="donespace-bento-slice">
          {/*  Active Queue Col  */}
          <div className="donespace-queue-col">
            <span className="donespace-queue-title">
              <i className="ri-checkbox-circle-line"></i>
              <span>Active Queue</span>
            </span>
            <div className="donespace-task-item">
              <span className="donespace-check-box done"><i className="ri-check-line"></i></span>
              <span className="donespace-task-text done">Vacuum living room</span>
              <span className="donespace-avatar-chip">J</span>
            </div>
            <div className="donespace-task-item">
              <span className="donespace-check-box done"><i className="ri-check-line"></i></span>
              <span className="donespace-task-text done">Load dishwasher</span>
              <span className="donespace-avatar-chip yellow">A</span>
            </div>
            <div className="donespace-task-item">
              <span className="donespace-check-box pending"></span>
              <span className="donespace-task-text">Take out recycling</span>
              <span className="donespace-avatar-chip">R</span>
            </div>
          </div>

          {/*  Side Widgets: XP Progress + Dinner  */}
          <div className="donespace-side-col">
            <div className="donespace-xp-card">
              <div className="donespace-xp-header">
                <span>Weekly Goal</span>
                <span style={{ color: "#8c52ff" }}>75%</span>
              </div>
              <span className="donespace-xp-val">3,240 XP</span>
              <div className="donespace-prog-bar">
                <div className="donespace-prog-fill"></div>
              </div>
            </div>

            <div className="donespace-meal-card">
              <span className="donespace-meal-emoji">🍜</span>
              <div className="donespace-meal-info">
                <span className="donespace-meal-name">Miso Ramen</span>
                <span className="donespace-meal-sub">Tonight, 7:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/*  DoneSpace Footer & Tech Meta  */}
        <div className="donespace-footer">
          <div className="donespace-tech-tags">
            <span className="donespace-tag">Flask</span>
            <span className="donespace-tag">GCal API</span>
            <span className="donespace-tag">PWA</span>
            <span className="donespace-tag">PostgreSQL</span>
          </div>
          <span className="donespace-btn-yellow">
            <span>OPEN DASHBOARD</span>
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </div>

      </a>
        )}

        {/* M0J CARD */}
        {isVisible('tools') && (
<a href="https://m0j.ir/" target="_blank" rel="noopener noreferrer" className="card-m0j-authentic" data-category="tools">
        
        {/*  Top Header with Geometric Vector Logo and Status Badge  */}
        <div className="m0j-header">
          <div className="m0j-brand-left">
            <div className="m0j-logo-box">
              <svg viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="none" stroke="#b084f5" strokeWidth="2.5"/>
                <rect x="11" y="11" width="10" height="10" fill="#b084f5" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="30" stroke="#b084f5" strokeWidth="0.5" strokeDasharray="2,2"/>
                <line x1="2" y1="16" x2="30" y2="16" stroke="#b084f5" strokeWidth="0.5" strokeDasharray="2,2"/>
              </svg>
            </div>
            <div className="m0j-brand-text">
              <span className="m0j-brand-title">Life Architecture</span>
              <span className="m0j-brand-sub">m0j.ir // IDENTITY MATRIX</span>
            </div>
          </div>
          <div className="m0j-status-badge">
            <i className="ri-compass-3-line"></i>
            <span>8-DOMAIN SCAFFOLD</span>
          </div>
        </div>

        {/*  Hero Headline & Subtitle  */}
        <div className="m0j-hero-block">
          <h3 className="m0j-hero-headline">
            ARCHITECT LEVEL 14 & <br />
            <span className="m0j-neon-title">IDENTITY CAPITAL CODEX</span>
          </h3>
          <p className="m0j-hero-desc">
            Systemic self-actualization engine scaffolding 8 foundational life domains into actionable epic quests and identity capital.
          </p>
        </div>

        {/*  8-Domain Matrix UI Slice (from life_index.html)  */}
        <div className="m0j-matrix-slice">
          <div className="m0j-matrix-top-row">
            <span className="m0j-level-badge">
              <i className="ri-shield-star-line"></i>
              <span>ARCHITECT RANK // TIER 4</span>
            </span>
            <span className="m0j-xp-counter">3,420 XP • 84.6% BASELINE</span>
          </div>

          {/*  8 Domain Glowing Spectrum  */}
          <div className="m0j-domains-spectrum">
            <div className="m0j-domain-item" title="Mind: Deep Growth">
              <span className="m0j-domain-dot" style={{ color: "#6D7CFF", background: "#6D7CFF" }}></span>
              <span className="m0j-domain-lbl">MIND</span>
            </div>
            <div className="m0j-domain-item" title="Body: Vitality">
              <span className="m0j-domain-dot" style={{ color: "#FF7A7A", background: "#FF7A7A" }}></span>
              <span className="m0j-domain-lbl">BODY</span>
            </div>
            <div className="m0j-domain-item" title="Skills: Competence">
              <span className="m0j-domain-dot" style={{ color: "#8AD66D", background: "#8AD66D" }}></span>
              <span className="m0j-domain-lbl">SKILL</span>
            </div>
            <div className="m0j-domain-item" title="Relations: Connection">
              <span className="m0j-domain-dot" style={{ color: "#FFB454", background: "#FFB454" }}></span>
              <span className="m0j-domain-lbl">REL</span>
            </div>
            <div className="m0j-domain-item" title="Experience: Perspective">
              <span className="m0j-domain-dot" style={{ color: "#67D9E8", background: "#67D9E8" }}></span>
              <span className="m0j-domain-lbl">EXP</span>
            </div>
            <div className="m0j-domain-item" title="Adventure: Novelty">
              <span className="m0j-domain-dot" style={{ color: "#6AA8FF", background: "#6AA8FF" }}></span>
              <span className="m0j-domain-lbl">ADV</span>
            </div>
            <div className="m0j-domain-item" title="Impact: Legacy">
              <span className="m0j-domain-dot" style={{ color: "#B084F5", background: "#B084F5" }}></span>
              <span className="m0j-domain-lbl">IMP</span>
            </div>
            <div className="m0j-domain-item" title="Finance: Sovereignty">
              <span className="m0j-domain-dot" style={{ color: "#F6C453", background: "#F6C453" }}></span>
              <span className="m0j-domain-lbl">FIN</span>
            </div>
          </div>

          <div className="m0j-quest-bar">
            <span><span className="m0j-quest-tag">⚔️ EPIC QUEST:</span> Deep Work Routine & Architecture</span>
            <span style={{ color: "#b084f5" }}>ACTIVE</span>
          </div>
        </div>

        {/*  m0j Footer & Tech Meta  */}
        <div className="m0j-footer">
          <div className="m0j-tech-tags">
            <span className="m0j-tag">Flask</span>
            <span className="m0j-tag">SSE Live</span>
            <span className="m0j-tag">Chart.js</span>
            <span className="m0j-tag">Spring UI</span>
          </div>
          <span className="m0j-btn-lavender">
            <span>ENTER MATRIX</span>
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </div>

      </a>
        )}

        {/* ANKISYNTH CARD */}
        {isVisible('ai') && (
<a href="https://mahdi0jafari.github.io/AnkiSynth/" target="_blank" rel="noopener noreferrer" className="card-ankisynth-authentic" data-category="ai">
        
        {/*  Top Header with SVG Logo and Gemini Badge  */}
        <div className="ankisynth-header">
          <div className="ankisynth-brand-left">
            <div className="ankisynth-logo-box">
              <img src="/logos/ankisynth.svg" alt="AnkiSynth Logo" className="ankisynth-logo-img" width="24" height="24" loading="lazy" decoding="async" />
            </div>
            <div className="ankisynth-brand-text">
              <span className="ankisynth-brand-title">AnkiSynth AI</span>
              <span className="ankisynth-brand-sub">github.io/AnkiSynth</span>
            </div>
          </div>
          <div className="ankisynth-status-badge">
            <i className="ri-sparkling-2-line"></i>
            <span>Gemini 3.1 Flash // FORGE</span>
          </div>
        </div>

        {/*  Hero Headline & Subtitle  */}
        <div className="ankisynth-hero-block">
          <h3 className="ankisynth-hero-headline">
            AI KNOWLEDGE FORGE & <br />
            <span className="ankisynth-neon-title">SPACED REPETITION ENGINE</span>
          </h3>
          <p className="ankisynth-hero-desc">
            Transform research papers and lecture notes into atomic, high-retention Anki decks with multi-turn AI synthesis and cloze generation.
          </p>
        </div>

        {/*  Ingestion & Forged Card UI Slice (from SourcePanel.tsx & Workbench.tsx)  */}
        <div className="ankisynth-forge-slice">
          <div className="ankisynth-forge-header">
            <span className="ankisynth-mode-tag">FORGE MODE: ACTIVE</span>
            <span className="ankisynth-ai-engine">
              <i className="ri-brain-line"></i>
              <span>Ingesting Source Text</span>
            </span>
          </div>

          <div className="ankisynth-card-preview">
            <span className="ankisynth-card-front">Q: What is the primary role of the VTA-to-Accumbens mesolimbic pathway?</span>
            <span className="ankisynth-card-back">A: Reinforces behavioral motivation and long-term synaptic consolidation.</span>
          </div>

          <div className="ankisynth-forge-footer-meta">
            <span><span>🧠 Neuroscience</span> • <span style={{ color: "#83fc8e" }}>+42 Cards Ready</span></span>
            <span className="ankisynth-tag-chip">📦 APKG Export</span>
          </div>
        </div>

        {/*  AnkiSynth Footer & Tech Meta  */}
        <div className="ankisynth-footer">
          <div className="ankisynth-tech-tags">
            <span className="ankisynth-tag">Next.js 15</span>
            <span className="ankisynth-tag">Gemini API</span>
            <span className="ankisynth-tag">Dexie.js</span>
            <span className="ankisynth-tag">APKG Gen</span>
          </div>
          <span className="ankisynth-btn-rose">
            <span>⌘ + ↵ FORGE DECK</span>
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </div>

      </a>
        )}

        {/* FANUS CARD */}
        {isVisible('social') && (
<a href="https://fanus-space.ir/" target="_blank" rel="noopener noreferrer" className="card-fanus-authentic" data-category="social">
        
        {/*  Top Header with Original Fanus SVG Vector Logo and Archive Badge  */}
        <div className="fanus-header">
          <div className="fanus-brand-left">
            <div className="fanus-logo-box">
              <svg viewBox="0 0 358 598" fill="none">
                <path d="M35.3281 596.6C33.3281 594.1 34.5281 590.6 38.0281 589.1C43.0281 586.9 43.8281 583.5 43.5281 567.6C43.4281 559.9 43.7281 551.2 44.3281 548.2C45.8281 539.9 50.0281 531.5 54.9281 527C57.3281 524.8 59.3281 522.5 59.3281 522.1C59.3281 521.6 56.7281 520.6 53.6281 520C23.6281 514.2 3.82806 494.6 0.428056 467.3C-0.571944 459.5 0.228056 445.3 2.32806 432.5C4.02806 422 5.12806 414.1 9.32806 382C9.82806 377.9 10.9281 369.6 11.8281 363.5C12.6281 357.5 14.0281 347.1 14.8281 340.5C15.7281 333.9 17.4281 320.6 18.8281 311C21.1281 294.6 23.6281 275.9 28.4281 240.5C34.0281 198.3 35.4281 192.2 41.4281 182.9C48.1281 172.4 59.0281 165.4 74.7281 161.6C79.6281 160.3 84.0281 158.7 84.4281 157.9C84.8281 157.1 86.2281 154.4 87.4281 151.8C92.0281 142 104.728 132.6 119.428 128C125.628 126.2 141.228 123.3 148.328 122.8C151.628 122.5 151.828 122.2 152.128 118.8C152.428 115.2 152.328 115.1 145.428 111.5C133.228 105.1 124.028 94 119.728 80.5C112.528 57.7 118.228 33.6 134.628 17.6C146.828 5.69996 159.828 0.599962 177.828 0.799962C206.528 0.999962 226.728 14.5 235.928 39.7C238.528 46.7 238.828 48.7 238.828 60C238.828 70.3 238.428 73.7 236.628 79.2C232.028 92.7 221.628 106.2 210.928 112.5C206.928 114.9 206.328 115.6 206.328 118.6C206.328 122.5 205.528 122.2 222.228 124.5C228.428 125.4 237.028 127.2 241.228 128.5C256.228 133.3 268.928 143.3 271.328 152.1C273.128 158.9 273.528 159.3 279.928 160.6C294.728 163.6 306.928 170.7 314.028 180.4C322.128 191.4 324.228 198.6 328.328 230.9C330.028 243.9 332.028 259 332.828 264.5C333.628 270 334.928 279.9 335.728 286.5C336.628 293.1 339.328 313.4 341.828 331.5C346.328 364 347.628 374.3 350.828 399C351.728 405.9 352.828 414.4 353.328 418C357.228 445.2 357.528 449.7 357.128 461.3C356.728 470.9 356.028 474.9 354.128 480.2C348.828 494.3 339.128 504.9 324.928 511.9C317.128 515.8 303.528 520 298.628 520C295.328 520 295.828 522.1 299.928 525.3C305.028 529.4 308.928 535.3 311.028 541.8C312.428 546.5 312.728 550.5 312.528 564.8C312.228 584 312.928 587 318.528 588.9C321.928 590.1 322.928 592.3 321.528 595.6L320.328 598H178.428C55.9281 598 36.4281 597.8 35.3281 596.6Z" fill="#E1D3B0"/>
                <path d="M147.828 425.9C147.428 425.3 149.128 423.2 151.428 421.2C170.428 405.2 181.528 390.4 188.428 372C190.928 365.1 191.628 361.6 192.028 353.5C192.428 344.7 192.228 343.1 190.428 340.2C187.828 336.2 186.028 335.5 174.528 334.1C154.728 331.7 142.728 323.8 135.728 308.6C132.628 301.9 131.128 288.9 132.528 280.5C135.428 262.1 149.428 245.1 166.228 239.5C193.028 230.7 219.128 243.2 232.028 270.8C236.728 280.9 238.528 290.2 238.528 304.5C238.428 355.1 205.728 403.2 157.328 423.5C148.028 427.5 148.628 427.3 147.828 425.9Z" fill="#F5B54D"/>
              </svg>
            </div>
            <div className="fanus-brand-text">
              <span className="fanus-brand-title">فانوس • Fanus</span>
              <span className="fanus-brand-sub">fanus-space.ir // جایی برای نوشته‌هامون</span>
            </div>
          </div>
          <div className="fanus-status-badge">
            <i className="ri-candle-fill"></i>
            <span>گوشه دنج خاطرات</span>
          </div>
        </div>

        {/*  Hero Headline & Subtitle matching live site  */}
        <div className="fanus-hero-block">
          <h3 className="fanus-hero-headline">
            روزها و شب‌هایی که گذشت... • <br />
            <span className="fanus-amber-title">EMOTIONAL DIGITAL SANCTUARY</span>
          </h3>
          <p className="fanus-rule-creed">
            «بخوان، مرور کن... آرشیو دل‌نوشته‌های فانوس در دل شب.»
          </p>
        </div>

        {/*  Authentic Dual Slices from Live Site  */}
        <div className="fanus-double-slice">
          
          {/*  1. Live Archive Memorial Box Slice (.archive-container)  */}
          <div className="fanus-archive-slice">
            <span className="fanus-archive-badge">
              <i className="ri-history-line"></i>
              <span>پناهگاه کلمات در دل شب</span>
            </span>
            <p className="fanus-archive-text">
              فانوس پناهگاهی امن بود برای نوشتن حس‌هایی که جای دیگری برای شنیده‌شدن نداشتند؛ بغض‌هایی در سکوت و کلماتی که بی‌نام و بدون قضاوت ماندند.
            </p>
          </div>

          {/*  2. Authentic Wall of Flames Post Slice (Direct from Database)  */}
          <div className="fanus-post-slice">
            <p className="fanus-post-text">«من با ماه امشب یاد تو افتادم...»</p>
            <div className="fanus-post-meta">
              <span>۰۰:۲۱ بامداد • دیوار شعله‌ها</span>
              <span className="fanus-candle-reaction">
                <i className="ri-fire-fill"></i>
                <span>شمع روشن شد</span>
              </span>
            </div>
          </div>

        </div>

        {/*  Fanus Footer & Tech Meta  */}
        <div className="fanus-footer">
          <div className="fanus-tags-row">
            <span className="fanus-chip">Flask</span>
            <span className="fanus-chip">SQLite WAL</span>
            <span className="fanus-chip">SSE Stream</span>
          </div>
          <span className="fanus-btn-amber">
            <span>ورود به فانوس</span>
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </div>

      </a>
        )}

        {/* COWORK CARD */}
        {isVisible('tools') && (
<a href="http://coworkmap.ir/" target="_blank" rel="noopener noreferrer" className="card-cowork-authentic" data-category="tools">
        
        {/*  Top Header with BlueWhite Official Logo and Neshan Status Badge  */}
        <div className="cowork-header">
          <div className="cowork-brand-left">
            <div className="cowork-logo-box">
              <img src="/logos/bluewhite_official.png" alt="آبی سفید BlueWhite Logo" width="22" height="22" loading="lazy" decoding="async" />
            </div>
            <div className="cowork-brand-text">
              <span className="cowork-brand-title">CoWorkMap × آبی‌سفید</span>
              <span className="cowork-brand-sub">coworkmap.ir // blue-white.co</span>
            </div>
          </div>
          <div className="cowork-status-badge">
            <i className="ri-map-pin-2-fill"></i>
            <span>۳۴۰+ فضا • نشان API</span>
          </div>
        </div>

        {/*  Hero Headline & Subtitle  */}
        <div className="cowork-hero-block">
          <h3 className="cowork-hero-headline">
            نقشه تعاملی و رزرواسیون فضاهای کار اشتراکی <br />
            <span className="cowork-blue-title">IRAN COWORKING HUBS & BLUE-WHITE</span>
          </h3>
          <p className="cowork-hero-desc">
            کاوشگر جغرافیایی و دایرکتوری زنده بیش از ۳۴۰ فضای کار در ایران، با امکان مسیریابی نشان، مقایسه امکانات و رزرو مستقیم شعب آبی‌سفید.
          </p>
        </div>

        {/*  Genuine Hub Space Preview Slice (from CoworkDetailsContent.vue & coworks.json)  */}
        <div className="cowork-hub-slice">
          <div className="cowork-space-header">
            <span className="cowork-space-name">
              <img src="/logos/bluewhite_official.png" alt="BlueWhite" style={{ width: "18px", height: "18px", borderRadius: "4px", verticalAlign: "middle", objectFit: "contain", background: "#fff", padding: "1px" }} />
              <span>آبی سفید فناپ • اصفهان</span>
            </span>
            <span className="cowork-rating-tag">
              <i className="ri-star-fill"></i>
              <span>۴.۹ (۱۴۲ نظر)</span>
            </span>
          </div>

          {/*  Address snippet  */}
          <div style={{ fontSize: "0.72rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
            <i className="ri-map-pin-line" style={{ color: "#0089B0" }}></i>
            <span>اصفهان، خ آمادگاه، روبروی هتل عباسی</span>
          </div>

          {/*  Amenities Pills from Database  */}
          <div className="cowork-amenities-row">
            <span className="cowork-amenity-pill">⚡ فیبر نوری</span>
            <span className="cowork-amenity-pill">☕ کافه بار</span>
            <span className="cowork-amenity-pill">🤝 اتاق جلسات</span>
            <span className="cowork-amenity-pill">📅 رزرو آنلاین</span>
          </div>

          {/*  Bottom Routing Meta  */}
          <div className="cowork-space-footer-row">
            <span className="cowork-status-live">
              <i className="ri-checkbox-circle-fill"></i>
              <span>پذیرش و رزرواسیون فعال</span>
            </span>
            <span className="cowork-routing-hint">
              <span>مسیریابی با نشان</span>
              <i className="ri-navigation-fill"></i>
            </span>
          </div>
        </div>

        {/*  CoWorkMap Footer & Tech Meta  */}
        <div className="cowork-footer">
          <div className="cowork-tags-row">
            <span className="cowork-chip">Vue 3</span>
            <span className="cowork-chip">Vuetify</span>
            <span className="cowork-chip">Neshan API</span>
            <span className="cowork-chip">GeoJSON</span>
          </div>
          <span className="cowork-btn-blue">
            <span>رزرو و نقشه // EXPLORE ↗</span>
          </span>
        </div>

      </a>
        )}
      </div>
    </section>
  )
}
