import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { IconInquiries } from '../../components/admin/Icons';

const SORT_OPTIONS = [
  { value: 'created_desc', label: 'Newest first' },
  { value: 'created_asc', label: 'Oldest first' },
  { value: 'name_asc', label: 'Name A–Z' },
  { value: 'name_desc', label: 'Name Z–A' },
];

function sortInquiries(list, sortBy) {
  const copy = [...list];
  switch (sortBy) {
    case 'created_asc':
      copy.sort((a, b) => (new Date(a.created_at || a.id) - new Date(b.created_at || b.id)));
      break;
    case 'name_asc':
      copy.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      break;
    case 'name_desc':
      copy.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
      break;
    case 'created_desc':
    default:
      copy.sort((a, b) => new Date(b.created_at || b.id) - new Date(a.created_at || a.id));
      break;
  }
  return copy;
}

function formatDate(val) {
  if (!val) return '—';
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? val : d.toLocaleDateString(undefined, { dateStyle: 'medium' });
}

const statusColors = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-teal-100 text-teal-800 border-teal-200',
  cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
};

function ViewInquiryModal({ inquiry, onClose, onConfirm }) {
  if (!inquiry) return null;
  const tourTitle = inquiry.tour?.title || 'General inquiry';
  const status = (inquiry.status || 'pending').toLowerCase();
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await onConfirm(inquiry.id);
      onClose();
    } catch (e) {
      alert(e.message || 'Failed to confirm');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="inquiry-modal-title">
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 id="inquiry-modal-title" className="text-lg font-semibold text-slate-900">Booking inquiry</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto space-y-4 text-sm">
          <div>
            <p className="text-slate-500 font-medium mb-0.5">Name</p>
            <p className="text-slate-900">{inquiry.name}</p>
          </div>
          <div>
            <p className="text-slate-500 font-medium mb-0.5">Email</p>
            <a href={`mailto:${inquiry.email}`} className="text-teal-600 hover:underline">{inquiry.email}</a>
          </div>
          {inquiry.phone && (
            <div>
              <p className="text-slate-500 font-medium mb-0.5">Phone</p>
              <a href={`tel:${inquiry.phone}`} className="text-teal-600 hover:underline">{inquiry.phone}</a>
            </div>
          )}
          <div>
            <p className="text-slate-500 font-medium mb-0.5">Tour</p>
            <p className="text-slate-900">{tourTitle}</p>
          </div>
          <div>
            <p className="text-slate-500 font-medium mb-0.5">Preferred date</p>
            <p className="text-slate-900">{formatDate(inquiry.date)}</p>
          </div>
          {inquiry.guests != null && inquiry.guests > 0 && (
            <div>
              <p className="text-slate-500 font-medium mb-0.5">Guests</p>
              <p className="text-slate-900">{inquiry.guests}</p>
            </div>
          )}
          {inquiry.special_requests && (
            <div>
              <p className="text-slate-500 font-medium mb-0.5">Special requests</p>
              <p className="text-slate-700 whitespace-pre-wrap">{inquiry.special_requests}</p>
            </div>
          )}
          <div>
            <p className="text-slate-500 font-medium mb-0.5">Status</p>
            <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-medium ${statusColors[status] || statusColors.pending}`}>
              {status}
            </span>
          </div>
        </div>
        <div className="px-5 py-4 border-t border-slate-200 flex flex-wrap gap-2">
          {status === 'pending' && (
            <button
              type="button"
              onClick={handleConfirm}
              disabled={confirming}
              className="rounded-lg bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-700 disabled:opacity-50"
            >
              {confirming ? 'Confirming...' : 'Confirm booking'}
            </button>
          )}
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InquiryRow({ inquiry, onView, onConfirm }) {
  const tourTitle = inquiry.tour?.title || 'General inquiry';
  const [expanded, setExpanded] = useState(false);
  const hasExtra = inquiry.phone || inquiry.guests || inquiry.special_requests;
  const status = (inquiry.status || 'pending').toLowerCase();
  const [confirming, setConfirming] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirming(true);
    try {
      await onConfirm(inquiry.id);
    } catch (err) {
      alert(err.message || 'Failed to confirm');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 truncate">{inquiry.name}</p>
          <p className="text-sm text-slate-500 truncate">{inquiry.email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 shrink-0">
          <span className="text-slate-500">Tour:</span>
          <span className="font-medium text-slate-700 truncate max-w-[180px]" title={tourTitle}>
            {tourTitle}
          </span>
          <span className="text-slate-400">·</span>
          <span>{formatDate(inquiry.date || inquiry.created_at)}</span>
          <span className={`inline-flex rounded-lg border px-2 py-0.5 text-xs font-medium ${statusColors[status] || statusColors.pending}`}>
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onView(inquiry); }}
            className="rounded-lg border border-slate-300 text-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          >
            View
          </button>
          {status === 'pending' && (
            <button
              type="button"
              onClick={handleConfirm}
              disabled={confirming}
              className="rounded-lg bg-teal-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-teal-700 disabled:opacity-50"
            >
              {confirming ? '...' : 'Confirm'}
            </button>
          )}
          {hasExtra && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-teal-600 text-sm font-medium"
            >
              {expanded ? 'Less' : 'More'}
            </button>
          )}
        </div>
      </div>
      {expanded && hasExtra && (
        <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-5 py-4 text-sm space-y-2">
          {inquiry.phone && (
            <p>
              <span className="text-slate-500 font-medium">Phone:</span>{' '}
              <a href={`tel:${inquiry.phone}`} className="text-teal-600 hover:underline">
                {inquiry.phone}
              </a>
            </p>
          )}
          {inquiry.guests != null && inquiry.guests > 0 && (
            <p>
              <span className="text-slate-500 font-medium">Guests:</span> {inquiry.guests}
            </p>
          )}
          {inquiry.special_requests && (
            <p>
              <span className="text-slate-500 font-medium">Requests:</span>{' '}
              <span className="text-slate-700 whitespace-pre-wrap">{inquiry.special_requests}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewInquiry, setViewInquiry] = useState(null);
  const [sortBy, setSortBy] = useState('created_desc');

  const sortedInquiries = useMemo(() => sortInquiries(inquiries, sortBy), [inquiries, sortBy]);

  const load = () => {
    return fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => setInquiries(Array.isArray(data) ? data : []))
      .catch(() => setInquiries([]));
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const handleConfirm = async (id) => {
    const res = await fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'confirmed' }),
    });
    if (!res.ok) throw new Error('Failed to confirm booking');
    await load();
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Booking Inquiries</h1>
        <p className="text-slate-600 mb-6">
          View and manage tour booking requests. Follow up to confirm details, pricing, and availability for custom tours and group travel.
        </p>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-1/3 mb-2" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
              <span className="scale-125"><IconInquiries /></span>
            </div>
            <p className="text-slate-600 font-medium">No inquiries yet</p>
            <p className="text-slate-500 text-sm mt-1">Booking requests from your tour and contact forms will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <p className="text-sm text-slate-500">
                {inquiries.length} {inquiries.length === 1 ? 'inquiry' : 'inquiries'}
              </p>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </label>
            </div>
            {sortedInquiries.map((inquiry) => (
              <InquiryRow
                key={inquiry.id}
                inquiry={inquiry}
                onView={setViewInquiry}
                onConfirm={handleConfirm}
              />
            ))}
          </div>
        )}
      </div>

      {viewInquiry && (
        <ViewInquiryModal
          inquiry={viewInquiry}
          onClose={() => setViewInquiry(null)}
          onConfirm={handleConfirm}
        />
      )}
    </AdminLayout>
  );
}
