import { Button, Image, Modal, NameTag, Spinner } from '@components';
import { USER_INFO, USER_PROFILE_IMAGE } from '@constants';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import {
  FOLLOW_ERROR_MESSAGE,
  FOLLOW_MESSAGE,
} from '@pages/UserPage/constants';
import useFollow from '@pages/UserPage/hooks/useFollow';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface UserInfoProps {
  userId: string;
  image: string;
  name: string;
  likes: number;
  followers: number;
  following: number;
  followerId?: string;
  userLevel: number;
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
  userLevel,
  userEmoji,
}: UserInfoProps) => {
  const auth = useRecoilValue(authInfoState);
  const {
    countFollowers,
    handleClickFollowButton,
    isFollowed,
    isFollowLoading,
    isUnFollowLoading,
    isFollowModalOpen,
    isUnFollowModalOpen,
    setIsFollowModalOpen,
    setIsUnFollowModalOpen,
    disabledFollowButton,
  } = useFollow({
    userId,
    followers,
    followerId,
  });

  return (
    <UserInfoWrapper>
      <UserProfileContainer>
        <Emoji>{userEmoji}</Emoji>
        <Image
          src={image ? image : `${USER_PROFILE_IMAGE.DEFAULT_SRC}`}
          alt={USER_PROFILE_IMAGE.ALT}
        />
      </UserProfileContainer>
      <NameTag
        level={userLevel}
        userName={name}
        userId={userId}
        userLevel={userLevel}
        isNav={false}
        showLevel={false}
      />
      <UserInfoContainer>
        <UserInfoText>
          {USER_INFO.LEVEL}&nbsp;&nbsp;{userLevel}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {USER_INFO.FOLLOWER}&nbsp;&nbsp;{countFollowers}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {USER_INFO.FOLLOWING}&nbsp;&nbsp;{following}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {USER_INFO.GET_LIKES}&nbsp;&nbsp;{likes}
        </UserInfoText>
        {(isFollowLoading || isUnFollowLoading) ?? <Spinner />}
        {auth && (
          <Button
            toggle={isFollowed}
            size="md"
            onClick={handleClickFollowButton}
            disabled={disabledFollowButton()}
            style={{
              width: '120px',
              height: '40px',
              padding: '0',
              fontSize: `${ANGOLA_STYLES.textSize.text}`,
            }}>
            {isFollowed
              ? `${FOLLOW_MESSAGE.UN_FOLLOW}`
              : `${FOLLOW_MESSAGE.FOLLOW}`}
          </Button>
        )}
        {isFollowModalOpen && (
          <Modal onClose={() => setIsFollowModalOpen(false)}>
            {FOLLOW_ERROR_MESSAGE.FOLLOW}
          </Modal>
        )}
        {isUnFollowModalOpen && (
          <Modal onClose={() => setIsUnFollowModalOpen(false)}>
            {FOLLOW_ERROR_MESSAGE.UN_FOLLOW}
          </Modal>
        )}
      </UserInfoContainer>
    </UserInfoWrapper>
  );
};

export default UserInfo;

const UserInfoWrapper = styled.div`
  display: flex;
  padding: 0px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
  background-color: ${ANGOLA_STYLES.color.white};
`;

const Emoji = styled.div`
  color: ${ANGOLA_STYLES.color.text};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.symbol};
  line-height: 100%;
  letter-spacing: -0.924px;
`;

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px 0px;
  gap: 24px;
  align-self: stretch;

  @media (max-width: 1024px) {
    gap: 20px;
    flex-direction: column;
  }
`;

const UserInfoText = styled.div`
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

  @media (max-width: 1024px) {
    display: none;
  }
`;
