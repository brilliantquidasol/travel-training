import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent';

export default function SignInPage() {
  const router = useRouter();
  const redirect = (router.query.redirect && typeof router.query.redirect === 'string') ? router.query.redirect : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);
    if (!supabase) {
      setMessage({ type: 'error', text: 'Sign in is not configured. Please set Supabase environment variables.' });
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      setMessage({ type: 'error', text: error.message });
      return;
    }
    if (data?.user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single();
      const isAdmin = profile?.role === 'admin';
      setLoading(false);
      setMessage({ type: 'success', text: 'Signed in successfully. Redirecting...' });
      const target = redirect && redirect !== '/' ? redirect : (isAdmin ? '/admin/dashboard' : '/');
      const finalTarget = target.startsWith('/') ? target : '/';
      setTimeout(() => router.push(finalTarget), 1000);
    } else {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Navbar />
      <section className="section min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Sign in
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Welcome back. Sign in to your TravelPro account.
          </p>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-4">
            <div>
              <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
              <input
                id="signin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password *</label>
              <input
                id="signin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Your password"
              />
            </div>
            {message.text && (
              <p className={`text-sm ${message.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-primary-600 dark:text-primary-400'}`}>
                {message.text}
              </p>
            )}
            <button type="submit" className="btn-primary w-full hover:text-white py-3.5 rounded-xl" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </Layout>
  );
}
