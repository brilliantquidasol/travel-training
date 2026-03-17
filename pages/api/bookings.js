import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' });
  }
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, tour:tours(title)')
      .order('created_at', { ascending: false, nullsFirst: false });
    if (error) {
      const fallback = await supabase.from('bookings').select('*, tour:tours(title)').order('id', { ascending: false });
      if (fallback.error) return res.status(500).json({ error: fallback.error.message });
      return res.status(200).json(fallback.data || []);
    }
    res.status(200).json(data || []);
    return;
  }

  if (req.method === 'POST') {
    const { tour_id, name, email, preferred_date, phone, guests, special_requests } = req.body;
    const payload = {
      name: name ?? '',
      email: email ?? '',
      ...(tour_id != null && tour_id !== '' && { tour_id }),
      ...(preferred_date != null && preferred_date !== '' && { date: preferred_date }),
      ...(phone != null && phone !== '' && { phone }),
      ...(guests != null && guests !== '' && { guests: parseInt(guests, 10) }),
      ...(special_requests != null && special_requests !== '' && { special_requests }),
    };
    const { data, error } = await supabase.from('bookings').insert([payload]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
    return;
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const payload = {};
    if (status !== undefined && ['pending', 'confirmed', 'cancelled'].includes(String(status))) {
      payload.status = String(status);
    }
    if (Object.keys(payload).length === 0) return res.status(400).json({ error: 'No valid fields to update' });
    const { data, error } = await supabase.from('bookings').update(payload).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
