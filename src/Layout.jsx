import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export function Layout({ children, deck }) {
  const shellRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const topbarTargets = gsap.utils.toArray('.brand-mark, .top-nav a, .topbar-meta');
      if (topbarTargets.length > 0) {
        gsap.fromTo(topbarTargets, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' });
      }

      const orbitNavigator = gsap.utils.toArray('.orbit-navigator');
      if (orbitNavigator.length > 0) {
        gsap.fromTo(orbitNavigator, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' });
      }
    }, shellRef);

    return () => ctx.revert();
  }, [location]);

  return (
    <div ref={shellRef} className="deck-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar dashboard-topbar">
        <div className="brand-mark">
          <span className="brand-kicker">Bayt Mall Deck</span>
          <Link to="/" className="brand-link">
            <h1>{deck.property.name}</h1>
          </Link>
        </div>

        <nav className="top-nav" aria-label="Primary navigation">
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/story">Story</Link>
          <Link to="/modules">Modules</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="topbar-meta">
          <span>{deck.property.city}</span>
          <span>{deck.property.tagline}</span>
        </div>
      </header>

      <aside className="navigator orbit-navigator" aria-label="Quick destinations">
        {deck.dashboardPages.map((page, index) => {
          return (
            <Link
              key={page.id}
              to={`/${page.id}`}
              className="orbit-node"
              style={{ '--orbit-delay': `${index * 70}ms` }}
            >
              <span className="orbit-node__ring">
                <img src={page.orbitImage} alt="" />
              </span>
              <strong>{page.label}</strong>
            </Link>
          );
        })}
      </aside>

      <main className="deck-main">
        {children}
      </main>
    </div>
  );
}
