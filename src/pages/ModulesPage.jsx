import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ModulesPage({ deck }) {
  const [activeModule, setActiveModule] = useState('events');
  const shellRef = useRef(null);
  const moduleKeys = ['events', 'sponsorship', 'leasing', 'venue'];
  const module = deck.modules[activeModule];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.module-grid, .module-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power2.out' });
    }, shellRef);

    return () => ctx.revert();
  }, [activeModule]);

  return (
    <div ref={shellRef}>
      <div style={{ padding: '60px 40px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a96d48', marginBottom: '12px' }}>Expandable Architecture</p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '30px' }}>Working Sub-Modules</h2>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
        <div className="module-tabs" style={{ justifyContent: 'center', marginBottom: '50px' }}>
          {moduleKeys.map((key) => (
            <button
              key={key}
              className={key === activeModule ? 'tab active' : 'tab'}
              onClick={() => setActiveModule(key)}
              style={{
                padding: '12px 24px',
                borderRadius: '999px',
                border: key === activeModule ? '1px solid #a96d48' : '1px solid rgba(110, 68, 43, 0.12)',
                background: key === activeModule ? 'rgba(169, 109, 72, 0.1)' : 'transparent',
                color: 'var(--text)',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                transition: 'all 200ms ease'
              }}
            >
              {deck.modules[key].title}
            </button>
          ))}
        </div>

        <section className="module-grid panel" style={{ padding: '60px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'start' }}>
            <div className="module-card">
              <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: '700' }}>{module.title}</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'rgba(32, 24, 22, 0.72)', marginBottom: '30px' }}>
                {module.description}
              </p>

              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a96d48', marginBottom: '16px' }}>Key Points</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {module.points.map((point) => (
                    <li
                      key={point}
                      style={{
                        padding: '12px 16px',
                        borderLeft: '3px solid #a96d48',
                        background: 'rgba(169, 109, 72, 0.05)',
                        borderRadius: '4px',
                        color: 'var(--text)'
                      }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className="primary-action"
                style={{
                  padding: '12px 28px',
                  borderRadius: '999px',
                  background: '#a96d48',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {module.cta}
              </button>
            </div>

            <div
              style={{
                aspectRatio: '1',
                background: `linear-gradient(135deg, rgba(169, 109, 72, 0.2), rgba(169, 109, 72, 0.05))`,
                borderRadius: '24px',
                border: '1px solid rgba(169, 109, 72, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px'
              }}
            >
              <div>
                <p style={{ fontSize: '0.9rem', color: 'rgba(32, 24, 22, 0.68)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Module Preview</p>
                <h4 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>{module.title}</h4>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
