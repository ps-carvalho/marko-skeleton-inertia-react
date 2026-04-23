# Marko Inertia React Skeleton

[![Quality](https://img.shields.io/github/actions/workflow/status/ps-carvalho/marko-skeleton-inertia-react/quality.yml?branch=main&label=quality)](https://github.com/ps-carvalho/marko-skeleton-inertia-react/actions/workflows/quality.yml)
[![Build](https://img.shields.io/github/actions/workflow/status/ps-carvalho/marko-skeleton-inertia-react/quality.yml?branch=main&label=build)](https://github.com/ps-carvalho/marko-skeleton-inertia-react/actions/workflows/quality.yml)

Standalone Marko application skeleton with Inertia.js, React, Tailwind CSS, Vite, sessions, authentication, and Pest tests.

## Create a Project

```bash
composer create-project marko/skeleton-inertia-react my-app
cd my-app
cp .env.example .env
npm install
composer dev
```

The development server runs PHP on `http://localhost:8000`, Vite on `http://localhost:5173`, and the optional SSR server on `http://localhost:13714`.

## Included Routes

| Route        | Component   | Purpose                 |
| ------------ | ----------- | ----------------------- |
| `/`          | `Landing`   | Public landing page     |
| `/login`     | `Login`     | Demo sign-in form       |
| `/dashboard` | `Dashboard` | Authenticated dashboard |
| `/profile`   | `Profile`   | Authenticated profile   |

Demo credentials:

```text
Email: demo@example.com
Password: password
```

## Structure

```text
app/web/                 Marko application module
app/web/resources/js/    React Inertia entry, SSR entry, layouts, and pages
app/web/resources/css/   Tailwind CSS entry
config/                  Root app configuration
public/index.php         Web entry point
tests/                   Pest tests
vite.config.js           Single-entry Vite build
```

## Commands

```bash
composer dev          # build SSR once, then run PHP + Vite + SSR
npm run dev           # Vite only
npm run build         # production client assets
npm run build:ssr     # production SSR bundle
vendor/bin/pest       # PHP tests
```

## Composer Packages

This skeleton resolves the Marko PHP packages from the standalone GitHub repositories for `marko/vite`, `marko/inertia`, and `marko/inertia-react`. The root app declares those VCS repositories directly and requires the React adapter package, which pulls in the core Inertia and Vite packages transitively.

SSR is available but disabled by default through `.env.example`:

```text
INERTIA_SSR_ENABLED=false
INERTIA_SSR_URL=http://localhost:13714
```

## Requirements

- PHP 8.5+
- Composer
- Node.js 22+ and npm
