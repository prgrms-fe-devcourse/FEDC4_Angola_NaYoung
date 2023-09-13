import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useFetchLogOut } from '@apis/auth';
import { useFetchUpdateFullName, useFetchUpdatePassword } from '@apis/profile';
import { checkFullNamePattern, checkPassWordPattern } from './utils';

// TODO: return에서 isUpdateFullNameError 발생 시, 모달 보여주고 함수 실행시키고, 이전 값
interface UserInfoProps {
  id: string;
  image: string;
  name: string;
  likes: number;
  followers: number;
  following: number;
}

const MyInfo = ({
  //id,
  image,
  name,
  likes,
  followers,
  following,
}: UserInfoProps) => {
  const navigate = useNavigate();
  const { updateFullNameMutate } = useFetchUpdateFullName();
  const [newFullName, setNewFullName] = useState(name);
  const [isEditingFullName, isSetEditingFullName] = useState(false);
  //
  const { updatePasswordMutate, updatePasswordData } = useFetchUpdatePassword();
  const [newPassWord, setNewPassWord] = useState(updatePasswordData.password);
  const [confirmNewPassWord, setConfirmNewPassWord] = useState('');
  const [isEditingPassWord, setIsEditingPassWord] = useState(false);
  const { logOutMutate } = useFetchLogOut();

  useEffect(() => {
    setNewFullName(name);
  }, [name]);

  const handleClickChangeFullName = () => {
    if (isEditingFullName) {
      if (checkFullNamePattern(newFullName)) {
        updateFullNameMutate({ fullName: newFullName });
      } else {
        setNewFullName('');
        return;
      }
    }
    isSetEditingFullName(!isEditingFullName);
  };

  const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFullName(e.target.value);
  };

  const handleClickChangePassWord = () => {
    if (isEditingPassWord) {
      if (checkPassWordPattern(newPassWord)) {
        updatePasswordMutate({ password: newPassWord });
      } else {
        setNewPassWord('');
        setConfirmNewPassWord('');
        return;
      }
    }
    setIsEditingPassWord(!isEditingPassWord);
  };

  const handleChangePassWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassWord(e.target.value);
  };

  const handleChangeConfirmPassWord = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmNewPassWord(e.target.value);
  };

  const handleClickLogOutButton = () => {
    logOutMutate();
    navigate('/');
  };

  return (
    <Container>
      <Profile>프로필 {image}</Profile>
      <NameAndLikes>
        {isEditingFullName ? (
          <input
            type="text"
            value={newFullName}
            onChange={handleChangeFullName}
          />
        ) : (
          <Name>🌱유저 이름 {newFullName}</Name>
        )}
        <button onClick={handleClickChangeFullName}>
          {isEditingFullName ? '제출 하기' : '편집 하기'}
        </button>
        <Likes>👍 받은 좋아요 {likes}</Likes>
      </NameAndLikes>
      <FollowerAndFollowing>
        <Follower>🙍 follower {followers}</Follower>
        <Following>🙍 following {following}</Following>
      </FollowerAndFollowing>
      {isEditingPassWord ? (
        <>
          비밀번호:
          <input
            type="text"
            placeholder="새 비밀번호"
            value={newPassWord}
            onChange={handleChangePassWord}
          />
          비밀번호 확인:
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmNewPassWord}
            onChange={handleChangeConfirmPassWord}
          />
        </>
      ) : (
        ''
      )}
      <button onClick={handleClickChangePassWord}>
        {isEditingPassWord ? '변경 하기' : '비밀번호 변경'}
      </button>
      <div>
        <button onClick={handleClickLogOutButton}>로그 아웃</button>
      </div>
    </Container>
  );
};

export default MyInfo;

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
