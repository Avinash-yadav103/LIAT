import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function ContactPage({ deck }) {
  const [leadState, setLeadState] = useState({
    name: '',
    company: '',
    email: '',
    intent: 'Leasing'
  });
  const [statusMessage, setStatusMessage] = useState('Ready for a leasing, sponsorship, or booking conversation.');
  const shellRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.action-copy, .action-cards, .lead-form', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.15, ease: 'power2.out' });
    }, shellRef);

    return () => ctx.revert();
  }, []);

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
    <div ref={shellRef}>
      <section className="action-zone panel" style={{ maxWidth: '1000px', margin: '60px auto', padding: '60px 40px' }}>
        <div className="action-copy" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a96d48', marginBottom: '12px' }}>Action Layer</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '20px' }}>Turn Interest Into An Inquiry</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(32, 24, 22, 0.72)', fontSize: '1rem', lineHeight: '1.6' }}>
            This deck is designed to work live on a sales call, but it also needs to stand alone. The form below captures the next conversation without leaving the experience.
          </p>
        </div>

        <div className="action-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {deck.actionCards.map((card) => (
            <article
              key={card.title}
              className="action-card"
              style={{
                padding: '30px',
                borderRadius: '20px',
                background: 'linear-gradient(180deg, rgba(255, 249, 244, 0.74), rgba(255, 242, 232, 0.68))',
                border: '1px solid rgba(110, 68, 43, 0.12)',
                boxShadow: 'var(--shadow)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <p style={{ fontSize: '0.72rem', color: '#a96d48', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>{card.mood}</p>
              <h4 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text)' }}>{card.title}</h4>
              <p style={{ fontSize: '0.95rem', color: 'rgba(32, 24, 22, 0.72)', marginBottom: '16px', lineHeight: '1.5' }}>{card.detail}</p>
              <strong style={{ display: 'block', fontSize: '0.85rem', color: '#a96d48', fontWeight: '700' }}>{card.label}</strong>
            </article>
          ))}
        </div>

        <form className="lead-form" onSubmit={submitLead} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="field-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text)' }}>Name</span>
              <input
                value={leadState.name}
                onChange={(event) => setLeadState((current) => ({ ...current, name: event.target.value }))}
                placeholder="Prospect name"
                style={{
                  padding: '12px 16px',
                  border: '1px solid rgba(110, 68, 43, 0.12)',
                  borderRadius: '8px',
                  font: 'inherit',
                  backgroundColor: 'rgba(255, 249, 244, 0.5)'
                }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text)' }}>Company</span>
              <input
                value={leadState.company}
                onChange={(event) => setLeadState((current) => ({ ...current, company: event.target.value }))}
                placeholder="Brand or agency"
                style={{
                  padding: '12px 16px',
                  border: '1px solid rgba(110, 68, 43, 0.12)',
                  borderRadius: '8px',
                  font: 'inherit',
                  backgroundColor: 'rgba(255, 249, 244, 0.5)'
                }}
              />
            </label>
          </div>

          <div className="field-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: '1 / -1' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text)' }}>Email</span>
              <input
                value={leadState.email}
                onChange={(event) => setLeadState((current) => ({ ...current, email: event.target.value }))}
                placeholder="name@company.com"
                type="email"
                style={{
                  padding: '12px 16px',
                  border: '1px solid rgba(110, 68, 43, 0.12)',
                  borderRadius: '8px',
                  font: 'inherit',
                  backgroundColor: 'rgba(255, 249, 244, 0.5)'
                }}
              />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text)' }}>Intent</span>
              <select
                value={leadState.intent}
                onChange={(event) => setLeadState((current) => ({ ...current, intent: event.target.value }))}
                style={{
                  padding: '12px 16px',
                  border: '1px solid rgba(110, 68, 43, 0.12)',
                  borderRadius: '8px',
                  font: 'inherit',
                  backgroundColor: 'rgba(255, 249, 244, 0.5)',
                  cursor: 'pointer'
                }}
              >
                <option>Leasing</option>
                <option>Sponsorship</option>
                <option>Event booking</option>
              </select>
            </label>
          </div>

          <div className="form-footer" style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
            <button
              className="primary-action"
              type="submit"
              style={{
                padding: '12px 32px',
                borderRadius: '999px',
                background: '#a96d48',
                color: '#fff',
                border: 'none',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 200ms ease'
              }}
            >
              Send inquiry
            </button>
            <p style={{ fontSize: '0.9rem', color: 'rgba(32, 24, 22, 0.72)', margin: 0, maxWidth: '300px' }}>{statusMessage}</p>
          </div>
        </form>
      </section>
    </div>
  );
}
