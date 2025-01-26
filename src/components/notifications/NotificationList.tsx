import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Bell, Check } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
}

export const NotificationList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Notification[];
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast({
        title: "Success",
        description: "Notification marked as read",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!notifications?.length) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No notifications
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start justify-between p-4 rounded-lg border ${
            notification.read ? "bg-muted" : "bg-card"
          }`}
        >
          <div className="flex items-start space-x-4">
            <Bell className="h-5 w-5 mt-1" />
            <div>
              <p className="font-medium">{notification.type}</p>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(notification.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          {!notification.read && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markAsReadMutation.mutate(notification.id)}
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Mark as read</span>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
