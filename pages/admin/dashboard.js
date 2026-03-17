import Link from 'next/link';
import AdminDashboard from '../../components/AdminDashboard';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen p-6 md:p-10">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to site
      </Link>
      <AdminDashboard />
      <nav className="mt-6 flex gap-4">
        <Link
          href="/admin/tours"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Manage tours →
        </Link>
      </nav>
    </div>
  );
}
