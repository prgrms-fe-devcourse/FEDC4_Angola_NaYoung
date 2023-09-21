import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useFetchLike, useFetchUnLike } from '@apis/like';
import { useFetchCreateNotification } from '@apis/notifications';
import { authInfoState } from '@store/auth';

export const usePostLike = ({
  likeId,
  numberOfLikes,
  postId,
  authorId,
}: {
  likeId: string | undefined;
  numberOfLikes: number;
  postId: string;
  authorId: string;
}) => {
  const userId = useRecoilValue(authInfoState)?.userId;
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
      userId !== authorId &&
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

  return { handleLike, isLiked, likes };
};
