import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import Button from '@components/Button';
import Image from '@components/Image';
import NameTag from '@components/NameTag';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import {
  DEFAULT_PROFILE_IMAGE_SRC,
  FOLLOW,
  FOLLOWER,
  FOLLOWING,
  GET_LIKES,
  LEVEL,
  PROFILE_IMAGE_ALT,
  UN_FOLLOW,
} from './constants';
import useFollow from './hooks/useFollow';

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
  const { countFollowers, handleClickFollowButton, isFollowed } = useFollow({
    userId,
    followers,
    followerId,
  });

  return (
    <UserInfoWrapper>
      <UserProfileContainer>
        <Emoji>{userEmoji}</Emoji>
        <Image
          src={image ? image : `${DEFAULT_PROFILE_IMAGE_SRC}`}
          alt={PROFILE_IMAGE_ALT}
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
          {LEVEL}&nbsp;&nbsp;{userLevel}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {FOLLOWER}&nbsp;&nbsp;{countFollowers}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {FOLLOWING}&nbsp;&nbsp;{following}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {GET_LIKES}&nbsp;&nbsp;{likes}
        </UserInfoText>
        {auth && (
          <Button
            isFollowed={isFollowed}
            size="md"
            onClick={handleClickFollowButton}>
            {isFollowed ? `${UN_FOLLOW}` : `${FOLLOW}`}
          </Button>
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
  font-style: normal;
  font-weight: 400;
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
`;

const UserInfoText = styled.div`
  display: flex;
  color: ${ANGOLA_STYLES.color.text};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.396px;
`;

const Bar = styled.div`
  color: ${ANGOLA_STYLES.color.dark};
  text-align: center;
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.396px;
`;
