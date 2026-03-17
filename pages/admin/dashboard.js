import Link from 'next/link';
import AdminDashboard from '../../components/AdminDashboard';
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
