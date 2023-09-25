import { Notification } from '@type';

export const filterSameFollowerNotifications = (
  notificationList: Notification[],
) => {
  const follwerList: string[] | null = [];
  const filteredNotificationList: Notification[] | null = [];

  notificationList.forEach((notification) => {
    if (notification.post === null) {
      if (!follwerList.includes(notification.author.fullName)) {
        follwerList.push(notification.author.fullName);
        filteredNotificationList.push(notification);
      }
    } else {
      filteredNotificationList.push(notification);
    }
  });

  return filteredNotificationList;
};
