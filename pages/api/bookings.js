import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' });
  }
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('bookings').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
    return;
  }

  if (req.method === 'POST') {
    const { tour_id, name, email, phone, guests, preferred_date, special_requests } = req.body;
    const payload = {
      tour_id,
      name,
      email,
      ...(phone != null && phone !== '' && { phone }),
      ...(guests != null && guests !== '' && { guests: parseInt(guests, 10) }),
      ...(preferred_date != null && preferred_date !== '' && { preferred_date }),
      ...(special_requests != null && special_requests !== '' && { special_requests }),
    };
    const { data, error } = await supabase.from('bookings').insert([payload]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
