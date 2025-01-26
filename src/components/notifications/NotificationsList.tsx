import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { NotificationStatus } from '@/types/notifications';

const getStatusColor = (status: NotificationStatus) => {
  switch (status) {
    case 'sent':
      return 'bg-green-500';
    case 'failed':
      return 'bg-red-500';
    default:
      return 'bg-yellow-500';
  }
};

export function NotificationsList() {
  const { notifications, isLoading } = useNotifications();

  if (isLoading) {
    return <div className="p-4 text-center">Loading notifications...</div>;
  }

  if (!notifications?.length) {
    return <div className="p-4 text-center">No notifications yet</div>;
  }

  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex flex-col space-y-2 rounded-lg border p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{notification.subject}</h4>
              <Badge
                variant="secondary"
                className={`${getStatusColor(notification.status)} text-white`}
              >
                {notification.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{notification.content}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </span>
              {notification.errorMessage && (
                <span className="text-red-500">{notification.errorMessage}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
