import { Link, router, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
  const page = usePage();
  const user = page.props.user ?? {};
  const userName = user.name ?? 'Guest';
  const userEmail = user.email ?? '';
  const initials =
    userName === 'Guest'
      ? 'G'
      : userName
          .split(' ')
          .map((part) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();

  const itemClass = (component) =>
    [
      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
      page.component === component
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
    ].join(' ');

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Marko</span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          <Link href="/dashboard" className={itemClass('Dashboard')}>
            Dashboard
          </Link>
          <Link href="/profile" className={itemClass('Profile')}>
            Profile
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100">
              <span className="text-sm font-medium text-indigo-700">
                {initials}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {userName}
              </p>
              <p className="truncate text-xs text-gray-500">{userEmail}</p>
            </div>
            <button
              type="button"
              onClick={() => router.post('/logout')}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
              title="Sign out"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <div className="pl-64">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h1 className="text-xl font-semibold text-gray-900">
            {page.component}
          </h1>
          <span className="text-sm text-gray-500">Marko Framework Demo</span>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
