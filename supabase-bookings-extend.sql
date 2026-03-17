-- Run in Supabase SQL Editor to add optional columns for booking inquiries.
-- Safe to run if columns already exist (IF NOT EXISTS not supported for columns; use DO block or run once).

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS guests integer;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS special_requests text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Backfill created_at for existing rows (optional)
-- UPDATE bookings SET created_at = now() WHERE created_at IS NULL;
