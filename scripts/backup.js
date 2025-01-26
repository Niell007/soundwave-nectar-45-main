const { createClient } = require('@supabase/supabase-js');
const fs = require('fs/promises');
const path = require('path');

const supabase = createClient(
  'https://jekavwkyvwzundiqierd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impla2F2d2t5dnd6dW5kaXFpZXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4Nzc3MjEsImV4cCI6MjA1MzQ1MzcyMX0.Fkg-jCC1jEpR3h6jYzJGFUEs-qTu75abTEvtyYNFG0s'
);

const tables = [
  'profiles',
  'songs',
  'events',
  'bookings',
  'blog_posts',
  'settings',
  'radio_shows',
  'show_schedules',
  'show_hosts',
  'playlists',
  'playlist_songs',
  'listener_analytics',
  'advertisement_campaigns',
  'advertisement_metrics',
  'user_roles',
  'dj_profiles',
  'ai_broadcasters',
  'messages',
  'notifications'
];

async function createBackupDir() {
  const backupDir = path.join(process.cwd(), 'backups');
  await fs.mkdir(backupDir, { recursive: true });
  return backupDir;
}

async function backupTable(table, backupDir, timestamp) {
  console.log(`Backing up table: ${table}`);
  const { data, error } = await supabase.from(table).select('*');
  
  if (error) {
    console.error(`Error backing up ${table}:`, error);
    return false;
  }

  const filePath = path.join(backupDir, `${timestamp}_${table}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return true;
}

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = await createBackupDir();
  const backupPath = path.join(backupDir, timestamp);
  await fs.mkdir(backupPath, { recursive: true });

  console.log('Starting backup...');
  const results = await Promise.all(
    tables.map(table => backupTable(table, backupPath, timestamp))
  );

  const success = results.every(result => result);
  if (success) {
    console.log('Backup completed successfully!');
    console.log('Backup location:', backupPath);
  } else {
    console.error('Some tables failed to backup. Check the logs above.');
  }

  // Create backup manifest
  const manifest = {
    timestamp,
    tables: tables.map((table, index) => ({
      name: table,
      success: results[index]
    })),
    supabaseUrl: 'https://jekavwkyvwzundiqierd.supabase.co'
  };

  await fs.writeFile(
    path.join(backupPath, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

async function restoreBackup(backupPath) {
  console.log('Starting restore...');
  
  // Read manifest
  const manifestPath = path.join(backupPath, 'manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));

  // Restore tables in reverse order to handle dependencies
  for (const table of [...tables].reverse()) {
    console.log(`Restoring table: ${table}`);
    const filePath = path.join(backupPath, `${manifest.timestamp}_${table}.json`);
    
    try {
      const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
      if (data.length > 0) {
        const { error } = await supabase.from(table).insert(data);
        if (error) {
          console.error(`Error restoring ${table}:`, error);
        } else {
          console.log(`Successfully restored ${table}`);
        }
      }
    } catch (err) {
      console.error(`Failed to restore ${table}:`, err);
    }
  }

  console.log('Restore completed!');
}

// CLI handling
const command = process.argv[2];
const backupPath = process.argv[3];

if (command === 'backup') {
  createBackup().catch(console.error);
} else if (command === 'restore' && backupPath) {
  restoreBackup(backupPath).catch(console.error);
} else {
  console.log('Usage:');
  console.log('  Backup:  npm run backup');
  console.log('  Restore: npm run restore <backup-path>');
}
