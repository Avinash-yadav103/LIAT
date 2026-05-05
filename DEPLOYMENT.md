Deployment Instructions

This document contains concise deployment steps for Vercel, Netlify, and GitHub Pages.

Vercel (recommended)
- Prerequisite: Vercel account (https://vercel.com)
- From your project root, ensure `npm run build` works locally.
- On Vercel dashboard, click "New Project" → import from GitHub and select this repository.
- Set the Framework Preset to "Vite" (or "Other" with the following):
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Deploy. After first deploy, copy the Live URL into `README.md` and `EMAIL_SUBMISSION.txt`.

Netlify
- Prerequisite: Netlify account (https://app.netlify.com)
- In Netlify, click "New site from Git" → connect GitHub and select repository.
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Deploy site and copy the generated URL into the README and submission email.

GitHub Pages (manual)
- GitHub Pages is not ideal for Vite apps with server APIs. If you still prefer Pages:
  - Run `npm run build` locally.
  - Push the `dist` folder content to a branch named `gh-pages` (or use `gh-pages` npm package).
  - In repository Settings → Pages, select the `gh-pages` branch to serve.
- Note: Express API must be hosted separately (Heroku, Render, Railway, or Vercel serverless functions).

Environment & API
- If you deploy the client separately, host the Express API somewhere public and update client API base URL (in fetch calls) to the production URL.

Troubleshooting
- If images fail due to CORS, host static assets in the same deployment or use a CDN.
- If you use Vercel, you can create serverless endpoints under `/api` to replace Express routes.

