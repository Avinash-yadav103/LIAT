Project Write-Up — The Dubai Mall Interactive Sales Deck

Summary
- Purpose: A cinematic sales deck to present The Dubai Mall as a destination platform for leasing, sponsorship, and events.
- Scope: Multi-page React app with reusable content model, GSAP animations, and a demo Express API for lead capture.

Design Rationale
- Brand alignment: Warm beige and gold accents to reflect a luxury visual system.
- Sales-first UX: Non-linear navigation for salespeople to jump to relevant content during live calls.
- Data-driven: Use `shared/deckData.js` so product managers can edit content without code changes.

What I built
- Multi-page site with the following routes: `/`, `/destinations`, `/:pageId`, `/story`, `/modules`, `/contact`.
- Dashboard hero with parallax and floating rings (GSAP ScrollTrigger).
- Destination showcases with large imagery and call-to-actions.
- Contact form posting to `/api/inquiry` (demo in-memory store).

AI Assistance
- GitHub Copilot for code suggestions and patching files.
- GPT-5 mini for drafting documentation, commit messages, and editorial content.

Limitations & Next Steps
- Inquiries are stored in memory — replace with a persistent DB (Postgres, Fauna, Firebase).
- Replace external Unsplash calls with hosted assets to avoid CORS in locked environments.
- Add server-side validation and CAPTCHA for the contact form.
- Add analytics and accessibility audits.

