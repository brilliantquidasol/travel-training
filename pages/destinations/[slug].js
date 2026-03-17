import { useState, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroBanner from '../../components/HeroBanner';
import BookingForm from '../../components/BookingForm';
import { getDestinationBySlug, getAllDestinationSlugs } from '../../lib/destinationsData';
import { referenceAssets } from '../../lib/referenceAssets';

/** Dummy tours for destination inner pages (same style as main tour cards) */
const dummyTours = [
  { id: 'classic', title: 'Classic Highlights Tour', duration: '1 Day', price: 89, image: referenceAssets.hero, location: 'Destination' },
  { id: 'extended', title: 'Extended Experience', duration: '3 Days', price: 299, image: referenceAssets.coreValueBg, location: 'Destination' },
  { id: 'premium', title: 'Premium Package', duration: '5 Days', price: 549, image: referenceAssets.testimonialBanner, location: 'Destination' },
  { id: 'week', title: 'Week Explorer', duration: '7 Days', price: 799, image: referenceAssets.funfactImage, location: 'Destination' },
];

function StarRating({ rating = 4.8 }) {
  return (
    <span className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1.5 text-white text-sm font-medium drop-shadow-sm">{rating}</span>
    </span>
  );
}

export default function DestinationDetailPage({ destination }) {
  const [selectedTour, setSelectedTour] = useState(null);
  const scrollToBook = useCallback(() => {
    document.getElementById('book-destination')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

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

      {/* Overview */}
      <section className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">Overview</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About {destination.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {destination.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="#tours-here" className="btn-primary hover:text-white">
            View tours to {destination.title}
          </Link>
          <Link href="/destinations" className="rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 px-6 py-3.5 font-medium transition">
            All destinations
          </Link>
        </div>
      </section>

      {/* Why visit */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/40">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium text-center">Reasons to go</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Why visit {destination.title}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <span className="inline-flex w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 items-center justify-center text-xl font-bold mb-3">1</span>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Unforgettable sights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Experience iconic views and photo opportunities.</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <span className="inline-flex w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 items-center justify-center text-xl font-bold mb-3">2</span>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Expert-led tours</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Local guides share stories and hidden gems.</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <span className="inline-flex w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 items-center justify-center text-xl font-bold mb-3">3</span>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Flexible options</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">From half-day to multi-day packages.</p>
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">Good to know</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Before you go
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <span className="text-primary-500 font-bold">•</span>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Best time to visit depends on the season; we can advise based on your dates.</p>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <span className="text-primary-500 font-bold">•</span>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Tours include transport and guide; some meals and entries may be extra.</p>
          </div>
        </div>
      </section>

      {/* Tours at this destination – same style as main tour cards */}
      <section id="tours-here" className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium text-center">Tours</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Tours at {destination.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dummyTours.map((tour) => (
            <Link
              key={tour.id}
              href="#book-destination"
              onClick={() => { setSelectedTour(tour); scrollToBook(); }}
              className="group block glass-card"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
                  <span className="text-white text-sm font-medium drop-shadow-md">{tour.location || destination.title}</span>
                  <span className="badge-light">{tour.duration}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <StarRating rating={4.8} />
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                  {tour.title}
                </h3>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="btn-primary text-sm py-2 px-4 inline-block cursor-pointer">Book Now</span>
                  <span className="font-bold text-gray-900 dark:text-white">${Number(tour.price).toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          All tours are subject to availability. View full list on our <Link href="/#tours" className="text-primary-600 dark:text-primary-400 hover:underline">tours page</Link>.
        </p>
      </section>

      {/* Book a tour – form (same as tour detail booking) */}
      <section id="book-destination" className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-500/10 via-primary-50/50 to-primary-500/10 dark:from-primary-900/30 dark:via-gray-800/50 dark:to-primary-900/30 border-y border-primary-200/50 dark:border-primary-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 font-medium mb-2">Reserve your spot</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Book a tour at {destination.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {selectedTour
              ? `Booking: ${selectedTour.title}. Enter your details below and we’ll confirm your request.`
              : 'Select a tour above or enter your details below and we’ll help you choose the right package.'}
          </p>
          <div className="bg-white dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-left">
            <BookingForm
              tourId={null}
              tourLabel={selectedTour?.title}
              destinationLabel={destination.title}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
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
