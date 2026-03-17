-- Run in Supabase SQL Editor to create orders table for eCommerce / tour orders.
-- Safe to run if table already exists (CREATE TABLE IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  tour_id uuid REFERENCES tours(id),
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Optional: enable RLS and allow public read/insert (adjust for your auth)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read orders" ON orders;
CREATE POLICY "Allow public read orders" ON orders FOR SELECT USING (true);

-- Allow insert for checkout (or restrict to authenticated only)
DROP POLICY IF EXISTS "Allow public insert orders" ON orders;
CREATE POLICY "Allow public insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Allow update (e.g. status changes from admin API)
DROP POLICY IF EXISTS "Allow public update orders" ON orders;
CREATE POLICY "Allow public update orders" ON orders FOR UPDATE USING (true) WITH CHECK (true);
