import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Notification } from '@type';
import Spinner from '@components/Spinner';
import {
  useFetchGetNotifications,
  useFetchReadNotifications,
} from '@apis/notifications';
import { ANGOLA_STYLES } from '@styles/commonStyles';
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
  const viewerBackGroundRef = useRef(null);

  useEffect(() => {
    // Viewer 바깥 영역 클릭 시, 뷰어 닫아지도록
    const handleClickViewerBackGround = (e: MouseEvent) => {
      if (
        viewerBackGroundRef.current &&
        e.target === viewerBackGroundRef.current
      ) {
        console.log('배경 클릭 시에만 viewer 닫기');
        handleClickCloseViewer();
      }
    };

    window.addEventListener('click', handleClickViewerBackGround);

    return () => {
      window.removeEventListener('click', handleClickViewerBackGround);
    };
  });

  // 알림 목록 조회 data
  const {
    getNotificationsData,
    isGetNotificationsLoading,
    getNotificationRefetch,
  } = useFetchGetNotifications();

  // 알림 읽음 처리 API
  const { readNotificationsMutate } = useFetchReadNotifications();

  const handleClickReadNotifications = () => {
    readNotificationsMutate(undefined, {
      onSuccess: () => {
        getNotificationRefetch();
      },
    }); // TODO:MinwooP - 에러 처리
    // TODO:MinwooP - 이후 Notification data 업데이트 안된 상태면 refetch 혹은 invalidQueries 써서 다시 불러오기
  };

  if (isGetNotificationsLoading) return <Spinner />;

  return (
    <NotificationViewerBackGround ref={viewerBackGroundRef}>
      <NotificationViewerContainer>
        <NotificationHeader>
          <NotificationHeaderTitle>알림 목록</NotificationHeaderTitle>
          <ShowAllNotificationsCheckBox>
            지난 알림 보기
          </ShowAllNotificationsCheckBox>
        </NotificationHeader>
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
    </NotificationViewerBackGround>
  );
};

export default NotificationViewer;

const NotificationViewerBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const NotificationViewerContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 80px;
  z-index: 100; // TODO: 나중에 z-index 기준 컴포넌트 별로 설정 필요
  padding: 24px 0px 24px 12px;

  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  border-radius: 48px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
`;

const NotificationHeader = styled.div`
  display: flex;

  padding: 0px 24px 0px 12px;
  height: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const NotificationHeaderTitle = styled.p`
  font-size: ${ANGOLA_STYLES.textSize.title};
`;

const ShowAllNotificationsCheckBox = styled.button`
  color: ${ANGOLA_STYLES.color.text};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  text-align: center;
`;

const EmptyNotificationList = styled.div``;

const NotificationList = styled.ul`
  height: 400px;
  overflow-y: scroll;
`;

const NotificationListItem = styled.li`
  display: flex;
  margin-bottom: 8px;
  border-radius: 50px;
`;

const NotificationBottomBar = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReadNotificationButton = styled.button`
  width: 200px;
  height: 50px;
`;
