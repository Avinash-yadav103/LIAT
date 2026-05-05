import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deckData } from '../shared/deckData.js';

const app = express();
const port = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

app.use(express.json({ limit: '1mb' }));

const inquiries = [];

app.get('/api/deck', (_req, res) => {
  res.json({
    ...deckData,
    generatedAt: new Date().toISOString()
  });
});

app.post('/api/inquiry', (req, res) => {
  const entry = {
    id: String(inquiries.length + 1),
    createdAt: new Date().toISOString(),
    ...req.body
  };

  inquiries.unshift(entry);
  res.status(201).json({
    ok: true,
    message: 'Inquiry captured for the sales team.',
    entry
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Mall deck server listening on http://localhost:${port}`);
});