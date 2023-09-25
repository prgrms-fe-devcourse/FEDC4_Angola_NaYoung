import type { Notification } from '@type';

export const filterSameFollowerNotifications = (
  notificationList: Notification[],
) => {
  const followerList: string[] | null = [];
  const filteredNotificationList: Notification[] | null = [];

  notificationList.forEach((notification) => {
    if (notification.post === null) {
      if (!followerList.includes(notification.author.fullName)) {
        followerList.push(notification.author.fullName);
        filteredNotificationList.push(notification);
      }
    } else {
      filteredNotificationList.push(notification);
    }
  });

  return filteredNotificationList;
};
