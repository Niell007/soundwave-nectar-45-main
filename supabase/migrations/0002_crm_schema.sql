-- Create radio shows and scheduling tables
CREATE TABLE IF NOT EXISTS public.radio_shows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    show_type TEXT CHECK (show_type IN ('live', 'recorded', 'hybrid')),
    duration INTERVAL NOT NULL,
    recurring BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.show_schedules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    show_id UUID REFERENCES public.radio_shows(id) ON DELETE CASCADE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
    is_recurring BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

CREATE TABLE IF NOT EXISTS public.show_hosts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    show_id UUID REFERENCES public.radio_shows(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create playlist management tables
CREATE TABLE IF NOT EXISTS public.playlists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.playlist_songs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    playlist_id UUID REFERENCES public.playlists(id) ON DELETE CASCADE,
    song_id UUID REFERENCES public.songs(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE (playlist_id, position)
);

-- Create analytics tables
CREATE TABLE IF NOT EXISTS public.listener_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    show_id UUID REFERENCES public.radio_shows(id) ON DELETE SET NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    listener_count INTEGER NOT NULL DEFAULT 0,
    peak_listeners INTEGER NOT NULL DEFAULT 0,
    average_duration INTERVAL,
    CONSTRAINT positive_listeners CHECK (listener_count >= 0 AND peak_listeners >= 0)
);

CREATE TABLE IF NOT EXISTS public.advertisement_campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    budget DECIMAL(10,2),
    target_audience TEXT,
    status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    CONSTRAINT valid_date_range CHECK (start_date < end_date)
);

CREATE TABLE IF NOT EXISTS public.advertisement_metrics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.advertisement_campaigns(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    CONSTRAINT positive_metrics CHECK (
        impressions >= 0 AND
        clicks >= 0 AND
        conversions >= 0 AND
        clicks <= impressions AND
        conversions <= clicks
    )
);

-- Create user management tables
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    permissions JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.dj_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    bio TEXT,
    experience TEXT,
    specialties TEXT[],
    equipment TEXT[],
    hourly_rate DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.ai_broadcasters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    voice_config JSONB NOT NULL DEFAULT '{}',
    personality_type TEXT,
    active_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create communication tables
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    from_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    to_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    content TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on new tables
ALTER TABLE public.radio_shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.show_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.show_hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listener_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisement_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisement_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dj_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_broadcasters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies for new tables
-- Radio Shows policies
CREATE POLICY "Shows are viewable by everyone" ON public.radio_shows
    FOR SELECT USING (true);

CREATE POLICY "Shows can be managed by admins and owners" ON public.radio_shows
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.profiles WHERE is_admin = true
            UNION
            SELECT user_id FROM public.show_hosts WHERE show_id = radio_shows.id
        )
    );

-- Playlists policies
CREATE POLICY "Public playlists are viewable by everyone" ON public.playlists
    FOR SELECT USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Playlists can be managed by creator" ON public.playlists
    FOR ALL USING (created_by = auth.uid());

-- Messages policies
CREATE POLICY "Users can view their own messages" ON public.messages
    FOR SELECT USING (
        auth.uid() IN (from_user_id, to_user_id)
    );

CREATE POLICY "Users can send messages" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = from_user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_radio_shows_created_by ON public.radio_shows(created_by);
CREATE INDEX IF NOT EXISTS idx_show_schedules_show_id ON public.show_schedules(show_id);
CREATE INDEX IF NOT EXISTS idx_show_hosts_show_id ON public.show_hosts(show_id);
CREATE INDEX IF NOT EXISTS idx_show_hosts_user_id ON public.show_hosts(user_id);
CREATE INDEX IF NOT EXISTS idx_playlist_songs_playlist_id ON public.playlist_songs(playlist_id);
CREATE INDEX IF NOT EXISTS idx_messages_users ON public.messages(from_user_id, to_user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);

-- Create function to manage show schedules
CREATE OR REPLACE FUNCTION public.check_schedule_conflicts()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.show_schedules
        WHERE day_of_week = NEW.day_of_week
        AND show_id != NEW.show_id
        AND (
            (NEW.start_time, NEW.end_time) OVERLAPS (start_time, end_time)
        )
    ) THEN
        RAISE EXCEPTION 'Schedule conflict detected';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
