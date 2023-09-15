import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useFetchFollow, useFetchUnFollow } from '@apis/follow';

interface UserInfoProps {
  userId: string;
  image: string;
  name: string;
  likes: number;
  followers: number;
  following: number;
  followerId?: string;
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
  userColor,
  userEmoji,
}: UserInfoProps) => {
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

  return (
    <Container>
      <Profile>프로필</Profile>
      <img
        src={
          image
            ? image
            : 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg'
        }
        alt="프로필"
        style={{ width: '100px', height: '100px' }}
      />
      <NameAndLikes>
        <NameContainer>
          <NameLabel>유저 이름</NameLabel>
          <Name color={userColor}>
            {userEmoji} {name}
          </Name>
        </NameContainer>
        <Likes>👍 누른 좋아요 {likes}</Likes>
      </NameAndLikes>
      <FollowerAndFollowing>
        <Follower>🙍 follower {countFollowers}</Follower>
        <Following>🙍 following {following}</Following>
      </FollowerAndFollowing>
      <Button onClick={handleClickFollowButton}>
        {isFollowed ? '언팔로우' : '팔로우'}
      </Button>
    </Container>
  );
};

export default UserInfo;

const Container = styled.div`
  display: flex;
  width: 80%;
  border: 1px solid black;
  align-items: center;
  padding: 30px 10px;
`;

const Profile = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`;

const NameAndLikes = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const NameContainer = styled.div`
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
