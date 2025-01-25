export interface User {
  id: string;
  email?: string;
  username: string | null;
  is_admin: boolean;
  created_at: string;
  avatar_url?: string | null;
}

export interface Profile extends User {
  updated_at?: string;
}