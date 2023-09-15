import styled from '@emotion/styled';
import Spinner from '@components/Spinner';
import { useFetchGetNotifications } from '@apis/notifications';


const NotificationViewer = () => {
  const { getNotificationsData, isGetNotificationsLoading } =
    useFetchGetNotifications();

  console.log(`렌더링 => notification 목록 가져오기 api 실행 : ${getNotificationsData}`)

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
                
              </NotificationListItem>
            );
          })}
        </NotificationList>
      )}
      <NotificationBottomBar>

      </NotificationBottomBar>
    </NotificationViewerContainer>
  );
};

export default NotificationViewer;

const NotificationViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyNotificationList = styled.div`

`

const NotificationList = styled.ul`
  display: absolute; // 알림 버튼을 relative
  top: 88px; // 알림 버튼 바로 밑에 붙도록
  left: 0%;
`;

// TODO: 안에 알림 확인 버튼 넣기 ?
const NotificationBottomBar = styled.div`
  display: flex;
`;

const NotificationListItem = styled.li`
  display: flex;
`;