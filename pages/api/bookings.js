import { supabase } from '../../lib/supabase';
import { sendBookingApprovalEmail } from '../../lib/email';

export default async function handler(req, res) {
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' });
  }
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, tour:tours(title, price)')
      .order('created_at', { ascending: false, nullsFirst: false });
    if (error) {
      const fallback = await supabase.from('bookings').select('*, tour:tours(title, price)').order('id', { ascending: false });
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
    const { data, error } = await supabase
      .from('bookings')
      .update(payload)
      .eq('id', id)
      .select('*, tour:tours(title, price)')
      .single();
    if (error) return res.status(500).json({ error: error.message });

    if (payload.status === 'confirmed') {
      const tourPrice = data.tour?.price != null && data.tour?.price !== '' ? Number(data.tour.price) : 0;
      const orderPayload = {
        customer_name: data.name || '',
        customer_email: data.email || '',
        tour_id: data.tour_id || null,
        amount: tourPrice,
        currency: 'USD',
        status: 'pending',
        notes: data.special_requests || null,
      };
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select()
        .single();
      if (!orderError && order) {
        const origin = req.headers.origin || process.env.NEXT_PUBLIC_APP_URL || '';
        const paymentUrl = origin ? `${origin}/pay/${order.id}` : `/pay/${order.id}`;
        await sendBookingApprovalEmail({
          to: data.email,
          name: data.name,
          paymentUrl,
          tourTitle: data.tour?.title || 'Your tour',
        });
      }
    }

    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
