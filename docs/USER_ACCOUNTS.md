# Adding User Accounts (Avoid Email Rate Limit)

If you see **"Email rate limit exceeded"** when signing up, use one of these methods to create users **without** sending confirmation emails.

---

## Option 1: Supabase Dashboard (no script)

1. Open **Supabase Dashboard** → **Authentication** → **Users**.
2. Click **Add user** → **Create new user**.
3. Enter **Email** and **Password**, then click **Create user**.
4. Repeat to add a second user.

Users created this way can sign in immediately. Then add them to `profiles`:

- Either they get a profile on first sign-in (if your app upserts on login), or
- Run in **SQL Editor** (use the user’s UUID from Authentication → Users):

```sql
insert into public.profiles (id, full_name, role)
values ('USER_UUID_HERE', 'User Name', 'user')
on conflict (id) do update set full_name = excluded.full_name;
```

---

## Option 2: Script (2 users, no email sent)

Creates **2 demo users** and their profiles in one go. No confirmation email is sent.

1. Get your **service role key**: Supabase Dashboard → **Settings** → **API** → **service_role** (secret).
2. In project root, add to **`.env.local`** (do not commit this file):

   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. Run:

   ```bash
   node scripts/create-users.js
   ```

4. Default users created:
   - `user1@travelpro.com` / `User1Pass!` (Demo User One)
   - `user2@travelpro.com` / `User2Pass!` (Demo User Two)

To make one an admin, run in SQL Editor:

```sql
update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'user1@travelpro.com');
```

---

## Option 3: Disable email confirmation (dev only)

To allow normal sign-up without confirmation emails (e.g. in development):

1. Supabase Dashboard → **Authentication** → **Providers** → **Email**.
2. Turn **off** “Confirm email”.

Then sign-ups from your app won’t send confirmation emails and won’t hit the same rate limit. Re-enable this in production if you want verified emails.
