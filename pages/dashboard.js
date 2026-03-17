import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

function formatDate(val) {
  if (!val) return '—';
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? val : d.toLocaleDateString(undefined, { dateStyle: 'medium' });
}

const statusStyles = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-teal-100 text-teal-800',
  cancelled: 'bg-slate-100 text-slate-600',
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, role, loading, signOut } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/signin?redirect=/dashboard');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user?.email) return;
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setInquiries(list.filter((b) => (b.email || '').toLowerCase() === (user.email || '').toLowerCase()));
      })
      .catch(() => setInquiries([]))
      .finally(() => setInquiriesLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <Layout>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </main>
        <Footer />
      </Layout>
    );
  }

  if (!user) return null;

  const name = profile?.full_name || user.email?.split('@')[0] || 'Traveler';

  return (
    <Layout>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Welcome */}
          <section className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Welcome back, {name}
            </h1>
            <p className="text-slate-600 mt-1">
              Manage your booking inquiries and explore more adventures.
            </p>
          </section>

          {/* My booking inquiries */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">My booking inquiries</h2>
              <Link href="/#tours" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                Book a tour →
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              {inquiriesLoading ? (
                <div className="p-6 text-center text-slate-500">Loading...</div>
              ) : inquiries.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-slate-600">You haven’t submitted any booking inquiries yet.</p>
                  <Link href="/#tours" className="inline-block mt-3 text-teal-600 font-medium hover:underline">
                    Browse tours
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {inquiries.slice(0, 5).map((b) => (
                    <li key={b.id} className="p-4 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium text-slate-900">{b.tour?.title || 'Tour inquiry'}</p>
                        <p className="text-sm text-slate-500">{formatDate(b.date || b.created_at)}</p>
                      </div>
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusStyles[b.status] || statusStyles.pending}`}>
                        {b.status || 'pending'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Quick links */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Explore</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/#tours"
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition"
              >
                <span className="text-2xl">🗺️</span>
                <p className="font-semibold text-slate-900 mt-2">Tours & packages</p>
                <p className="text-sm text-slate-500 mt-0.5">Find your next adventure</p>
              </Link>
              <Link
                href="/destinations"
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition"
              >
                <span className="text-2xl">📍</span>
                <p className="font-semibold text-slate-900 mt-2">Destinations</p>
                <p className="text-sm text-slate-500 mt-0.5">Explore top destinations</p>
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition"
              >
                <span className="text-2xl">✉️</span>
                <p className="font-semibold text-slate-900 mt-2">Contact us</p>
                <p className="text-sm text-slate-500 mt-0.5">Questions or custom trips</p>
              </Link>
            </div>
          </section>

          {/* Account & suggested sections */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Account</h2>
              <p className="text-sm text-slate-600 mb-4">Update your profile and preferences.</p>
              <Link
                href="/account"
                className="inline-flex items-center font-medium text-teal-600 hover:text-teal-700"
              >
                Account settings →
              </Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm border-dashed">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">More coming soon</h2>
              <p className="text-sm text-slate-500 mb-2">Suggested sections you could add later:</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>· Wishlist / saved tours</li>
                <li>· Order history & receipts</li>
                <li>· Travel preferences & alerts</li>
                <li>· Upcoming trips calendar</li>
              </ul>
            </div>
          </section>

          {role === 'admin' && (
            <div className="mt-8 p-4 rounded-xl bg-teal-50 border border-teal-200">
              <Link href="/admin/dashboard" className="font-medium text-teal-800 hover:text-teal-900">
                Go to Admin dashboard →
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
