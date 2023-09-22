import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Notification } from '@type';
import Icon from '@components/Icon';
import Spinner from '@components/Spinner';
import {
  useFetchGetNotifications,
  useFetchReadNotifications,
} from '@apis/notifications';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import {
  CommentNotificationItem,
  FollowNotificationItem,
  LikeNotificationItem,
} from './components';

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

interface NotificationViewePropsType {
  handleClickCloseViewer: VoidFunction;
}

const NotificationViewer = ({
  handleClickCloseViewer,
}: NotificationViewePropsType) => {
  const navigate = useNavigate();
  const viewerBackGroundRef = useRef(null);

  useEffect(() => {
    // Viewer 바깥 영역 클릭 시, 뷰어 닫아지도록
    const handleClickViewerBackGround = (e: Event) => {
      if (
        viewerBackGroundRef.current &&
        e.target === viewerBackGroundRef.current
      ) {
        handleClickCloseViewer();
      }
    };

    window.addEventListener('click', handleClickViewerBackGround);

    return () => {
      window.removeEventListener('click', handleClickViewerBackGround);
    };
  });

  // 모든 알림 볼 건지 or 새로운 알림만 볼 건지
  const [isShowAllNotifications, setIsShowAllNotifications] = useState(false);

  // 알림 목록 조회 data
  const {
    getNotificationsData,
    isGetNotificationsLoading,
    getNotificationRefetch,
  } = useFetchGetNotifications();

  // 알림 읽음 처리 API
  const { readNotificationsMutate, isReadNotificationsLoading } =
    useFetchReadNotifications();

  const handleClickReadNotifications = () => {
    readNotificationsMutate(undefined, {
      onSuccess: () => {
        getNotificationRefetch();
      },
    }); // TODO:MinwooP - 에러 처리
  };

  // notification Item 클릭 시 페이지 이동 로직
  const handleClickListItem = (
    e: MouseEvent<HTMLLIElement>,
    notification: Notification,
  ) => {
    if (e.target instanceof HTMLSpanElement && e.target.id === 'userName') {
      // Item내 userName 클릭 시 해당 유저페이지로 이동
      navigate(`/user/${notification.author._id}`);
    } else {
      if (notification.post === null) {
        navigate(`/user/${notification.author._id}`); // 팔로우 알림 클릭 시 => 작성자 유저 페이지로 이동
      } else {
        // 좋아요, 댓글 알림 클릭 시 시 => 해당 포스트 페이지로 이동
        navigate(`/post/${notification.post}`);
      }
    }
    handleClickCloseViewer();
  };

  const filterSameFollowerNotifications = (
    notificationList: Notification[],
  ) => {
    const follwerList: string[] | null = [];
    const filteredNotificationList: Notification[] | null = [];

    notificationList.forEach((notification) => {
      if (notification.post === null) {
        // 팔로우 알림일 때
        if (!follwerList.includes(notification.author.fullName)) {
          // follweList에 없을 때 추가
          follwerList.push(notification.author.fullName);
          filteredNotificationList.push(notification);
        }
      } else {
        // 좋아요, 댓글 알림일 시 바로 List에 추가
        filteredNotificationList.push(notification);
      }
    });

    return filteredNotificationList;
  };

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
  z-index: 200; // TODO: 나중에 z-index 기준 컴포넌트 별로 설정 필요
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
