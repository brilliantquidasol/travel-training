import AdminLayout from '../../components/AdminLayout';

export default function AdminDestinationsPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Destination Management</h1>
        <p className="text-slate-600 mb-6">
          Create SEO-friendly destination pages with rich content, images, maps, and travel information to inspire travelers.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">Destination management coming soon.</p>
        </div>
      </div>
    </AdminLayout>
  );
}
