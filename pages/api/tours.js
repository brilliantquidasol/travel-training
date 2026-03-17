import { supabase } from '../../lib/supabase';

function parseTourBody(body) {
  const {
    title,
    description,
    price,
    image,
    duration,
    highlights,
    gallery,
    itinerary,
    booking_note,
  } = body;
  const payload = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price }),
    ...(image !== undefined && { image }),
    ...(duration !== undefined && { duration }),
    ...(highlights !== undefined && { highlights: Array.isArray(highlights) ? highlights : [] }),
    ...(gallery !== undefined && { gallery: Array.isArray(gallery) ? gallery : [] }),
    ...(itinerary !== undefined && { itinerary: Array.isArray(itinerary) ? itinerary : [] }),
    ...(booking_note !== undefined && { booking_note }),
  };
  return payload;
}

export default async function handler(req, res) {
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' });
  }
  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      const { data, error } = await supabase.from('tours').select('*').eq('id', id).single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    const { data, error } = await supabase.from('tours').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
    return;
  }

  if (req.method === 'POST') {
    const payload = parseTourBody(req.body);
    if (!payload.title) return res.status(400).json({ error: 'title is required' });
    const { data, error } = await supabase.from('tours').insert([payload]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
    return;
  }

  if (req.method === 'PUT') {
    const { id, ...rest } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const payload = parseTourBody(rest);
    const { data, error } = await supabase.from('tours').update(payload).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
    return;
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const { error } = await supabase.from('tours').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).end();
    return;
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
