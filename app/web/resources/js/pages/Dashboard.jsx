import { Head, Link } from '@inertiajs/react';
import AppLayout from '../layouts/AppLayout';

function Dashboard({ user, chartData, activities }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Head title="Dashboard" />
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
            <p className="mt-1 text-sm text-gray-500">Here is what is happening with your application today.</p>
          </div>
          <span className="text-sm text-gray-400">{today}</span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['Total Visits', '24,592', '+12.5%'],
            ['Active Users', '1,429', '+8.2%'],
            ['Revenue', '$48,290', '-2.4%'],
            ['Tasks Done', '342', '+18.7%'],
          ].map(([label, value, delta]) => (
            <div key={label} className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
              <p className="mt-4 text-sm font-medium text-emerald-600">{delta} from last month</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Traffic Overview</h3>
            <div className="flex h-64 items-end justify-between gap-2 px-4">
              {chartData.map((bar, index) => (
                <div key={index} className="flex-1 rounded-t-lg bg-indigo-500" style={{ height: `${bar}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.title} className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-900">{activity.title}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-indigo-600 p-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Ready to build something useful?</h3>
            <p className="mt-1 text-sm text-indigo-100">Marko + Inertia + React + Tailwind is wired together.</p>
          </div>
          <Link href="/profile" className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-indigo-600">
            View Profile
          </Link>
        </div>
      </div>
    </>
  );
}

Dashboard.layout = (page) => <AppLayout>{page}</AppLayout>;

export default Dashboard;
