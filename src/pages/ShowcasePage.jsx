import { useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ShowcasePage({ deck }) {
  const { pageId } = useParams();
  const page = deck.dashboardPages.find((p) => p.id === pageId);
  const shellRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.showcase-hero', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' });
      gsap.fromTo('.showcase-content', { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 });
    }, shellRef);

    return () => ctx.revert();
  }, [pageId]);

  if (!page) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center' }}>
        <h2>Page not found</h2>
        <Link to="/destinations">Back to destinations</Link>
      </div>
    );
  }

  return (
    <div ref={shellRef}>
      <section className="showcase-hero panel" style={{ marginBottom: '40px' }}>
        <div className="dashboard-frame" style={{ '--dashboard-image': `url(${page.background})`, minHeight: '600px' }}>
          <div className="dashboard-tint" />
          <div className="dashboard-copy" style={{ maxWidth: '100%' }}>
            <p className="eyebrow">{page.kicker}</p>
            <h2>{page.title}</h2>
            <p className="hero-lede">{page.summary}</p>
            <div className="hero-actions dashboard-actions">
              <Link to="/contact" className="primary-action">Request more info</Link>
              <Link to="/story" className="secondary-action">See the full story</Link>
            </div>
          </div>

          <div className="dashboard-floating">
            <div className="floating-ring floating-ring--large" />
            <div className="floating-ring floating-ring--small" />
            <div className="floating-card">
              <span className="floating-card__label">{page.label}</span>
              <strong>{deck.property.name}</strong>
              <p>{page.summary}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-dock">
          <div className="dock-copy">
            <span className="dock-label">{page.label}</span>
            <strong>{page.title}</strong>
          </div>
          <div className="dock-pills">
            {page.stats.map((stat) => (
              <span key={stat} className="dock-pill">{stat}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="showcase-content panel">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', fontWeight: '700' }}>About {page.label}</h3>
            <p style={{ lineHeight: '1.7', color: 'rgba(32, 24, 22, 0.72)', marginBottom: '30px' }}>{page.summary}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {page.stats.map((stat) => (
                <div key={stat} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: 'rgba(169, 109, 72, 0.05)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a96d48' }} />
                  <span style={{ fontWeight: '500' }}>{stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img
              src={page.background}
              alt={page.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 40px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.6rem', marginBottom: '30px' }}>Other Destinations</h3>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {deck.dashboardPages.map((p) => (
            <Link
              key={p.id}
              to={`/${p.id}`}
              className={`orbit-node ${p.id === pageId ? 'active' : ''}`}
              style={{ opacity: p.id === pageId ? 1 : 0.7, transform: p.id === pageId ? 'scale(1.1)' : 'scale(1)', transition: 'all 200ms ease' }}
            >
              <span className="orbit-node__ring">
                <img src={p.orbitImage} alt={p.label} />
              </span>
              <strong>{p.label}</strong>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
