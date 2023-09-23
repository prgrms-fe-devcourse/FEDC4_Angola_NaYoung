import { Notification } from '@type/index';
import {
  CommentNotificationItem,
  FollowNotificationItem,
  LikeNotificationItem,
} from '.';

const DecideNotificationType = ({
  notification,
}: {
  notification: Notification;
}) => {
  if (Object.prototype.hasOwnProperty.call(notification, 'like')) {
    return <LikeNotificationItem notification={notification} />;
  }

  if (Object.prototype.hasOwnProperty.call(notification, 'comment')) {
    return <CommentNotificationItem notification={notification} />;
  }

  if (Object.prototype.hasOwnProperty.call(notification, 'follow')) {
    return <FollowNotificationItem notification={notification} />;
  }
};

export default DecideNotificationType;