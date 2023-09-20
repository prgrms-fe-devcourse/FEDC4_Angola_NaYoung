import styled from '@emotion/styled';
import Button from '@components/Button';
import Icon from '@components/Icon';
import Image from '@components/Image';
import NameTag from '@components/NameTag';
import Spinner from '@components/Spinner';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { USER_INFO, USER_PROFILE_IMAGE } from '@constants/index';
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
  id,
  image,
  name,
  likes,
  followers,
  following,
  myLevel,
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
  } = useUpdateFullName({ name, id });
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
    <MyInfoWrapper>
      <MyProfileContainer>
        {isUpdateProfileImageLoading && <Spinner />}
        <Emoji>{myEmoji}</Emoji>
        <EditProfile htmlFor="profile">
          <Image
            src={
              profileImageUrl
                ? profileImageUrl
                : `${USER_PROFILE_IMAGE.DEFAULT_SRC}`
            }
            alt={USER_PROFILE_IMAGE.ALT}
          />
        </EditProfile>
        <ProfileInput
          type="file"
          id="profile"
          accept="image/*"
          onChange={handleChangeProfileImage}
          disabled={isUpdateProfileImageLoading}
        />
      </MyProfileContainer>
      <MyFullNameContainer>
        {isEditingFullName ? (
          <Input
            type="text"
            value={newFullName}
            placeholder="닉네임 입력"
            onChange={handleChangeFullName}
          />
        ) : (
          <NameTag
            level={myLevel}
            userName={newFullName}
            userId={id}
            userLevel={myLevel}
            isNav={false}
            showLevel={false}
          />
        )}
        <Button
          onClick={handleClickUpdateFullName}
          size="sm"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            padding: '0px',
          }}
          toggle={isEditingFullName}>
          {isEditingFullName ? (
            <Icon
              name="check"
              size="20"
            />
          ) : (
            <Icon
              name="edit"
              size="20"
            />
          )}
        </Button>
      </MyFullNameContainer>
      <MyInfoContainer>
        {isEditingPassWord ? (
          <PassWordContainer>
            <PassWordBox>
              <InputLabel>변경할 비밀번호</InputLabel>
              <Input
                type="text"
                placeholder="새 비밀번호 입력"
                value={newPassWord}
                onChange={handleChangePassWord}
              />
            </PassWordBox>
            <PassWordBox>
              <InputLabel>비밀번호 확인</InputLabel>
              <Input
                type="password"
                placeholder="새 비밀번호 확인"
                value={confirmNewPassWord}
                onChange={handleChangeConfirmPassWord}
              />
            </PassWordBox>
          </PassWordContainer>
        ) : (
          <MyInfoBox>
            <MyInfoText>
              {USER_INFO.LEVEL}&nbsp;&nbsp;{myLevel}
            </MyInfoText>
            <Bar>|</Bar>
            <MyInfoText>
              {USER_INFO.FOLLOWER}&nbsp;&nbsp;{followers}
            </MyInfoText>
            <Bar>|</Bar>
            <MyInfoText>
              {USER_INFO.FOLLOWING}&nbsp;&nbsp;{following}
            </MyInfoText>
            <Bar>|</Bar>
            <MyInfoText>
              {USER_INFO.GET_LIKES}&nbsp;&nbsp;{likes}
            </MyInfoText>
            <Bar>|</Bar>
          </MyInfoBox>
        )}
        {isEditingPassWord ? (
          <Button onClick={handleClickUpdatePassWord}>수정 완료</Button>
        ) : (
          <Button onClick={handleClickUpdatePassWord}>비밀번호 수정하기</Button>
        )}
        {isEditingPassWord ? null : (
          <Button onClick={handleClickLogOut}>로그 아웃</Button>
        )}
      </MyInfoContainer>
    </MyInfoWrapper>
  );
};

export default MyInfo;

const MyInfoWrapper = styled.div`
  display: flex;
  padding: 0px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  background-color: ${ANGOLA_STYLES.color.white};
`;

const MyProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Emoji = styled.div`
  color: ${ANGOLA_STYLES.color.text};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.symbol};
  line-height: 100%;
  letter-spacing: -0.924px;
`;

// TODO: 편집 중에는 DISABLED 효과 처리
const EditProfile = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  &:hover img {
    opacity: 0.5;
    box-shadow: ${ANGOLA_STYLES.shadow.button.default};
  }
  &:hover::after {
    content: '클릭하여 수정하기';
    white-space: pre;
    text-align: center;
    top: 50%;
    position: absolute;
    opacity: 1;
    font-size: 18px;
    font-weight: 600;
    color: black;
  }
`;

const ProfileInput = styled.input`
  display: none;
`;

const MyFullNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Input = styled.input`
  display: flex;
  padding: 8px 32px;
  align-items: center;
  gap: 10px;
  border-radius: 27px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  &:focus {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }
`;

const MyInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px 0px;
  gap: 24px;
  align-self: stretch;
`;

const MyInfoText = styled.div`
  display: flex;
  color: ${ANGOLA_STYLES.color.text};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.396px;
`;

const Bar = styled.div`
  color: ${ANGOLA_STYLES.color.dark};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.396px;
`;

const MyInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 24px;
  align-self: stretch;
`;

const PassWordContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const PassWordBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const InputLabel = styled.label`
  font-size: ${ANGOLA_STYLES.textSize.text};
`;
