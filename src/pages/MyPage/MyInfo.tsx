import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Spinner from '@components/Spinner';
import { useFetchLogOut } from '@apis/auth';
import {
  useFetchUpdateFullName,
  useFetchUpdatePassword,
  useFetchUpdateProfileImage,
} from '@apis/profile';
import { checkFullNamePattern, checkPassWordPattern } from './utils';

// TODO: return에서 isUpdateFullNameError 발생 시, 모달 보여주고 함수 실행시키고, 이전 값
interface MyInfoProps {
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
}: MyInfoProps) => {
  const navigate = useNavigate();
  // FullName 변경
  const { updateFullNameMutate } = useFetchUpdateFullName();
  const [newFullName, setNewFullName] = useState(name);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  // PassWord 변경
  const { updatePasswordMutate, updatePasswordData } = useFetchUpdatePassword();
  const [newPassWord, setNewPassWord] = useState(updatePasswordData.password);
  const [confirmNewPassWord, setConfirmNewPassWord] = useState('');
  const [isEditingPassWord, setIsEditingPassWord] = useState(false);
  // ProfileImage 변경
  const [profileImageUrl, setProfileImageUrl] = useState(image);
  const {
    updateProfileImageMutate,
    updateProfileImageData,
    isUpdateProfileImageSuccess,
    isUpdateProfileImageLoading,
  } = useFetchUpdateProfileImage();
  // 로그아웃
  const { logOutMutate } = useFetchLogOut();
  // FullName 변경 로직
  useEffect(() => {
    setNewFullName(name);
    setProfileImageUrl(image);
  }, [name, image]);

  const handleClickChangeFullName = () => {
    if (isEditingFullName) {
      if (checkFullNamePattern(newFullName)) {
        updateFullNameMutate({ fullName: newFullName });
      } else {
        setNewFullName('');
        return;
      }
    }
    setIsEditingFullName(!isEditingFullName);
  };

  const handleChangeFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFullName(e.target.value);
  };
  // PassWord 변경 로직
  const resetPassWordFields = () => {
    setNewPassWord('');
    setConfirmNewPassWord('');
  };

  const handleClickChangePassWord = () => {
    if (isEditingPassWord && newPassWord) {
      if (checkPassWordPattern({ newPassWord, confirmNewPassWord })) {
        updatePasswordMutate({ password: newPassWord });
        resetPassWordFields();
      } else {
        resetPassWordFields();
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

  // ProfileImage 변경 로직
  const handleChangeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    console.log(imageFile, image);
    if (imageFile) {
      // 이미지 파일 url 생성
      const imageUrl = URL.createObjectURL(imageFile);
      setProfileImageUrl(imageUrl);
      updateProfileImageMutate({ image: imageFile, isCover: false });
    }
  };

  useEffect(() => {
    if (isUpdateProfileImageSuccess && updateProfileImageData.image) {
      setProfileImageUrl(updateProfileImageData.image); // 이미지 URL 업데이트
    }
  }, [updateProfileImageData, isUpdateProfileImageSuccess]);

  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  // 로그아웃 로직
  const handleClickLogOutButton = () => {
    logOutMutate();
    navigate('/');
  };

  return (
    <MyInfoContainer>
      <div>
        {isUpdateProfileImageLoading && <Spinner />}
        {profileImageUrl && (
          <img
            src={
              profileImageUrl
                ? profileImageUrl
                : 'https://cdn.icon-icons.com/icons2/2645/PNG/512/person_circle_icon_159926.png'
            }
            alt="프로필 이미지"
            style={{
              objectFit: 'cover',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
            }}
          />
        )}
        <FileUploadButton htmlFor="profile">
          <div>프로필 업로드</div>
        </FileUploadButton>
        <ProfileInput
          type="file"
          id="profile"
          accept="image/*"
          onChange={handleChangeProfileImage}
          disabled={isUpdateProfileImageLoading}
        />
      </div>
      <NamesAndLikes>
        {isEditingFullName ? (
          <Input
            type="text"
            value={newFullName}
            placeholder="닉네임 입력"
            onChange={handleChangeFullName}
          />
        ) : (
          <Container>
            <Name>🌱유저 이름 </Name>
            <MyInfoText>{newFullName}</MyInfoText>
          </Container>
        )}
        <Button onClick={handleClickChangeFullName}>
          {isEditingFullName ? '제출 하기' : '편집 하기'}
        </Button>
        <Container>
          <Likes>👍 받은 좋아요 </Likes> <MyInfoText>{likes}</MyInfoText>
        </Container>
      </NamesAndLikes>
      <FollowerAndFollowing>
        <Container>
          <Follower>🙍 follower</Follower> <MyInfoText>{followers}</MyInfoText>
        </Container>
        <Container>
          <Following>🙍 following</Following>
          <MyInfoText>{following}</MyInfoText>
        </Container>
      </FollowerAndFollowing>
      {isEditingPassWord ? (
        <PassWordInput>
          <PassWord>비밀번호</PassWord>
          <Input
            type="text"
            placeholder="새 비밀번호 입력"
            value={newPassWord}
            onChange={handleChangePassWord}
          />
          <PassWord>비밀번호 확인</PassWord>
          <Input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmNewPassWord}
            onChange={handleChangeConfirmPassWord}
          />
        </PassWordInput>
      ) : null}
      <Button onClick={handleClickChangePassWord}>
        {isEditingPassWord ? '변경 하기' : '비밀번호 변경'}
      </Button>
      <div>
        <Button onClick={handleClickLogOutButton}>로그 아웃</Button>
      </div>
    </MyInfoContainer>
  );
};

export default MyInfo;

const MyInfoContainer = styled.div`
  display: flex;
  width: 80%;
  height: 100%;
  border: 1px solid black;
  align-items: center;
  padding: 30px 10px;
  gap: 30px;
`;

const FileUploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(77, 77, 77);
  width: 120px;
  height: 35px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const ProfileInput = styled.input`
  display: none;
`;

/*const Profile = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`;*/

const NamesAndLikes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: yellowgreen;
`;

const MyInfoText = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-left: auto;
`;

const Input = styled.input`
  width: 150px;
  height: 30px;
  border-radius: 20px;
  padding: 3px 3px 0px 10px;
`;

const Button = styled.button`
  width: 120px;
  height: 35px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #c2c2c2;
    color: white;
  }
`;

const Likes = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const FollowerAndFollowing = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const Follower = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Following = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const PassWordInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PassWord = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0px;
`;
