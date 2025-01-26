# Authentication System Documentation

## Overview

The Soundmaster CRM implements a comprehensive authentication system using Supabase Auth, with custom middleware, role-based access control, and audit logging.

## Architecture

### Backend Components

1. **Tables**:
   - `profiles`: Extended user profiles with roles
   - `auth_settings`: Authentication configuration
   - `auth_audit_log`: Security audit trail

2. **Database Functions**:
   - `handle_new_user()`: Creates profiles on signup
   - `log_auth_event()`: Audit logging
   - `handle_profile_update()`: Profile change tracking

3. **RLS Policies**:
   - Profile access control
   - Admin-only settings
   - Audit log restrictions

### Frontend Components

1. **Context**:
   ```typescript
   // AuthContext provides authentication state and methods
   const { user, loading, signIn, signOut } = useAuth();
   ```

2. **Middleware**:
   - Route protection
   - Role-based access
   - Authentication flow

3. **Guards**:
   - `AuthGuard`: Protected route wrapper
   - Admin route protection
   - Loading states

## Authentication Flow

1. **Sign Up**:
   ```typescript
   const signUp = async (email, password) => {
     const { user, error } = await supabase.auth.signUp({
       email,
       password,
     });
   };
   ```

2. **Sign In**:
   ```typescript
   const signIn = async (email, password) => {
     const { user, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });
   };
   ```

3. **Profile Creation**:
   - Automatic profile creation on signup
   - Role assignment
   - Audit log entry

## Role-Based Access Control

1. **User Roles**:
   - `admin`: Full system access
   - `dj`: Radio show management
   - `user`: Basic access

2. **Role Enforcement**:
   - Database RLS policies
   - Frontend route guards
   - API endpoint protection

## Security Features

1. **Audit Logging**:
   - Authentication events
   - Profile changes
   - Admin actions

2. **Session Management**:
   - Automatic token refresh
   - Secure session storage
   - Session invalidation

3. **Error Handling**:
   - Graceful error recovery
   - User feedback
   - Security logging

## Implementation Details

### Database Schema

```sql
-- Profile structure
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'user'::user_role,
    is_active BOOLEAN DEFAULT true
);

-- Audit log structure
CREATE TABLE public.auth_audit_log (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES auth.users,
    event_type TEXT NOT NULL,
    metadata JSONB
);
```

### Frontend Integration

1. **Protected Routes**:
   ```typescript
   <AuthGuard requireAdmin={true}>
     <AdminDashboard />
   </AuthGuard>
   ```

2. **Role Checks**:
   ```typescript
   const isAdmin = user?.role === 'admin';
   const canAccessFeature = hasPermission(user, 'feature:access');
   ```

## Error Handling

1. **Authentication Errors**:
   - Invalid credentials
   - Session expiration
   - Network issues

2. **Authorization Errors**:
   - Insufficient permissions
   - Role conflicts
   - Access denials

## Best Practices

1. **Security**:
   - Use HTTPS only
   - Implement rate limiting
   - Enable MFA when possible

2. **Performance**:
   - Optimize auth checks
   - Cache user permissions
   - Minimize database queries

3. **UX**:
   - Clear error messages
   - Loading indicators
   - Smooth transitions

## Monitoring

1. **Audit Logs**:
   - Access patterns
   - Security events
   - Error tracking

2. **Performance Metrics**:
   - Auth response times
   - Session duration
   - Error rates

## Maintenance

1. **Regular Tasks**:
   - Token rotation
   - Session cleanup
   - Log rotation

2. **Updates**:
   - Security patches
   - Dependency updates
   - Policy reviews

## Troubleshooting

1. **Common Issues**:
   - Session expiration
   - Permission denied
   - Network errors

2. **Solutions**:
   - Check auth status
   - Verify permissions
   - Validate tokens

## Future Improvements

1. **Planned Features**:
   - OAuth providers
   - MFA support
   - Enhanced audit logs

2. **Security Enhancements**:
   - IP blocking
   - Fraud detection
   - Advanced monitoring
