import BookingForm from './BookingForm';

export default function TourDetails({ tour }) {
  if (!tour) return null;
  return (
    <div className="max-w-4xl mx-auto">
      <img
        src={tour.image || '/placeholder.svg'}
        alt={tour.title}
        className="w-full h-64 md:h-96 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{tour.title}</h1>
      <p className="mt-2 text-gray-600">{tour.description}</p>
      <p className="mt-4 text-2xl font-semibold">${tour.price}</p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Book this tour</h2>
        <BookingForm tourId={tour.id} />
      </div>
    </div>
  );
}
