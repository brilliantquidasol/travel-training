import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
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
    const { title, description, price, image } = req.body;
    const { data, error } = await supabase.from('tours').insert([{ title, description, price, image }]);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
