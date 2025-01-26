import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type RadioShow = Database['public']['Tables']['radio_shows']['Row'];
export type Playlist = Database['public']['Tables']['playlists']['Row'];

export function useSupabaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
}

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading, error };
}

export function useRealtime<T>(
  table: keyof Database['public']['Tables'],
  callback: (payload: T) => void
) {
  useEffect(() => {
    const subscription = supabase
      .channel('table_db_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        (payload) => callback(payload.new as T)
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [table, callback]);
}
