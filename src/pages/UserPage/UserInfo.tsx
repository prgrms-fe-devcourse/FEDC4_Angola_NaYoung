import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import Image from '@components/Image';
import NameTag from '@components/NameTag';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import useFollow from './hooks/useFollow';

const PROFILE_IMAGE_ALT = '프로필 이미지';
const LEVEL = 'Level : ';
const FOLLOWER = '팔로워 : ';
const FOLLOWING = '팔로잉 : ';
const GET_LIKES = '받은 좋아요 : ';
const UN_FOLLOW = '언팔로우 하기';
const FOLLOW = '팔로우 하기';

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

  // TODO: (지윤) 유저 페이지 Default 이미지 넣기
  return (
    <UserInfoWrapper>
      <UserProfileContainer>
        <Emoji>{userEmoji}</Emoji>
        <Image
          src={
            image
              ? image
              : 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg'
          }
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
          {LEVEL}
          {userLevel}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {FOLLOWER}
          {countFollowers}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {FOLLOWING}
          {following}
        </UserInfoText>
        <Bar>|</Bar>
        <UserInfoText>
          {GET_LIKES}
          {likes}
        </UserInfoText>
        {auth && (
          <Button
            isFollowed={isFollowed}
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
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
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
  width: 100%;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const UserInfoText = styled.div`
  display: flex;
  gap: 10px;
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

const Button = styled.button<{ isFollowed: boolean }>`
  display: flex;
  width: 135px;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  gap: 10px;
  border-radius: 27px;
  border: ${ANGOLA_STYLES.border.default};
  background-color: ${(props) =>
    props.isFollowed
      ? `${ANGOLA_STYLES.color.gray}`
      : `${ANGOLA_STYLES.color.white}`};
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
  font-size: ${ANGOLA_STYLES.textSize.titleSm};
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.isFollowed
        ? `${ANGOLA_STYLES.color.white}`
        : `${ANGOLA_STYLES.color.gray}`};
  }
  &:active {
    box-shadow: ${ANGOLA_STYLES.shadow.button.hover};
  }
`;
