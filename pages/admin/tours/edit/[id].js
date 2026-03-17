import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TourForm from '../../../../components/TourForm';
import AdminLayout from '../../../../components/AdminLayout';

export default function EditTourPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/tours?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTour(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      const res = await fetch('/api/tours', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setTour(await res.json());
      alert('Tour updated.');
    } catch (e) {
      alert(e.message || 'Failed to update tour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="max-w-4xl mx-auto p-6 text-slate-500">Loading...</div></AdminLayout>;
  if (!tour) return <AdminLayout><div className="max-w-4xl mx-auto p-6 text-slate-500">Tour not found.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <Link href="/admin/tours" className="text-sm font-medium text-slate-500 hover:text-slate-700">
            ← Tours
          </Link>
          <a
            href={`/tours/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            Preview live page →
          </a>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Edit tour: {tour.title}</h1>
        <p className="text-slate-600 mb-6">Live Page Builder — update content below; preview the tour page to see how it looks to travelers.</p>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <TourForm tour={tour} onSave={handleSave} onCancel={() => router.push('/admin/tours')} saving={saving} />
        </div>
      </div>
    </AdminLayout>
  );
}
