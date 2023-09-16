import styled from '@emotion/styled';
import { Notification } from '@type';
import Spinner from '@components/Spinner';
import {
  useFetchGetNotifications,
  useFetchReadNotifications,
} from '@apis/notifications';
import CommentNotificationItem from './CommentNotificationItem';
import FollowNotificationItem from './FollowNotificationItem';
import LikeNotificationItem from './LikeNotificationItem';

// TODO:MinwooP - 유틸함수 구현해서 LikeNotificationItem or FollowItem or CommentItem 중 하나를 리턴
// TODO:MinwooP - 컴포넌트 밖으로 빼기 ?
const decideNotificationType = ({
  notification,
}: {
  notification: Notification;
}) => {
  console.log(
    `notification의 seen: ${notification.seen ? '읽음' : '아직 안 읽음'}`,
  );

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

interface NotificationViewePropsType {
  handleClickCloseViewer: () => void;
}

const NotificationViewer = ({
  handleClickCloseViewer,
}: NotificationViewePropsType) => {
  const {
    getNotificationsData,
    isGetNotificationsLoading,
    getNotificationRefetch,
  } = useFetchGetNotifications();

  const { readNotificationsMutate } = useFetchReadNotifications();

  const handleClickReadNotifications = () => {
    readNotificationsMutate(undefined, {
      onSuccess: () => {
        getNotificationRefetch();
        // 이렇게 onSuccess안에서 refetch할 수 있음 !
      },
    }); // TODO:MinwooP - 에러 처리
    // TODO:MinwooP - 이후 Notification data 업데이트 안된 상태면 refetch 혹은 invalidQueries 써서 다시 불러오기
  };

  if (isGetNotificationsLoading) return <Spinner />;

  return (
    <NotificationViewerContainer>
      {getNotificationsData?.length === 0 ? (
        <EmptyNotificationList>알림 목록이 없습니다.</EmptyNotificationList>
      ) : (
        <NotificationList>
          {getNotificationsData!.map((notification) => {
            return (
              <NotificationListItem
                key={notification._id}
                onClick={handleClickCloseViewer}>
                {decideNotificationType({ notification })}
              </NotificationListItem>
            );
          })}
        </NotificationList>
      )}
      <NotificationBottomBar>
        <ReadNotificationButton onClick={handleClickReadNotifications}>
          모든 알림 확인
        </ReadNotificationButton>
      </NotificationBottomBar>
    </NotificationViewerContainer>
  );
};

export default NotificationViewer;

const NotificationViewerContainer = styled.div`
  position: absolute; // TODO: 알림 버튼을 relative
  top: 120px; // TODO: 알림 버튼 바로 밑에 붙도록
  right: 0;
  z-index: 2; // TODO: 나중에 z-index 기준 컴포넌트 별로 설정 필요
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: blue;
`;

const EmptyNotificationList = styled.div``;

const NotificationList = styled.ul``;

const NotificationListItem = styled.li`
  display: flex;
  width: 400px;
  height: 50px;
  background-color: white;
  margin-bottom: 8px;
`;

const NotificationBottomBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReadNotificationButton = styled.button`
  width: 200px;
  height: 50px;
`;
