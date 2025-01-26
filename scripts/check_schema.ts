import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://jekavwkyvwzundiqierd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impla2F2d2t5dnd6dW5kaXFpZXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4Nzc3MjEsImV4cCI6MjA1MzQ1MzcyMX0.Fkg-jCC1jEpR3h6jYzJGFUEs-qTu75abTEvtyYNFG0s'
);

// Check a few key tables
async function checkSchema() {
  console.log('Checking database schema...\n');

  // Check profiles table
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
  console.log('Profiles table:', profilesError ? 'ERROR' : 'OK');
  if (profilesError) console.error(profilesError);

  // Check radio_shows table
  const { data: shows, error: showsError } = await supabase
    .from('radio_shows')
    .select('*')
    .limit(1);
  console.log('Radio shows table:', showsError ? 'ERROR' : 'OK');
  if (showsError) console.error(showsError);

  // Check playlists table
  const { data: playlists, error: playlistsError } = await supabase
    .from('playlists')
    .select('*')
    .limit(1);
  console.log('Playlists table:', playlistsError ? 'ERROR' : 'OK');
  if (playlistsError) console.error(playlistsError);

  // Check settings table and verify initial data
  const { data: settings, error: settingsError } = await supabase
    .from('settings')
    .select('*');
  console.log('Settings table:', settingsError ? 'ERROR' : 'OK');
  if (settingsError) console.error(settingsError);
  else console.log('Settings entries:', settings?.length || 0);

  // Check RLS is enabled by trying to insert without auth
  const { error: insertError } = await supabase
    .from('songs')
    .insert({ title: 'test', artist: 'test' });
  console.log('RLS active:', insertError ? 'YES' : 'NO');
}

checkSchema().catch(console.error);
