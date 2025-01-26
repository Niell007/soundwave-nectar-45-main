import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://jekavwkyvwzundiqierd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impla2F2d2t5dnd6dW5kaXFpZXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4Nzc3MjEsImV4cCI6MjA1MzQ1MzcyMX0.Fkg-jCC1jEpR3h6jYzJGFUEs-qTu75abTEvtyYNFG0s';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
