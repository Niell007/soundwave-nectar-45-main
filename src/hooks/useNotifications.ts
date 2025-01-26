import { useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EmailNotification, NotificationTemplate, SendEmailNotificationParams } from '@/types/notifications';

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query for fetching user's notifications
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as EmailNotification[];
    },
  });

  // Mutation for sending new notifications
  const { mutate: sendNotification } = useMutation({
    mutationFn: async ({ userId, subject, content }: SendEmailNotificationParams) => {
      const { data, error } = await supabase
        .rpc('send_email_notification', {
          p_user_id: userId,
          p_subject: subject,
          p_content: content,
        });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast({
        title: 'Success',
        description: 'Email notification sent successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to send email notification',
        variant: 'destructive',
      });
    },
  });

  // Send templated email
  const sendTemplatedEmail = async (
    userId: string,
    template: NotificationTemplate,
    variables: Record<string, string>
  ) => {
    let subject = template.subject;
    let content = template.content;

    // Replace variables in subject and content
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      subject = subject.replace(regex, value);
      content = content.replace(regex, value);
    });

    return sendNotification({ userId, subject, content });
  };

  useEffect(() => {
    // Subscribe to notifications table changes
    const channel = supabase
      .channel('email_notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'email_notifications'
        },
        (payload) => {
          // Invalidate notifications query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
          
          // Show toast notification for new notifications
          if (payload.eventType === 'INSERT') {
            toast({
              title: 'New Notification',
              description: payload.new.subject,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, toast]);

  return {
    notifications,
    isLoading,
    sendNotification,
    sendTemplatedEmail,
  };
};
