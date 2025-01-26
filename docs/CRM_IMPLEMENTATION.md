# Soundmaster CRM Dashboard Implementation Documentation

## Project Overview
Building a comprehensive CRM dashboard for the Soundmaster DJ Services Platform with advanced features including AI integration, real-time analytics, and booking management.

## Migration Strategy

### Phase 0: Project Setup & Migration
1. Create new Supabase project
2. Migrate existing functionality:
   - Authentication system
   - User profiles & roles
   - Song management
   - Event booking
   - Blog system
   
3. Database Migration Steps:
   ```sql
   -- Step 1: Export existing data
   - profiles
   - songs
   - bookings
   - events
   - blog_posts
   - settings
   
   -- Step 2: Import to new project
   - Set up identical RLS policies
   - Verify data integrity
   - Update connection strings
   ```

4. Frontend Migration:
   - Update Supabase client configuration
   - Verify all existing features
   - Run comprehensive tests

### Existing Features to Preserve
1. Authentication & Authorization
   - Email/password login
   - Admin role management
   - Profile management

2. Content Management
   - Song library
   - Blog posts
   - Event management

3. Booking System
   - Basic event booking
   - Calendar integration

4. Admin Features
   - User management
   - System settings
   - Content moderation

## Database Schema Details

### Existing Tables (To Migrate)
```sql
-- Detailed schema with constraints and indexes
CREATE TABLE profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    username TEXT UNIQUE,
    avatar_url TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Add other existing table details...
```

### New CRM Tables
```sql
-- Detailed schema with constraints, indexes, and relationships
CREATE TABLE radio_shows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    show_type TEXT CHECK (show_type IN ('live', 'recorded', 'hybrid')),
    duration INTERVAL NOT NULL,
    recurring BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TABLE show_schedules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    show_id UUID REFERENCES radio_shows(id) ON DELETE CASCADE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
    is_recurring BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

-- Add other new table details...
```

### RLS Policies
```sql
-- Example RLS policies for new tables
ALTER TABLE radio_shows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public shows are viewable by everyone"
    ON radio_shows FOR SELECT
    USING (true);

CREATE POLICY "Shows can be created by admins and DJs"
    ON radio_shows FOR INSERT
    WITH CHECK (
        auth.uid() IN (
            SELECT id FROM profiles WHERE is_admin = true
            UNION
            SELECT user_id FROM dj_profiles
        )
    );

-- Add other RLS policies...
```

## TypeScript Type Definitions

### Updated Database Types
```typescript
export type Database = {
  public: {
    Tables: {
      // Existing tables
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          is_admin: boolean
          created_at: string
        }
        // ... other type definitions
      }
      
      // New CRM tables
      radio_shows: {
        Row: {
          id: string
          title: string
          description: string | null
          show_type: 'live' | 'recorded' | 'hybrid'
          duration: string
          recurring: boolean
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          // ... insert type definitions
        }
        Update: {
          // ... update type definitions
        }
      }
      // ... other table types
    }
  }
}
```

## Implementation Plan

### Phase 1: Foundation & Core Infrastructure (2-3 weeks)

#### 1.1 Database Schema Enhancement
New tables to be added:
```sql
-- Shows & Schedules
radio_shows (
  id, title, description, created_at, updated_at,
  show_type (live/recorded), duration, recurring
)

show_schedules (
  id, show_id, start_time, end_time, day_of_week,
  is_recurring, created_at, updated_at
)

show_hosts (
  id, show_id, user_id, role, created_at
)

playlists (
  id, name, description, created_by, created_at,
  updated_at, is_public
)

playlist_songs (
  id, playlist_id, song_id, position, added_at
)

-- Analytics & Tracking
listener_analytics (
  id, timestamp, show_id, listener_count,
  peak_listeners, average_duration
)

advertisement_campaigns (
  id, name, start_date, end_date, budget,
  target_audience, status
)

advertisement_metrics (
  id, campaign_id, timestamp, impressions,
  clicks, conversions
)

-- Enhanced User Management
user_roles (
  id, name, permissions, created_at
)

dj_profiles (
  id, user_id, bio, experience, specialties,
  equipment, hourly_rate
)

ai_broadcasters (
  id, name, voice_config, personality_type,
  active_status, created_at
)

-- Booking & Communication
booking_requests (
  id, user_id, dj_id, event_date, status,
  requirements, budget, created_at
)

messages (
  id, from_user_id, to_user_id, content,
  read_status, created_at
)

notifications (
  id, user_id, type, content, read_status,
  created_at
)
```

