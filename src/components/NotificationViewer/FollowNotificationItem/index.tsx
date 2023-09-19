import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Notification } from '@type';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';

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
    <FollowListItemContainer onClick={handleClickMoveToUserPage}>
      <FollowListItemIcon>
        <Icon
          name="user"
          size={'24'}
        />
      </FollowListItemIcon>
      <FollowListItemText>
        <UserFullNameSpan>{notification.author.fullName}</UserFullNameSpan>님이
        나를 팔로우합니다.
      </FollowListItemText>
    </FollowListItemContainer>
  );
};

export default FollowNotificationItem;

const FollowListItemContainer = styled.p`
  display: flex;
  padding: 6px 8px 6px 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 50px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
`;

const FollowListItemIcon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  background: ${ANGOLA_STYLES.color.gray};
`;

const FollowListItemText = styled.p`
  width: 300px;
`;

const UserFullNameSpan = styled.span`
  color: ${ANGOLA_STYLES.color.black};
  font-weight: 600;
`;
