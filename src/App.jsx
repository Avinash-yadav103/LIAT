import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { deckData } from '../shared/deckData.js';

import heroImg from './assets/dubai_skyline_hero.png';
import orbitFashionImg from './assets/orbit_fashion.png';
import orbitAquariumImg from './assets/orbit_aquarium.png';
import orbitDiningImg from './assets/orbit_dining.png';
import orbitEventsImg from './assets/orbit_events.png';

const orbitImages = {
  destination: heroImg,
  fashion: orbitFashionImg,
  entertainment: orbitAquariumImg,
  events: orbitEventsImg,
};

const orbitItems = [
  { id: 'fashion', label: 'Fashion Avenue', img: orbitFashionImg, angle: -30, radius: 140, size: 72 },
  { id: 'entertainment', label: 'Entertainment', img: orbitAquariumImg, angle: 30, radius: 155, size: 88 },
  { id: 'events', label: 'Events', img: orbitEventsImg, angle: 90, radius: 130, size: 76 },
  { id: 'dining', label: 'Dining', img: orbitDiningImg, angle: 150, radius: 148, size: 64 },
];

const moduleKeys = ['events', 'sponsorship', 'leasing', 'venue'];

function App() {
  const [deck] = useState(deckData);
  const [activeSection, setActiveSection] = useState('overview');
  const [activePage, setActivePage] = useState(null); // null = hero, string = page id
  const [pageTransition, setPageTransition] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeModule, setActiveModule] = useState('events');
  const [orbitHover, setOrbitHover] = useState(null);
  const [leadState, setLeadState] = useState({ name: '', company: '', email: '', intent: 'Leasing' });
  const [statusMessage, setStatusMessage] = useState('Ready for a leasing, sponsorship, or booking conversation.');
  const sectionRefs = useRef(new Map());

  const resolvedDeck = useMemo(() => ({
    ...deckData,
    ...deck,
    property: { ...deckData.property, ...(deck.property || {}) },
    modules: { ...deckData.modules, ...(deck.modules || {}) },
    journey: deck.journey?.length ? deck.journey : deckData.journey,
    quickStats: deck.quickStats?.length ? deck.quickStats : deckData.quickStats,
    actionCards: deck.actionCards?.length ? deck.actionCards : deckData.actionCards,
    dashboardPages: deck.dashboardPages?.length ? deck.dashboardPages : deckData.dashboardPages,
  }), [deck]);

  const module = useMemo(() => resolvedDeck.modules[activeModule], [resolvedDeck.modules, activeModule]);

  // Scroll observer
  useEffect(() => {
    if (activePage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.getAttribute('data-section'));
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.2, 0.5] }
    );
    sectionRefs.current.forEach(node => node && observer.observe(node));
    return () => observer.disconnect();
  }, [activePage]);

  // Scroll progress
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / max, 1));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const scrollToSection = useCallback((id) => {
    if (activePage) { setActivePage(null); setTimeout(() => scrollToSection(id), 400); return; }
    const node = sectionRefs.current.get(id);
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activePage]);

  const openPage = useCallback((pageId) => {
    setPageTransition(true);
    setTimeout(() => {
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setPageTransition(false), 60);
    }, 350);
  }, []);

  const closePage = useCallback(() => {
    setPageTransition(true);
    setTimeout(() => {
      setActivePage(null);
      setTimeout(() => setPageTransition(false), 60);
    }, 350);
  }, []);

  const submitLead = async (e) => {
    e.preventDefault();
    setStatusMessage('Sending inquiry...');
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadState) });
      if (res.ok) { setStatusMessage('Inquiry captured successfully.'); setLeadState({ name: '', company: '', email: '', intent: leadState.intent }); }
      else setStatusMessage('Could not send. Please try again.');
    } catch { setStatusMessage('Could not send. Please try again.'); }
  };

  const activePageData = activePage ? resolvedDeck.dashboardPages.find(p => p.id === activePage) : null;

  // ── DETAIL PAGE VIEW ──
  if (activePage && activePageData) {
    return (
      <div className={`deck-shell page-view ${pageTransition ? 'transitioning' : 'entered'}`}>
        <header className="topbar">
          <div className="brand-mark">
            <span className="brand-logo">Bayt Mall Deck</span>
            <h1 className="brand-title">{resolvedDeck.property.name}</h1>
          </div>
          <nav className="top-nav">
            <button onClick={closePage}>← Back to Overview</button>
            <button onClick={() => { closePage(); setTimeout(() => scrollToSection('retail'), 500); }}>Retail</button>
            <button onClick={() => { closePage(); setTimeout(() => scrollToSection('luxury'), 500); }}>Luxury</button>
            <button onClick={() => { closePage(); setTimeout(() => scrollToSection('events'), 500); }}>Events</button>
          </nav>
          <div className="topbar-actions">
            <button className="icon-btn" aria-label="Settings">⚙</button>
            <button className="icon-btn profile-btn" aria-label="Profile">
              <img src={orbitImages[activePage] || heroImg} alt="" />
            </button>
          </div>
        </header>

        <main className="page-detail">
          <div className="page-detail__hero" style={{ backgroundImage: `url(${activePageData.background})` }}>
            <div className="page-detail__overlay" />
            <div className="page-detail__content">
              <p className="eyebrow">{activePageData.kicker}</p>
              <h2>{activePageData.title}</h2>
              <p className="page-detail__summary">{activePageData.summary}</p>
              <div className="page-detail__stats">
                {activePageData.stats.map(s => <span key={s} className="stat-pill">{s}</span>)}
              </div>
              <div className="page-detail__actions">
                <button className="primary-action" onClick={() => { closePage(); setTimeout(() => scrollToSection('inquiry'), 500); }}>Start a conversation</button>
                <button className="secondary-action" onClick={closePage}>Explore more</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ── MAIN DASHBOARD VIEW ──
  return (
    <div className={`deck-shell ${pageTransition ? 'transitioning' : ''}`} style={{ '--scroll-progress': scrollProgress }}>
      {/* ── TOPBAR ── */}
      <header className="topbar">
        <div className="brand-mark">
          <span className="brand-logo">Bayt Mall Deck</span>
          <h1 className="brand-title">{resolvedDeck.property.name}</h1>
        </div>
        <nav className="top-nav">
          <button className="nav-link has-dropdown" onClick={() => scrollToSection('overview')}>Overview <span className="chevron">▾</span></button>
          <button className="nav-link" onClick={() => scrollToSection('retail')}>Retail</button>
          <button className="nav-link" onClick={() => scrollToSection('luxury')}>Luxury</button>
          <button className="nav-link" onClick={() => scrollToSection('events')}>Events</button>
          <button className="nav-link" onClick={() => scrollToSection('inquiry')}>Contact Us</button>
        </nav>
        <div className="topbar-right">
          <button className="nav-link cta-link" onClick={() => scrollToSection('inquiry')}>Become a partner</button>
          <button className="icon-btn" aria-label="Settings">⚙</button>
          <button className="icon-btn" aria-label="Menu">☰</button>
          <button className="icon-btn profile-btn" aria-label="Profile">
            <img src={orbitDiningImg} alt="" />
          </button>
        </div>
      </header>

      <main className="deck-main">
        {/* ── HERO DASHBOARD ── */}
        <section className="hero-dashboard" ref={n => n && sectionRefs.current.set('overview', n)} data-section="overview">
          <div className="hero-bg">
            <img src={heroImg} alt="Dubai skyline" className="hero-bg__img" />
            <div className="hero-bg__clouds" />
            <div className="hero-bg__gradient" />
          </div>

          <div className="hero-headline">
            <h2 className="hero-title">WELCOME TO<br />DUBAI MALL</h2>
          </div>

          <div className="hero-discover">
            <div className="discover-line" />
            <h3 className="discover-title">Discover Dubai Mall</h3>
            <p className="discover-text">Discover Dubai Mall's best spaces to lease and visit. Find suitable zones for you and your brand.</p>
          </div>

          {/* ── ORBIT CIRCLES ── */}
          <div className="orbit-container">
            <div className="orbit-ring orbit-ring--outer" />
            <div className="orbit-ring orbit-ring--inner" />
            <div className="orbit-center-dot" />

            {/* Connector lines */}
            <svg className="orbit-lines" viewBox="0 0 400 400" fill="none">
              <line x1="200" y1="200" x2="280" y2="80" stroke="rgba(255,240,225,0.3)" strokeWidth="1" />
              <line x1="200" y1="200" x2="320" y2="180" stroke="rgba(255,240,225,0.3)" strokeWidth="1" />
              <line x1="200" y1="200" x2="300" y2="310" stroke="rgba(255,240,225,0.3)" strokeWidth="1" />
              <line x1="200" y1="200" x2="130" y2="330" stroke="rgba(255,240,225,0.3)" strokeWidth="1" />
            </svg>

            {orbitItems.map((item, i) => {
              const angleRad = (item.angle * Math.PI) / 180;
              const x = 200 + item.radius * Math.cos(angleRad);
              const y = 200 + item.radius * Math.sin(angleRad);
              return (
                <button
                  key={item.id}
                  className={`orbit-circle ${orbitHover === item.id ? 'hovered' : ''}`}
                  style={{
                    '--cx': `${x}px`,
                    '--cy': `${y}px`,
                    '--size': `${item.size}px`,
                    '--delay': `${i * 150}ms`,
                  }}
                  onMouseEnter={() => setOrbitHover(item.id)}
                  onMouseLeave={() => setOrbitHover(null)}
                  onClick={() => openPage(item.id)}
                  aria-label={`Open ${item.label}`}
                >
                  <span className="orbit-circle__pulse" />
                  <span className="orbit-circle__ring">
                    <img src={item.img} alt={item.label} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── BOTTOM DOCK ── */}
          <div className="hero-dock">
            <div className="dock-field">
              <span className="dock-field__icon">📍</span>
              <div>
                <strong>Dubai Mall</strong>
                <small>Choose the destination</small>
              </div>
            </div>
            <div className="dock-divider" />
            <div className="dock-field">
              <span className="dock-field__icon">📅</span>
              <div>
                <strong>Visit date</strong>
                <small>Add date</small>
              </div>
            </div>
            <div className="dock-divider" />
            <div className="dock-field">
              <span className="dock-field__icon">🏢</span>
              <div>
                <strong>Intent</strong>
                <small>Lease · Sponsor · Event</small>
              </div>
            </div>
            <div className="dock-divider" />
            <div className="dock-field">
              <span className="dock-field__icon">👥</span>
              <div>
                <strong>Visitors</strong>
                <small>100M+ annually</small>
              </div>
            </div>
            <button className="dock-play" onClick={() => scrollToSection('why')} aria-label="Start the pitch">
              ▶
            </button>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="stats-strip panel">
          {resolvedDeck.quickStats.map(stat => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              {stat.note && <small>{stat.note}</small>}
            </article>
          ))}
        </section>

        {/* ── JOURNEY SECTIONS ── */}
        {resolvedDeck.journey.map(section => (
          <section
            key={section.id}
            className={`story panel ${activeSection === section.id ? 'is-active' : ''}`}
            ref={n => n && sectionRefs.current.set(section.id, n)}
            data-section={section.id}
          >
            <div className="story-header">
              <div>
                <p className="eyebrow">{section.eyebrow}</p>
                <h3>{section.title}</h3>
              </div>
              <button className="ghost-action" onClick={() => scrollToSection('overview')}>Back to top</button>
            </div>
            <div className="story-grid">
              <div className="story-copy">
                <p>{section.description}</p>
                <div className="bullet-row">
                  {(section.bullets || section.stats || []).map(item => (
                    <span key={item} className="bullet-chip">{item}</span>
                  ))}
                </div>
                <button className="text-link" onClick={() => setActiveModule(section.id === 'events' ? 'events' : 'leasing')}>{section.cta}</button>
              </div>
              <div className="story-visual">
                <img src={heroImg} alt={section.title} className="story-visual__img" loading="lazy" />
                <div className="story-visual__meta">
                  <span>{section.mediaLabel || 'Destination imagery'}</span>
                  <strong>{resolvedDeck.property.name}</strong>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ── MODULES ── */}
        <section className="module-grid panel">
          <div className="module-head">
            <div>
              <p className="eyebrow">Expandable architecture</p>
              <h3>Working sub-modules</h3>
            </div>
            <div className="module-tabs">
              {moduleKeys.map(key => (
                <button key={key} className={key === activeModule ? 'tab active' : 'tab'} onClick={() => setActiveModule(key)}>
                  {resolvedDeck.modules[key].title}
                </button>
              ))}
            </div>
          </div>
          <div className="module-content">
            <div><h4>{module.title}</h4><p>{module.description}</p></div>
            <ul>{module.points.map(p => <li key={p}>{p}</li>)}</ul>
            <button className="primary-action">{module.cta}</button>
          </div>
        </section>

        {/* ── ACTION / INQUIRY ── */}
        <section className="action-zone panel" ref={n => n && sectionRefs.current.set('inquiry', n)} data-section="inquiry">
          <div className="action-copy">
            <p className="eyebrow">Action layer</p>
            <h3>Turn interest into an inquiry</h3>
            <p>This deck is designed to work live on a sales call, but it also needs to stand alone.</p>
          </div>
          <div className="action-cards">
            {resolvedDeck.actionCards.map(card => (
              <article key={card.title} className="action-card">
                <span>{card.mood}</span>
                <h4>{card.title}</h4>
                <p>{card.detail}</p>
                <strong>{card.label}</strong>
              </article>
            ))}
          </div>
          <form className="lead-form" onSubmit={submitLead}>
            <div className="field-grid">
              <label>Name<input value={leadState.name} onChange={e => setLeadState(s => ({ ...s, name: e.target.value }))} placeholder="Prospect name" /></label>
              <label>Company<input value={leadState.company} onChange={e => setLeadState(s => ({ ...s, company: e.target.value }))} placeholder="Brand or agency" /></label>
              <label>Email<input value={leadState.email} onChange={e => setLeadState(s => ({ ...s, email: e.target.value }))} placeholder="name@company.com" /></label>
              <label>Intent
                <select value={leadState.intent} onChange={e => setLeadState(s => ({ ...s, intent: e.target.value }))}>
                  <option>Leasing</option><option>Sponsorship</option><option>Event booking</option>
                </select>
              </label>
            </div>
            <div className="form-footer">
              <button className="primary-action" type="submit">Send inquiry</button>
              <p>{statusMessage}</p>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;