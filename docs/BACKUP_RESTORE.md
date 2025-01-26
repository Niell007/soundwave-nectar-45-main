# Backup and Restore System

## Overview

This document outlines the backup and restore system implemented for the Soundmaster CRM. Since we're using Supabase's free tier which doesn't include automated backups, we've implemented a custom solution that runs both locally and through GitHub Actions.

## Features

- Daily automated backups via GitHub Actions
- Manual backup capability
- Point-in-time restore functionality
- Data integrity verification
- Backup rotation (30-day retention)

## Backup System

### Automated Backups

Automated backups are performed daily at midnight UTC through GitHub Actions:

1. Location: `.github/workflows/backup.yml`
2. Schedule: Daily at 00:00 UTC
3. Retention: 30 days
4. Storage: GitHub Artifacts

### Manual Backups

To perform a manual backup:

```bash
npm run backup
```

This will:
1. Create a timestamped backup in the `backups/` directory
2. Back up all tables with their data
3. Create a manifest file with backup metadata

### Backup Structure

Each backup includes:
- JSON files for each table's data
- A manifest file containing:
  - Timestamp
  - Table list
  - Success/failure status
  - Supabase project URL

## Restore System

To restore from a backup:

```bash
npm run restore ./backups/[backup-timestamp]
```

The restore process:
1. Validates the backup manifest
2. Restores tables in the correct order (respecting foreign key constraints)
3. Verifies data integrity after restore

## Tables Backed Up

1. Core Tables:
   - profiles
   - songs
   - events
   - bookings
   - blog_posts
   - settings

2. Radio Show Tables:
   - radio_shows
   - show_schedules
   - show_hosts

3. Playlist Tables:
   - playlists
   - playlist_songs

4. Analytics Tables:
   - listener_analytics
   - advertisement_campaigns
   - advertisement_metrics

5. User Management:
   - user_roles
   - dj_profiles
   - ai_broadcasters

6. Communication:
   - messages
   - notifications

## Error Handling

The backup system includes:
1. Individual table failure isolation
2. Detailed error logging
3. Backup verification
4. Restore dry-run capability

## Best Practices

1. Regular Testing:
   - Test restore process monthly
   - Verify backup integrity weekly

2. Backup Management:
   - Keep at least 30 days of backups
   - Store backups in multiple locations
   - Document any manual changes

3. Security:
   - Store backup credentials securely
   - Encrypt sensitive backup data
   - Limit access to backup locations

## Recovery Procedures

### Complete Database Recovery

1. Stop the application
2. Run restore command
3. Verify data integrity
4. Restart the application

### Partial Recovery

1. Identify affected tables
2. Use table-specific restore
3. Verify related data
4. Test functionality

## Monitoring

Monitor backup health through:
1. GitHub Actions dashboard
2. Local backup logs
3. Restore test results

## Troubleshooting

Common issues and solutions:

1. Failed Backup:
   - Check network connectivity
   - Verify Supabase credentials
   - Check storage space

2. Failed Restore:
   - Verify backup integrity
   - Check foreign key constraints
   - Ensure sufficient permissions

## Emergency Contacts

1. System Administrator
2. Database Administrator
3. Supabase Support

## Regular Maintenance

1. Weekly:
   - Check backup logs
   - Verify backup integrity
   - Test restore process

2. Monthly:
   - Full restore test
   - Update documentation
   - Review backup strategy

## Future Improvements

1. Planned Enhancements:
   - Differential backups
   - Compression
   - Multi-region backup storage

2. Monitoring Improvements:
   - Automated integrity checks
   - Backup size trending
   - Performance metrics

Remember to regularly test the backup and restore process to ensure it works when needed.
