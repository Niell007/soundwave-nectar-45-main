import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ApiResponse } from '../api/config';

// State interfaces
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
}

interface StreamState {
  isLive: boolean;
  viewers: number;
  startTime?: string;
  duration?: string;
  title?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
}

interface AppState {
  // Authentication state
  auth: {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  };
  
  // Stream state
  stream: {
    data: StreamState | null;
    isLoading: boolean;
    error: string | null;
  };
  
  // Chat state
  chat: {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
  };
  
  // UI state
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
    currentView: string;
    notifications: {
      id: string;
      type: 'info' | 'success' | 'warning' | 'error';
      message: string;
    }[];
  };

  // Actions
  actions: {
    // Auth actions
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (user: Partial<User>) => Promise<void>;
    
    // Stream actions
    fetchStreamStatus: () => Promise<void>;
    updateStreamInfo: (info: Partial<StreamState>) => Promise<void>;
    
    // Chat actions
    sendMessage: (content: string) => Promise<void>;
    clearChat: () => void;
    
    // UI actions
    setTheme: (theme: 'light' | 'dark') => void;
    toggleSidebar: () => void;
    setCurrentView: (view: string) => void;
    addNotification: (type: 'info' | 'success' | 'warning' | 'error', message: string) => void;
    removeNotification: (id: string) => void;
  };
}

// Create store with proper persist middleware type
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      auth: {
        user: null,
        token: null,
        isLoading: false,
        error: null,
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
      
      ui: {
        theme: 'dark',
        sidebarOpen: true,
        currentView: 'home',
        notifications: [],
      },

      // Actions implementation
      actions: {
        // Auth actions
        login: async (email: string, password: string) => {
          set(state => ({ auth: { ...state.auth, isLoading: true, error: null } }));
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              body: JSON.stringify({ email, password }),
            });
            const data: ApiResponse<{ user: User; token: string }> = await response.json();
            
            if (data.error) {
              throw new Error(data.error.message);
            }

            if (data.data) {
              set(state => ({
                auth: {
                  ...state.auth,
                  user: data.data!.user,
                  token: data.data!.token,
                  isLoading: false,
                },
              }));
            }
          } catch (error) {
            set(state => ({
              auth: {
                ...state.auth,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Login failed',
              },
            }));
          }
        },

        logout: async () => {
          set(state => ({ auth: { ...state.auth, isLoading: true, error: null } }));
          try {
            await fetch('/api/auth/logout', { method: 'POST' });
            set(state => ({
              auth: { user: null, token: null, isLoading: false, error: null },
            }));
          } catch (error) {
            set(state => ({
              auth: {
                ...state.auth,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Logout failed',
              },
            }));
          }
        },

        updateUser: async (userData: Partial<User>) => {
          const { auth } = get();
          if (!auth.user) return;

          set(state => ({ auth: { ...state.auth, isLoading: true, error: null } }));
          try {
            const response = await fetch('/api/user/update', {
              method: 'PUT',
              body: JSON.stringify(userData),
            });
            const data: ApiResponse<User> = await response.json();

            if (data.error) {
              throw new Error(data.error.message);
            }

            if (data.data) {
              set(state => ({
                auth: {
                  ...state.auth,
                  user: { ...state.auth.user!, ...data.data },
                  isLoading: false,
                },
              }));
            }
          } catch (error) {
            set(state => ({
              auth: {
                ...state.auth,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Update failed',
              },
            }));
          }
        },

        // Stream actions
        fetchStreamStatus: async () => {
          set(state => ({ stream: { ...state.stream, isLoading: true, error: null } }));
          try {
            const response = await fetch('/api/stream/status');
            const data: ApiResponse<StreamState> = await response.json();

            if (data.error) {
              throw new Error(data.error.message);
            }

            if (data.data) {
              set(state => ({
                stream: { data: data.data, isLoading: false, error: null },
              }));
            }
          } catch (error) {
            set(state => ({
              stream: {
                ...state.stream,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to fetch stream status',
              },
            }));
          }
        },

        updateStreamInfo: async (info: Partial<StreamState>) => {
          set(state => ({ stream: { ...state.stream, isLoading: true, error: null } }));
          try {
            const response = await fetch('/api/stream/info', {
              method: 'PUT',
              body: JSON.stringify(info),
            });
            const data: ApiResponse<StreamState> = await response.json();

            if (data.error) {
              throw new Error(data.error.message);
            }

            if (data.data) {
              set(state => ({
                stream: { data: data.data, isLoading: false, error: null },
              }));
            }
          } catch (error) {
            set(state => ({
              stream: {
                ...state.stream,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to update stream info',
              },
            }));
          }
        },

        // Chat actions
        sendMessage: async (content: string) => {
          const { auth } = get();
          if (!auth.user) return;

          try {
            const message: ChatMessage = {
              id: Date.now().toString(),
              content,
              sender: {
                id: auth.user.id,
                name: auth.user.name,
                avatar: auth.user.avatar,
              },
              timestamp: new Date().toISOString(),
            };

            set(state => ({
              chat: {
                ...state.chat,
                messages: [...state.chat.messages, message],
              },
            }));

            const response = await fetch('/api/chat/message', {
              method: 'POST',
              body: JSON.stringify({ content }),
            });
            const data: ApiResponse<ChatMessage> = await response.json();

            if (data.error) {
              throw new Error(data.error.message);
            }
          } catch (error) {
            set(state => ({
              chat: {
                ...state.chat,
                error: error instanceof Error ? error.message : 'Failed to send message',
              },
            }));
          }
        },

        clearChat: () => {
          set(state => ({
            chat: { ...state.chat, messages: [], error: null },
          }));
        },

        // UI actions
        setTheme: (theme: 'light' | 'dark') => {
          set(state => ({
            ui: { ...state.ui, theme },
          }));
        },

        toggleSidebar: () => {
          set(state => ({
            ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
          }));
        },

        setCurrentView: (view: string) => {
          set(state => ({
            ui: { ...state.ui, currentView: view },
          }));
        },

        addNotification: (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
          const notification = {
            id: Date.now().toString(),
            type,
            message,
          };
          set(state => ({
            ui: {
              ...state.ui,
              notifications: [...state.ui.notifications, notification],
            },
          }));
        },

        removeNotification: (id: string) => {
          set(state => ({
            ui: {
              ...state.ui,
              notifications: state.ui.notifications.filter(n => n.id !== id),
            },
          }));
        },
      },
    }),
    {
      name: 'soundwave-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AppState) => ({
        auth: { user: state.auth.user, token: state.auth.token },
        ui: { theme: state.ui.theme },
      }),
    }
  )
);
