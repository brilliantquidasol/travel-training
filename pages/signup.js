import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);
    if (!supabase) {
      setMessage({ type: 'error', text: 'Sign up is not configured. Please set Supabase environment variables.' });
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message });
      return;
    }
    if (data?.user?.identities?.length === 0) {
      setMessage({ type: 'error', text: 'An account with this email already exists. Try signing in.' });
      return;
    }
    if (data?.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: name,
        role: 'user',
      }, { onConflict: 'id' });
    }
    setMessage({ type: 'success', text: 'Check your email to confirm your account, then sign in.' });
    setName('');
    setEmail('');
    setPassword('');
    setTimeout(() => router.push('/signin'), 2000);
  };

  return (
    <Layout>
      <Navbar />
      <section className="section min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Create an account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Join TravelPro to save your preferences and manage bookings.
          </p>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-4">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full name</label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
              <input
                id="signup-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password *</label>
              <input
                id="signup-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="At least 6 characters"
              />
            </div>
            {message.text && (
              <p className={`text-sm ${message.type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-primary-600 dark:text-primary-400'}`}>
                {message.text}
              </p>
            )}
            <button type="submit" className="btn-primary w-full hover:text-white py-3.5 rounded-xl" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/signin" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </Layout>
  );
}
