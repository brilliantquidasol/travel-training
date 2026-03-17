import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function BookingForm({ tourId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.from('bookings').insert([
      { tour_id: tourId, name, email },
    ]);
    setLoading(false);
    if (error) alert(error.message);
    else alert('Booking submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? 'Submitting...' : 'Book Now'}
      </button>
    </form>
  );
}
