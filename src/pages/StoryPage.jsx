import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function StoryPage({ deck }) {
  const shellRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
        '.story-video-card',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.story-grid',
            start: 'top 82%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, shellRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={shellRef}>
      <div style={{ padding: '60px 40px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a96d48', marginBottom: '12px' }}>The Journey</p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '20px' }}>Our Story & Positioning</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(32, 24, 22, 0.72)', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Explore the narrative threads that position {deck.property.name} as a destination retail platform.
        </p>
      </div>

      {deck.journey.map((section, index) => (
        <section
          key={section.id}
          className="story panel"
          style={{ marginBottom: '40px' }}
        >
          <div className="story-header">
            <div>
              <p className="eyebrow">{section.eyebrow}</p>
              <h3>{section.title}</h3>
            </div>
            {index > 0 && (
              <button
                className="ghost-action"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to top
              </button>
            )}
          </div>

          <div className="story-grid">
            <div className="story-copy">
              <p>{section.description}</p>
              <div className="bullet-row">
                {(section.bullets || section.stats || []).map((item) => (
                  <span key={item} className="bullet-chip">{item}</span>
                ))}
              </div>
              <button className="text-link">{section.cta}</button>
            </div>

            <div className="story-video-card">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="story-video"
                poster="https://images.unsplash.com/photo-1442512595331-e89e30266308?auto=format&fit=crop&w=1400&q=80"
              >
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
    </div>
  );
}
