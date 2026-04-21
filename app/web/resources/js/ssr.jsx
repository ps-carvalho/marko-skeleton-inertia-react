import { createInertiaApp } from '@inertiajs/react';
import { renderToString } from 'react-dom/server';
import http from 'http';
import { createPageRegistry, resolvePage } from './support/pages';

const pageModules = import.meta.glob(
  [
    '/app/**/resources/js/pages/**/*.{jsx,tsx}',
    '!/app/**/resources/js/pages/**/*.test.{jsx,tsx}',
    '!/app/**/resources/js/pages/**/*.spec.{jsx,tsx}',
    '/modules/**/resources/js/pages/**/*.{jsx,tsx}',
    '!/modules/**/resources/js/pages/**/*.test.{jsx,tsx}',
    '!/modules/**/resources/js/pages/**/*.spec.{jsx,tsx}',
  ],
  { eager: true },
);

const pages = createPageRegistry(pageModules);

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
      try {
        resolvePage(pages, page.component, 'React');
      } catch {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Unknown page: ${page.component}` }));
        return;
      }

      const { head, body: html } = await createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => resolvePage(pages, name, 'React'),
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          head: Array.isArray(head) ? head.join('\n') : '',
          body: html,
        }),
      );
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Inertia SSR server running on http://localhost:${PORT}`);
});
