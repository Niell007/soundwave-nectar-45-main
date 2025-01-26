# Supabase Integration Guide

## Project Configuration
- **Project ID**: `onijobnfjuuoafcygtjb`
- **Project URL**: `https://onijobnfjuuoafcygtjb.supabase.co`
- **Client Location**: `src/integrations/supabase/client.ts`

## Database Schema

### Tables
1. **profiles**
   - User profiles with admin capabilities
   - Contains: id, username, avatar_url, is_admin, created_at

2. **blog_posts**
   - Blog content management
   - Contains: id, title, content, image_url, user_id, created_at

3. **bookings**
   - Event booking system
   - Contains: id, user_id, event_date, time, created_at

4. **events**
   - Event management
   - Contains: id, title, description, date, location, image_url, created_at

## Edge Functions
Located in `supabase/functions/`:

1. **send-notification**
   - Handles real-time notifications
   - Endpoint: `https://onijobnfjuuoafcygtjb.supabase.co/functions/v1/send-notification`
   - No local deployment needed - runs directly on Supabase

## Authentication
- Email authentication enabled
- Email confirmations enabled
- JWT expiry: 3600 seconds
- Refresh token rotation enabled

## Real-time Subscriptions
Key subscriptions implemented:
1. Auth state changes (`AuthStateManager.tsx`)
2. Song list updates (React Query)
3. Live lesson settings

## Type Safety
- Database types auto-generated in `src/integrations/supabase/types.ts`
- Types are automatically synced with database schema

## Common Operations

### Authentication
```typescript
// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Sign out
await supabase.auth.signOut();
```

### Database Operations
```typescript
// Query with type safety
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId);

// Insert with type safety
const { data, error } = await supabase
  .from('blog_posts')
  .insert({
    title: 'New Post',
    content: 'Content...'
  });
```

### File Storage
```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('bucket-name')
  .upload('file-path', file);
```

## Best Practices
1. Always use TypeScript types for database operations
2. Use React Query for data fetching and caching
3. Implement proper error handling
4. Use real-time subscriptions for live updates
5. Keep frontend and backend in sync

## Troubleshooting
1. Type errors: Run `supabase gen types typescript` to update types
2. Auth issues: Check Supabase dashboard for auth settings
3. Edge function errors: Check Supabase logs
