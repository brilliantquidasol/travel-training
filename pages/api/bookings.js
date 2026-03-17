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
    const { tour_id, name, email } = req.body;
    const { data, error } = await supabase.from('bookings').insert([{ tour_id, name, email }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
