import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/AdminLayout';

const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500';

export default function EditDestinationPage() {
  const router = useRouter();
  const { id } = router.query;
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`/api/destinations?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDest(data);
        setSlug(data.slug || '');
        setTitle(data.title || '');
        setSubtitle(data.subtitle || '');
        setImage(data.image || '');
        setDescription(data.description || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/destinations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, slug, title, subtitle, image: image || null, description: description || null }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setDest(data);
      setSlug(data.slug || '');
      setTitle(data.title || '');
      setSubtitle(data.subtitle || '');
      setImage(data.image || '');
      setDescription(data.description || '');
      alert('Destination updated.');
    } catch (e) {
      alert(e.message || 'Failed to update destination');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="max-w-2xl mx-auto p-6 text-slate-500">Loading...</div></AdminLayout>;
  if (!dest) return <AdminLayout><div className="max-w-2xl mx-auto p-6 text-slate-500">Destination not found.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/destinations" className="text-sm font-medium text-slate-500 hover:text-slate-700 mb-4 inline-block">
          ← Destinations
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Edit destination</h1>
        <p className="text-slate-600 mb-6">Update the destination details. The public page is at /destinations/[slug].</p>

        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="e.g. Eiffel Tower"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug (URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className={inputClass}
              placeholder="eiffel-tower"
            />
            <p className="text-xs text-slate-500 mt-0.5">Used in URL: /destinations/[slug]</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className={inputClass}
              placeholder="e.g. Paris, 24 Trips"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
            {image && (
              <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 max-w-xs">
                <img src={image} alt="" className="w-full h-32 object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Destination description..."
              rows={5}
            />
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-teal-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-teal-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save changes'}
            </button>
            <Link href="/admin/destinations" className="rounded-lg border border-slate-300 text-slate-700 px-4 py-2.5 text-sm font-medium hover:bg-slate-50">
              Cancel
            </Link>
            <a
              href={`/destinations/${dest.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-300 text-slate-700 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
            >
              View page →
            </a>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
