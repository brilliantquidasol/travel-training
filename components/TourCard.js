import Link from 'next/link';

export default function TourCard({ tour }) {
  return (
    <Link href={`/tours/${tour.id}`}>
      <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
        <img
          src={tour.image || '/placeholder.svg'}
          alt={tour.title}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-xl font-bold mt-2">{tour.title}</h3>
        <p className="mt-1 line-clamp-2">{tour.description}</p>
        <p className="mt-2 font-semibold">${tour.price}</p>
      </div>
    </Link>
  );
}
