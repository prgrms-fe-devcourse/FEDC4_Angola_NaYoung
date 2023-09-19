import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Icon from '@components/Icon';
import { useFetchLike, useFetchUnLike } from '@apis/like';
import { useFetchCreateNotification } from '@apis/notifications';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface ButtonGroupProps {
  numberOfLikes: number;
  numberOfComments: number;
  likeId: string | undefined;
  postId: string;
  authorId: string;
  isShow: boolean;
  isVoted: boolean;
  onGoDetailPage: () => void;
}

const ButtonGroup = ({
  numberOfLikes,
  numberOfComments,
  likeId,
  postId,
  authorId,
  isShow,
  isVoted,
  onGoDetailPage: goDetailPage,
}: ButtonGroupProps) => {
  const [userLikeId, setUserLikeId] = useState(likeId);
  const [likes, setLikes] = useState(numberOfLikes);
  const [isLiked, setIsLiked] = useState(likeId !== undefined);

  const { likeMutate, likeData } = useFetchLike();
  const { unLikeMutate } = useFetchUnLike();
  const { createNotificationMutate } = useFetchCreateNotification();

  useEffect(() => {
    setLikes(numberOfLikes);
    setUserLikeId(likeId);
    setIsLiked(likeId !== undefined);
  }, [numberOfLikes, likeId]);

  const handleLike = () => {
    if (userLikeId) {
      setLikes((prev) => prev - 1);
      unLikeMutate({ id: userLikeId });
    } else {
      setLikes((prev) => prev + 1);
      likeMutate({ postId });
    }
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    if (isLiked) {
      if (!likeData.likeId) return;
      setUserLikeId(likeData.likeId);
      createNotificationMutate({
        notificationType: 'LIKE',
        notificationTypeId: likeData.likeId,
        postId,
        userId: authorId,
      });
    } else {
      setUserLikeId(undefined);
    }
  }, [likeData.likeId, isLiked]);

  const getCommentIcon = (isVoted: boolean, isShow: boolean) => {
    if (isVoted) {
      return 'comment';
    }
    if (isShow) {
      return 'comment_empty';
    }
    return 'comments';
  };

  const getLikeIcon = (isLiked: boolean) => {
    return isLiked ? 'heart' : 'heart_empty';
  };

  return (
    <ActionButtonContainer>
      <ActionButton
        onClick={handleLike}
        className={isLiked ? 'actioned' : ''}>
        <Icon name={getLikeIcon(isLiked)} />
        <Number>{likes}</Number>
      </ActionButton>
      <ActionButton
        onClick={goDetailPage}
        className={isVoted ? 'actioned' : ''}>
        <Icon name={getCommentIcon(isVoted, isShow)} />
        <Number>{numberOfComments}</Number>
        {isShow || <Text>참여하기</Text>}
      </ActionButton>
    </ActionButtonContainer>
  );
};

export default ButtonGroup;

const ActionButtonContainer = styled.div`
  display: flex;
  padding: 24px 0;
  gap: 24px;
`;

const ActionButton = styled.div`
  display: flex;
  padding: 12px;
  min-width: 64px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  border: ${ANGOLA_STYLES.border.default};
  box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.default};
  border-radius: 56px;
  cursor: pointer;
  &:hover:not(:active) {
    box-shadow: ${ANGOLA_STYLES.shadow.buttonSm.hover};
  }
  &.actioned {
    background-color: ${ANGOLA_STYLES.color.gray};
  }
`;

const Number = styled.div`
  padding-top: 4px;
`;

const Text = styled.div`
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
`;
