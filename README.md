# travel-training

Next.js travel tour app with Supabase (tours + bookings). Deploy to Vercel.

## Setup

### 1. Supabase

1. Create a [Supabase](https://supabase.com) free-tier project.
2. In the SQL editor, create tables:

```sql
-- tours (with itineraries, highlights, gallery, duration)
create table tours (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric,
  image text,
  duration text,
  highlights jsonb default '[]',
  gallery jsonb default '[]',
  itinerary jsonb default '[]',
  booking_note text
);

-- If you already have tours, add new columns:
-- alter table tours add column if not exists duration text;
-- alter table tours add column if not exists highlights jsonb default '[]';
-- alter table tours add column if not exists gallery jsonb default '[]';
-- alter table tours add column if not exists itinerary jsonb default '[]';
-- alter table tours add column if not exists booking_note text;

-- bookings
create table bookings (
  id uuid default gen_random_uuid() primary key,
  tour_id uuid references tours(id),
  name text not null,
  email text not null
);
```

3. In **Project Settings → API**, copy your **Project URL** and **anon public** key.

### 2. Environment variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace with your Supabase URL and anon key.

**Optional – booking confirmation emails**  
When an admin confirms a booking, the app can email the customer a payment link. Add to `.env.local`:

```
RESEND_API_KEY=re_xxxx
```

Get a key at [resend.com](https://resend.com). Without it, confirmation still works (order is created, payment link exists) but no email is sent.

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
├── .env.local              # Environment variables (Supabase keys)
├── .gitignore
├── README.md
├── package.json
├── next.config.js
├── vercel.json
├── pages/
│   ├── index.js            # Homepage / tour listing
│   ├── tours/[id].js       # Tour details page
│   ├── admin/
│   │   ├── dashboard.js    # Admin dashboard
│   │   └── tours.js        # Admin tour management
│   └── api/
│       ├── tours.js        # CRUD tours API
│       ├── bookings.js     # CRUD bookings API
│       └── auth.js         # Optional auth API
├── components/
│   ├── TourList.js
│   ├── TourCard.js
│   ├── TourDetails.js
│   ├── BookingForm.js
│   └── AdminDashboard.js
├── lib/
│   └── supabase.js         # Supabase client
└── styles/
    └── globals.css          # Tailwind + custom styles
```

## Deploy on Vercel

1. Push to GitHub (already done).
2. Go to [Vercel](https://vercel.com), import the GitHub repo.
3. In **Project Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon public key
4. **Redeploy** after saving (Deployments → ⋮ → Redeploy) so the build uses the new env vars.
5. In **Supabase**: run the RLS policies in `supabase-setup.sql` (see below) so the anon key can read data.

### Live site shows no data?

- **Env vars:** In Vercel → Project → Settings → Environment Variables, ensure both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set for Production (and Preview if needed). Then trigger a **Redeploy**.
- **RLS:** Supabase uses Row Level Security. If you see no tours, run the RLS section of `supabase-setup.sql` in the Supabase SQL Editor (policies that allow public SELECT on `tours` and `bookings`).

### Email rate limit / adding user accounts

If you see **"Email rate limit exceeded"** when signing up, or need to add 2 user accounts without sending emails, see **[docs/USER_ACCOUNTS.md](docs/USER_ACCOUNTS.md)**. Options: add users in Supabase Dashboard, run `node scripts/create-users.js` (with `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`), or disable "Confirm email" in Auth for development.
