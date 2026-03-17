/**
 * Create 2 user accounts without sending confirmation emails (avoids rate limit).
 * Run: node scripts/create-users.js
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (from Supabase Dashboard → Settings → API → service_role)
 *
 * Do NOT use the anon key; this script must use the service role key.
 */

const fs = require('fs');
const path = require('path');

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
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim?.() || '';

if (!supabaseUrl.startsWith('http')) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL in .env.local');
  process.exit(1);
}
if (!serviceRoleKey || serviceRoleKey.length < 20) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY in .env.local (Supabase Dashboard → Settings → API → service_role)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

const USERS = [
  { email: 'user1@travelpro.com', password: 'User1Pass!', full_name: 'Demo User One' },
  { email: 'user2@travelpro.com', password: 'User2Pass!', full_name: 'Demo User Two' },
];

async function main() {
  console.log('Creating 2 user accounts (no email sent)...\n');

  for (const u of USERS) {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: { full_name: u.full_name },
    });

    if (authError) {
      if (authError.message?.includes('already been registered')) {
        console.log(`  ⏭ ${u.email} – already exists, skipping`);
        continue;
      }
      console.error(`  ✗ ${u.email}:`, authError.message);
      continue;
    }

    const userId = authData?.user?.id;
    if (!userId) {
      console.error(`  ✗ ${u.email}: no user id returned`);
      continue;
    }

    const { error: profileError } = await supabase.from('profiles').upsert(
      { id: userId, full_name: u.full_name, role: 'user' },
      { onConflict: 'id' }
    );

    if (profileError) {
      console.error(`  ✗ ${u.email} profile:`, profileError.message);
    } else {
      console.log(`  ✓ ${u.email} (${u.full_name}) – role: user`);
    }
  }

  console.log('\nDone. Users can sign in with the passwords above.');
  console.log('To make one an admin: run in Supabase SQL Editor:');
  console.log("  update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'user1@travelpro.com');");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
