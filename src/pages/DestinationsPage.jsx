import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export function DestinationsPage({ deck }) {
  const shellRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.destination-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power2.out' });
    }, shellRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={shellRef}>
      <div style={{ padding: '60px 40px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a96d48', marginBottom: '12px' }}>Explore</p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '20px' }}>All Destinations</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(32, 24, 22, 0.72)', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Discover the unique zones and experiences across {deck.property.name}
        </p>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '60px 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}
        >
          {deck.dashboardPages.map((page) => (
            <Link
              key={page.id}
              to={`/${page.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article
                className="destination-card panel"
                style={{
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 300ms ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 32px 80px rgba(92, 56, 39, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
              >
                <div
                  style={{
                    height: '240px',
                    background: `url(${page.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(40, 25, 19, 0.1), rgba(40, 25, 19, 0.4))'
                    }}
                  />
                </div>

                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a96d48', marginBottom: '8px', fontWeight: '700' }}>
                    {page.kicker}
                  </p>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text)' }}>
                    {page.label}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(32, 24, 22, 0.72)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
                    {page.summary}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {page.stats.slice(0, 2).map((stat) => (
                      <span
                        key={stat}
                        style={{
                          fontSize: '0.8rem',
                          padding: '6px 12px',
                          borderRadius: '999px',
                          background: 'rgba(169, 109, 72, 0.1)',
                          color: '#a96d48',
                          fontWeight: '600'
                        }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(169, 109, 72, 0.05)', borderRadius: '20px', maxWidth: '800px', margin: '60px auto' }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text)', marginBottom: '20px' }}>
          Ready to learn more about partnership opportunities?
        </p>
        <Link
          to="/contact"
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            borderRadius: '999px',
            background: '#a96d48',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'all 200ms ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
