import Link from 'next/link';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroBanner from '../../components/HeroBanner';
import { getDestinationBySlug, getAllDestinationSlugs } from '../../lib/destinationsData';

export default function DestinationDetailPage({ destination }) {
  if (!destination) {
    return (
      <Layout>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24">
          <p className="text-gray-700 dark:text-gray-200 text-lg">Destination not found.</p>
          <Link href="/destinations" className="mt-4 btn-primary hover:text-white">← All destinations</Link>
        </div>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />

      <HeroBanner
        imageSrc={destination.image}
        subtitle="Destination"
        title={destination.title}
        description={destination.subtitle}
        cta={{ label: 'View tours', href: '/#tours' }}
      />

      <section className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">Overview</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About {destination.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {destination.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/#tours" className="btn-primary hover:text-white">
            View tours to {destination.title}
          </Link>
          <Link href="/destinations" className="rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 px-6 py-3.5 font-medium transition">
            All destinations
          </Link>
        </div>
      </section>

      <section className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-primary-50 dark:bg-primary-900/20 rounded-2xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Ready to explore {destination.title}?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Browse our tours or get in touch to plan a custom trip.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/#tours" className="btn-primary hover:text-white">Browse tours</Link>
          <Link href="/contact" className="rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 px-6 py-3.5 font-medium transition">
            Contact us
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getAllDestinationSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const destination = getDestinationBySlug(params.slug);
  return { props: { destination } };
}
