import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TourCard from '../components/TourCard';
import { getTourImageUrl } from '../lib/placeholderImages';
import { supabase } from '../lib/supabase';
import { referenceAssets } from '../lib/referenceAssets';

function filterToursByQuery(tours, q) {
  if (!q || typeof q !== 'string') return tours;
  const term = q.trim().toLowerCase();
  if (!term) return tours;
  return tours.filter((t) => {
    const title = (t.title || '').toLowerCase();
    const desc = (t.description || '').toLowerCase();
    const category = (t.category || '').toLowerCase();
    return title.includes(term) || desc.includes(term) || category.includes(term);
  });
}

const DESTINATION_NAMES = [
  ...referenceAssets.destinations.map((d) => d.title),
  'Paris, France',
  'Bali, Indonesia',
  'Tokyo, Japan',
  'Maldives',
  'Swiss Alps',
  'New York, USA',
  'London, UK',
  'Dubai, UAE',
  'Paris',
  'Bali',
  'Tokyo',
  'Prydelands',
];

function searchMatchesDestination(term) {
  if (!term) return false;
  return DESTINATION_NAMES.some(
    (name) => name && (name.toLowerCase().includes(term) || term.includes(name.toLowerCase()))
  );
}

export default function Landing({ tours }) {
  const router = useRouter();
  const searchQuery = typeof router.query.q === 'string' ? router.query.q : '';
  const list = Array.isArray(tours) ? tours : [];
  const filteredList = useMemo(() => {
    const tourMatches = filterToursByQuery(list, searchQuery);
    if (tourMatches.length > 0) return tourMatches;
    const term = (searchQuery || '').trim().toLowerCase();
    if (!term) return list;
    if (searchMatchesDestination(term)) return list;
    return tourMatches;
  }, [list, searchQuery]);
  const featuredTours = searchQuery ? filteredList.slice(0, 8) : list.slice(0, 4);
  const lastMinuteTours = list.slice(0, 2);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#tours') {
      const el = document.getElementById('tours');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchQuery, router.asPath]);

  const [searchDestinations, setSearchDestinations] = useState('');
  const [searchGuests, setSearchGuests] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const destinationSuggestions = [
    ...referenceAssets.destinations.map((d) => d.title),
    'Paris, France',
    'Bali, Indonesia',
    'Tokyo, Japan',
    'Maldives',
    'Swiss Alps',
    'New York, USA',
    'London, UK',
    'Dubai, UAE',
  ].filter((name) => name.toLowerCase().includes(searchDestinations.toLowerCase().trim()));

  const guestOptions = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests'];

  const aboutFeatures = [
    'All placges and activiates are carefully picked by us.',
    '98% Course Completitation Rates',
    'We are an award winning agency',
    'Trusted by more than 80,000 customers',
  ];

  const coreValues = [
    { title: 'Customer Delight', desc: 'We deliver the best service and you to experience for our customer we est service and you to experie', icon: referenceAssets.coreValueIcons.customerDelight },
    { title: 'Trusted Adventure', desc: 'We deliver the best service and you to experience for our customer we est service and you to experie', icon: referenceAssets.coreValueIcons.trustedAdventure },
    { title: 'Expert Guides', desc: 'We deliver the best service and you to experience for our customer we est service and you to experie', icon: referenceAssets.coreValueIcons.expertGuides },
    { title: 'Time Flexibility', desc: 'We deliver the best service and you to experience for our customer we est service and you to experie', icon: referenceAssets.coreValueIcons.timeFlexibility },
  ];

  const funfactStats = [
    { value: '500', suffix: '+', label: 'Holiday Package' },
    { value: '100', suffix: '+', label: 'Luxury Hotel' },
    { value: '77', suffix: 'k', label: 'Premium Airlines' },
    { value: '80', suffix: 'K+', label: 'Happy Customer' },
  ];

  return (
    <Layout>
      <Navbar />

      {/* 1. Hero - exact reference: sub title, title, Destinations / Guests / Find Now */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={referenceAssets.hero} alt="" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 px-4 pt-28 pb-28 md:pt-32 md:pb-32 w-full max-w-4xl mx-auto">
          <p className="text-sm sm:text-base uppercase tracking-[0.2em] text-white/90 mb-4">
            Let&apos;s Travel The World With Us
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10 text-white tracking-tight">
            Travel Top Destination of The World
          </h1>
          <form
              className="bg-white rounded-xl shadow-2xl p-2 sm:p-3 flex flex-col sm:flex-row gap-2 sm:gap-0 w-full max-w-3xl mx-auto relative"
              onSubmit={(e) => {
                e.preventDefault();
                const q = searchDestinations.trim();
                if (q) {
                  router.push(router.pathname + '?q=' + encodeURIComponent(q) + '#tours');
                  setTimeout(() => {
                    const el = document.getElementById('tours');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                } else {
                  router.push(router.pathname + '#tours');
                  setTimeout(() => {
                    const el = document.getElementById('tours');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }}
            >
            <div className="flex-1 flex flex-col sm:flex-row sm:divide-x divide-gray-200 relative">
              {/* Destinations with suggestions */}
              <div className="flex-1 relative flex items-center">
                <span className="absolute left-3 text-gray-400 pointer-events-none" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <input
                  type="text"
                  placeholder="Destinations"
                  value={searchDestinations}
                  onChange={(e) => {
                    setSearchDestinations(e.target.value);
                    setShowDestSuggestions(true);
                  }}
                  onFocus={() => setShowDestSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-l-xl sm:rounded-none border-0 bg-transparent text-gray-800 placeholder-gray-500 focus:ring-0 min-w-0 focus:outline-none"
                  autoComplete="off"
                />
                {showDestSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-56 overflow-y-auto z-50">
                    {destinationSuggestions.length > 0 ? (
                      destinationSuggestions.slice(0, 8).map((name) => (
                        <button
                          key={name}
                          type="button"
                          className="w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors text-sm"
                          onMouseDown={() => {
                            setSearchDestinations(name);
                            setShowDestSuggestions(false);
                          }}
                        >
                          {name}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">No destinations match</div>
                    )}
                  </div>
                )}
              </div>
              {/* Guests with dropdown */}
              <div className="flex-1 relative flex items-center">
                <span className="absolute left-3 text-gray-400 pointer-events-none" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </span>
                <input
                  type="text"
                  placeholder="Guests"
                  value={searchGuests}
                  readOnly
                  onFocus={() => setShowGuestsDropdown(true)}
                  onClick={() => setShowGuestsDropdown(true)}
                  onBlur={() => setTimeout(() => setShowGuestsDropdown(false), 200)}
                  className="w-full pl-10 pr-4 py-3.5 border-0 bg-transparent text-gray-800 placeholder-gray-500 focus:ring-0 min-w-0 focus:outline-none cursor-pointer"
                />
                {showGuestsDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    {guestOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${searchGuests === opt ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-800 hover:bg-gray-100'}`}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearchGuests(opt);
                          setShowGuestsDropdown(false);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="btn-primary rounded-xl shrink-0 py-3.5 px-4 text-sm">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap" style={{ minWidth: 'max-content' }}>
                Find Now
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. About Us - exact reference copy */}
      <section id="about" className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">About Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              We are Professional Planners For your
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
            <Link href="/about" className="btn-primary">Read More</Link>
          </div>
        </div>
      </section>

      {/* 3. Core Value - full width bg image, 4 cards */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] section overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={referenceAssets.coreValueBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
                <img src={item.icon} alt="" className="w-14 h-14 mx-auto mb-4 object-contain" />
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular Tours Packages - keep tours */}
      <section id="tours" className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 text-center font-medium">
          {searchQuery ? 'Search results' : 'Choose Your Package'}
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {searchQuery ? `Tours matching "${searchQuery}"` : 'Popular Tours Packages'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        {featuredTours.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {searchQuery ? `No tours match "${searchQuery}".` : 'No featured tours yet.'}
          </p>
        )}
      </section>

      {/* 5. Travel Point - Discover The World With Our Guide */}
      <section className="section bg-gray-50 dark:bg-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 font-medium">Travel Point</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Discover The World With Our Guide
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {funfactStats.map((s, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}{s.suffix}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <img src={referenceAssets.funfactImage} alt="Travel" className="max-h-[380px] w-auto object-contain rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Popular Destinations */}
      <section id="destinations" className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 text-center font-medium">Popular Destination</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {referenceAssets.destinations.map((dest, i) => (
            <Link key={i} href="#tours" className="group block">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <img src={dest.image} alt={dest.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">{dest.title}</h3>
                  <p className="text-white/90 text-sm">{dest.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Banner - A Truly Wonderful Experience, overlay #102039 */}
      <section className="section">
        <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] overflow-hidden">
          <img src={referenceAssets.testimonialBanner} alt="" className="w-full min-h-[380px] object-cover" />
          <div className="absolute inset-0 bg-[#102039]/90" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                A Truly Wonderful Experience
              </h2>
              <p className="text-white/90 mb-4 whitespace-pre-line">
                Brilliant for anyone looking to get away from the hustle and bustle of city life or detox from their tech for a few days. I could have stayed another week!{'\n\n'}They really have thought about everything here down to the finest details.
              </p>
              <p className="text-white/70 text-sm">15 Oct 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. How It Works - Getting Started? It's Simple */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 text-center font-medium">How It Works</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Getting Started? It&apos;s Simple
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {referenceAssets.howItWorks.map((item, i) => (
            <div key={i} className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-500 mx-auto shadow-lg">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Our Journey in Videos */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] section overflow-hidden">
        <img src={referenceAssets.videoBg} alt="" className="w-full min-h-[420px] object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <p className="text-white/90 text-sm uppercase tracking-[0.2em] mb-2">Our Journey in Videos</p>
          <button type="button" className="w-20 h-20 rounded-full bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95" aria-label="Play video">
            <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
          </button>
          <p className="text-white/80 text-sm mt-4">Location Mountain Strait, Any State</p>
        </div>
      </section>

      {/* 10. Partners - logo images */}
      <section className="section max-w-6xl mx-auto px-4 flex flex-wrap justify-center items-center gap-10 md:gap-16">
        {referenceAssets.partners.map((logo, i) => (
          <img key={i} src={logo} alt="" className="h-8 md:h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
        ))}
      </section>

      {/* 11. Last Minute Amazing Deals - News & Blogs */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-2 text-center font-medium">News & Blogs</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Last Minute Amazing Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lastMinuteTours.length > 0 ? lastMinuteTours.map((tour) => (
            <Link key={tour.id} href={`/tours/${tour.id}`} className="group block glass-card rounded-2xl overflow-hidden">
              <div className="relative h-56">
                <img src={getTourImageUrl(tour)} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{tour.title}</h3>
                  <div className="flex gap-4 text-white/90 text-sm mt-1">
                    <span>{tour.price != null && tour.price !== '' ? `$${Number(tour.price).toLocaleString()}` : 'Price on request'}</span>
                    {tour.duration && <span>{tour.duration}</span>}
                  </div>
                  <span className="inline-block mt-4 btn-primary text-sm py-2 px-4 w-fit">
                    Book Now
                  </span>
                </div>
              </div>
            </Link>
          )) : (
            <div className="md:col-span-2 text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-500 dark:text-gray-400">
              No deals at the moment. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Now / Contact */}
      <section id="contact" className="section bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" aria-hidden />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5 text-white text-center md:text-left">
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20 border border-white/30 shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">Subscribe Now</h3>
                <p className="text-white/90 text-sm mt-1">Get the best deals and travel inspiration in your inbox.</p>
              </div>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full md:w-auto md:min-w-[380px]" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" value={subscribeEmail} onChange={(e) => setSubscribeEmail(e.target.value)} className="flex-1 px-4 py-3.5 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none min-w-0 border-0 shadow-inner" />
              <button type="submit" className="btn-secondary whitespace-nowrap py-3.5 px-6">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* All Tours */}
      <section className="section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {searchQuery ? `All results for "${searchQuery}"` : 'All Tours'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {(searchQuery ? filteredList : list).map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
        {(searchQuery ? filteredList : list).length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {searchQuery ? `No tours match "${searchQuery}".` : 'No tours yet. Add some in the admin.'}
          </p>
        )}
      </section>

      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  if (!supabase) return { props: { tours: [] } };
  const { data: tours, error } = await supabase.from('tours').select('*');
  if (error) return { props: { tours: [] } };
  return { props: { tours: tours || [] } };
}
