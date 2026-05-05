# The Dubai Mall Interactive Sales Deck

This project is a browser-based sales deck built with React and Node for pitching a world-scale destination property as a leasing, sponsorship, and event platform.

## Stack

- React 18
- Vite
- Express
- Node.js

## What it does

- Video-first opening experience
- Non-linear navigation through the property story
- Dedicated sections for retail, luxury, dining, attractions, and events
- Expandable modules for events, sponsorship, leasing, and venue storytelling
- Lead capture form backed by a Node API

## Getting started

1. Install dependencies: `npm install`
2. Start the development servers: `npm run dev`
3. Build for production: `npm run build`
4. Run the production server: `npm run preview`

The app runs with the React client on Vite and an Express API on port 3001.

## Design decisions

- The deck uses a cinematic, luxury-inspired visual language with dark surfaces, gold accents, and large typography.
- Navigation is non-linear so a salesperson can jump directly to the relevant pitch path during a live call.
- The content is structured as a reusable data layer so the deck can grow into deeper modules without a rewrite.

## AI usage

- AI was used to shape the presentation structure, story hierarchy, and content framing.
- The interface leans on generated layout decisions and visual composition rather than static slide exports.

## Notes

- Public media URLs are used for motion in the current build.
- The Node API stores inquiries in memory for the session.