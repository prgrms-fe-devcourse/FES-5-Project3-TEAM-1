import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/shared/types';

// npx supabase gen types typescript --project-id mehfhzgjbfywylancalx > src/shared/types/supabase.ts

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

export default supabase;
