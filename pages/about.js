import Link from 'next/link';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import { referenceAssets } from '../lib/referenceAssets';

const aboutFeatures = [
  'All placges and activiates are carefully picked by us.',
  '98% Course Completitation Rates',
  'We are an award winning agency',
  'Trusted by more than 80,000 customers',
];

const stats = [
  { value: '500+', label: 'Tours Completed' },
  { value: '80k+', label: 'Happy Travelers' },
  { value: '50+', label: 'Destinations' },
  { value: '15+', label: 'Years Experience' },
];

const values = [
  { title: 'Expert Planning', desc: 'Every itinerary is crafted by seasoned travel experts.' },
  { title: '24/7 Support', desc: 'We’re here before, during, and after your trip.' },
  { title: 'Best Price', desc: 'We match or beat prices for the same experiences.' },
];

export default function AboutPage() {
  return (
    <Layout>
      <Navbar />

      {/* Hero banner */}
      <HeroBanner
        imageSrc={referenceAssets.coreValueBg}
        subtitle="About Us"
        title="We are Professional Planners For your"
        description="We are professional planners dedicated to creating seamless and memorable travel experiences for every traveler."
        cta={{ label: 'Explore Tours', href: '/#tours' }}
      />

      {/* 1. Our Story */}
      <section id="our-story" className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="relative flex justify-center min-h-[320px]">
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img src={referenceAssets.about} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img src={referenceAssets.destinations[0]?.image || referenceAssets.about} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">Our Story</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Creating Memorable Travel Experiences
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              We are professional planners dedicated to creating seamless and memorable travel experiences. From carefully designed tour packages to personalized journeys, we handle every detail with expertise and reliability.
            </p>
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-6">
              Speak to our Destination Experts at Direct Call +1 546 378 654
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              {aboutFeatures.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center"><svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us - stats strip */}
      <section className="section bg-gray-50 dark:bg-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 text-center font-medium">Why Choose Us</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Numbers That Speak
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, i) => (
              <div key={i} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-3xl sm:text-4xl font-bold text-primary-500">{item.value}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 text-center font-medium">Our Values</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((item, i) => (
            <div key={i} className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA - Get in touch */}
      <section className="section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Plan Your Trip?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Speak to our Destination Experts — we’re here to help you create the perfect journey.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:+1546378654" className="btn-primary">Call +1 546 378 654</a>
          <Link href="/#contact" className="rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 px-6 py-3.5 font-medium transition">
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}
