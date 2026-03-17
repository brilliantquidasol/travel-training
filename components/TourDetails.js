import BookingForm from './BookingForm';
import { getTourImageUrl } from '../lib/placeholderImages';

export default function TourDetails({ tour }) {
  if (!tour) return null;

  const highlights = Array.isArray(tour.highlights) ? tour.highlights.filter(Boolean) : [];
  const gallery = Array.isArray(tour.gallery) ? tour.gallery.filter(Boolean) : [];
  const itinerary = Array.isArray(tour.itinerary) ? tour.itinerary : [];

  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero */}
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
            {tour.price != null && tour.price !== '' && (
              <span className="font-semibold">From ${Number(tour.price).toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {tour.description && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <p className="text-gray-600 whitespace-pre-line">{tour.description}</p>
        </section>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Highlights</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Itinerary */}
      {itinerary.length > 0 && (
        <section className="mt-10">
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
        <section className="mt-10">
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

      {/* Booking */}
      <section className="mt-10 glass p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Book this tour</h2>
        {tour.booking_note && (
          <p className="text-gray-600 text-sm mb-4">{tour.booking_note}</p>
        )}
        <BookingForm tourId={tour.id} />
      </section>
    </article>
  );
}
