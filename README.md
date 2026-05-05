# The Dubai Mall — Interactive Sales Deck

This project is a browser-based sales deck built with React and an Express API. It presents The Dubai Mall as a destination platform for leasing, sponsorship, and events.

**Live URL:** (replace with your deployed link)

**Repository:** (replace with your public GitHub repo link)

## Tech Stack & Versions

- React 18.3.1
- Vite 5.4.21
- Node.js (14+ / 16+ recommended)
- Express 4.21.2
- GSAP 3.15.0
- react-router-dom 6.x

## Features

- Cinematic dashboard hero with GSAP scroll effects
- Multi-page routing (Home, Destinations, Showcase, Story, Modules, Contact)
- Reusable content model in `shared/deckData.js`
- Lead capture form posting to a simple Express endpoint
- Responsive layout with expanded dashboard width for large displays

## Getting Started (Local)

1. Install dependencies

```bash
npm install
```

2. Start development servers (client + API)

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview the production server

```bash
npm run preview
```

The client dev server runs on Vite (default :5173) and the Express API runs on :3001 in development.

## Deployment

This project can be deployed to Vercel, Netlify, or GitHub Pages. See `DEPLOYMENT.md` for step-by-step instructions for each platform.

## Design Decisions

- Visual language: warm beige and gold palette to align with luxury positioning
- Non-linear navigation: salesperson-focused flows to jump between story modules quickly
- Data-driven pages: content in `shared/deckData.js` keeps presentation flexible and re-usable

## AI Tools Used

- GitHub Copilot for code suggestions and repository edits
- GPT-5 mini (assisted authoring of documentation and structure)

## Notes

- Images use public Unsplash URLs; if you deploy to a restricted environment consider hosting assets or using a CDN.
- The server stores inquiries in memory for demo purposes — not production safe. Replace with a persistent store for production.

## Contributing

See `CONTRIBUTING.md` for contribution guidelines.

## Submission

Use the `EMAIL_SUBMISSION.txt` file for a ready-to-send email body to `medi@liat.ai` including your live URL and GitHub repo link.
