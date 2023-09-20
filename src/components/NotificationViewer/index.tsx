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
import CommentNotificationItem from './CommentNotificationItem';
import FollowNotificationItem from './FollowNotificationItem';
import LikeNotificationItem from './LikeNotificationItem';

const decideNotificationType = ({
  // noficiation 객체가 like, comment, follow 알림 중 무엇인지 판단해서 각 컴포넌트 return 해주는 함수
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
    // TODO:MinwooP - 이후 Notification data 업데이트 안된 상태면 refetch 혹은 invalidQueries 써서 다시 불러오기
  };

  // notification Item을 클릭했을 때, 그 안 userName 클릭 시 해당 유저페이지로 이동,
  // 그외 클릭시 포스트페이지 or 유저페이지로 이동
  const handleClickListItem = (
    e: MouseEvent<HTMLLIElement>,
    notification: Notification,
  ) => {
    if (e.target instanceof HTMLSpanElement && e.target.id === 'userName') {
      console.log(
        `유저 이름 클릭 => ${notification.author.fullName} 유저페이지로 이동`,
      );
      navigate(`/user/${notification.author._id}`);
    } else {
      if (notification.post === null) {
        navigate(`/user/${notification.author._id}`);
        console.log(
          `follow 알림 => ${notification.author.fullName} 유저페이지로 이동`,
        );
      } else {
        console.log('좋아요 or 댓글 알림');
        navigate(`/post/${notification.post}`);
      }
    }
    handleClickCloseViewer();
  };

  const showNewNotificationList = () => {
    // FIXME: getNotificationsData를 인자로 받아서 호출해줘야 하나
    const NewNotifications = getNotificationsData!.filter((notification) => {
      return notification.seen === false;
    });

    if (NewNotifications.length === 0) {
      return (
        <EmptyNotificationList>새 알림 목록이 없습니다.</EmptyNotificationList>
      );
    }

    return NewNotifications.map((notification) => {
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

  const showAllNotificationList = () => {
    return getNotificationsData?.length === 0 ? (
      <EmptyNotificationList>알림 목록이 없습니다.</EmptyNotificationList>
    ) : (
      getNotificationsData!.map((notification) => {
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
      })
    );
  };

  if (isGetNotificationsLoading) return <Spinner />;

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
              size={'24'}></Icon>
          </ShowAllNotificationsCheckBox>
        </NotificationHeader>
        {isReadNotificationsLoading ? (
          <Spinner />
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
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const NotificationViewerContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 80px;
  z-index: 1000; // TODO: 나중에 z-index 기준 컴포넌트 별로 설정 필요
  padding: 24px 0px 24px 12px;
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

const ShowAllNotificationsCheckBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${ANGOLA_STYLES.color.text};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
`;

const ShowAllNotificationsText = styled.p`
  margin-right: 4px;
  font-size: ${ANGOLA_STYLES.textSize.text};
`;

const EmptyNotificationList = styled.div`
  width: 368px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotificationList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 380px;
  overflow-y: scroll;
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
  &:hover {
    box-shadow: ${ANGOLA_STYLES.shadow.button.hover};
  }
`;
