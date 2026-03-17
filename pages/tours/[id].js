import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import TourDetails from '../../components/TourDetails';

export default function TourPage() {
  const router = useRouter();
  const { id } = router.query;
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/tours?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const t = Array.isArray(data) ? data[0] : data;
        setTour(t || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to tours
      </Link>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : tour ? (
        <TourDetails tour={tour} />
      ) : (
        <p className="text-gray-500">Tour not found.</p>
      )}
    </div>
  );
}
