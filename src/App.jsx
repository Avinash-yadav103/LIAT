import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { deckData } from '../shared/deckData.js';

const moduleKeys = ['events', 'sponsorship', 'leasing', 'venue'];

function App() {
  const [deck, setDeck] = useState(deckData);
  const [activeSection, setActiveSection] = useState(deckData.journey[0].id);
  const [activeDashboardPage, setActiveDashboardPage] = useState(deckData.dashboardPages[0].id);
  const [dashboardTransitioning, setDashboardTransitioning] = useState(false);
  const [activeModule, setActiveModule] = useState('events');
  const [leadState, setLeadState] = useState({
    name: '',
    company: '',
    email: '',
    intent: 'Leasing'
  });
  const [statusMessage, setStatusMessage] = useState('Ready for a leasing, sponsorship, or booking conversation.');
  const sectionRefs = useRef(new Map());
  const shellRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/deck', { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => setDeck(data))
      .catch(() => setDeck(deckData));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.getAttribute('data-section'));
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0.2, 0.35, 0.5, 0.75] }
    );

    sectionRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [deck.journey]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.brand-mark, .top-nav button, .topbar-meta', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
      gsap.fromTo('.dashboard-copy', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.08 });
      gsap.fromTo('.dashboard-floating', { scale: 0.92, opacity: 0, rotate: -2 }, { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'power3.out', delay: 0.18 });
      gsap.fromTo('.orbit-node', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.24 });
      gsap.fromTo('.dashboard-dock', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 });

      gsap.utils.toArray('.story').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 44, opacity: 0.62, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      gsap.fromTo(
        '.stats-strip .stat-card',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats-strip',
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        '.module-grid, .action-zone',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.module-grid',
            start: 'top 84%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.to('.dashboard-frame', {
        backgroundPosition: 'center 58%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.dashboard',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });

      gsap.to('.dashboard-floating', {
        y: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.dashboard',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }, shellRef);

    return () => ctx.revert();
  }, []);

  const module = useMemo(() => deck.modules[activeModule], [deck.modules, activeModule]);
  const activeDashboard = useMemo(
    () => deck.dashboardPages.find((page) => page.id === activeDashboardPage) || deck.dashboardPages[0],
    [deck.dashboardPages, activeDashboardPage]
  );

  const scrollToSection = (sectionId) => {
    const node = sectionRefs.current.get(sectionId);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const switchDashboardPage = (pageId) => {
    if (pageId === activeDashboardPage) {
      return;
    }

    setDashboardTransitioning(true);
    window.setTimeout(() => {
      setActiveDashboardPage(pageId);
      window.setTimeout(() => setDashboardTransitioning(false), 40);
    }, 160);
  };

  const submitLead = async (event) => {
    event.preventDefault();
    setStatusMessage('Sending inquiry...');

    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadState)
    });

    if (response.ok) {
      setStatusMessage('Inquiry captured. A sales team member can follow up from this session.');
      setLeadState({ name: '', company: '', email: '', intent: leadState.intent });
      return;
    }

    setStatusMessage('The inquiry could not be sent. Please try again.');
  };

  return (
    <div ref={shellRef} className="deck-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar dashboard-topbar">
        <div className="brand-mark">
          <span className="brand-kicker">Bayt Mall Deck</span>
          <h1>{deck.property.name}</h1>
        </div>

        <nav className="top-nav" aria-label="Primary deck navigation">
          <button onClick={() => scrollToSection('overview')}>Overview</button>
          <button onClick={() => scrollToSection('retail')}>Retail</button>
          <button onClick={() => scrollToSection('luxury')}>Luxury</button>
          <button onClick={() => scrollToSection('events')}>Events</button>
        </nav>

        <div className="topbar-meta">
          <span>{deck.property.city}</span>
          <span>{deck.property.tagline}</span>
        </div>
      </header>

      <aside className="navigator orbit-navigator" aria-label="Dashboard pages">
        {deck.dashboardPages.map((page, index) => {
          const isActive = activeDashboard.id === page.id;
          return (
            <button
              key={page.id}
              className={`orbit-node ${isActive ? 'active' : ''}`}
              onClick={() => switchDashboardPage(page.id)}
              style={{ '--orbit-delay': `${index * 70}ms` }}
              aria-pressed={isActive}
            >
              <span className="orbit-node__ring">
                <img src={page.orbitImage} alt="" />
              </span>
              <strong>{page.label}</strong>
            </button>
          );
        })}
      </aside>

      <main className="deck-main">
        <section className={`dashboard panel ${dashboardTransitioning ? 'is-transitioning' : ''}`} ref={(node) => node && sectionRefs.current.set('overview', node)} data-section="overview">
          <div className="dashboard-frame" style={{ '--dashboard-image': `url(${activeDashboard.background})` }}>
            <div className="dashboard-tint" />
            <div className="dashboard-copy">
              <p className="eyebrow">{activeDashboard.kicker}</p>
              <h2>{activeDashboard.title}</h2>
              <p className="hero-lede">{activeDashboard.summary}</p>

              <div className="hero-actions dashboard-actions">
                <button className="primary-action" onClick={() => scrollToSection('why')}>Start the pitch</button>
                <button className="secondary-action" onClick={() => setActiveModule('sponsorship')}>Open sponsorship layer</button>
              </div>
            </div>

            <div className="dashboard-floating">
              <div className="floating-ring floating-ring--large" />
              <div className="floating-ring floating-ring--small" />
              <div className="floating-card">
                <span className="floating-card__label">Now viewing</span>
                <strong>{activeDashboard.label}</strong>
                <p>{activeDashboard.summary}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-dock">
            <div className="dock-copy">
              <span className="dock-label">Destination sales deck</span>
              <strong>{deck.property.heroHeadline}</strong>
            </div>
            <div className="dock-pills">
              {activeDashboard.stats.map((stat) => (
                <span key={stat} className="dock-pill">{stat}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="stats-strip panel">
          {deck.quickStats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              {stat.note && <small>{stat.note}</small>}
            </article>
          ))}
        </section>

        {deck.journey.map((section) => (
          <section
            key={section.id}
            className="story panel"
            ref={(node) => node && sectionRefs.current.set(section.id, node)}
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
                  {(section.bullets || section.stats || []).map((item) => (
                    <span key={item} className="bullet-chip">{item}</span>
                  ))}
                </div>
                <button className="text-link" onClick={() => setActiveModule(section.id === 'events' ? 'events' : 'leasing')}>{section.cta}</button>
              </div>

              <div className="story-video-card">
                <video autoPlay loop muted playsInline className="story-video" poster="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80">
                  <source src={deck.property.ambientVideo} type="video/mp4" />
                </video>
                <div className="story-video-meta">
                  <span>{section.mediaLabel || 'Destination imagery'}</span>
                  <strong>{deck.property.name}</strong>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="module-grid panel">
          <div className="module-head">
            <div>
              <p className="eyebrow">Expandable architecture</p>
              <h3>Working sub-modules</h3>
            </div>
            <div className="module-tabs">
              {moduleKeys.map((key) => (
                <button key={key} className={key === activeModule ? 'tab active' : 'tab'} onClick={() => setActiveModule(key)}>
                  {deck.modules[key].title}
                </button>
              ))}
            </div>
          </div>

          <div className="module-content">
            <div>
              <h4>{module.title}</h4>
              <p>{module.description}</p>
            </div>
            <ul>
              {module.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <button className="primary-action">{module.cta}</button>
          </div>
        </section>

        <section className="action-zone panel" ref={(node) => node && sectionRefs.current.set('inquiry', node)} data-section="inquiry">
          <div className="action-copy">
            <p className="eyebrow">Action layer</p>
            <h3>Turn interest into an inquiry</h3>
            <p>
              This deck is designed to work live on a sales call, but it also needs to stand alone. The form below captures the next conversation without leaving the experience.
            </p>
          </div>

          <div className="action-cards">
            {deck.actionCards.map((card) => (
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
              <label>
                Name
                <input value={leadState.name} onChange={(event) => setLeadState((current) => ({ ...current, name: event.target.value }))} placeholder="Prospect name" />
              </label>
              <label>
                Company
                <input value={leadState.company} onChange={(event) => setLeadState((current) => ({ ...current, company: event.target.value }))} placeholder="Brand or agency" />
              </label>
              <label>
                Email
                <input value={leadState.email} onChange={(event) => setLeadState((current) => ({ ...current, email: event.target.value }))} placeholder="name@company.com" />
              </label>
              <label>
                Intent
                <select value={leadState.intent} onChange={(event) => setLeadState((current) => ({ ...current, intent: event.target.value }))}>
                  <option>Leasing</option>
                  <option>Sponsorship</option>
                  <option>Event booking</option>
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