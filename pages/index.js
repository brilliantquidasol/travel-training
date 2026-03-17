import { useEffect, useState } from 'react';
import Link from 'next/link';
import TourList from '../components/TourList';

export default function HomePage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tours')
      .then((res) => res.json())
      .then((data) => {
        setTours(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Travel Tours</h1>
        <Link
          href="/admin/dashboard"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Admin
        </Link>
      </header>
      {loading ? (
        <p className="text-gray-500">Loading tours...</p>
      ) : tours.length === 0 ? (
        <p className="text-gray-500">No tours yet. Add some in the admin.</p>
      ) : (
        <TourList tours={tours} />
      )}
    </div>
  );
}
