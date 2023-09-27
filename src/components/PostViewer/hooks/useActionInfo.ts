import { useEffect, useState } from 'react';
import type { IconName } from '@components/Icon';
import { BUTTON_GROUP } from '../constants';

const getCommentIcon = (isVoted: boolean, isShow: boolean): IconName => {
  if (isVoted) {
    return 'comment';
  }
  if (isShow) {
    return 'comment_empty';
  }
  return 'comments';
};

const getLikeIcon = (isLiked: boolean): IconName => {
  return isLiked ? 'heart' : 'heart_empty';
};

const getActionClassName = (action: boolean) => {
  return action ? BUTTON_GROUP.BUTTON_ACTIONED_CLASS : '';
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
    getLikeIcon(isLiked),
  );
  const [commentClassName, setCommentClassName] = useState(() =>
    getActionClassName(isVoted),
  );
  const [likeClassName, setLikeClassName] = useState(() =>
    getActionClassName(isLiked),
  );

  useEffect(() => {
    setCommentIcon(() => getCommentIcon(isVoted, isShow));
    setLikeIcon(() => getLikeIcon(isLiked));
    setCommentClassName(() => getActionClassName(isVoted));
    setLikeClassName(() => getActionClassName(isLiked));
  }, [isVoted, isShow, isLiked]);

  return { commentIcon, likeIcon, commentClassName, likeClassName };
};
