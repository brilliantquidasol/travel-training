import BookingForm from './BookingForm';
import { getTourImageUrl } from '../lib/placeholderImages';
import { referenceAssets } from '../lib/referenceAssets';

/** Placeholder gallery images when tour has none (use reference assets) */
const placeholderGalleryImages = [
  referenceAssets.hero,
  referenceAssets.about,
  referenceAssets.coreValueBg,
  ...referenceAssets.destinations.slice(0, 3).map((d) => d.image),
  referenceAssets.funfactImage,
  referenceAssets.testimonialBanner,
].filter(Boolean);

export default function TourDetails({ tour, hideHero = false }) {
  if (!tour) return null;

  const highlights = Array.isArray(tour.highlights) ? tour.highlights.filter(Boolean) : [];
  const gallery = Array.isArray(tour.gallery) ? tour.gallery.filter(Boolean) : [];
  const itinerary = Array.isArray(tour.itinerary) ? tour.itinerary : [];
  const galleryImages = gallery.length > 0 ? gallery : [getTourImageUrl(tour), ...placeholderGalleryImages].slice(0, 6);

  return (
    <>
    <article className="max-w-4xl mx-auto">
      {!hideHero && (
        <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-[21/9] min-h-[240px]">
          <img
            src={getTourImageUrl(tour)}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{tour.title}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-white/90">
              {tour.duration && <span>{tour.duration}</span>}
              <span className="font-semibold">
                {tour.price != null && tour.price !== '' ? `From $${Number(tour.price).toLocaleString()}` : 'Price on request'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Gallery – above overview, before gray line */}
      <div className="mt-10 md:mt-12">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-500 mb-3 font-medium">Gallery</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Overview – descriptive section */}
      <section className="mt-20 pt-20 md:mt-28 md:pt-28 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </span>
          <p className="text-xs uppercase tracking-[0.25em] text-primary-500 font-medium">About this experience</p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-7 h-7 text-primary-500 dark:text-primary-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Overview
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-3xl">
          {tour.description ? (
            <span className="whitespace-pre-line">{tour.description}</span>
          ) : (
            <>
              This tour is designed to give you an unforgettable experience. Our expert guides will take you through the best sights and activities, with comfort and safety in mind. Whether you&apos;re traveling solo, as a couple, or in a group, we tailor the pace and highlights to suit you.
            </>
          )}
        </p>
        {tour.description && (
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We handle all the details so you can focus on enjoying your trip. From transport and entrance fees to local tips and hidden gems, everything is planned with care. Contact us if you&apos;d like to customize dates, add extra activities, or ask about group discounts.
          </p>
        )}
      </section>

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </span>
            Highlights
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mt-0.5 text-primary-600 dark:text-primary-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="text-gray-700 dark:text-gray-300">{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Itinerary */}
      {itinerary.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
          <div className="space-y-4">
            {itinerary.map((day, i) => (
              <div key={i} className="border-l-2 border-blue-200 pl-4 py-2">
                {(day.day || day.title) && (
                  <h3 className="font-medium text-gray-900">
                    {day.day || `Day ${i + 1}`}
                    {day.title && ` — ${day.title}`}
                  </h3>
                )}
                {day.description && (
                  <p className="mt-1 text-gray-600 text-sm">{day.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((url, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

    </article>

      {/* Book this tour – distinguished section */}
      <section
        id="book"
        className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] mt-20 md:mt-28 py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-500/10 via-primary-50/50 to-primary-500/10 dark:from-primary-900/30 dark:via-gray-800/50 dark:to-primary-900/30 border-y border-primary-200/50 dark:border-primary-800/50"
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 font-medium mb-2">Reserve your spot</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Book this tour</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {tour.booking_note || 'Enter your details below and we’ll confirm your booking and send you the next steps by email.'}
          </p>
          <div className="bg-white dark:bg-gray-800/80 backdrop-blur rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 text-left">
            <BookingForm tourId={tour.id} tourLabel={tour.title} tourPrice={tour.price} />
          </div>
        </div>
      </section>
    </>
  );
}
