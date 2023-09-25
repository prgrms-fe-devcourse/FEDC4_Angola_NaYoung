import { Icon } from '@components';
import styled from '@emotion/styled';
import type { Notification } from '@type';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { ID, NOTIFICATION_MESSAGE } from '../constants';

const CommentNotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  return (
    <CommentListItemContainer seen={notification.seen}>
      <CommentListItemIcon>
        <Icon
          name="comment"
          size={'24'}
          color={
            notification.seen
              ? ANGOLA_STYLES.color.dark
              : ANGOLA_STYLES.color.text
          }
        />
      </CommentListItemIcon>
      <CommentListItemText seen={notification.seen}>
        <UserFullNameSpan
          id={ID.USER_NAME_SPAN_ELEMENT}
          seen={notification.seen}>
          {notification.author.fullName}
        </UserFullNameSpan>
        {NOTIFICATION_MESSAGE.COMMENT}
      </CommentListItemText>
    </CommentListItemContainer>
  );
};

export default CommentNotificationItem;

const CommentListItemContainer = styled.div<{ seen: boolean }>`
  display: flex;
  padding: 6px 12px 6px 8px;
  align-items: center;
  align-self: stretch;
  border-radius: 50px;
  gap: 8px;
  cursor: pointer;
  transition: 0.2s;
  border: ${({ seen }) =>
    seen
      ? ANGOLA_STYLES.border.notification_seen
      : ANGOLA_STYLES.border.default};
  background: ${({ seen }) =>
    seen ? ANGOLA_STYLES.color.gray : ANGOLA_STYLES.color.white};

  &:hover {
    background: ${ANGOLA_STYLES.color.gray};
  }
`;

const CommentListItemIcon = styled.div`
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

const CommentListItemText = styled.p<{ seen: boolean }>`
  width: 280px;
  font-size: ${ANGOLA_STYLES.textSize.text};
  color: ${({ seen }) =>
    seen ? ANGOLA_STYLES.color.dark : ANGOLA_STYLES.color.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    width: 140px;
  }
`;

const UserFullNameSpan = styled.span<{ seen: boolean }>`
  color: ${({ seen }) =>
    seen ? ANGOLA_STYLES.color.dark : ANGOLA_STYLES.color.black};
  font-weight: 600;

  :hover {
    text-decoration: underline;
  }
`;
