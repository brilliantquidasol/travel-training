import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';
import TourDetails from '../../components/TourDetails';

export default function TourDetailsPage({ tour }) {
  if (!tour) {
    return (
      <Layout>
        <p className="text-gray-700 dark:text-gray-200 p-6">Tour not found.</p>
        <Link href="/" className="text-blue-600 hover:text-blue-800 ml-6">← Back to tours</Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block p-4">
        ← Back to tours
      </Link>
      <div className="max-w-4xl mx-auto">
        <TourDetails tour={tour} />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  if (!supabase) {
    return { paths: [], fallback: true };
  }
  const { data: tours, error } = await supabase.from('tours').select('id');
  if (error || !tours?.length) {
    return { paths: [], fallback: true };
  }
  const paths = tours.map((t) => ({ params: { id: t.id } }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  if (!params?.id || !supabase) {
    return { props: { tour: null } };
  }
  const { data: tour, error } = await supabase.from('tours').select('*').eq('id', params.id).single();
  if (error) return { props: { tour: null } };
  return { props: { tour: tour || null } };
}
