import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { IconOrders } from '../../components/admin/Icons';

function formatDate(val) {
  if (!val) return '—';
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? val : d.toLocaleDateString(undefined, { dateStyle: 'medium' });
}

function formatAmount(amount, currency = 'USD') {
  if (amount == null) return '—';
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency || 'USD',
  }).format(Number(amount));
}

const statusColors = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  paid: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-teal-100 text-teal-800 border-teal-200',
  cancelled: 'bg-slate-100 text-slate-600 border-slate-200',
};

function OrderRow({ order, onStatusChange }) {
  const tourTitle = order.tour?.title || '—';
  const [expanded, setExpanded] = useState(false);
  const [updating, setUpdating] = useState(false);
  const status = (order.status || 'pending').toLowerCase();
  const colorClass = statusColors[status] || statusColors.pending;

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === status) return;
    setUpdating(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, status: newStatus }),
      });
      if (!res.ok) throw new Error('Update failed');
      onStatusChange?.();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 truncate">{order.customer_name}</p>
          <p className="text-sm text-slate-500 truncate">{order.customer_email}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <span className="font-medium text-slate-900">{formatAmount(order.amount, order.currency)}</span>
          <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ${colorClass}`}>
            {status}
          </span>
          <span className="text-sm text-slate-500">{formatDate(order.created_at)}</span>
        </div>
      </div>
      <div className="px-4 sm:px-5 pb-4 flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-500">Tour:</span>
        <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]" title={tourTitle}>
          {tourTitle}
        </span>
        <label className="flex items-center gap-2 text-sm ml-auto">
          <span className="text-slate-500">Status:</span>
          <select
            value={status}
            onChange={handleStatusChange}
            disabled={updating}
            className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-slate-700 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-50"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
      </div>
      {order.notes && (
        <>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="w-full px-4 sm:px-5 py-2 border-t border-slate-100 text-left text-sm font-medium text-teal-600 hover:bg-slate-50"
          >
            {expanded ? 'Hide notes' : 'Show notes'}
          </button>
          {expanded && (
            <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-5 py-3 text-sm text-slate-700 whitespace-pre-wrap">
              {order.notes}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Orders & eCommerce</h1>
        <p className="text-slate-600 mb-6">
          Manage orders, payments, and customers for tour packages, travel services, merchandise, and add-ons.
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
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
              <span className="scale-125"><IconOrders /></span>
            </div>
            <p className="text-slate-600 font-medium">No orders yet</p>
            <p className="text-slate-500 text-sm mt-1">Orders from checkout or manual entry will appear here.</p>
            <p className="text-slate-400 text-xs mt-4">
              Run <code className="bg-slate-100 px-1.5 py-0.5 rounded">supabase-orders.sql</code> in Supabase to create the orders table.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-2">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </p>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} onStatusChange={load} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
