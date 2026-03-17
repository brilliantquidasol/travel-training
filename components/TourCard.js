import Link from 'next/link';
import { getTourImageUrl } from '../lib/placeholderImages';

export default function TourCard({ tour }) {
  const highlights = Array.isArray(tour.highlights) ? tour.highlights.filter(Boolean) : [];
  const firstHighlight = highlights[0];

  return (
    <Link href={`/tours/${tour.id}`}>
      <div className="glass transition-glass overflow-hidden cursor-pointer">
        <div className="relative w-full h-48">
          <img
            src={getTourImageUrl(tour)}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm p-2 text-white">
            {tour.title}
          </div>
          {tour.duration && (
            <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {tour.duration}
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-gray-700 dark:text-gray-200 line-clamp-2">{tour.description}</p>
          {firstHighlight && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-1">✓ {firstHighlight}</p>
          )}
          <p className="mt-2 font-bold text-gray-900 dark:text-white">
            {tour.price != null && tour.price !== ''
              ? `From $${Number(tour.price).toLocaleString()}`
              : 'Price on request'}
          </p>
        </div>
      </div>
    </Link>
  );
}
