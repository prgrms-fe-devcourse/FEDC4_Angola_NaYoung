import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Notification } from '@type';

const FollowNotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  const navigate = useNavigate();

  const handleClickMoveToUserPage = () => {
    navigate(`/user/${notification.author._id}`);
  };

  return (
    <FollowListItemContent onClick={handleClickMoveToUserPage}>
      <UserFullNameSpan>{notification.author.fullName}</UserFullNameSpan>님이
      나를 팔로우합니다.
    </FollowListItemContent>
  );
};

export default FollowNotificationItem;

const FollowListItemContent = styled.p`
  box-sizing: border-box;
`;

const UserFullNameSpan = styled.span`
  box-sizing: border-box;
`;
