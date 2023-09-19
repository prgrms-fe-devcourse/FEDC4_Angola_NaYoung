import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Notification } from '@type';
import Icon from '@components/Icon';
import { ANGOLA_STYLES } from '@styles/commonStyles';

const CommentNotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  const navigate = useNavigate();

  const handleClickMoveToPostPage = () => {
    navigate(`/post/${notification.post}`);
  };

  return (
    <CommentListItemContainer onClick={handleClickMoveToPostPage}>
      <CommentListItemIcon>
        <Icon
          name="comment"
          size={'24'}
        />
      </CommentListItemIcon>
      <CommentListItemText>
        <UserFullNameSpan>{notification.author.fullName}</UserFullNameSpan>님이
        내 포스트에 댓글을 남겼습니다.
      </CommentListItemText>
    </CommentListItemContainer>
  );
};

export default CommentNotificationItem;

const CommentListItemContainer = styled.p`
  display: flex;
  padding: 6px 8px 6px 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 50px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
`;

const CommentListItemIcon = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  background: ${ANGOLA_STYLES.color.gray};
`;

const CommentListItemText = styled.p`
  width: 300px;
`;

const UserFullNameSpan = styled.span`
  color: ${ANGOLA_STYLES.color.black};
  font-weight: 600;
`;
