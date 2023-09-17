import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import Image from '@components/Image';
import { authInfoState } from '@atoms/index';
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
  userColor: string;
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
  userColor,
  userEmoji,
}: UserInfoProps) => {
  const auth = useRecoilValue(authInfoState);
  const { countFollowers, handleClickFollowButton, isFollowed } = useFollow({
    userId,
    followers,
    followerId,
  });

  // TODO: 디폴트 이미지
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
          alt="프로필 이미지"
        />
      </UserProfileContainer>
      <Name color={userColor}>{name}</Name>
      <UserInfoContainer>
        <UserInfoBox>
          <UserInfoText>
            Level: {userLevel}
            <Bar>|</Bar>
          </UserInfoText>
          <UserInfoText>
            팔로워: {countFollowers} <Bar>|</Bar>
          </UserInfoText>
          <UserInfoText>
            팔로잉: {following} <Bar>|</Bar>
          </UserInfoText>
          <UserInfoText>받은 좋아요: {likes}</UserInfoText>
        </UserInfoBox>
        {auth && (
          <Button
            isFollowed={isFollowed}
            onClick={handleClickFollowButton}>
            {isFollowed ? '언팔로우 하기' : '팔로우 하기'}
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
  background-color: white;
`;

const Emoji = styled.div`
  color: #000;
  text-align: center;
  /* title-lg */
  font-family: Mabinogi_Classic;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 42px */
  letter-spacing: -0.924px;
`;

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Name = styled.div`
  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 10px;
  border-radius: 27px;
  background-color: ${(props) => props.color};
  color: white;
  font-weight: 600;
`;

const UserInfoContainer = styled.div`
  display: flex;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const UserInfoBox = styled.div`
  display: flex;
  color: var(--text, #404040);
  text-align: center;
  /* title-sm */
  font-family: Mabinogi_Classic;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.396px;
  gap: 10px;
`;

const UserInfoText = styled.div`
  display: flex;
  gap: 10px;
  color: var(--text, #404040);
  text-align: center;
  /* title-sm */
  font-family: Mabinogi_Classic;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.396px;
`;

const Bar = styled.div`
  color: var(--dark, #9a9a9a);
  text-align: center;
  /* title-sm */
  font-family: Mabinogi_Classic;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
  letter-spacing: -0.396px;
`;

const Button = styled.button<{ isFollowed: boolean }>`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 10px;
  border-radius: 27px;
  border: 2px solid var(--text, #404040);
  background-color: ${(props) => (props.isFollowed ? '#E5E5E5 ' : '#FFF')};
  /* md-shadow */
  box-shadow: 0px 6px 0px 0px #404040;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  // TODO: hover 색상
  &:hover {
    background-color: #a4a4a4;
    color: white;
  }
`;
