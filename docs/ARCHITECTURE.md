# Architecture Overview

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Query + Context
- **Build Tool**: Vite

## Key Features
1. **Authentication System**
   - Email-based auth
   - Protected routes
   - Admin privileges

2. **Music Library**
   - Song management
   - Karaoke tracking
   - File uploads

3. **Booking System**
   - Event scheduling
   - Calendar integration
   - Real-time updates

4. **Admin Dashboard**
   - User management
   - Content moderation
   - System settings

5. **Live Lessons**
   - Real-time streaming
   - Chat functionality
   - Quality controls

## Directory Structure
```
src/
├── components/        # UI Components
│   ├── admin/        # Admin features
│   ├── auth/         # Authentication
│   ├── chat/         # Chat interface
│   ├── design/       # Design system
│   ├── home/         # Homepage
│   ├── shared/       # Shared components
│   ├── songs/        # Music library
│   └── ui/           # shadcn/ui components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── integrations/     # External services
├── lib/             # Utilities
├── pages/           # Route pages
└── types/           # TypeScript types
```

## Data Flow
1. **API Calls**
   - Use React Query for data fetching
   - Implement proper error handling
   - Cache management with staleTime/cacheTime

2. **State Management**
   - React Query for server state
   - Context for global state
   - Local state for component-specific data

3. **Real-time Updates**
   - Supabase real-time subscriptions
   - WebSocket connections for chat
   - Optimistic updates for better UX

## Performance Considerations
1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

2. **Caching Strategy**
   - React Query caching
   - Service Worker (if implemented)
   - Local storage for preferences

3. **Asset Optimization**
   - Image optimization
   - Lazy loading media
   - CDN usage for static assets

## Security Measures
1. **Authentication**
   - JWT-based auth
   - Refresh token rotation
   - Protected routes

2. **Data Access**
   - Row Level Security (RLS)
   - Input validation
   - XSS prevention

3. **File Upload**
   - Size limits
   - Type validation
   - Virus scanning

## Error Handling
1. **API Errors**
   - Proper error boundaries
   - Toast notifications
   - Error logging

2. **Form Validation**
   - Client-side validation
   - Server-side validation
   - Error messages

## Testing Strategy
1. **Unit Tests**
   - Component testing
   - Hook testing
   - Utility function testing

2. **Integration Tests**
   - API integration
   - User flows
   - Authentication flows

## Deployment
- Production builds with `npm run build`
- Edge Functions deployed automatically
- Database migrations through Supabase CLI
