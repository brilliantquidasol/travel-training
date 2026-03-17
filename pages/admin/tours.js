import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen p-6 md:p-10">
      <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Dashboard
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage tours & packages</h1>
        <Link
          href="/admin/tours/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create tour
        </Link>
      </div>
      <p className="text-gray-600 mb-4">Create and manage tour packages with itineraries, pricing, duration, highlights, galleries, and booking. Use the Live Page Builder when editing to design tour pages.</p>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : tours.length === 0 ? (
        <p className="text-gray-500">No tours yet. Create your first tour package.</p>
      ) : (
        <ul className="space-y-3">
          {tours.map((tour) => (
            <li
              key={tour.id}
              className="flex justify-between items-center border rounded-lg p-4 bg-white shadow-sm"
            >
              <div>
                <span className="font-medium">{tour.title}</span>
                {tour.duration && (
                  <span className="ml-2 text-sm text-gray-500">— {tour.duration}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/tours/${tour.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm"
                >
                  Preview
                </a>
                <Link href={`/admin/tours/edit/${tour.id}`} className="text-blue-600 text-sm">
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(tour.id, tour.title)}
                  disabled={deleting === tour.id}
                  className="text-red-600 text-sm disabled:opacity-50"
                >
                  {deleting === tour.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
