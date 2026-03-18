import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function formatAmount(amount, currency = 'USD') {
  if (amount == null) return '—';
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD' }).format(Number(amount));
}

export default function PayPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders?id=${encodeURIComponent(orderId)}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
        setError(null);
      })
      .catch(() => setError('Could not load order'))
      .finally(() => setLoading(false));
  }, [orderId]);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!order || order.status === 'paid') return;
    setPaying(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order.id, status: 'paid' }),
      });
      if (!res.ok) throw new Error('Payment failed');
      setPaid(true);
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  const tourTitle = order?.tour?.title || 'Tour';
  const status = (order?.status || '').toLowerCase();

  return (
    <Layout>
      <Navbar />
      <main className="min-h-[70vh] pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white dark:bg-gray-800 p-8 text-center text-slate-500">
              Loading…
            </div>
          )}
          {!loading && (error || !order) && (
            <div className="rounded-2xl border border-slate-200 bg-white dark:bg-gray-800 p-8 text-center">
              <p className="text-slate-600 dark:text-slate-300">{error || 'Order not found.'}</p>
              <Link href="/" className="mt-4 inline-block text-teal-600 hover:underline">← Back home</Link>
            </div>
          )}
          {!loading && order && !error && (
            <div className="rounded-2xl border border-slate-200 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 dark:border-gray-700">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Complete payment</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Demo payment – no real charge</p>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Order</p>
                  <p className="font-medium text-slate-900 dark:text-white">{tourTitle}</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Amount</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {formatAmount(order.amount, order.currency)}
                  </p>
                </div>
                {order.notes && (
                  <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Notes</p>
                    <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">{order.notes}</p>
                  </div>
                )}
              </div>
              {paid ? (
                <div className="px-6 py-8 text-center border-t border-slate-200 dark:border-gray-700">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Payment complete</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    This order will appear as paid in your account and in our admin.
                  </p>
                  <Link
                    href="/"
                    className="mt-6 inline-block rounded-xl bg-teal-600 text-white px-6 py-3 text-sm font-medium hover:bg-teal-700"
                  >
                    Back to home
                  </Link>
                </div>
              ) : (
                <>
                  <div className="px-6 py-4 border-t border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800/50">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Demo card (no real payment)</p>
                    <div className="rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-slate-400 dark:text-slate-500 text-sm">
                      Card: 4242 4242 4242 4242
                    </div>
                  </div>
                  <div className="px-6 py-5 border-t border-slate-200 dark:border-gray-700">
                    {status === 'paid' ? (
                      <p className="text-center text-teal-600 dark:text-teal-400 font-medium">This order is already paid.</p>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={paying}
                        className="w-full rounded-xl bg-teal-600 text-white py-3.5 font-medium hover:bg-teal-700 disabled:opacity-50"
                      >
                        {paying ? 'Processing…' : 'Pay now (demo)'}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
