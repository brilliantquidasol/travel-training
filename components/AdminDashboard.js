import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="glass p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Admin Dashboard</h1>
      <p className="text-gray-700 dark:text-gray-200 mb-6">Manage tours, bookings, and customers here.</p>
      <div className="space-y-3">
        <Link href="/admin/tours" className="block p-4 border border-white/20 rounded-lg hover:bg-white/10 transition">
          <span className="font-semibold text-gray-900 dark:text-white">Tour & Package Management</span>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Create, manage, and showcase tour packages with itineraries, pricing, duration, highlights, galleries, and booking. Use the Live Page Builder to design tour pages.</p>
        </Link>
      </div>
    </div>
  );
}
