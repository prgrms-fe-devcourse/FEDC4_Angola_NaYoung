import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Notification } from '@type';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';

const LikeNotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  const navigate = useNavigate();

  const handleClickMoveToPostPage = () => {
    navigate(`/post/${notification.post}`);
  };

  return (
    <LikeListItemContainer onClick={handleClickMoveToPostPage}>
      <LikeListItemIcon>
        <Icon
          name="heart"
          size={'24'}
        />
      </LikeListItemIcon>
      <LikeListItemText>
        <UserFullNameSpan>{notification.author.fullName}</UserFullNameSpan>님이
        내 포스트를 좋아합니다.
      </LikeListItemText>
    </LikeListItemContainer>
  );
};

export default LikeNotificationItem;

const LikeListItemContainer = styled.div`
  display: flex;
  padding: 6px 8px 6px 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 50px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
`;

const LikeListItemIcon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  background: ${ANGOLA_STYLES.color.gray};
`;

const LikeListItemText = styled.p`
  width: 300px;
  font-size: ${ANGOLA_STYLES.textSize.text};
`;

const UserFullNameSpan = styled.span`
  color: ${ANGOLA_STYLES.color.black};
  font-weight: 600;
`;
