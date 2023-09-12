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
    <div>
      <div>프로필{image}</div>
      <div>유저 이름: {name}</div>
      <div>받은 좋아요: {likes}</div>
      <div>follower: {followers}</div>
      <div>following: {following}</div>
    </div>
  );
};

export default UserInfo;
