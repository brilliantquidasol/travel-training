import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { IconInquiries } from '../../components/admin/Icons';

function formatDate(val) {
  if (!val) return '—';
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? val : d.toLocaleDateString(undefined, { dateStyle: 'medium' });
}

function InquiryRow({ inquiry }) {
  const tourTitle = inquiry.tour?.title || 'General inquiry';
  const [expanded, setExpanded] = useState(false);
  const hasExtra = inquiry.phone || inquiry.guests || inquiry.special_requests;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3"
      >
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
        </div>
        {hasExtra && (
          <span className="text-teal-600 text-sm font-medium shrink-0">
            {expanded ? 'Less' : 'More'}
          </span>
        )}
      </button>
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

  useEffect(() => {
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        setInquiries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
            <p className="text-sm text-slate-500 mb-2">{inquiries.length} {inquiries.length === 1 ? 'inquiry' : 'inquiries'}</p>
            {inquiries.map((inquiry) => (
              <InquiryRow key={inquiry.id} inquiry={inquiry} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
