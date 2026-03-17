-- =============================================================================
-- RUN THIS ONCE in Supabase: SQL Editor → New query → paste → Run
-- Creates tables and adds missing columns. Safe to run if tables already exist.
-- =============================================================================

-- Tours table (full schema for app + seed)
CREATE TABLE IF NOT EXISTS tours (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  price numeric,
  image text,
  duration text,
  highlights jsonb DEFAULT '[]',
  gallery jsonb DEFAULT '[]',
  itinerary jsonb DEFAULT '[]',
  booking_note text,
  category text
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_id uuid REFERENCES tours(id),
  name text NOT NULL,
  email text NOT NULL,
  date date
);

-- If you already had bookings without date, add the column:
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS date date;
