import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';

const inputClass = 'w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500';

export default function NewDestinationPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slug || undefined, title, subtitle: subtitle || null, image: image || null, description: description || null }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const id = Array.isArray(data) ? data[0]?.id : data?.id;
      router.push(id ? `/admin/destinations/edit/${id}` : '/admin/destinations');
    } catch (e) {
      alert(e.message || 'Failed to create destination');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <Link href="/admin/destinations" className="text-sm font-medium text-slate-500 hover:text-slate-700 mb-4 inline-block">
          ← Destinations
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Add destination</h1>
        <p className="text-slate-600 mb-6">Create a new destination. It will appear on the public destinations page.</p>

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
              placeholder="eiffel-tower (optional, generated from title if empty)"
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
              {saving ? 'Creating...' : 'Create destination'}
            </button>
            <Link href="/admin/destinations" className="rounded-lg border border-slate-300 text-slate-700 px-4 py-2.5 text-sm font-medium hover:bg-slate-50">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
