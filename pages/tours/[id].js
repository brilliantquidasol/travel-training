import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import Layout from '../../components/Layout';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TourDetails from '../../components/TourDetails';
import TourCard from '../../components/TourCard';
import { getTourImageUrl } from '../../lib/placeholderImages';

export default function TourDetailsPage({ tour, otherTours }) {
  if (!tour) {
    return (
      <Layout>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24">
          <p className="text-gray-700 dark:text-gray-200 text-lg">Tour not found.</p>
          <Link href="/#tours" className="mt-4 btn-primary hover:text-white">← Back to tours</Link>
        </div>
        <Footer />
      </Layout>
    );
  }

  const similarTours = Array.isArray(otherTours) ? otherTours.slice(0, 4) : [];

  return (
    <Layout>
      <Navbar />

      {/* Full-width hero – same layout as landing (/) */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getTourImageUrl(tour)}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 px-4 pt-28 pb-28 md:pt-32 md:pb-32 w-full max-w-4xl mx-auto">
          <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-white/90 mb-3">
            Tour Package
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {tour.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-white/90 text-base sm:text-lg">
            {tour.duration && <span>{tour.duration}</span>}
            {tour.price != null && tour.price !== '' && (
              <span className="font-semibold text-white">From ${Number(tour.price).toLocaleString()}</span>
            )}
          </div>
          <Link
            href="#book"
            className="inline-block mt-8 btn-primary hover:text-white px-6 py-3.5 rounded-xl"
          >
            Book this tour
          </Link>
        </div>
      </section>

      {/* Main content – overview, highlights, itinerary, gallery, booking */}
      <section className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <TourDetails tour={tour} hideHero />
      </section>

      {/* What's included / Not included */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium text-center">Your package</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">What&apos;s included</h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-primary-200/60 dark:border-primary-700/50 bg-primary-50/50 dark:bg-primary-900/20 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm">✓</span>
              Included
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Everything covered in your tour price.</p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5 shrink-0">✓</span> Expert local guide throughout the tour</li>
              <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5 shrink-0">✓</span> All transport as described in the itinerary</li>
              <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5 shrink-0">✓</span> Entrance fees to sites and attractions listed</li>
              <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5 shrink-0">✓</span> Accommodation where specified (tours with overnight stays)</li>
              <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5 shrink-0">✓</span> 24/7 support and booking confirmation by email</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 p-6 md:p-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-white text-sm">✕</span>
              Not included
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You may need to arrange or pay for these separately.</p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 shrink-0">✕</span> Flights and travel to the starting point</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 shrink-0">✕</span> Travel and medical insurance</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 shrink-0">✕</span> Meals and drinks unless stated in the itinerary</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 shrink-0">✕</span> Personal expenses, tips, and optional activities</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5 shrink-0">✕</span> Visa and vaccination costs where required</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Good to know */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">Good to know</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Before you book</h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
          <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-sm">1</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Free cancellation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cancel up to 24 hours before for a full refund.</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold text-sm">2</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Confirm instantly</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Get confirmation and details by email.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Similar tours */}
      {similarTours.length > 0 && (
        <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">Explore more</p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Similar tours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarTours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/#tours" className="btn-primary hover:text-white">View all tours</Link>
          </div>
        </section>
      )}

      {/* Ready to book – full width */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-600 to-primary-700 dark:from-primary-800 dark:to-primary-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to book {tour.title}?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Fill in the booking form above or call us for same-day assistance. We&apos;re here to help you plan the perfect trip.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#book" className="inline-flex items-center gap-2 rounded-xl bg-white text-primary-700 hover:bg-gray-100 font-semibold px-6 py-3.5 transition shadow-lg">
              Go to booking form
            </a>
            <a href="tel:+1546378654" className="inline-flex items-center gap-2 rounded-xl border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3.5 transition">
              Call +1 546 378 654
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/80 text-white hover:bg-white/10 font-semibold px-6 py-3.5 transition">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
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
    return { props: { tour: null, otherTours: [] } };
  }
  const { data: tour, error } = await supabase.from('tours').select('*').eq('id', params.id).single();
  if (error) return { props: { tour: null, otherTours: [] } };

  const { data: otherTours } = await supabase
    .from('tours')
    .select('*')
    .neq('id', params.id)
    .limit(4);

  return { props: { tour: tour || null, otherTours: otherTours || [] } };
}
