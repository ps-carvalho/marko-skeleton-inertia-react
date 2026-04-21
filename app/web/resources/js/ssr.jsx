import { createInertiaApp } from '@inertiajs/react';
import { renderToString } from 'react-dom/server';
import http from 'http';

const pageModules = import.meta.glob([
  '/app/**/resources/js/pages/**/*.{jsx,tsx}',
  '/modules/**/resources/js/pages/**/*.{jsx,tsx}',
], { eager: true });

function pathToName(path) {
  const match = path.match(/\/resources\/js\/pages\/(.+)\.(jsx|tsx)$/);
  return match ? match[1] : path;
}

const pages = {};
for (const [path, mod] of Object.entries(pageModules)) {
  pages[pathToName(path)] = mod.default ?? mod;
}

const PORT = process.env.INERTIA_SSR_PORT || 13714;

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      const page = JSON.parse(body);
      const pageModule = pages[page.component];

      if (!pageModule) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Unknown page: ${page.component}` }));
        return;
      }

      const { head, body: html } = await createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => pages[name],
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        head: Array.isArray(head) ? head.join('\n') : '',
        body: html,
      }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Inertia SSR server running on http://localhost:${PORT}`);
});
