# Project Setup & Configuration

## Supabase Projects

### CRM Project Details
- **Project Name**: soundmaster-crm
- **Project URL**: https://jekavwkyvwzundiqierd.supabase.co
- **Project Reference ID**: jekavwkyvwzundiqierd
- **Status**: Active Development

## Environment Setup

1. Create a `.env` file in the root directory with these values:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://jekavwkyvwzundiqierd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impla2F2d2t5dnd6dW5kaXFpZXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4Nzc3MjEsImV4cCI6MjA1MzQ1MzcyMX0.Fkg-jCC1jEpR3h6jYzJGFUEs-qTu75abTEvtyYNFG0s

# Database Password (for direct connections)
DB_PASSWORD=fuIMTBkShHsgte9a

# JWT Configuration
JWT_SECRET=YKf03q5W1KlkYKWZJ2R14dZc9um1y3oz/RU4ZVtH9CI13xY3Tj6fMN1ohbWdgYtNfgh3Ow1nFIxn9QyPc9FYWw==

# External Storage Configuration (if needed)
STORAGE_BUCKET_NAME=soundmaster-storage
STORAGE_REGION=us-east-1

# AI Integration Keys (if needed)
OPENAI_API_KEY=[Your OpenAI API Key]
```

## Security Notes

⚠️ IMPORTANT: Never commit these values to version control:
- Database password
- JWT secret
- Service role key
- Environment files (.env)

## Initial Setup Steps

1. Clone the repository
2. Create `.env` file with the above configuration
3. Install dependencies:
```bash
npm install
```

4. Link Supabase project:
```bash
supabase link --project-ref jekavwkyvwzundiqierd
```

5. Apply migrations:
```bash
supabase db reset
```

## Database Migrations

Location: `supabase/migrations/`
- `0001_initial_schema.sql`: Base tables
- `0002_crm_schema.sql`: CRM features

To apply migrations:
```bash
supabase db reset
```

## Type Generation

After applying migrations, generate types:
```bash
supabase gen types typescript --linked > src/types/supabase.ts
```

## Authentication

The project uses Supabase Authentication with:
- Email/password authentication
- JWT-based sessions
- Row Level Security (RLS) policies

## API Access

Three levels of API access:
1. Anonymous (public) - Limited read access
2. Authenticated (user) - Personal data access
3. Admin - Full system access

## Monitoring

Access the Supabase dashboard at:
https://app.supabase.com/project/jekavwkyvwzundiqierd

Monitor:
- Database usage
- API requests
- Authentication
- Storage usage

## Next Steps

1. Apply database migrations
2. Generate TypeScript types
3. Implement admin panel
4. Set up authentication
5. Configure storage buckets
