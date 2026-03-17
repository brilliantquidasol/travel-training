import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import TourForm from '../../../components/TourForm';
import AdminLayout from '../../../components/AdminLayout';

export default function NewTourPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      const res = await fetch('/api/tours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const id = data?.[0]?.id ?? data?.id;
      router.push(id ? `/admin/tours/edit/${id}` : '/admin/tours');
    } catch (e) {
      alert(e.message || 'Failed to create tour');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/tours" className="text-sm font-medium text-slate-500 hover:text-slate-700 mb-4 inline-block">
          ← Tours
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Create tour package</h1>
        <p className="text-slate-600 mb-6">Add itineraries, pricing, duration, highlights, and gallery. Your changes appear on the live tour page.</p>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <TourForm tour={null} onSave={handleSave} onCancel={() => router.push('/admin/tours')} saving={saving} />
        </div>
      </div>
    </AdminLayout>
  );
}
