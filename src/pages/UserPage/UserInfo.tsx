import styled from '@emotion/styled';

interface UserInfoProps {
  id: string;
  image: string;
  name: string;
  likes: number;
  followers: number;
  following: number;
}

const UserInfo = ({
  image,
  name,
  likes,
  followers,
  following,
}: UserInfoProps) => {
  return (
    <Container>
      <Profile>프로필{image}</Profile>
      <NameAndLikes>
        <Name>🌱유저 이름 {name}</Name>
        <Likes>👍 받은 좋아요 {likes}</Likes>
      </NameAndLikes>
      <FollowerAndFollowing>
        <Follower>🙍 follower {followers}</Follower>
        <Following>🙍 following {following}</Following>
      </FollowerAndFollowing>
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

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: yellowgreen;
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
