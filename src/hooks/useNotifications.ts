import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to notifications table changes
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          // Invalidate notifications query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
          
          // Show toast notification
          toast({
            title: payload.new.type,
            description: payload.new.message,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);
};
