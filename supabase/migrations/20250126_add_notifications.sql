-- Create notifications table
create table if not exists public.notifications (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    type text not null,
    message text not null,
    read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.notifications enable row level security;

-- Users can only read their own notifications
create policy "Users can view own notifications"
    on notifications for select
    using (auth.uid() = user_id);

-- Edge functions can create notifications
create policy "Edge functions can create notifications"
    on notifications for insert
    with check (true);  -- Since Edge Functions use service_role key

-- Users can mark their notifications as read
create policy "Users can update own notifications"
    on notifications for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- Add indexes
create index if not exists notifications_user_id_idx on public.notifications(user_id);
create index if not exists notifications_created_at_idx on public.notifications(created_at);
