-- =============================================================================
-- DUMMY DATA FOR TRAVEL MANAGEMENT PROJECT (Supabase)
-- Tours: id, title, description, price, category, image (10 entries)
-- Bookings: id, tour_id, name, email, date (15 entries)
-- Run in Supabase SQL Editor. Copy and paste the entire file.
-- =============================================================================

ALTER TABLE tours ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS date date;

-- =============================================================================
-- TOURS (10 entries)
-- Categories: trekking, safari, honeymoon, group tour, adventure
-- Images: Unsplash 400x300, category-relevant
-- =============================================================================

INSERT INTO tours (title, description, price, category, image) VALUES

('Everest Base Camp Trek',
 'Trek through Sherpa villages and high-altitude trails to the base of the world''s highest peak. Acclimatization days and experienced guides make this Himalayan adventure safe and unforgettable.',
 1899.00,
 'trekking',
 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop'),

('Serengeti & Ngorongoro Safari',
 'Experience the Great Migration and the Big Five in Tanzania. Game drives in the Serengeti and a descent into the Ngorongoro Crater with comfortable lodges and expert guides.',
 2499.00,
 'safari',
 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop'),

('Maldives Overwater Bungalow Escape',
 'Stay in a private overwater villa with direct lagoon access. Includes candlelit dinners, spa treatments, and snorkeling in crystal-clear waters. Ideal for a romantic getaway.',
 3299.00,
 'honeymoon',
 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop'),

('European Highlights: Paris, Rome & Barcelona',
 'A 10-day group tour of three iconic cities with skip-the-line tickets and guided walks. Small group size with optional evening experiences and central hotels.',
 1599.00,
 'group tour',
 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=400&h=300&fit=crop'),

('Patagonia Glaciers & Torres del Paine',
 'Hike among granite peaks and electric-blue glaciers. This adventure combines trekking, boat trips to glaciers, and stays in remote refugios for those who love the outdoors.',
 2199.00,
 'adventure',
 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=400&h=300&fit=crop'),

('Inca Trail to Machu Picchu',
 'Follow the ancient Inca path through cloud forest and high passes to the Sun Gate. Four days of trekking end with a sunrise view of Machu Picchu. Permits and camping included.',
 1299.00,
 'trekking',
 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=300&fit=crop'),

('Okavango Delta Safari',
 'Explore Botswana''s Okavango Delta by mokoro and game drive. Mobile camps and close encounters with elephants, lions, and rare wildlife in one of Africa''s last great wildernesses.',
 2899.00,
 'safari',
 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=300&fit=crop'),

('Santorini & Crete Romantic Getaway',
 'White-washed villages, sunset views, and private wine tastings. Split your stay between Santorini and Crete with ferry transfers and hand-picked boutique hotels.',
 1999.00,
 'honeymoon',
 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop'),

('Japan Cultural Journey: Tokyo to Kyoto',
 'Temples, tea ceremonies, and bullet trains. This group tour covers Tokyo, Hakone, and Kyoto with local guides and traditional stays. Perfect for first-time visitors.',
 2299.00,
 'group tour',
 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop'),

('Iceland Ring Road Adventure',
 'Drive the full Ring Road with glacier hikes, hot springs, and northern lights. Self-drive with a detailed itinerary and pre-booked accommodations. Adventure at your own pace.',
 1799.00,
 'adventure',
 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=400&h=300&fit=crop');

-- =============================================================================
-- BOOKINGS (15 entries)
-- Realistic names, emails, future dates; linked to tours above
-- =============================================================================

INSERT INTO bookings (tour_id, name, email, date) VALUES

((SELECT id FROM tours WHERE title = 'Everest Base Camp Trek' LIMIT 1), 'James Chen', 'james.chen@email.com', '2026-04-12'),
((SELECT id FROM tours WHERE title = 'Serengeti & Ngorongoro Safari' LIMIT 1), 'Maria Santos', 'maria.santos@email.com', '2026-07-20'),
((SELECT id FROM tours WHERE title = 'Maldives Overwater Bungalow Escape' LIMIT 1), 'David Wilson', 'david.wilson@email.com', '2026-06-01'),
((SELECT id FROM tours WHERE title = 'European Highlights: Paris, Rome & Barcelona' LIMIT 1), 'Sophie Müller', 'sophie.mueller@email.com', '2026-05-15'),
((SELECT id FROM tours WHERE title = 'Patagonia Glaciers & Torres del Paine' LIMIT 1), 'Alex Rivera', 'alex.rivera@email.com', '2026-11-08'),
((SELECT id FROM tours WHERE title = 'Inca Trail to Machu Picchu' LIMIT 1), 'Yuki Tanaka', 'yuki.tanaka@email.com', '2026-08-22'),
((SELECT id FROM tours WHERE title = 'Okavango Delta Safari' LIMIT 1), 'Oliver Brown', 'oliver.brown@email.com', '2026-09-10'),
((SELECT id FROM tours WHERE title = 'Santorini & Crete Romantic Getaway' LIMIT 1), 'Lisa Johnson', 'lisa.johnson@email.com', '2026-06-28'),
((SELECT id FROM tours WHERE title = 'Japan Cultural Journey: Tokyo to Kyoto' LIMIT 1), 'Priya Sharma', 'priya.sharma@email.com', '2026-10-01'),
((SELECT id FROM tours WHERE title = 'Iceland Ring Road Adventure' LIMIT 1), 'Thomas Andersen', 'thomas.andersen@email.com', '2026-03-15'),
((SELECT id FROM tours WHERE title = 'Everest Base Camp Trek' LIMIT 1), 'Rachel Green', 'rachel.green@email.com', '2026-05-05'),
((SELECT id FROM tours WHERE title = 'European Highlights: Paris, Rome & Barcelona' LIMIT 1), 'Michael Park', 'michael.park@email.com', '2026-08-14'),
((SELECT id FROM tours WHERE title = 'Inca Trail to Machu Picchu' LIMIT 1), 'Anna Kowalski', 'anna.kowalski@email.com', '2026-07-30'),
((SELECT id FROM tours WHERE title = 'Maldives Overwater Bungalow Escape' LIMIT 1), 'Chris Lee', 'chris.lee@email.com', '2026-09-20'),
((SELECT id FROM tours WHERE title = 'Japan Cultural Journey: Tokyo to Kyoto' LIMIT 1), 'Fatima Al-Hassan', 'fatima.alhassan@email.com', '2026-11-25');

-- =============================================================================
-- OPTIONAL: 2 ADMIN USERS (for testing login)
-- Create these in Supabase: Authentication → Users → "Add user"
-- =============================================================================
--
-- Admin 1:
--   Email:    admin@travelapp.com
--   Password: Admin123!
--
-- Admin 2:
--   Email:    editor@travelapp.com
--   Password: Editor123!
--
