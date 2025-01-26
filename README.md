# Soundmaster CRM

A comprehensive CRM system for managing the Soundmaster DJ Services Platform.

## Features

- 🎵 Radio Show Management
- 👥 User Authentication & Profiles
- 📊 Analytics Dashboard
- 📝 Content Management
- 🔒 Role-Based Access Control
- 📅 Event Scheduling
- 💾 Automated Backups
- 📧 Email Notifications

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Email)
- **State Management**: React Query, Context API
- **Deployment**: Vercel (Frontend), Supabase (Backend)

## Documentation

- [Project Setup](./docs/PROJECT_SETUP.md)
- [Authentication](./docs/AUTHENTICATION.md)
- [CRM Implementation](./docs/CRM_IMPLEMENTATION.md)
- [Backup & Restore](./docs/BACKUP_RESTORE.md)
- [Email Notifications](./docs/NOTIFICATIONS.md)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/soundmaster-crm.git
   cd soundmaster-crm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Database Management

### Backups
```bash
# Create a backup
npm run backup

# Restore from backup
npm run restore ./backups/[timestamp]
```

### Migrations
```bash
# Run migrations
npx supabase db push

# Generate types
npx supabase gen types typescript --local > src/types/supabase.ts
```

## Project Structure

```
soundmaster-crm/
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/       # React Context providers
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and configs
│   ├── pages/         # Next.js pages
│   └── types/         # TypeScript type definitions
├── public/           # Static assets
├── supabase/         # Database migrations and config
├── scripts/          # Utility scripts
└── docs/            # Project documentation
```

## Features

### Authentication
- Secure user authentication
- Role-based access control
- Profile management
- Session handling

### Email Notifications
- Automated email notifications
- Custom email templates
- Notification status tracking
- Error handling and retries

### Data Management
- Automated backups
- Data restoration
- Type safety
- Real-time updates

## Security

- Row Level Security (RLS) enabled
- Role-based access control
- Audit logging
- Automated backups
- Secure authentication
- Email verification

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@soundmaster.com or join our Slack channel.