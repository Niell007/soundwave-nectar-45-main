import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types';

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

// Create a client for use in client components
export const createClient = () => {
  return createClientComponentClient<Database>();
};

// Utility functions for common Supabase operations
export const supabaseUtils = {
  // Authentication utilities
  auth: {
    signUp: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return { data, error };
    },

    signIn: async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    },

    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      return { error };
    },

    getSession: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      return { session, error };
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      return supabase.auth.onAuthStateChange(callback);
    },
  },

  // Database utilities
  db: {
    // Stream related queries
    streams: {
      getStream: async (streamId: string) => {
        const { data, error } = await supabase
          .from('streams')
          .select('*')
          .eq('id', streamId)
          .single();
        return { data, error };
      },

      updateStream: async (streamId: string, updates: any) => {
        const { data, error } = await supabase
          .from('streams')
          .update(updates)
          .eq('id', streamId);
        return { data, error };
      },

      subscribeToStream: (streamId: string, callback: (payload: any) => void) => {
        return supabase
          .channel(`stream:${streamId}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'streams',
              filter: `id=eq.${streamId}`,
            },
            callback
          )
          .subscribe();
      },
    },

    // Chat related queries
    chat: {
      getMessages: async (streamId: string, limit = 50) => {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('stream_id', streamId)
          .order('created_at', { ascending: false })
          .limit(limit);
        return { data, error };
      },

      sendMessage: async (streamId: string, userId: string, content: string) => {
        const { data, error } = await supabase
          .from('messages')
          .insert([
            {
              stream_id: streamId,
              user_id: userId,
              content,
            },
          ]);
        return { data, error };
      },

      subscribeToMessages: (streamId: string, callback: (payload: any) => void) => {
        return supabase
          .channel(`messages:${streamId}`)
          .on(
            'postgres_changes',
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              filter: `stream_id=eq.${streamId}`,
            },
            callback
          )
          .subscribe();
      },
    },

    // User related queries
    users: {
      getProfile: async (userId: string) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        return { data, error };
      },

      updateProfile: async (userId: string, updates: any) => {
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', userId);
        return { data, error };
      },

      subscribeToProfile: (userId: string, callback: (payload: any) => void) => {
        return supabase
          .channel(`profile:${userId}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'profiles',
              filter: `id=eq.${userId}`,
            },
            callback
          )
          .subscribe();
      },
    },
  },

  // Storage utilities
  storage: {
    uploadFile: async (bucket: string, path: string, file: File) => {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file);
      return { data, error };
    },

    getPublicUrl: (bucket: string, path: string) => {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      return data.publicUrl;
    },

    deleteFile: async (bucket: string, path: string) => {
      const { error } = await supabase.storage.from(bucket).remove([path]);
      return { error };
    },
  },

  // Realtime presence utilities
  presence: {
    trackPresence: (channelName: string, presence: any) => {
      return supabase.channel(channelName).on('presence', { event: 'sync' }, () => {
        // Handle presence sync
      }).on('presence', { event: 'join' }, ({ key, newPresences }) => {
        // Handle presence join
      }).on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        // Handle presence leave
      }).subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await supabase.channel(channelName).track(presence);
        }
      });
    },
  },
};

export default supabase;
