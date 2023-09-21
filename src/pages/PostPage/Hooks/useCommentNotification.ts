import { Dispatch, SetStateAction, useEffect } from 'react';
import { NOTIFICATION_TYPE } from '@constants';
import { Post } from '@type';
import { useFetchCreateNotification } from '@apis/notifications';

interface useCommentNotificationProps {
  postData: Post;
  isVoted: boolean;
  myId: string | undefined;
  setIsVoted: Dispatch<SetStateAction<boolean>>;
}

const useCommentNotification = ({
  postData,
  isVoted,
  myId,
  setIsVoted,
}: useCommentNotificationProps) => {
  const { createNotificationMutate } = useFetchCreateNotification();

  useEffect(() => {
    if (postData && isVoted && myId) {
      const userComment = postData.comments.find(
        (comment) => comment.author._id === myId,
      );

      if (!userComment) return;
      setIsVoted(false);

      if (myId === postData.author._id) {
        return;
      }
      createNotificationMutate({
        notificationType: 'COMMENT',
        notificationTypeId: userComment._id,
        userId: postData.author._id,
        postId: postData._id,
      });
    }
  }, [isVoted, postData, myId, createNotificationMutate, setIsVoted]);
};

export default useCommentNotification;
