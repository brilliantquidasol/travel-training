-- Run in Supabase SQL Editor to create destinations table for admin management.
-- Public site can use this data; RLS allows public read, restrict write to backend/service role if needed.

CREATE TABLE IF NOT EXISTS destinations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  subtitle text,
  image text,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Optional: index for slug lookups
CREATE INDEX IF NOT EXISTS idx_destinations_slug ON destinations(slug);

-- RLS: allow public read so the live site can show destinations
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read destinations" ON destinations;
CREATE POLICY "Allow public read destinations" ON destinations FOR SELECT USING (true);

-- Allow insert/update/delete for anon (your app uses anon key for API routes; for production use a service role or auth)
DROP POLICY IF EXISTS "Allow insert destinations" ON destinations;
CREATE POLICY "Allow insert destinations" ON destinations FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow update destinations" ON destinations;
CREATE POLICY "Allow update destinations" ON destinations FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow delete destinations" ON destinations;
CREATE POLICY "Allow delete destinations" ON destinations FOR DELETE USING (true);
