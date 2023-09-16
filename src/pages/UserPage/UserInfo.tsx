import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useFetchFollow, useFetchUnFollow } from '@apis/follow';
import { useFetchCreateNotification } from '@apis/notifications';

interface UserInfoProps {
  userId: string;
  image: string;
  name: string;
  likes: number;
  followers: number;
  following: number;
  followerId?: string;
  checkedNotification: boolean;
  userLevel: number;
  userColor: string;
  userEmoji: string;
}

const UserInfo = ({
  userId,
  image,
  name,
  likes,
  followers,
  following,
  followerId,
  checkedNotification,
  userLevel,
  userColor,
  userEmoji,
}: UserInfoProps) => {
  const { followMutate, followData, isFollowSuccess } = useFetchFollow();
  const { unFollowMutate } = useFetchUnFollow();
  const { createNotificationMutate, createNotificationData } =
    useFetchCreateNotification();
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
      // 팔로우 성공 시 &&
      // 팔로우 등록/취소 시 중복 호출 막음 &&
      // 새로고침 또는 페이지 이동 시 중복 호출 막음
      if (
        isFollowSuccess &&
        !createNotificationData?.author &&
        !checkedNotification
      ) {
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
    createNotificationMutate,
    isFollowed,
    isFollowSuccess,
    userId,
    createNotificationData?.author,
    checkedNotification,
  ]);

  return (
    <UserInfoContainer>
      <img
        src={
          image
            ? image
            : 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg'
        }
        alt="프로필"
        style={{
          objectFit: 'cover',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
        }}
      />
      <NameAndLikes>
        <Container>
          <NameLabel>유저 이름</NameLabel>
          <Name color={userColor}>{name}</Name>
        </Container>
        <Container>
          <Level color={userColor}>
            {userEmoji} Level {userLevel}
          </Level>
        </Container>
        <Likes>👍 누른 좋아요 {likes}</Likes>
      </NameAndLikes>
      <FollowerAndFollowing>
        <Follower>🙍 follower {countFollowers}</Follower>
        <Following>🙍 following {following}</Following>
      </FollowerAndFollowing>
      <Button onClick={handleClickFollowButton}>
        {isFollowed ? '언팔로우' : '팔로우'}
      </Button>
    </UserInfoContainer>
  );
};

export default UserInfo;

const UserInfoContainer = styled.div`
  display: flex;
  width: 80%;
  border: 1px solid black;
  align-items: center;
  padding: 30px 10px;
`;

const NameAndLikes = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Container = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 600;
  gap: 10px;
`;

const NameLabel = styled.div`
  margin-bottom: 10px;
`;

const Name = styled.div`
  margin-bottom: 10px;
  color: ${(props) => props.color};
`;

const Level = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin-bottom: 10px;
`;

const Likes = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const FollowerAndFollowing = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Follower = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Following = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Button = styled.button`
  border: none;
  width: 80px;
  height: 30px;
  border-radius: 20px;
  margin-left: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: yellowgreen;
    color: white;
  }
`;
