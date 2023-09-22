import { MouseEvent } from 'react';
import styled from '@emotion/styled';
import { Notification } from '@type';
import Icon from '@components/Icon';
import Spinner from '@components/Spinner';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import {
  CommentNotificationItem,
  FollowNotificationItem,
  LikeNotificationItem,
} from './components';
import useNotification from './hooks/useNotification';
import { filterSameFollowerNotifications } from './utils';

const decideNotificationType = ({
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

interface NotificationViewerPropsType {
  handleClickCloseViewer: VoidFunction;
}

const NotificationViewer = ({
  handleClickCloseViewer,
}: NotificationViewerPropsType) => {
  const {
    viewerBackGroundRef,
    isShowAllNotifications,
    setIsShowAllNotifications,
    getNotificationsData,
    isGetNotificationsLoading,
    isReadNotificationsLoading,
    handleClickReadNotifications,
    handleClickListItem,
  } = useNotification({ handleClickCloseViewer });

  const showAllNotificationList = () => {
    if (getNotificationsData?.length === 0) {
      return (
        <EmptyNotificationList>알림 목록이 없습니다.</EmptyNotificationList>
      );
    }

    const filteredNotificationList = filterSameFollowerNotifications(
      getNotificationsData!,
    );

    return filteredNotificationList.map((notification) => {
      return (
        <NotificationListItem
          id="notificationItem"
          key={notification._id}
          onClick={(e: MouseEvent<HTMLLIElement>) => {
            handleClickListItem(e, notification);
          }}>
          {decideNotificationType({ notification })}
        </NotificationListItem>
      );
    });
  };

  const showNewNotificationList = () => {
    if (getNotificationsData?.length === 0) {
      return (
        <EmptyNotificationList>새 알림 목록이 없습니다.</EmptyNotificationList>
      );
    }

    const newNotificationList = getNotificationsData!.filter((notification) => {
      return notification.seen === false;
    });

    if (newNotificationList?.length === 0) {
      return (
        <EmptyNotificationList>새 알림 목록이 없습니다.</EmptyNotificationList>
      );
    }

    const filteredNotificationList =
      filterSameFollowerNotifications(newNotificationList);

    return filteredNotificationList.map((notification) => {
      return (
        <NotificationListItem
          key={notification._id}
          onClick={(e) => {
            handleClickListItem(e, notification);
          }}>
          {decideNotificationType({ notification })}
        </NotificationListItem>
      );
    });
  };

  if (isGetNotificationsLoading) {
    return <Spinner />;
  }

  return (
    <NotificationViewerBackGround ref={viewerBackGroundRef}>
      <NotificationViewerContainer>
        <NotificationHeader>
          <NotificationHeaderTitle>알림 목록</NotificationHeaderTitle>
          <ShowAllNotificationsCheckBox
            onClick={() => {
              setIsShowAllNotifications((prev) => !prev);
            }}>
            <ShowAllNotificationsText>지난 알림 보기</ShowAllNotificationsText>
            <Icon
              name={
                isShowAllNotifications
                  ? 'notification_check'
                  : 'notification_uncheck'
              }
              size={'24'}
            />
          </ShowAllNotificationsCheckBox>
        </NotificationHeader>

        {isReadNotificationsLoading ? (
          <EmptyNotificationList>로딩중입니다.</EmptyNotificationList>
        ) : (
          <NotificationList>
            {isShowAllNotifications
              ? showAllNotificationList()
              : showNewNotificationList()}
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
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
`;

const NotificationViewerContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 80px;
  padding: 24px 12px 24px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 48px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
`;

const NotificationHeader = styled.div`
  display: flex;
  padding: 0px 24px 0px 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const NotificationHeaderTitle = styled.p`
  font-size: ${ANGOLA_STYLES.textSize.title};
`;

const ShowAllNotificationsText = styled.p`
  margin-right: 4px;
  font-size: ${ANGOLA_STYLES.textSize.text};
`;

const ShowAllNotificationsCheckBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${ANGOLA_STYLES.color.text};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
`;

const EmptyNotificationList = styled.div`
  width: 352px;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 112px;
  }
`;

const NotificationList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 380px;
  overflow: auto;
`;

const NotificationListItem = styled.li`
  display: flex;
  margin-bottom: 8px;
  border-radius: 50px;
`;

const NotificationBottomBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReadNotificationButton = styled.button`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  font-size: ${ANGOLA_STYLES.textSize.text};
  border-radius: 50px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
  cursor: pointer;

  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.button.hover};
  }
`;
