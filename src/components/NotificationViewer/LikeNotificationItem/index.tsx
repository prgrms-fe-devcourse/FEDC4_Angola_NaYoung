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
    <LikeListItemContainer
      seen={notification.seen}
      onClick={handleClickMoveToPostPage}>
      <LikeListItemIcon>
        <Icon
          name="heart"
          size={'24'}
          color={
            notification.seen
              ? ANGOLA_STYLES.color.dark
              : ANGOLA_STYLES.color.text
          }
        />
      </LikeListItemIcon>
      <LikeListItemText seen={notification.seen}>
        <UserFullNameSpan seen={notification.seen}>
          {notification.author.fullName}
        </UserFullNameSpan>
        님이 내 포스트를 좋아합니다.
      </LikeListItemText>
    </LikeListItemContainer>
  );
};

export default LikeNotificationItem;

const LikeListItemContainer = styled.div<{ seen: boolean }>`
  display: flex;
  padding: 6px 8px 6px 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 50px;
  border: ${({ seen }) =>
    seen
      ? ANGOLA_STYLES.border.notification_seen
      : ANGOLA_STYLES.border.default};
  background: ${({ seen }) =>
    seen ? ANGOLA_STYLES.color.gray : ANGOLA_STYLES.color.white};
`;

const LikeListItemIcon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  color: ${ANGOLA_STYLES.color.text};
  border-radius: 50px;
  background: ${ANGOLA_STYLES.color.gray};
`;

const LikeListItemText = styled.p<{ seen: boolean }>`
  width: 300px;
  font-size: ${ANGOLA_STYLES.textSize.text};
  color: ${({ seen }) =>
    seen ? ANGOLA_STYLES.color.dark : ANGOLA_STYLES.color.text};
`;

const UserFullNameSpan = styled.span<{ seen: boolean }>`
  color: ${({ seen }) =>
    seen ? ANGOLA_STYLES.color.dark : ANGOLA_STYLES.color.black};
  font-weight: 600;
`;
