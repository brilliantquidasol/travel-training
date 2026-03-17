import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';

export default function AdminInquiriesPage() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Booking Inquiries</h1>
        <p className="text-slate-600 mb-6">
          View and manage tour booking requests from the contact or inquiry form. Follow up to confirm details, pricing, and availability for custom tours and group travel.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-slate-500">Inquiry management coming soon. Connect your contact form submissions here.</p>
        </div>
      </div>
    </AdminLayout>
  );
}
