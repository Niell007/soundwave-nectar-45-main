import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';

// State interfaces
interface StreamState {
  id: string;
  title: string;
  status: 'live' | 'offline';
  viewerCount: number;
  startedAt?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  userId: string;
  username: string;
  timestamp: string;
}

interface AppState {
  auth: {
    user: User | null;
    token: string | null;
  };
  ui: {
    theme: 'light' | 'dark';
  };
  stream: {
    data: StreamState | null;
    isLoading: boolean;
    error: Error | null;
  };
  chat: {
    messages: ChatMessage[];
    isLoading: boolean;
    error: Error | null;
  };
  actions: {
    lastAction: string | null;
    timestamp: number | null;
  };
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setStreamData: (data: StreamState | null) => void;
  setStreamLoading: (isLoading: boolean) => void;
  setStreamError: (error: Error | null) => void;
  addChatMessage: (message: ChatMessage) => void;
  setChatLoading: (isLoading: boolean) => void;
  setChatError: (error: Error | null) => void;
  logAction: (action: string) => void;
  reset: () => void;
}

const initialState = {
  auth: {
    user: null,
    token: null,
  },
  ui: {
    theme: 'dark' as const,
  },
  stream: {
    data: null,
    isLoading: false,
    error: null,
  },
  chat: {
    messages: [],
    isLoading: false,
    error: null,
  },
  actions: {
    lastAction: null,
    timestamp: null,
  },
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: User | null) =>
        set((state: AppState) => ({
          ...state,
          auth: { ...state.auth, user },
        })),
      setToken: (token: string | null) =>
        set((state: AppState) => ({
          ...state,
          auth: { ...state.auth, token },
        })),
      setTheme: (theme: 'light' | 'dark') =>
        set((state: AppState) => ({
          ...state,
          ui: { ...state.ui, theme },
        })),
      setStreamData: (data: StreamState | null) =>
        set((state: AppState) => ({
          ...state,
          stream: { ...state.stream, data, isLoading: false, error: null },
        })),
      setStreamLoading: (isLoading: boolean) =>
        set((state: AppState) => ({
          ...state,
          stream: { ...state.stream, isLoading },
        })),
      setStreamError: (error: Error | null) =>
        set((state: AppState) => ({
          ...state,
          stream: { ...state.stream, error, isLoading: false },
        })),
      addChatMessage: (message: ChatMessage) =>
        set((state: AppState) => ({
          ...state,
          chat: {
            ...state.chat,
            messages: [...state.chat.messages, message],
          },
        })),
      setChatLoading: (isLoading: boolean) =>
        set((state: AppState) => ({
          ...state,
          chat: { ...state.chat, isLoading },
        })),
      setChatError: (error: Error | null) =>
        set((state: AppState) => ({
          ...state,
          chat: { ...state.chat, error },
        })),
      logAction: (action: string) =>
        set((state: AppState) => ({
          ...state,
          actions: {
            lastAction: action,
            timestamp: Date.now(),
          },
        })),
      reset: () => set(initialState),
    }),
    {
      name: 'soundwave-storage',
      partialize: (state: AppState) => ({
        auth: state.auth,
        ui: state.ui,
      }),
    }
  )
);
