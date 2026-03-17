import Link from 'next/link';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import { referenceAssets } from '../lib/referenceAssets';
import { destinations } from '../lib/destinationsData';

export default function DestinationsPage() {
  return (
    <Layout>
      <Navbar />

      <HeroBanner
        imageSrc={referenceAssets.hero}
        subtitle="Destinations"
        title="Popular Destinations"
        description="Explore our top destinations and find the perfect trip for you."
        cta={{ label: 'View Tours', href: '/#tours' }}
      />

      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 text-center font-medium">Explore</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Top Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <Link key={i} href={`/destinations/${dest.slug}`} className="group block">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-white font-bold text-xl">{dest.title}</h3>
                  <p className="text-white/90 text-sm mt-1">{dest.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
