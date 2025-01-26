export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string
          username: string
          full_name: string | null
          avatar_url: string | null
          website: string | null
          bio: string | null
        }
        Insert: {
          id: string
          updated_at?: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          updated_at?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
        }
      }
      streams: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          title: string
          description: string | null
          is_live: boolean
          stream_key: string
          viewer_count: number
          started_at: string | null
          ended_at: string | null
          thumbnail_url: string | null
          category: string | null
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          title: string
          description?: string | null
          is_live?: boolean
          stream_key: string
          viewer_count?: number
          started_at?: string | null
          ended_at?: string | null
          thumbnail_url?: string | null
          category?: string | null
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          title?: string
          description?: string | null
          is_live?: boolean
          stream_key?: string
          viewer_count?: number
          started_at?: string | null
          ended_at?: string | null
          thumbnail_url?: string | null
          category?: string | null
          tags?: string[] | null
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          stream_id: string
          user_id: string
          content: string
          type: string
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          stream_id: string
          user_id: string
          content: string
          type?: string
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          stream_id?: string
          user_id?: string
          content?: string
          type?: string
          metadata?: Json | null
        }
      }
      stream_stats: {
        Row: {
          id: string
          created_at: string
          stream_id: string
          peak_viewers: number
          average_viewers: number
          chat_messages: number
          duration: number
          bitrate: number
          resolution: string
          fps: number
        }
        Insert: {
          id?: string
          created_at?: string
          stream_id: string
          peak_viewers?: number
          average_viewers?: number
          chat_messages?: number
          duration?: number
          bitrate?: number
          resolution?: string
          fps?: number
        }
        Update: {
          id?: string
          created_at?: string
          stream_id?: string
          peak_viewers?: number
          average_viewers?: number
          chat_messages?: number
          duration?: number
          bitrate?: number
          resolution?: string
          fps?: number
        }
      }
      followers: {
        Row: {
          id: string
          created_at: string
          follower_id: string
          following_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          follower_id: string
          following_id: string
        }
        Update: {
          id?: string
          created_at?: string
          follower_id?: string
          following_id?: string
        }
      }
      notifications: {
        Row: {
          id: string
          created_at: string
          user_id: string
          type: string
          title: string
          message: string
          read: boolean
          metadata: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          type: string
          title: string
          message: string
          read?: boolean
          metadata?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          type?: string
          title?: string
          message?: string
          read?: boolean
          metadata?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
