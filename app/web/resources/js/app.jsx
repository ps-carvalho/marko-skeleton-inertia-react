import { createInertiaApp } from '@inertiajs/react';
import '../css/app.css';
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

createInertiaApp({
  resolve: (name) => resolvePage(pages, name, 'React'),
});
