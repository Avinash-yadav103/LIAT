import { deckData } from '../shared/deckData.js';

const inquiries = [];

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }

  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve(req.body);
    }
  }

  return new Promise((resolve, reject) => {
    let raw = '';

    req.on('data', (chunk) => {
      raw += chunk;
    });

    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(raw);
      }
    });

    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  const queryPath = req.query?.path;
  const path = Array.isArray(queryPath)
    ? queryPath
    : typeof queryPath === 'string'
      ? [queryPath]
      : [];
  const resource = path[0];

  if (req.method === 'GET' && resource === 'deck') {
    sendJson(res, 200, {
      ...deckData,
      generatedAt: new Date().toISOString()
    });
    return;
  }

  if (req.method === 'POST' && resource === 'inquiry') {
    const body = await readBody(req);
    const entry = {
      id: String(inquiries.length + 1),
      createdAt: new Date().toISOString(),
      ...body
    };

    inquiries.unshift(entry);
    sendJson(res, 201, {
      ok: true,
      message: 'Inquiry captured for the sales team.',
      entry
    });
    return;
  }

  if (req.method === 'GET' && resource === 'health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  sendJson(res, 404, { ok: false, message: 'Not found' });
}