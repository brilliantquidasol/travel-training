import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim?.() || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim?.() || '';

const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

// Only create client when env vars are valid (avoids "Invalid supabaseUrl" when placeholder or empty)
const hasValidEnv = isValidUrl(supabaseUrl) && supabaseAnonKey.length > 20;

export const supabase = hasValidEnv
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        // Avoid "Lock broken by another request with the 'steal' option" (navigator.locks contention)
        lock: false,
      },
    })
  : null;
