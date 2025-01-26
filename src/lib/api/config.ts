import { createClient } from '@supabase/supabase-js';

// API Configuration
export const API_CONFIG = {
  // Base URLs for different environments
  baseUrl: {
    development: 'http://localhost:3000/api',
    staging: 'https://staging-api.soundwave.com/api',
    production: 'https://api.soundwave.com/api',
  },

  // API Endpoints
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
    },
    stream: {
      status: '/stream/status',
      info: '/stream/info',
      stats: '/stream/stats',
      chat: '/stream/chat',
    },
    user: {
      profile: '/user/profile',
      settings: '/user/settings',
      preferences: '/user/preferences',
    },
    music: {
      tracks: '/music/tracks',
      playlists: '/music/playlists',
      favorites: '/music/favorites',
    },
    events: {
      list: '/events',
      create: '/events/create',
      update: '/events/update',
      delete: '/events/delete',
    },
  },

  // Request timeouts (in milliseconds)
  timeouts: {
    default: 5000,
    upload: 30000,
    download: 30000,
  },

  // Cache configuration
  cache: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100, // Maximum number of items to cache
  },

  // Retry configuration
  retry: {
    maxRetries: 3,
    backoffFactor: 2,
    initialDelay: 1000,
  },

  // WebSocket configuration
  websocket: {
    reconnectInterval: 2000,
    maxReconnectAttempts: 5,
  },

  // Rate limiting
  rateLimit: {
    maxRequests: 100,
    perWindow: 60000, // 1 minute window
  },
} as const;

// Supabase configuration
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// API response types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Error codes and messages
export const API_ERRORS = {
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Network error occurred. Please check your connection.',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'You are not authorized to perform this action.',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'The requested resource was not found.',
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid data provided.',
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    message: 'An internal server error occurred.',
  },
  RATE_LIMIT_EXCEEDED: {
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests. Please try again later.',
  },
} as const;

// API request headers
export const getDefaultHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
});

// API request options
export const DEFAULT_REQUEST_OPTIONS = {
  credentials: 'include' as const,
  mode: 'cors' as const,
  headers: getDefaultHeaders(),
};

// Data transformation utilities
export const transformResponse = <T>(response: ApiResponse<T>): ApiResponse<T> => {
  if (!response) {
    return {
      error: API_ERRORS.NETWORK_ERROR,
    };
  }

  if (response.error) {
    return {
      error: {
        code: response.error.code || 'ERROR',
        message: response.error.message || 'An error occurred',
        details: response.error.details,
      },
    };
  }

  return {
    data: response.data,
    meta: response.meta,
  };
};

// Environment detection
export const getEnvironment = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  if (process.env.NODE_ENV === 'test') {
    return 'staging';
  }
  return 'development';
};

// API URL builder
export const buildApiUrl = (endpoint: string, queryParams?: Record<string, string | number | boolean>) => {
  const env = getEnvironment();
  const baseUrl = API_CONFIG.baseUrl[env];
  const url = new URL(endpoint, baseUrl);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
};
