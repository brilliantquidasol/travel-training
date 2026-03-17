import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TourForm from '../../../../components/TourForm';

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

  if (loading) return <div className="p-6">Loading...</div>;
  if (!tour) return <div className="p-6">Tour not found.</div>;

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <Link href="/admin/tours" className="text-blue-600 hover:text-blue-800">
          ← Back to tours
        </Link>
        <a
          href={`/tours/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Preview live page →
        </a>
      </div>
      <h1 className="text-2xl font-bold mb-2">Edit tour: {tour.title}</h1>
      <p className="text-gray-600 mb-6">Live Page Builder — update content below; preview the tour page to see how it looks to travelers.</p>
      <TourForm tour={tour} onSave={handleSave} onCancel={() => router.push('/admin/tours')} saving={saving} />
    </div>
  );
}
