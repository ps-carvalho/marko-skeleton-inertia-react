import { Head, Link } from '@inertiajs/react';

export default function Landing() {
  return (
    <>
      <Head title="Marko Inertia React" />
      <main className="min-h-screen bg-zinc-50 text-zinc-950">
        <nav className="border-b border-zinc-200 bg-white">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-zinc-950 text-sm font-bold text-white">M</span>
              <span className="text-sm font-semibold">Marko Inertia React</span>
            </Link>
            <Link href="/dashboard" className="inline-flex h-10 items-center justify-center rounded bg-zinc-950 px-4 text-sm font-semibold text-white">
              Dashboard
            </Link>
          </div>
        </nav>
        <section className="mx-auto grid min-h-[720px] max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-800">
              Inertia.js implementation for Marko modules
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">React pages from Marko controllers.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              Keep routes, middleware, auth, and data loading in PHP while Inertia renders React screens with Vite and Tailwind.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="inline-flex h-12 items-center justify-center rounded bg-blue-700 px-5 text-sm font-semibold text-white">
                Open dashboard
              </Link>
              <Link href="/login" className="inline-flex h-12 items-center justify-center rounded border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-950">
                Sign in
              </Link>
            </div>
          </div>
          <div className="rounded border border-zinc-200 bg-zinc-950 p-6 text-white shadow-xl shadow-zinc-200">
            <p className="text-sm font-semibold text-blue-300">Controller response</p>
            <pre className="mt-4 overflow-x-auto text-sm leading-7 text-zinc-300"><code>{`#[Get('/dashboard')]
return $this->inertia->render(
    request: $request,
    component: 'Dashboard',
    assetEntry: 'app/web/resources/js/app.jsx',
);`}</code></pre>
          </div>
        </section>
      </main>
    </>
  );
}
