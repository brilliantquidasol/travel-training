import Link from 'next/link';
import { getTourImageUrl } from '../lib/placeholderImages';

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

export default function TourCard({ tour, showBadge = true }) {
  const location = tour.location || tour.destination || 'Destination';
  const priceStr = tour.price != null && tour.price !== '' ? `$${Number(tour.price).toLocaleString()}` : 'Price on request';
  const rating = typeof tour.rating === 'number' ? tour.rating : 4.8;

  return (
    <Link href={`/tours/${tour.id}`} className="group block glass-card">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={getTourImageUrl(tour)}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
          <span className="text-white text-sm font-medium drop-shadow-md">{location}</span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {showBadge && (
              <span className="badge-light">{tour.duration || 'Tour'}</span>
            )}
            {tour.category && (
              <span className="badge">{tour.category}</span>
            )}
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          <StarRating rating={rating} />
        </div>
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
          {tour.title}
        </h3>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span className="btn-primary text-sm py-2 px-4 inline-block cursor-pointer">
            Book Now
          </span>
          <span className="font-bold text-gray-900 dark:text-white">{priceStr}</span>
        </div>
      </div>
    </Link>
  );
}
