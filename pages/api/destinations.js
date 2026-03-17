import { supabase } from '../../lib/supabase';

function parseBody(body) {
  const { slug, title, subtitle, image, description } = body;
  const payload = {};
  if (slug !== undefined) payload.slug = String(slug).trim().toLowerCase().replace(/\s+/g, '-') || null;
  if (title !== undefined) payload.title = title;
  if (subtitle !== undefined) payload.subtitle = subtitle || null;
  if (image !== undefined) payload.image = image || null;
  if (description !== undefined) payload.description = description || null;
  payload.updated_at = new Date().toISOString();
  return payload;
}

export default async function handler(req, res) {
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase is not configured.' });
  }

  if (req.method === 'GET') {
    const { slug, id } = req.query;
    if (id) {
      const { data, error } = await supabase.from('destinations').select('*').eq('id', id).single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    if (slug) {
      const { data, error } = await supabase.from('destinations').select('*').eq('slug', slug).single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    const { data, error } = await supabase.from('destinations').select('*').order('title', { ascending: true });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data || []);
  }

  if (req.method === 'POST') {
    const payload = parseBody(req.body);
    if (!payload.title) return res.status(400).json({ error: 'title is required' });
    if (!payload.slug) payload.slug = payload.title.trim().toLowerCase().replace(/\s+/g, '-');
    const { data, error } = await supabase.from('destinations').insert([payload]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  if (req.method === 'PUT') {
    const { id, ...rest } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const payload = parseBody(rest);
    const { data, error } = await supabase.from('destinations').update(payload).eq('id', id).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const { error } = await supabase.from('destinations').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end();
}
