import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
  const form = useForm({
    email: '',
    password: '',
  });

  function submit(event) {
    event.preventDefault();
    form.post('/login');
  }

  return (
    <>
      <Head title="Sign In" />
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600">
              <span className="font-mono text-lg font-bold text-white">M</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-400">
              Sign in to your Marko account
            </p>
          </div>
          <form
            onSubmit={submit}
            className="space-y-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6"
          >
            {form.errors.message && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {form.errors.message}
              </div>
            )}
            <input
              type="email"
              required
              value={form.data.email}
              onChange={(event) => form.setData('email', event.target.value)}
              placeholder="demo@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
            />
            <input
              type="password"
              required
              value={form.data.password}
              onChange={(event) => form.setData('password', event.target.value)}
              placeholder="password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
            />
            <button
              disabled={form.processing}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
            >
              {form.processing ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            <Link href="/" className="text-indigo-400">
              Back to landing
            </Link>
          </p>
          <div className="mt-6 rounded-lg border border-slate-800/60 bg-slate-900/30 p-4">
            <p className="mb-1 font-mono text-xs text-slate-500">
              {'// Demo Credentials'}
            </p>
            <p className="font-mono text-xs text-slate-400">
              Email: demo@example.com
            </p>
            <p className="font-mono text-xs text-slate-400">
              Password: password
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
