import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';
import { IconDestinations } from '../../components/admin/Icons';

function getDestinationImageUrl(dest) {
  if (dest?.image) return dest.image;
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop';
}

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => {
        setDestinations(Array.isArray(data) ? data : []);
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
      const res = await fetch(`/api/destinations?id=${id}`, { method: 'DELETE' });
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
            <h1 className="text-2xl font-bold text-slate-900">Destinations</h1>
            <p className="mt-1 text-slate-600 text-sm">
              Create SEO-friendly destination pages with rich content, images, and travel information.
            </p>
          </div>
          <Link
            href="/admin/destinations/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
          >
            <IconDestinations />
            Add destination
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
        ) : destinations.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
              <span className="scale-125"><IconDestinations /></span>
            </div>
            <p className="text-slate-600 font-medium">No destinations yet</p>
            <p className="text-slate-500 text-sm mt-1">Add destinations to showcase on your destinations page.</p>
            <Link
              href="/admin/destinations/new"
              className="inline-flex items-center gap-2 mt-6 rounded-lg bg-teal-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Add destination
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-200"
              >
                <Link href={`/admin/destinations/edit/${dest.id}`} className="block">
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={getDestinationImageUrl(dest)}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium drop-shadow-md truncate">
                      {dest.subtitle || dest.title}
                    </span>
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/admin/destinations/edit/${dest.id}`} className="block">
                    <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
                      {dest.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5">/{dest.slug}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <a
                      href={`/destinations/${dest.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-teal-600 hover:text-teal-700"
                    >
                      View page
                    </a>
                    <span className="text-slate-300">·</span>
                    <Link href={`/admin/destinations/edit/${dest.id}`} className="text-xs font-medium text-teal-600 hover:text-teal-700">
                      Edit
                    </Link>
                    <span className="text-slate-300">·</span>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); handleDelete(dest.id, dest.title); }}
                      disabled={deleting === dest.id}
                      className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      {deleting === dest.id ? 'Deleting...' : 'Delete'}
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
