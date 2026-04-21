import { describe, expect, test } from 'vitest';
import { createPageRegistry, pageNameFromPath, resolvePage } from './pages';

describe('React page registry', () => {
  test('converts page paths to Inertia component names', () => {
    expect(
      pageNameFromPath('/app/web/resources/js/pages/Admin/Users.jsx'),
    ).toBe('Admin/Users');
  });

  test('registers default exports by page name', () => {
    const Dashboard = () => null;
    const pages = createPageRegistry({
      '/app/web/resources/js/pages/Dashboard.jsx': { default: Dashboard },
    });

    expect(resolvePage(pages, 'Dashboard', 'React')).toBe(Dashboard);
  });

  test('throws an actionable error for unknown pages', () => {
    expect(() => resolvePage({ Dashboard: {} }, 'Missing', 'React')).toThrow(
      'Unknown React page: Missing. Available pages: Dashboard',
    );
  });
});