#### 1.2 Admin Panel Foundation
- Layout structure
- Authentication integration
- Role-based access control
- Basic navigation

### Phase 2: Content Management System (2-3 weeks)
- Show & playlist management
- User role management
- File upload system
- Content organization

### Phase 3: Booking & Notification System (2 weeks)
- Booking workflow
- Real-time notifications
- Message center
- Calendar integration

### Phase 4: AI Integration (2-3 weeks)
- AI provider management
- Content generation
- Automated scheduling
- Chatbot system

### Phase 5: Analytics & Reporting (2 weeks)
- Dashboard metrics
- Custom reports
- Real-time statistics
- Data visualization

### Phase 6: Website Integration & Polish (2 weeks)
- Real-time updates
- Theme customization
- Final testing
- Documentation

## Development Workflow

### Step 1: Project Migration
1. Create new Supabase project
2. Run migration scripts
3. Verify data integrity
4. Update environment variables

### Step 2: Schema Updates
1. Apply new table definitions
2. Configure RLS policies
3. Create database functions
4. Set up real-time subscriptions

### Step 3: TypeScript Integration
1. Generate updated types
2. Update frontend type definitions
3. Implement type checking
4. Verify type safety

### Step 4: Admin Panel Development
1. Create base layout
2. Implement navigation
3. Build CRUD interfaces
4. Add real-time updates

## Quality Assurance

### Testing Strategy
1. Unit Tests
   - Component testing
   - API integration testing
   - Type safety verification

2. Integration Tests
   - End-to-end workflows
   - Real-time functionality
   - Authentication flows

3. Performance Testing
   - Load testing
   - Real-time subscription limits
   - Database query optimization

### Monitoring
1. Error Tracking
   - Sentry integration
   - Error boundaries
   - API error logging

2. Performance Metrics
   - Page load times
   - API response times
   - Real-time subscription performance

## Synchronization Checkpoints

Every third step of implementation requires a full alignment check:

### Alignment Checklist
1. Database Schema
   - [ ] All required tables exist
   - [ ] RLS policies are properly configured
   - [ ] Relationships are correctly defined
   - [ ] Indexes are optimized

2. TypeScript Types
   - [ ] Generated types match database schema
   - [ ] Custom types are properly defined
   - [ ] Type safety is maintained across the application

3. Frontend Components
   - [ ] Components use correct types
   - [ ] Real-time subscriptions are properly set up
   - [ ] Error handling is implemented
   - [ ] Loading states are managed

4. API Integration
   - [ ] API endpoints match backend functions
   - [ ] Authentication is properly integrated
   - [ ] Rate limiting is configured
   - [ ] Error responses are handled

## Current Progress

### Completed Steps
- Initial project analysis
- Existing schema review
- Implementation plan creation

### Next Steps
Awaiting decision on:
1. Creating SQL migrations for new tables
2. Updating TypeScript types
3. Starting admin panel foundation

### Current Supabase Project
Using existing project at: https://onijobnfjuuoafcygtjb.supabase.co
Decision needed: Continue with current project or create new one for CRM system

## Development Guidelines

### Code Organization
- Frontend: React with TypeScript
- State Management: React Query + Context
- Styling: Tailwind CSS
- API: Supabase Client

### Best Practices
1. Always maintain type safety
2. Implement proper error handling
3. Use real-time subscriptions where appropriate
4. Follow atomic design principles
5. Document all major components

### Security Considerations
1. Implement proper RLS policies
2. Validate all user inputs
3. Sanitize data outputs
4. Maintain secure authentication flows

## Getting Started

1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Run database migrations
5. Start development server

## Contact & Support
For questions or support, contact the development team.

---
Last Updated: 2025-01-26
Status: Planning Phase

# CRM Implementation Guide

## Project Overview

The Soundmaster CRM is a comprehensive dashboard for managing the online radio platform. It integrates with Supabase for backend services and provides features for content management, show scheduling, and user engagement.

## Architecture

### Backend (Supabase)

- **Project URL**: https://jekavwkyvwzundiqierd.supabase.co
- **Database**: PostgreSQL with PostgREST API
- **Authentication**: Supabase Auth with JWT
- **Storage**: Supabase Storage for media files
- **Real-time**: Supabase Realtime for live updates

