# Soundmaster DJ Services Platform

A full-stack web application for managing DJ services, bookings, and music library.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+
- A Supabase account (for backend services)

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

## 🔧 Configuration

### Environment Setup

The project uses Supabase for backend services. Configuration is managed through the Supabase dashboard.

### IDE Setup

This project includes configurations for VS Code and other popular IDEs. Key features:

- TypeScript support
- ESLint integration
- Prettier formatting
- Debug configurations

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

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch
```

## 📦 Key Dependencies

- React 18
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- TanStack Query
- Lucide Icons

## 🎨 Customization

### Theme Customization

Modify `tailwind.config.ts` for theme changes. The app uses a design system built on Tailwind CSS and shadcn/ui.

### Adding New Features

1. Create new components in appropriate directories
2. Update routes in `src/components/routing/AppRoutes.tsx`
3. Add new API endpoints in Supabase Edge Functions
4. Update types in `src/types/`

## 📚 Documentation

- [Supabase Dashboard](https://supabase.com/dashboard/project/onijobnfjuuoafcygtjb)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.