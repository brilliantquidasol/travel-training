import { supabase } from '../../lib/supabase';

function parseOrderBody(body) {
  const { customer_name, customer_email, tour_id, amount, currency, status, notes } = body;
  const payload = {
    ...(customer_name != null && { customer_name: String(customer_name) }),
    ...(customer_email != null && { customer_email: String(customer_email) }),
    ...(tour_id != null && tour_id !== '' && { tour_id }),
    ...(amount != null && amount !== '' && { amount: Number(amount) }),
    ...(currency != null && currency !== '' && { currency: String(currency) }),
    ...(status != null && status !== '' && { status: String(status) }),
    ...(notes != null && { notes: String(notes) }),
  };
  return payload;
}

export default async function handler(req, res) {
  if (!supabase) {
    return res.status(503).json({
      error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    });
  }

  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, tour:tours(title)')
        .eq('id', id)
        .single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*, tour:tours(title)')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data || []);
  }

  if (req.method === 'POST') {
    const payload = parseOrderBody(req.body);
    if (!payload.customer_name || !payload.customer_email) {
      return res.status(400).json({ error: 'customer_name and customer_email are required' });
    }
    const { data, error } = await supabase.from('orders').insert([payload]).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  if (req.method === 'PATCH') {
    const { id, ...rest } = req.body;
    if (!id) return res.status(400).json({ error: 'id is required' });
    const payload = parseOrderBody(rest);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    payload.updated_at = new Date().toISOString();
    const { data, error } = await supabase
      .from('orders')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
