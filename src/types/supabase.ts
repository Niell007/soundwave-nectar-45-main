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
      ai_broadcasters: {
        Row: {
          id: string
          name: string
          voice_config: Json
          personality_type: string | null
          active_status: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          voice_config?: Json
          personality_type?: string | null
          active_status?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          voice_config?: Json
          personality_type?: string | null
          active_status?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      advertisement_campaigns: {
        Row: {
          id: string
          name: string
          description: string | null
          start_date: string
          end_date: string
          budget: number | null
          target_audience: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          start_date: string
          end_date: string
          budget?: number | null
          target_audience?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          start_date?: string
          end_date?: string
          budget?: number | null
          target_audience?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      advertisement_metrics: {
        Row: {
          id: string
          campaign_id: string
          timestamp: string
          impressions: number
          clicks: number
          conversions: number
        }
        Insert: {
          id?: string
          campaign_id: string
          timestamp?: string
          impressions?: number
          clicks?: number
          conversions?: number
        }
        Update: {
          id?: string
          campaign_id?: string
          timestamp?: string
          impressions?: number
          clicks?: number
          conversions?: number
        }
        Relationships: [
          {
            foreignKeyName: "advertisement_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "advertisement_campaigns"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          image_url: string | null
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          image_url?: string | null
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          image_url?: string | null
          user_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      bookings: {
        Row: {
          id: string
          user_id: string | null
          event_date: string
          time: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_date: string
          time: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          event_date?: string
          time?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      dj_profiles: {
        Row: {
          id: string
          user_id: string
          bio: string | null
          experience: string | null
          specialties: string[] | null
          equipment: string[] | null
          hourly_rate: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bio?: string | null
          experience?: string | null
          specialties?: string[] | null
          equipment?: string[] | null
          hourly_rate?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bio?: string | null
          experience?: string | null
          specialties?: string[] | null
          equipment?: string[] | null
          hourly_rate?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "dj_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          location: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          location?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          location?: string | null
          image_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      listener_analytics: {
        Row: {
          id: string
          show_id: string | null
          timestamp: string
          listener_count: number
          peak_listeners: number
          average_duration: unknown | null
        }
        Insert: {
          id?: string
          show_id?: string | null
          timestamp?: string
          listener_count?: number
          peak_listeners?: number
          average_duration?: unknown | null
        }
        Update: {
          id?: string
          show_id?: string | null
          timestamp?: string
          listener_count?: number
          peak_listeners?: number
          average_duration?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "listener_analytics_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "radio_shows"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          from_user_id: string | null
          to_user_id: string | null
          content: string
          read_status: boolean
          created_at: string
        }
        Insert: {
          id?: string
          from_user_id?: string | null
          to_user_id?: string | null
          content: string
          read_status?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          from_user_id?: string | null
          to_user_id?: string | null
          content?: string
          read_status?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          content: string
          read_status: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          content: string
          read_status?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          content?: string
          read_status?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      playlist_songs: {
        Row: {
          id: string
          playlist_id: string
          song_id: string
          position: number
          added_at: string
        }
        Insert: {
          id?: string
          playlist_id: string
          song_id: string
          position: number
          added_at?: string
        }
        Update: {
          id?: string
          playlist_id?: string
          song_id?: string
          position?: number
          added_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlist_songs_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_songs_song_id_fkey"
            columns: ["song_id"]
            isOneToOne: false
            referencedRelation: "songs"
            referencedColumns: ["id"]
          }
        ]
      }
      playlists: {
        Row: {
          id: string
          name: string
          description: string | null
          created_by: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_by?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_by?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "playlists_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          is_admin: boolean | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          is_admin?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          is_admin?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      radio_shows: {
        Row: {
          id: string
          title: string
          description: string | null
          show_type: string
          duration: unknown
          recurring: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          show_type: string
          duration: unknown
          recurring?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          show_type?: string
          duration?: unknown
          recurring?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "radio_shows_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          key: string
          value: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          key: string
          value?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          key?: string
          value?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      show_hosts: {
        Row: {
          id: string
          show_id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          show_id: string
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          show_id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "show_hosts_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "radio_shows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "show_hosts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      show_schedules: {
        Row: {
          id: string
          show_id: string
          start_time: string
          end_time: string
          day_of_week: number
          is_recurring: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          show_id: string
          start_time: string
          end_time: string
          day_of_week: number
          is_recurring?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          show_id?: string
          start_time?: string
          end_time?: string
          day_of_week?: number
          is_recurring?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "show_schedules_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "radio_shows"
            referencedColumns: ["id"]
          }
        ]
      }
      songs: {
        Row: {
          id: string
          title: string
          artist: string
          album: string | null
          genre: string | null
          year: number | null
          url: string | null
          is_karaoke: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          artist: string
          album?: string | null
          genre?: string | null
          year?: number | null
          url?: string | null
          is_karaoke?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          artist?: string
          album?: string | null
          genre?: string | null
          year?: number | null
          url?: string | null
          is_karaoke?: boolean | null
          created_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          name: string
          permissions: Json
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          permissions?: Json
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          permissions?: Json
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_schedule_conflicts: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
