import TourCard from './TourCard';

export default function TourList({ tours }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
