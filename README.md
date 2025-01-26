# Soundmaster DJ Services Platform

A full-stack web application for managing DJ services, bookings, and music library. Built with React, TypeScript, and Supabase.

## 📚 Documentation

- [Supabase Integration Guide](./docs/SUPABASE.md) - Complete guide to Supabase setup and usage
- [Architecture Overview](./docs/ARCHITECTURE.md) - System architecture and design patterns

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- Supabase account (already configured)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd soundmaster-dj

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── admin/        # Admin dashboard components
│   ├── auth/         # Authentication components
│   ├── chat/         # Chat interface components
│   ├── design/       # Design system components
│   ├── home/         # Homepage components
│   ├── shared/       # Shared utility components
│   ├── songs/        # Music library components
│   └── ui/           # shadcn/ui components
├── contexts/         # React context providers
├── hooks/           # Custom React hooks
├── integrations/    # Third-party service integrations
├── lib/            # Utility functions and helpers
├── pages/          # Page components
└── types/          # TypeScript type definitions
```

## 🔧 Key Features

1. **Authentication**
   - Email-based authentication
   - Admin privileges
   - Protected routes

2. **Music Library**
   - Song management
   - Karaoke system
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

## 🛠️ Development

```bash
# Start development server
npm run dev

# Type checking
npm run typecheck

# Lint code
npm run lint

# Build for production
npm run build
```

## 🔄 Supabase Integration

The project is already configured with Supabase:
- Project URL: `https://onijobnfjuuoafcygtjb.supabase.co`
- Types are auto-generated
- Edge Functions are deployed
- Real-time subscriptions are configured

See [Supabase Integration Guide](./docs/SUPABASE.md) for details.

## 📦 Key Dependencies

- React 18
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- React Query
- React Router

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch
```

## 🔐 Security

- JWT-based authentication
- Row Level Security (RLS)
- Input validation
- XSS prevention
- File upload validation

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Edge Functions are automatically deployed to Supabase

3. Frontend can be deployed to any static hosting service

## 📝 Contributing

1. Follow the existing code structure
2. Maintain type safety with Supabase
3. Update documentation when adding features
4. Add tests for new functionality

## 📫 Support

Check the [Architecture Overview](./docs/ARCHITECTURE.md) for common issues and solutions.