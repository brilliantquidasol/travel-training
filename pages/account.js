import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function AccountPage() {
  const router = useRouter();
  const { user, profile, role, loading, signOut } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/signin?redirect=/account');
      return;
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

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

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your account</h1>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-gray-900">{profile?.full_name || '—'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900">{user.email || '—'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="text-gray-900 capitalize">{role || 'user'}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {role === 'admin' && (
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
              >
                Admin dashboard
              </Link>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
