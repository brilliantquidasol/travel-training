/**
 * Seed dummy data into Supabase.
 * Run: node scripts/seed.js
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

const fs = require('fs');
const path = require('path');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim?.() || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim?.() || '';

if (!supabaseUrl.startsWith('http')) {
  console.error('Missing or invalid NEXT_PUBLIC_SUPABASE_URL in .env.local');
  process.exit(1);
}
if (!supabaseAnonKey || supabaseAnonKey.length < 20) {
  console.error('Missing or invalid NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dataPath = path.join(__dirname, '..', 'supabase-seed-dummy-data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

async function seed() {
  console.log('Seeding tours...');
  const titleToId = {};

  for (const tour of data.tours) {
    const { data: inserted, error } = await supabase
      .from('tours')
      .insert({
        title: tour.title,
        description: tour.description,
        price: tour.price,
        category: tour.category,
        image: tour.image,
      })
      .select('id, title')
      .single();

    if (error) {
      console.error('Tour insert error:', tour.title, error.message);
      continue;
    }
    titleToId[inserted.title] = inserted.id;
    console.log('  ✓', inserted.title);
  }

  console.log('\nSeeding destinations...');
  if (data.destinations && data.destinations.length > 0) {
    for (const d of data.destinations) {
      const { error } = await supabase.from('destinations').insert({
        slug: d.slug,
        title: d.title,
        subtitle: d.subtitle,
        image: d.image,
        description: d.description,
      });
      if (error) {
        console.error('  ✗ Destination:', d.title, error.message);
      } else {
        console.log('  ✓', d.title);
      }
    }
  } else {
    console.log('  (no destinations in seed data)');
  }

  console.log('\nSeeding bookings...');
  for (const b of data.bookings) {
    const tourId = titleToId[b.tour_title];
    if (!tourId) {
      console.error('  ✗ No tour found for:', b.tour_title);
      continue;
    }
    const { error } = await supabase.from('bookings').insert({
      tour_id: tourId,
      name: b.name,
      email: b.email,
      date: b.date,
    });
    if (error) {
      console.error('  ✗ Booking error:', b.name, error.message);
    } else {
      console.log('  ✓', b.name, '→', b.tour_title);
    }
  }

  console.log('\nSeeding orders...');
  if (data.orders && data.orders.length > 0) {
    for (const o of data.orders) {
      const tourId = o.tour_title ? titleToId[o.tour_title] : null;
      const { error } = await supabase.from('orders').insert({
        customer_name: o.customer_name,
        customer_email: o.customer_email,
        ...(tourId && { tour_id: tourId }),
        amount: o.amount,
        currency: o.currency || 'USD',
        status: o.status || 'pending',
        notes: o.notes || null,
      });
      if (error) {
        console.error('  ✗ Order:', o.customer_name, error.message);
      } else {
        console.log('  ✓', o.customer_name, '→', o.tour_title || '—');
      }
    }
  } else {
    console.log('  (no orders in seed data)');
  }

  const destCount = data.destinations?.length ?? 0;
  const orderCount = data.orders?.length ?? 0;
  console.log('\nDone. Tours:', data.tours.length, '| Destinations:', destCount, '| Bookings:', data.bookings.length, '| Orders:', orderCount);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
