# Soundmaster CRM Platform

A comprehensive CRM system for managing radio shows, playlists, bookings, and audience engagement.

## Features

- Advanced CRM Dashboard
- Radio Show Management
- Playlist Organization
- Booking System
- Real-time Analytics
- AI Integration
- User Management

## Tech Stack

- Frontend: React + TypeScript
- Backend: Supabase
- Database: PostgreSQL
- Real-time: Supabase Realtime
- Storage: Supabase Storage + External Storage
- Authentication: Supabase Auth
- AI: OpenAI Integration

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase CLI
- Git

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd soundmaster-crm
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration values.

4. Initialize Supabase:
```bash
supabase init
supabase link --project-ref your-project-ref
```

5. Run database migrations:
```bash
supabase db reset
```

6. Start the development server:
```bash
npm run dev
```

### Database Migrations

All migrations are stored in `supabase/migrations/`:
- `0001_initial_schema.sql`: Base tables and functions
- `0002_crm_schema.sql`: CRM-specific tables and functions

To apply migrations:
```bash
supabase db reset
```

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- See `.env.example` for all required variables

### Development Workflow

1. Create feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "feat: your feature description"
```

3. Push changes:
```bash
git push origin feature/your-feature-name
```

4. Create pull request on GitHub

### Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your hosting platform of choice:
```bash
npm run deploy
```

## Documentation

- [Project Setup](./docs/PROJECT_SETUP.md)
- [CRM Implementation](./docs/CRM_IMPLEMENTATION.md)
- [API Documentation](./docs/API.md)
- [Frontend Documentation](./docs/FRONTEND.md)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@soundmaster.com or create an issue in the repository.