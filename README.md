# Soundwave DJ Platform

A modern streaming platform for DJs built with Next.js, Supabase, and TypeScript.

## Features

- 🎵 Live streaming with real-time chat
- 👥 User authentication and profiles
- 📊 Stream analytics and statistics
- 💬 Real-time chat with moderation
- 🎨 Modern, responsive UI
- 🔄 Real-time updates using Supabase
- 📱 Cross-platform compatibility

## Architecture

### Frontend

- **Framework**: Next.js with TypeScript
- **State Management**: Zustand with persistence
- **Styling**: TailwindCSS with custom design system
- **Components**: Modular React components with TypeScript
- **Layout**: CSS Grid and Flexbox with responsive design
- **Real-time**: Supabase Realtime for live updates

### Backend

- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime
- **API**: Next.js API routes with TypeScript

### Key Features

1. **Authentication & Authorization**
   - Email/password authentication
   - OAuth providers support
   - Role-based access control
   - Session management

2. **Live Streaming**
   - Real-time video streaming
   - Stream chat
   - Stream statistics
   - Viewer count tracking

3. **Real-time Features**
   - Live chat
   - Presence tracking
   - Stream status updates
   - Notifications

4. **Data Management**
   - Type-safe database queries
   - Real-time subscriptions
   - Optimistic updates
   - Error handling

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── live-stream/    # Streaming components
│   └── chat/           # Chat components
├── lib/
│   ├── api/            # API utilities
│   ├── supabase/       # Supabase client & utilities
│   ├── state/          # State management
│   └── styles/         # Layout & styling utilities
├── pages/              # Next.js pages
├── styles/             # Global styles
└── types/              # TypeScript types
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/soundwave-nectar-45.git
cd soundwave-nectar-45
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

5. Run the development server:
```bash
npm run dev
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write unit tests for components
- Document component props and functions

### State Management

- Use Zustand for global state
- Keep component state local when possible
- Implement proper error handling
- Use TypeScript for type safety

### CSS Guidelines

- Use TailwindCSS utilities
- Follow mobile-first approach
- Maintain consistent spacing
- Use CSS Grid for layouts
- Use Flexbox for components

### Performance

- Implement proper loading states
- Use proper error boundaries
- Optimize images and assets
- Implement proper caching
- Use proper code splitting

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run lint
npm run lint
```

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.