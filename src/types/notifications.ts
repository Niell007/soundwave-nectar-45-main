export type NotificationStatus = 'pending' | 'sent' | 'failed';

export interface EmailNotification {
  id: string;
  userId: string;
  subject: string;
  content: string;
  sentAt: Date | null;
  status: NotificationStatus;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SendEmailNotificationParams {
  userId: string;
  subject: string;
  content: string;
}

export interface NotificationTemplate {
  name: string;
  subject: string;
  content: string;
  variables: Record<string, string>;
}

export const EMAIL_TEMPLATES = {
  WELCOME: {
    name: 'welcome',
    subject: 'Welcome to Soundmaster CRM',
    content: 'Hi {{name}},\n\nWelcome to Soundmaster CRM! We\'re excited to have you on board.',
    variables: {
      name: 'User\'s name'
    }
  },
  PASSWORD_RESET: {
    name: 'password_reset',
    subject: 'Password Reset Request',
    content: 'Hi {{name}},\n\nYou requested a password reset. Click the link below to reset your password:\n\n{{resetLink}}',
    variables: {
      name: 'User\'s name',
      resetLink: 'Password reset link'
    }
  },
  EVENT_REMINDER: {
    name: 'event_reminder',
    subject: '{{eventName}} Reminder',
    content: 'Hi {{name}},\n\nThis is a reminder about your upcoming event: {{eventName}} at {{eventTime}}',
    variables: {
      name: 'User\'s name',
      eventName: 'Event name',
      eventTime: 'Event time'
    }
  }
} as const;
