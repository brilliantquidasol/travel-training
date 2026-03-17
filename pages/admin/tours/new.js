import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import TourForm from '../../../components/TourForm';

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
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <Link href="/admin/tours" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to tours
      </Link>
      <h1 className="text-2xl font-bold mb-2">Create tour package</h1>
      <p className="text-gray-600 mb-6">Add itineraries, pricing, duration, highlights, and gallery. Your changes appear on the live tour page.</p>
      <TourForm tour={null} onSave={handleSave} onCancel={() => router.push('/admin/tours')} saving={saving} />
    </div>
  );
}
