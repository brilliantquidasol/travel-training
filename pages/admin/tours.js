import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';
import { getTourImageUrl } from '../../lib/placeholderImages';
import { IconTours } from '../../components/admin/Icons';

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
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tours & packages</h1>
            <p className="mt-1 text-slate-600 text-sm">Create and manage tour packages with itineraries, pricing, highlights, and booking.</p>
          </div>
          <Link
            href="/admin/tours/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
          >
            <IconTours />
            Create tour
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-[4/3] bg-slate-100" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
              <span className="scale-125"><IconTours /></span>
            </div>
            <p className="text-slate-600 font-medium">No tours yet</p>
            <p className="text-slate-500 text-sm mt-1">Create your first tour package to get started.</p>
            <Link
              href="/admin/tours/new"
              className="inline-flex items-center gap-2 mt-6 rounded-lg bg-teal-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Create tour
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-200"
              >
                <Link href={`/admin/tours/edit/${tour.id}`} className="block">
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={getTourImageUrl(tour)}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {tour.duration && (
                      <span className="absolute top-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm">
                        {tour.duration}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 rounded-lg bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white">
                      {tour.price != null && tour.price !== '' ? `$${Number(tour.price).toLocaleString()}` : 'Price on request'}
                    </span>
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/admin/tours/edit/${tour.id}`} className="block">
                    <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {tour.title}
                    </h3>
                  </Link>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <a
                      href={`/tours/${tour.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-teal-600 hover:text-teal-700"
                    >
                      Preview
                    </a>
                    <span className="text-slate-300">·</span>
                    <Link href={`/admin/tours/edit/${tour.id}`} className="text-xs font-medium text-teal-600 hover:text-teal-700">
                      Edit
                    </Link>
                    <span className="text-slate-300">·</span>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); handleDelete(tour.id, tour.title); }}
                      disabled={deleting === tour.id}
                      className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      {deleting === tour.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
