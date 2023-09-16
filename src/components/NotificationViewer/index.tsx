import styled from '@emotion/styled';
import { Notification } from '@type';
import Spinner from '@components/Spinner';
import { useFetchGetNotifications } from '@apis/notifications';
import CommentNotificationItem from './CommentNotificationItem';
import FollowNotificationItem from './FollowNotificationItem';
import LikeNotificationItem from './LikeNotificationItem';

// TODO: 유틸함수 구현해서 LikeNotificationItem or FollowItem or CommentItem 중 하나를 리턴
const decideNotificationType = ({
  notification,
}: {
  notification: Notification;
}) => {
  if (Object.prototype.hasOwnProperty.call(notification, 'like')) {
    return (
      <LikeNotificationItem notification={notification}></LikeNotificationItem>
    );
  }

  if (Object.prototype.hasOwnProperty.call(notification, 'comment')) {
    return (
      <CommentNotificationItem
        notification={notification}></CommentNotificationItem>
    );
  }

  if (Object.prototype.hasOwnProperty.call(notification, 'follow')) {
    return (
      <FollowNotificationItem
        notification={notification}></FollowNotificationItem>
    );
  }
};

const NotificationViewer = () => {
  const { getNotificationsData, isGetNotificationsLoading } =
    useFetchGetNotifications();

  if (isGetNotificationsLoading) return <Spinner />;

  return (
    <NotificationViewerContainer>
      {getNotificationsData?.length === 0 ? (
        <EmptyNotificationList>알림 목록이 없습니다.</EmptyNotificationList>
      ) : (
        <NotificationList>
          {getNotificationsData!.map((notification) => {
            return (
              <NotificationListItem key={notification._id}>
                {decideNotificationType({ notification })}
              </NotificationListItem>
            );
          })}
        </NotificationList>
      )}
      <NotificationBottomBar></NotificationBottomBar>
    </NotificationViewerContainer>
  );
};

export default NotificationViewer;

const NotificationViewerContainer = styled.div`
  position: absolute; // TODO: 알림 버튼을 relative
  top: 120px; // TODO: 알림 버튼 바로 밑에 붙도록
  right: 0;
  z-index: 2; // TODO: 나중에 z-index 기준 컴포넌트 별로 설정 필요
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: blue;
`;

const EmptyNotificationList = styled.div``;

const NotificationList = styled.ul``;

// TODO: 안에 알림 확인 버튼 넣기 ?
const NotificationBottomBar = styled.div`
  display: flex;
`;

const NotificationListItem = styled.li`
  display: flex;
  width: 400px;
  height: 50px;
  background-color: white;
  margin-bottom: 8px;
`;
