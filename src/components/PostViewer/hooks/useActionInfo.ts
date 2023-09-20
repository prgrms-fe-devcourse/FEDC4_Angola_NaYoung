import { useEffect, useState } from 'react';
import type { IconName } from '@components/Icon';

const getCommentIcon = (isVoted: boolean, isShow: boolean) => {
  if (isVoted) {
    return 'comment';
  }
  if (isShow) {
    return 'comment_empty';
  }
  return 'comments';
};

interface ActionInfoProps {
  isVoted: boolean;
  isShow: boolean;
  isLiked: boolean;
}

export const useActionInfo = ({
  isVoted,
  isShow,
  isLiked,
}: ActionInfoProps) => {
  const [commentIcon, setCommentIcon] = useState<IconName>(() =>
    getCommentIcon(isVoted, isShow),
  );
  const [likeIcon, setLikeIcon] = useState<IconName>(() =>
    isLiked ? 'heart' : 'heart_empty',
  );
  const [commentClassName, setCommentClassName] = useState(() =>
    isVoted ? 'actioned' : '',
  );
  const [likeClassName, setLikeClassName] = useState(() =>
    isLiked ? 'actioned' : '',
  );
  useEffect(() => {
    setCommentIcon(() => getCommentIcon(isVoted, isShow));
    setLikeIcon(() => (isLiked ? 'heart' : 'heart_empty'));
    setCommentClassName(() => (isVoted ? 'actioned' : ''));
    setLikeClassName(() => (isLiked ? 'actioned' : ''));
  }, [isVoted, isShow, isLiked]);

  return { commentIcon, likeIcon, commentClassName, likeClassName };
};
