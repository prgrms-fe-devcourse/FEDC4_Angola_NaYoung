import styled from '@emotion/styled';
import Button from '@components/Button';
import Icon from '@components/Icon';
import Image from '@components/Image';
import Modal from '@components/Modal';
import NameTag from '@components/NameTag';
import Spinner from '@components/Spinner';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { USER_INFO, USER_PROFILE_IMAGE } from '@constants/index';
import {
  CHECK_DUPLICATE_BUTTON,
  LABEL,
  LOG_OUT_TEXT,
  PASSWORD_BUTTON,
  PLACEHOLDER,
} from './constants';
import {
  useLogOut,
  useUpdateFullName,
  useUpdatePassWord,
  useUpdateProfile,
} from './hooks';

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
    setIsProfileImageModalOpen,
    isProfileImageModalOpen,
  } = useUpdateProfile({ image });
  const {
    isEditingFullName,
    newFullName,
    handleChangeFullName,
    handleClickUpdateFullName,
    invalidFullNameMsg,
    validFullNameMsg,
    isDuplicatedFullNameChecked,
    handleClickDuplicatedFullNameCheckButton,
    isFullNameModalOpen,
    setIsFullNameModalOpen,
    isUpdateFullNameError,
  } = useUpdateFullName({ name });
  const {
    isEditingPassWord,
    newPassWord,
    handleChangePassWord,
    handleClickUpdatePassWord,
    confirmNewPassWord,
    handleChangeConfirmPassWord,
    invalidPasswordMsg,
    invalidPasswordConfirmMsg,
    validPasswordConfirmMsg,
    handleAcceptPassWordButton,
  } = useUpdatePassWord();
  const { handleClickLogOut, isLogOutModalOpen, setIsLogOutModalOpen } =
    useLogOut();

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
        {isProfileImageModalOpen && (
          <Modal onClose={() => setIsProfileImageModalOpen(false)}>
            프로필 변경 실패
          </Modal>
        )}
      </MyProfileContainer>
      <MyFullNameContainer>
        {isEditingFullName ? (
          <MyFullNameBox>
            <InputBox>
              <Input
                type="text"
                value={newFullName}
                placeholder={PLACEHOLDER.FULL_NAME}
                onChange={handleChangeFullName}
                style={{ width: '300px' }}
              />
              {isDuplicatedFullNameChecked && (
                <DoubleCheckIcon>
                  <Icon
                    name={'double_check'}
                    color={'#78D968'}
                  />
                </DoubleCheckIcon>
              )}
              {isEditingFullName && (
                <>
                  {invalidFullNameMsg && (
                    <InputWarning>
                      <Icon
                        name={'warn'}
                        color={'#F66'}
                      />
                      {invalidFullNameMsg}
                    </InputWarning>
                  )}
                  {validFullNameMsg && (
                    <InputWarning style={{ color: '#78D968' }}>
                      {validFullNameMsg}
                    </InputWarning>
                  )}
                </>
              )}
            </InputBox>
            {isFullNameModalOpen && (
              <Modal onClose={() => setIsFullNameModalOpen(false)}>
                닉네임 변경 실패
              </Modal>
            )}
            <Button
              type="button"
              onClick={handleClickDuplicatedFullNameCheckButton}
              style={{
                width: '100px',
                height: '48px',
                padding: '0',
                fontSize: ANGOLA_STYLES.textSize.titleSm,
              }}>
              {CHECK_DUPLICATE_BUTTON}
            </Button>
            <Button
              onClick={handleClickUpdateFullName}
              size="sm"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                padding: '0px',
              }}
              disabled={!validFullNameMsg || isUpdateFullNameError}>
              <Icon
                name="check"
                size="20"
              />
            </Button>
          </MyFullNameBox>
        ) : (
          <NameTagContainer>
            <NameTag
              level={myLevel}
              userName={newFullName}
              userId={id}
              userLevel={myLevel}
              isNav={false}
              showLevel={false}
            />
            <Button
              onClick={handleClickUpdateFullName}
              size="sm"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                padding: '0px',
              }}>
              <Icon
                name="edit"
                size="20"
              />
            </Button>
          </NameTagContainer>
        )}
      </MyFullNameContainer>
      <MyInfoContainer>
        {isEditingPassWord ? (
          <PassWordContainer>
            <PassWordBox>
              <PassWordInput>
                <InputLabel>{LABEL.NEW_PASSWORD}</InputLabel>
                <Input
                  type="password"
                  placeholder={PLACEHOLDER.NEW_PASSWORD}
                  value={newPassWord}
                  onChange={handleChangePassWord}
                />
              </PassWordInput>
              {invalidPasswordMsg && (
                <InputWarning>
                  <Icon
                    name={'warn'}
                    color={'#F66'}
                  />
                  {invalidPasswordMsg}
                </InputWarning>
              )}
            </PassWordBox>
            <PassWordBox>
              <PassWordInput>
                <InputLabel>{LABEL.NEW_PASSWORD_CONFIRM}</InputLabel>
                <Input
                  type="password"
                  placeholder={PLACEHOLDER.NEW_PASSWORD_CONFIRM}
                  value={confirmNewPassWord}
                  onChange={handleChangeConfirmPassWord}
                />
              </PassWordInput>
              {invalidPasswordConfirmMsg && (
                <InputWarning>
                  <Icon
                    name={'warn'}
                    color={'#F66'}
                  />
                  {invalidPasswordConfirmMsg}
                </InputWarning>
              )}
              {validPasswordConfirmMsg && (
                <InputWarning style={{ color: '#78D968' }}>
                  {validPasswordConfirmMsg}
                </InputWarning>
              )}
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
          <Button
            onClick={handleClickUpdatePassWord}
            disabled={handleAcceptPassWordButton()}>
            {PASSWORD_BUTTON.DONE_MSG}
          </Button>
        ) : (
          <Button onClick={handleClickUpdatePassWord}>
            {PASSWORD_BUTTON.EDIT_MSG}
          </Button>
        )}
        {isEditingPassWord ? null : (
          <>
            <Button onClick={handleClickLogOut}>{LOG_OUT_TEXT}</Button>
            {isLogOutModalOpen && (
              <Modal onClose={() => setIsLogOutModalOpen(false)}>
                로그아웃 실패
              </Modal>
            )}
          </>
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
  flex-direction: column;
  gap: 10px;
`;

const MyFullNameBox = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 735px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const Input = styled.input`
  display: flex;
  padding: 8px 32px;
  width: 400px;
  height: 100%;
  align-items: center;
  border-radius: 27px;
  border: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.input.default};
  &:focus {
    box-shadow: ${ANGOLA_STYLES.shadow.input.focus};
  }

  @media (max-width: 735px) {
    width: 100%;
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

  @media (max-width: 1194px) {
    gap: 20px;
    flex-direction: column;
  }
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

  @media (max-width: 1194px) {
    display: none;
  }
`;

const MyInfoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0px;
  gap: 24px;
  align-self: stretch;

  @media (max-width: 1194px) {
    gap: 20px;
    flex-direction: column;
  }
`;

const PassWordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 735px) {
    width: 210px;
  }
`;

const PassWordBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PassWordInput = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  @media (max-width: 735px) {
    width: 100%;
    flex-direction: column;
  }
`;

const InputLabel = styled.label`
  font-size: ${ANGOLA_STYLES.textSize.text};
  @media (max-width: 735px) {
    text-align: center;
    width: 100%;
  }
`;

const InputWarning = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #f66;
  gap: 8px;
  @media (max-width: 735px) {
    font-size: 12px;
    line-height: 120%;
  }
`;

const NameTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const DoubleCheckIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 35%;
  transform: translate(0, -50%);
`;