### Frontend

- **Framework**: Next.js with TypeScript
- **State Management**: React Query + Context API
- **UI Components**: Tailwind CSS + Headless UI
- **Type Safety**: Generated types from Supabase schema

## Database Schema

### Core Tables

1. **profiles**
   - User profiles with admin flags
   - RLS: Public read, authenticated write for own profile

2. **radio_shows**
   - Show details and metadata
   - RLS: Public read, admin/owner write

3. **show_schedules**
   - Show timing and recurrence
   - RLS: Public read, admin/owner write

4. **playlists**
   - Playlist management
   - RLS: Public read for public playlists, creator access for private

### CRM Features

1. **listener_analytics**
   - Real-time and historical listener data
   - RLS: Admin only

2. **advertisement_campaigns**
   - Campaign management and tracking
   - RLS: Admin only

3. **dj_profiles**
   - Extended DJ information
   - RLS: Public read, owner write

## Authentication Flow

1. **User Registration**
   ```typescript
   const { user, error } = await supabase.auth.signUp({
     email,
     password,
   });
   ```

2. **Profile Creation**
   ```typescript
   const { data, error } = await supabase
     .from('profiles')
     .insert([{ id: user.id, username }]);
   ```

3. **Role Assignment**
   ```typescript
   const { data, error } = await supabase
     .from('user_roles')
     .insert([{ user_id: user.id, role: 'dj' }]);
   ```

## Real-time Subscriptions

1. **Show Updates**
   ```typescript
   const showSubscription = supabase
     .from('radio_shows')
     .on('*', (payload) => {
       // Handle show updates
     })
     .subscribe();
   ```

2. **Listener Analytics**
   ```typescript
   const analyticsSubscription = supabase
     .from('listener_analytics')
     .on('INSERT', (payload) => {
       // Update analytics dashboard
     })
     .subscribe();
   ```

## API Integration

### Show Management
```typescript
export const createShow = async (show: RadioShow) => {
  const { data, error } = await supabase
    .from('radio_shows')
    .insert([show]);
  return { data, error };
};
```

### Playlist Management
```typescript
export const updatePlaylist = async (id: string, updates: Partial<Playlist>) => {
  const { data, error } = await supabase
    .from('playlists')
    .update(updates)
    .eq('id', id);
  return { data, error };
};
```

## Error Handling

1. **API Errors**
   ```typescript
   try {
     const { data, error } = await supabase.from('shows').select('*');
     if (error) throw error;
     return data;
   } catch (error) {
     console.error('Error:', error.message);
     throw error;
   }
   ```

2. **Authentication Errors**
   ```typescript
   const { user, error } = await supabase.auth.signIn({ email, password });
   if (error) {
     if (error.status === 400) {
       // Handle invalid credentials
     } else {
       // Handle other auth errors
     }
   }
   ```

## Performance Optimization

1. **Query Optimization**
   - Use `.select('id, title')` to limit returned fields
   - Implement pagination for large datasets
   - Use appropriate indexes (already set up in migrations)

2. **Caching Strategy**
   - Use React Query for client-side caching
   - Implement stale-while-revalidate pattern
   - Cache invalidation on real-time updates

## Security Considerations

1. **Row Level Security**
   - All tables have RLS enabled
   - Policies enforce user-level access control
   - Admin checks use `is_admin()` function

2. **API Security**
   - JWT authentication for all requests
   - Rate limiting on API endpoints
   - Input validation and sanitization

## Deployment

1. **Environment Setup**
   - Copy `.env.example` to `.env.local`
   - Set up required environment variables
   - Configure Supabase project settings

2. **Database Migrations**
   - Run migrations in order
   - Verify RLS policies
   - Check database indexes

## Monitoring

1. **Error Tracking**
   - Implement error boundary components
   - Set up error logging service
   - Monitor Supabase dashboard

2. **Performance Monitoring**
   - Track API response times
   - Monitor real-time subscription performance
   - Check database query performance

## Next Steps

1. [ ] Set up authentication system
2. [ ] Create admin panel layout
3. [ ] Implement dashboard features
4. [ ] Set up real-time listeners
5. [ ] Configure storage buckets

## Quality Assurance

1. **Type Safety**
   - Use generated types from Supabase
   - Implement proper error handling
   - Maintain consistent state management

2. **Testing**
   - Unit tests for utilities
   - Integration tests for API calls
   - E2E tests for critical flows
