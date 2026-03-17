import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminToursPage() {
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
      <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Dashboard
      </Link>
      <h1 className="text-2xl font-bold mb-4">Manage Tours</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="space-y-2">
          {tours.map((tour) => (
            <li key={tour.id} className="flex justify-between items-center border p-3 rounded">
              <span className="font-medium">{tour.title}</span>
              <Link href={`/tours/${tour.id}`} className="text-blue-600 text-sm">
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
