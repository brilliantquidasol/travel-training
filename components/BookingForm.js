import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function BookingForm({ tourId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      alert('Booking is not configured. Please set Supabase environment variables.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('bookings').insert([{ tour_id: tourId, name, email }]);
    setLoading(false);
    if (error) alert(error.message);
    else alert('Booking submitted!');
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-6 max-w-md mx-auto flex flex-col gap-4">
      <input
        className="glass-input w-full"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="glass-input w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        className="glass-btn w-full"
        type="submit"
        disabled={loading || !supabase}
      >
        {loading ? 'Submitting...' : 'Book Now'}
      </button>
    </form>
  );
}
