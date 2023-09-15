import styled from '@emotion/styled';
import { Notification } from '@type';
import Spinner from '@components/Spinner';
import { useFetchGetNotifications } from '@apis/notifications';
import LikeNotificationItem from './LikeNotificationItem';

// TODO: 유틸함수 구현해서 LikeNotificationItem or FollowItem or CommentItem 중 하나를 리턴
const checkNotificationType = ({
  notification,
}: {
  notification: Notification;
}) => {
  if (Object.prototype.hasOwnProperty.call(notification, 'like')) {
    return (
      <LikeNotificationItem notification={notification}></LikeNotificationItem>
    );
  }

  // TODO: if문 두개 더 써서 FollowNotificationItem, CommentNotificationItem 도 리턴하게 만들어주기
};

const NotificationViewer = () => {
  const { getNotificationsData, isGetNotificationsLoading } =
    useFetchGetNotifications();

  console.log(
    `렌더링 => notification 목록 가져오기 api 실행 : ${getNotificationsData}`,
  );

  if (isGetNotificationsLoading) return <Spinner />;

  return (
    <NotificationViewerContainer>
      {getNotificationsData ? (
        <EmptyNotificationList>알림 목록이 없습니다.</EmptyNotificationList>
      ) : (
        <NotificationList>
          {getNotificationsData!.map((notification) => {
            return (
              <NotificationListItem key={notification._id}>
                {checkNotificationType({ notification })}
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
  top: 100px; // TODO: 알림 버튼 바로 밑에 붙도록
  right: 0;
  z-index: 2; // TODO: 나중에 z-index 기준 컴포넌트 별로 설정 필요 
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: yellow;
`;

const EmptyNotificationList = styled.div``;

const NotificationList = styled.ul`

`;

// TODO: 안에 알림 확인 버튼 넣기 ?
const NotificationBottomBar = styled.div`
  display: flex;
`;

const NotificationListItem = styled.li`
  display: flex;
`;
