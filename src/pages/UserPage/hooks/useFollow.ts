import { useEffect, useState } from 'react';
import { useFetchFollow, useFetchUnFollow } from '@apis/follow';
import { useFetchCreateNotification } from '@apis/notifications';

interface useFollowProps {
  userId: string;
  followers: number;
  followerId?: string;
}

const useFollow = ({ userId, followers, followerId }: useFollowProps) => {
  const {
    followMutate,
    followData,
    isFollowLoading,
    isFollowError,
    isFollowSuccess,
  } = useFetchFollow();
  const { unFollowMutate, isUnFollowLoading, isUnFollowError } =
    useFetchUnFollow();
  const [userFollowerId, setUserFollowerId] = useState(followerId);
  const [countFollowers, setCountFollowers] = useState(followers);
  const [isFollowed, setIsFollowed] = useState(followerId !== undefined);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [isUnFollowModalOpen, setIsUnFollowModalOpen] = useState(false);
  const { createNotificationMutate } = useFetchCreateNotification();

  useEffect(() => {
    setCountFollowers(followers);
    setUserFollowerId(followerId);
    setIsFollowed(followerId !== undefined);
  }, [followers, followerId]);

  const handleClickFollowButton = () => {
    if (userFollowerId) {
      setCountFollowers((prev) => prev - 1);
      unFollowMutate({ id: userFollowerId });
    } else {
      setCountFollowers((prev) => prev + 1);
      followMutate({ userId });
    }
    setIsFollowed((prev) => !prev);
  };

  useEffect(() => {
    if (isFollowed) {
      followData.followId && setUserFollowerId(followData.followId);
      if (isFollowSuccess) {
        createNotificationMutate({
          notificationType: 'FOLLOW',
          notificationTypeId: followData.followId || '',
          userId,
          postId: null,
        });
      }
    } else {
      setUserFollowerId(undefined);
    }
  }, [
    followData.followId,
    isFollowed,
    createNotificationMutate,
    isFollowSuccess,
    userId,
  ]);

  useEffect(() => {
    if (isFollowError) {
      setCountFollowers((prev) => prev - 1);
      setIsFollowModalOpen(true);
    }
    if (isUnFollowError) {
      setCountFollowers((prev) => prev + 1);
      setIsUnFollowModalOpen(true);
    }
  }, [isFollowError, isUnFollowError]);

  const disabledFollowButton = () => {
    if (isFollowError || isUnFollowError) {
      return true;
    } else {
      return false;
    }
  };

  return {
    countFollowers,
    handleClickFollowButton,
    isFollowed,
    isFollowLoading,
    isUnFollowLoading,
    isFollowModalOpen,
    isUnFollowModalOpen,
    setIsFollowModalOpen,
    setIsUnFollowModalOpen,
    disabledFollowButton,
  };
};

export default useFollow;
