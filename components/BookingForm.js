import { useState } from 'react';
import { supabase } from '../lib/supabase';

const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent';

export default function BookingForm({ tourId, tourLabel, destinationLabel, tourPrice }) {
  const prefix = [tourLabel, destinationLabel].filter(Boolean).length
    ? `Tour: ${tourLabel || '—'}, Destination: ${destinationLabel || '—'}\n\n`
    : '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [preferredDate, setPreferredDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setGuests('2');
    setPreferredDate('');
    setSpecialRequests('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalRequests = prefix ? prefix + specialRequests : specialRequests;
    if (supabase) {
      const payload = {
        ...(tourId != null && tourId !== '' && { tour_id: tourId }),
        name,
        email,
        ...(phone && { phone }),
        ...(guests && { guests: parseInt(guests, 10) }),
        ...(preferredDate && { date: preferredDate }),
        ...(finalRequests && { special_requests: finalRequests }),
      };
      const { error } = await supabase.from('bookings').insert([payload]);
      if (error) {
        setLoading(false);
        alert(error.message);
        return;
      }
    }
    setLoading(false);
    setShowConfirmation(true);
    resetForm();
  };

  const priceStr = tourPrice != null && tourPrice !== '' ? new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(tourPrice)) : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {priceStr && (
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          From {priceStr} per person
        </p>
      )}
      <div>
        <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full name *</label>
        <input
          id="booking-name"
          className={inputClass}
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email *</label>
        <input
          id="booking-email"
          className={inputClass}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
        <input
          id="booking-phone"
          className={inputClass}
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="booking-guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of guests</label>
          <select
            id="booking-guests"
            className={inputClass}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="">Select guests</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
            <option value="12">12+ Guests</option>
          </select>
        </div>
        <div>
          <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred date</label>
          <input
            id="booking-date"
            className={inputClass}
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
          />
        </div>
      </div>
      {(tourLabel || destinationLabel) && (
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-300">Booking for: </span>
          {[tourLabel, destinationLabel].filter(Boolean).join(' · ')}
        </div>
      )}
      <div>
        <label htmlFor="booking-requests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special requests</label>
        <textarea
          id="booking-requests"
          className={`${inputClass} resize-y min-h-[100px]`}
          placeholder="Dietary needs, accessibility, extra activities, etc."
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          rows={4}
        />
      </div>
      <button
        className="btn-primary w-full hover:text-white py-3.5 rounded-xl"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Book Now'}
      </button>

      {/* Confirmation email sent popup */}
      {showConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowConfirmation(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirmation-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </span>
            <h3 id="confirmation-title" className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Confirmation email sent
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              We&apos;ve sent a booking confirmation to your email. Check your inbox for next steps.
            </p>
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="btn-primary hover:text-white w-full py-3 rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
