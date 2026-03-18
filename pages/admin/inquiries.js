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

function formatPrice(price) {
  if (price == null || price === '') return 'Price on request';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(price));
}

const statusConfig = {
  pending: { class: 'bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400', label: 'Pending' },
  confirmed: { class: 'bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400', label: 'Confirmed' },
  cancelled: { class: 'bg-slate-200 text-slate-600 border-slate-200 dark:bg-slate-600/30 dark:text-slate-400', label: 'Cancelled' },
};

function getInitials(name) {
  return (name || '?').trim().split(/\s+/).map((s) => s[0]).join('').toUpperCase().slice(0, 2) || '?';
}

function ViewInquiryModal({ inquiry, onClose, onConfirm }) {
  if (!inquiry) return null;
  const tourTitle = inquiry.tour?.title || 'General inquiry';
  const tourPrice = inquiry.tour?.price;
  const status = (inquiry.status || 'pending').toLowerCase();
  const statusStyle = statusConfig[status] || statusConfig.pending;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="inquiry-modal-title">
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 id="inquiry-modal-title" className="text-lg font-semibold text-slate-900 dark:text-white">Booking details</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto space-y-6 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-400/20 dark:text-teal-400 font-semibold">
              {getInitials(inquiry.name)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 dark:text-white truncate">{inquiry.name}</p>
              <a href={`mailto:${inquiry.email}`} className="text-teal-600 dark:text-teal-400 hover:underline truncate block">{inquiry.email}</a>
            </div>
            <span className={`ml-auto shrink-0 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusStyle.class}`}>
              {statusStyle.label}
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-4 space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Trip</p>
            <p className="font-medium text-slate-900 dark:text-white">{tourTitle}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600 dark:text-slate-300">
              <span>{formatPrice(tourPrice)}</span>
              <span>{formatDate(inquiry.date)}</span>
              {inquiry.guests != null && inquiry.guests > 0 && <span>{inquiry.guests} guests</span>}
            </div>
          </div>

          {inquiry.phone && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Phone</p>
              <a href={`tel:${inquiry.phone}`} className="text-teal-600 dark:text-teal-400 hover:underline">{inquiry.phone}</a>
            </div>
          )}

          {inquiry.special_requests && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Special requests</p>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap rounded-lg bg-slate-50 dark:bg-slate-700/50 p-3">{inquiry.special_requests}</p>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2 bg-slate-50/50 dark:bg-slate-800/50">
          {status === 'pending' && (
            <button
              type="button"
              onClick={handleConfirm}
              disabled={confirming}
              className="rounded-xl bg-teal-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              {confirming ? 'Confirming…' : 'Confirm booking'}
            </button>
          )}
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InquiryRow({ inquiry, onView, onConfirm }) {
  const tourTitle = inquiry.tour?.title || 'General inquiry';
  const tourPrice = inquiry.tour?.price;
  const [expanded, setExpanded] = useState(false);
  const hasExtra = inquiry.phone || inquiry.guests || inquiry.special_requests;
  const status = (inquiry.status || 'pending').toLowerCase();
  const statusStyle = statusConfig[status] || statusConfig.pending;
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
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm">
            {getInitials(inquiry.name)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 dark:text-white truncate">{inquiry.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{inquiry.email}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="hidden md:block min-w-0 max-w-[200px]">
            <p className="text-slate-500 dark:text-slate-400 truncate" title={tourTitle}>{tourTitle}</p>
            <p className="font-medium text-slate-700 dark:text-slate-300">{formatPrice(tourPrice)}</p>
          </div>
          <span className="text-slate-400 dark:text-slate-500">{formatDate(inquiry.date || inquiry.created_at)}</span>
          <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle.class}`}>
            {statusStyle.label}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onView(inquiry); }}
            className="rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            View
          </button>
          {status === 'pending' && (
            <button
              type="button"
              onClick={handleConfirm}
              disabled={confirming}
              className="rounded-xl bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-700 disabled:opacity-50 transition-colors"
            >
              {confirming ? '…' : 'Confirm'}
            </button>
          )}
          {hasExtra && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="rounded-xl p-2 text-slate-500 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label={expanded ? 'Show less' : 'Show more'}
            >
              <svg className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          )}
        </div>
      </div>
      {expanded && hasExtra && (
        <div className="border-t border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-700/30 px-4 sm:px-5 py-4 text-sm space-y-2">
          {inquiry.phone && (
            <p>
              <span className="text-slate-500 dark:text-slate-400 font-medium">Phone:</span>{' '}
              <a href={`tel:${inquiry.phone}`} className="text-teal-600 dark:text-teal-400 hover:underline">
                {inquiry.phone}
              </a>
            </p>
          )}
          {inquiry.guests != null && inquiry.guests > 0 && (
            <p>
              <span className="text-slate-500 dark:text-slate-400 font-medium">Guests:</span> {inquiry.guests}
            </p>
          )}
          {inquiry.special_requests && (
            <p>
              <span className="text-slate-500 dark:text-slate-400 font-medium">Requests:</span>{' '}
              <span className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{inquiry.special_requests}</span>
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
  const stats = useMemo(() => {
    const pending = inquiries.filter((i) => (i.status || 'pending').toLowerCase() === 'pending').length;
    const confirmed = inquiries.filter((i) => (i.status || '').toLowerCase() === 'confirmed').length;
    return { total: inquiries.length, pending, confirmed };
  }, [inquiries]);

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
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Booking Inquiries</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage tour booking requests and confirm availability.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-slate-200 dark:bg-slate-700" />
                  <div className="flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2" />
                    <div className="h-3 bg-slate-100 dark:bg-slate-600 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-16 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 mb-6">
              <span className="scale-125"><IconInquiries /></span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">No inquiries yet</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-sm mx-auto">
              Booking requests from your tour and contact forms will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Total</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{stats.total}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400">Pending</p>
                <p className="text-2xl font-bold text-amber-800 dark:text-amber-300 mt-0.5">{stats.pending}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Confirmed</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">{stats.confirmed}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stats.total} {stats.total === 1 ? 'inquiry' : 'inquiries'}
              </p>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-slate-500 dark:text-slate-400">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-slate-700 dark:text-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="space-y-4">
              {sortedInquiries.map((inquiry) => (
                <InquiryRow
                  key={inquiry.id}
                  inquiry={inquiry}
                  onView={setViewInquiry}
                  onConfirm={handleConfirm}
                />
              ))}
            </div>
          </>
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
