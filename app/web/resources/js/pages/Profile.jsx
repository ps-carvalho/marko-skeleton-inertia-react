import { Head } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

function Profile({ user }) {
  const initials = user.name.split(' ').map((part) => part[0]).join('').toUpperCase();

  return (
    <>
      <Head title="Profile" />
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />
          <div className="px-8 pb-8">
            <div className="relative -mt-12 mb-6">
              <div className="h-24 w-24 rounded-2xl bg-white p-1">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-indigo-100">
                  <span className="text-2xl font-bold text-indigo-700">{initials}</span>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <div className="mt-6 flex gap-3">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">{user.role || 'Developer'}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">Active</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoCard title="Account Info" rows={[
            ['Member since', user.joined || 'January 2024'],
            ['Location', user.location || 'San Francisco, CA'],
            ['Bio', user.bio || 'Full-stack developer'],
          ]} />
          <InfoCard title="Statistics" rows={[
            ['Projects', '12'],
            ['Tasks completed', '847'],
            ['Contributions', '2.4k'],
          ]} />
        </div>
      </div>
    </>
  );
}

function InfoCard({ title, rows }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">{title}</h3>
      <dl className="space-y-4">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt className="text-sm text-gray-500">{label}</dt>
            <dd className="text-right text-sm font-medium text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

Profile.layout = (page) => <AppLayout>{page}</AppLayout>;

export default Profile;
