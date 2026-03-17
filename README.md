# travel-training

Next.js travel tour app with Supabase (tours + bookings). Deploy to Vercel.

## Setup

### 1. Supabase

1. Create a [Supabase](https://supabase.com) free-tier project.
2. In the SQL editor, create tables:

```sql
-- tours
create table tours (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric,
  image text
);

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
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Vercel will use `vercel.json` and build the Next.js app.
