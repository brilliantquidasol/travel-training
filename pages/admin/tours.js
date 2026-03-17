import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';

export default function AdminToursPage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    fetch('/api/tours')
      .then((res) => res.json())
      .then((data) => {
        setTours(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/tours?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      load();
    } catch (e) {
      alert(e.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout>
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tours & packages</h1>
          <p className="mt-1 text-slate-600 text-sm">Create and manage tour packages with itineraries, pricing, highlights, and booking.</p>
        </div>
        <Link
          href="/admin/tours/new"
          className="inline-flex items-center justify-center rounded-lg bg-teal-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          Create tour
        </Link>
      </div>
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          Loading...
        </div>
      ) : tours.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No tours yet. Create your first tour package.
        </div>
      ) : (
        <ul className="space-y-2">
          {tours.map((tour) => (
            <li
              key={tour.id}
              className="flex flex-wrap justify-between items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <span className="font-medium text-slate-900">{tour.title}</span>
                {tour.duration && (
                  <span className="ml-2 text-sm text-slate-500">— {tour.duration}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`/tours/${tour.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  Preview
                </a>
                <Link href={`/admin/tours/edit/${tour.id}`} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(tour.id, tour.title)}
                  disabled={deleting === tour.id}
                  className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  {deleting === tour.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </AdminLayout>
  );
}
