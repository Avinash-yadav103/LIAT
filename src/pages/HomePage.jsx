import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HomePage({ deck }) {
  const initialDashboardId = deck.dashboardPages?.[0]?.id ?? 'destination';
  const [activeDashboardPage, setActiveDashboardPage] = useState(initialDashboardId);
  const [dashboardTransitioning, setDashboardTransitioning] = useState(false);
  const shellRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!deck.dashboardPages?.some((page) => page.id === activeDashboardPage)) {
      setActiveDashboardPage(deck.dashboardPages?.[0]?.id ?? 'destination');
    }
  }, [activeDashboardPage, deck.dashboardPages]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.dashboard-copy', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.08 });
      gsap.fromTo('.dashboard-floating', { scale: 0.92, opacity: 0, rotate: -2 }, { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'power3.out', delay: 0.18 });
      const orbitNodes = gsap.utils.toArray('.orbit-node');
      if (orbitNodes.length > 0) {
        gsap.fromTo(orbitNodes, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.24 });
      }
      gsap.fromTo('.dashboard-dock', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 });

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

  const activeDashboard = useMemo(
    () => deck.dashboardPages.find((page) => page.id === activeDashboardPage) || deck.dashboardPages[0],
    [deck.dashboardPages, activeDashboardPage]
  );

  if (!activeDashboard) {
    return null;
  }

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

  return (
    <div ref={shellRef} style={{ position: 'relative' }}>
      <section className={`dashboard panel ${dashboardTransitioning ? 'is-transitioning' : ''}`}>
        <div className="dashboard-frame" style={{ '--dashboard-image': `url(${activeDashboard.background})` }}>
          <div className="dashboard-tint" />
          <div className="dashboard-copy">
            <p className="eyebrow">{activeDashboard.kicker}</p>
            <h2>{activeDashboard.title}</h2>
            <p className="hero-lede">{activeDashboard.summary}</p>

            <div className="hero-actions dashboard-actions">
              <button className="primary-action" onClick={() => navigate('/story')}>Start the pitch</button>
              <button className="secondary-action" onClick={() => navigate('/modules')}>Open sponsorship layer</button>
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

      <div style={{ textAlign: 'center', padding: '60px 40px' }}>
        <h3 style={{ marginBottom: '40px', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Explore Our Destinations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          {deck.dashboardPages.map((page) => (
            <button
              key={page.id}
              onClick={() => switchDashboardPage(page.id)}
              style={{
                padding: '20px',
                border: '1px solid rgba(110, 68, 43, 0.12)',
                borderRadius: '16px',
                background: activeDashboard.id === page.id ? 'rgba(169, 109, 72, 0.1)' : 'rgba(255, 249, 244, 0.5)',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                fontSize: '1rem',
                fontWeight: '600'
              }}
              className={activeDashboard.id === page.id ? 'active' : ''}
            >
              {page.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
