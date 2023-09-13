import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useFetchLogOut } from '@apis/auth';
import { useFetchUpdateFullName } from '@apis/profile';

// TODO: return에서 isUpdateFullNameError 발생 시, 모달 보여주고 함수 실행시키고, 이전 값
interface UserInfoProps {
  id: string;
  image: string;
  name: string;
  likes: number;
  followers: number;
  following: number;
  showLogOutButton?: boolean;
  showChangeFullNameButton?: boolean;
  showChangePasswordButton?: boolean;
}

const UserInfo = ({
  //id,
  image,
  name,
  likes,
  followers,
  following,
  showLogOutButton,
  showChangeFullNameButton,
  showChangePasswordButton,
}: UserInfoProps) => {
  const navigate = useNavigate();
  const { logOutMutate } = useFetchLogOut();
  const { updateFullNameMutate } = useFetchUpdateFullName();
  const [newFullName, setNewFullName] = useState(name);
  const [isEditing, isSetEditing] = useState(false);

  useEffect(() => {
    setNewFullName(name);
  }, [name]);

  const handleClickLogOutButton = () => {
    logOutMutate();
    navigate('/');
  };

  const handleClickChangeFullName = () => {
    if (isEditing) {
      updateFullNameMutate({ fullName: newFullName });
    }
    isSetEditing(!isEditing);
  };

  const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFullName(e.target.value);
  };

  return (
    <Container>
      <Profile>프로필 {image}</Profile>
      <NameAndLikes>
        {isEditing ? (
          <input
            type="text"
            value={newFullName}
            onChange={handleChangeFullName}
          />
        ) : (
          <Name>🌱유저 이름 {newFullName}</Name>
        )}
        {showChangeFullNameButton && (
          <button onClick={handleClickChangeFullName}>
            {isEditing ? '제출 하기' : '편집 하기'}
          </button>
        )}
        <Likes>👍 받은 좋아요 {likes}</Likes>
      </NameAndLikes>
      <FollowerAndFollowing>
        <Follower>🙍 follower {followers}</Follower>
        <Following>🙍 following {following}</Following>
      </FollowerAndFollowing>
      {showLogOutButton && (
        <button onClick={handleClickLogOutButton}>로그 아웃</button>
      )}
      {/* TODO: 비밀번호 변경함수 */}
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
