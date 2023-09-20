import { useEffect, useState } from 'react';
import { useFetchFollow, useFetchUnFollow } from '@apis/follow';

interface useFollowProps {
  userId: string;
  followers: number;
  followerId?: string;
}

const useFollow = ({ userId, followers, followerId }: useFollowProps) => {
  const { followMutate, followData } = useFetchFollow();
  const { unFollowMutate } = useFetchUnFollow();
  const [userFollowerId, setUserFollowerId] = useState(followerId);
  const [countFollowers, setCountFollowers] = useState(followers);
  const [isFollowed, setIsFollowed] = useState(followerId !== undefined);

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
    } else {
      setUserFollowerId(undefined);
    }
  }, [followData.followId, isFollowed]);

  return {
    countFollowers,
    handleClickFollowButton,
    isFollowed,
  };
};

export default useFollow;
