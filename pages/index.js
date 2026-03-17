import Link from 'next/link';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import TourCard from '../components/TourCard';
import { supabase } from '../lib/supabase';
import { referenceAssets } from '../lib/referenceAssets';

export default function Landing({ tours }) {
  const list = Array.isArray(tours) ? tours : [];
  const featuredTours = list.slice(0, 3);

  const coreValues = [
    { title: 'Customer Delight', desc: 'We deliver the best service and experience for our customers.', icon: referenceAssets.coreValueIcons.customerDelight },
    { title: 'Trusted Adventure', desc: 'Book with confidence. We handle every detail with expertise and reliability.', icon: referenceAssets.coreValueIcons.trustedAdventure },
    { title: 'Expert Guides', desc: 'Local experts and curated itineraries for memorable journeys.', icon: referenceAssets.coreValueIcons.expertGuides },
    { title: 'Time Flexibility', desc: 'Choose dates that work for you. We adapt to your schedule.', icon: referenceAssets.coreValueIcons.timeFlexibility },
  ];

  const stats = [
    { value: '500', suffix: '+', label: 'Holiday Package' },
    { value: '100', suffix: '+', label: 'Luxury Hotel' },
    { value: '77', suffix: 'k', label: 'Premium Airlines' },
    { value: '80', suffix: 'K+', label: 'Happy Customer' },
  ];

  const howItWorks = [
    { step: '01', title: 'Get Travel Insurance', desc: 'We help you stay protected with flexible travel insurance options.', image: referenceAssets.howItWorks[0] },
    { step: '02', title: 'Compare & Book', desc: 'Browse tours, compare prices, and book in a few clicks.', image: referenceAssets.howItWorks[1] },
    { step: '03', title: 'Book a Room', desc: 'Secure your stay. We handle accommodations as part of your package.', image: referenceAssets.howItWorks[2] },
  ];

  return (
    <Layout>
      <Navbar />

      {/* Hero - reference hero image */}
      <section className="pt-24 relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={referenceAssets.hero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/50" />
        </div>
        <div className="relative z-10 px-4 py-24">
          <p className="text-sm sm:text-base uppercase tracking-widest text-white/90 mb-4">
            Let&apos;s Travel The World With Us
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            Travel Top Destination of The World
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Discover curated tours, adventures, and experiences for every traveler.
          </p>
          <Link href="#tours" className="glass-btn px-8 py-3 text-lg font-semibold inline-block transition">
            Find Tours
          </Link>
        </div>
      </section>

      {/* About - reference: "We are Professional Planners For your" */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">About Us</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          We are Professional Planners For your
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We are professional planners dedicated to creating seamless and memorable travel experiences. From carefully designed tour packages to personalized journeys, we handle every detail with expertise and reliability.
            </p>
            <p className="text-gray-600 dark:text-gray-400 font-medium mb-6">
              Speak to our Destination Experts at Direct Call +1 546 378 654
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {['All places and activities are carefully picked by us.', '98% course completion rates.', 'We are an award winning agency.', 'Trusted by more than 80,000 customers.'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {item}
                </li>
              ))}
            </ul>
            <Link href="/about" className="glass-btn mt-6 inline-block">Read More</Link>
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
            <img src={referenceAssets.about} alt="Travel planning" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Core Values - reference background + icons */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 z-0">
          <img src={referenceAssets.coreValueBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((item, i) => (
              <div key={i} className="glass p-6 rounded-xl text-center">
                <img src={item.icon} alt="" className="w-14 h-14 mx-auto mb-4 object-contain" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tours - reference: "CHOOSE YOUR PACKAGE" / "Popular Tours Packages" */}
      <section id="tours" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 text-center">Choose Your Package</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Popular Tours Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        {featuredTours.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">No featured tours yet.</p>
        )}
      </section>

      {/* Travel Point / FunFact - reference image + stats */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={referenceAssets.funfactBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Travel Point</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Discover The World With Our Guide
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="glass p-4 rounded-xl">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}{s.suffix}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <img src={referenceAssets.funfactImage} alt="Travel" className="max-h-80 w-auto object-contain rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations - reference images (same as TravelPro site) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 text-center">Popular Destination</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {referenceAssets.destinations.map((dest, i) => (
            <Link key={i} href="#tours" className="group block">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition">
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold">{dest.title}</h3>
                  <p className="text-white/90 text-sm">{dest.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial Banner - reference background image */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden min-h-[320px] flex flex-col items-center justify-center text-center p-10 md:p-16">
            <img src={referenceAssets.testimonialBanner} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#102039]/90" />
            <div className="relative z-10 text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">A Truly Wonderful Experience</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Brilliant for anyone looking to get away from the hustle and bustle of city life or detox from their tech for a few days. I could have stayed another week! They really have thought about everything here down to the finest details.
              </p>
              <p className="text-white/70 text-sm">15 Oct 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - reference: "Getting Started? It's Simple" */}
      <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 text-center">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Getting Started? It&apos;s Simple
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <div key={i} className="glass p-8 rounded-xl text-center">
                <img src={item.image} alt={item.title} className="w-20 h-20 mx-auto mb-4 object-contain" />
                <span className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-2 block">{item.step}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="glass max-w-3xl mx-auto p-10 rounded-2xl shadow-xl">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Ready for Your Next Adventure?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Sign up today and explore tours crafted for every type of traveler.
          </p>
          <Link href="/signup" className="glass-btn px-8 py-3 text-lg font-semibold transition">
            Get Started
          </Link>
        </div>
      </section>

      {/* All Tours */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          All Tours
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {list.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400">No tours yet. Add some in the admin.</p>
        )}
      </section>
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
