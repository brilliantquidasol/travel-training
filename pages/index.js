import Link from 'next/link';
import Layout from '../components/Layout';
import TourList from '../components/TourList';
import { supabase } from '../lib/supabase';

export default function Home({ tours }) {
  const list = Array.isArray(tours) ? tours : [];
  return (
    <Layout>
      <header className="flex justify-between items-center mb-8 p-4">
        <h1 className="text-4xl font-bold text-center flex-1 text-gray-900 dark:text-white">Explore Our Tours</h1>
        <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
          Admin
        </Link>
      </header>
      {list.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center p-4">No tours yet. Add some in the admin.</p>
      ) : (
        <TourList tours={list} />
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  if (!supabase) {
    return { props: { tours: [] } };
  }
  const { data: tours, error } = await supabase.from('tours').select('*');
  if (error) return { props: { tours: [] } };
  return { props: { tours: tours || [] } };
}
