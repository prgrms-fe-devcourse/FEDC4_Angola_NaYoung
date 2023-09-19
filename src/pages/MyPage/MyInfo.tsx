import styled from '@emotion/styled';
import Spinner from '@components/Spinner';
import {
  useLogOut,
  useUpdateFullName,
  useUpdatePassWord,
  useUpdateProfile,
} from './hooks';

// TODO: return에서 isUpdateFullNameError 발생 시, 모달 보여주고 함수 실행시키고, 이전 값
interface MyInfoProps {
  id: string;
  image: string;
  name: string;
  likes: number;
  followers: number;
  following: number;
  myLevel: number;
  myColor: string;
  myEmoji: string;
}

const MyInfo = ({
  image,
  name,
  likes,
  followers,
  following,
  myLevel,
  myColor,
  myEmoji,
}: MyInfoProps) => {
  const {
    isUpdateProfileImageLoading,
    profileImageUrl,
    handleChangeProfileImage,
  } = useUpdateProfile({ image });
  const {
    isEditingFullName,
    newFullName,
    handleChangeFullName,
    handleClickUpdateFullName,
  } = useUpdateFullName({ name });
  const {
    isEditingPassWord,
    newPassWord,
    handleChangePassWord,
    handleClickUpdatePassWord,
    confirmNewPassWord,
    handleChangeConfirmPassWord,
  } = useUpdatePassWord();
  const { handleClickLogOut } = useLogOut();

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
      <NamesLevelLikes>
        {isEditingFullName ? (
          <Input
            type="text"
            value={newFullName}
            placeholder="닉네임 입력"
            onChange={handleChangeFullName}
          />
        ) : (
          <Container>
            <Name>유저 이름</Name>
            <MyName color={myColor}>{newFullName}</MyName>
          </Container>
        )}
        <Button onClick={handleClickUpdateFullName}>
          {isEditingFullName ? '제출 하기' : '편집 하기'}
        </Button>
        <Container>
          <Level color={myColor}>
            {myEmoji}Level {myLevel}
          </Level>
        </Container>
        <Container>
          <Likes>👍 받은 좋아요 {likes} </Likes>
        </Container>
      </NamesLevelLikes>
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
      <Button onClick={handleClickUpdatePassWord}>
        {isEditingPassWord ? '변경 하기' : '비밀번호 변경'}
      </Button>
      <div>
        <Button onClick={handleClickLogOut}>로그 아웃</Button>
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

const NamesLevelLikes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const MyName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.color};
`;

const Level = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.color};
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
