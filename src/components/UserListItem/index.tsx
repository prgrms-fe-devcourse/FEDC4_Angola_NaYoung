import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import Icon from '@components/Icon';
import LinkButton from '@components/LinkButton';
import NameTag from '@components/NameTag';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { MORE_LINK_BUTTON_STYLES } from '@styles/index';

const PROFILE_LINK_BUTTON_STYLES: CSSProperties = {
  all: 'unset',
  display: 'flex',
  width: 50,
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
};

interface UserListItemProps {
  id: string;
  image: string;
  name: string;
  level: number;
  followers: number;
  userEmoji: string;
}

const UserListItem = ({
  id,
  image,
  name,
  level,
  followers,
  userEmoji,
}: UserListItemProps) => {
  const auth = useRecoilValue(authInfoState);
  const myId = auth?.userId;

  return (
    <ListItemContainer>
      {myId === id ? (
        <LinkButton
          to={`/mypage`}
          style={PROFILE_LINK_BUTTON_STYLES}>
          <ProfileImage
            src={
              image
                ? image
                : 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg?crop=0.667xw:1.00xh;0.128xw,0&resize=980:*'
            }
            alt="프로필"
          />
        </LinkButton>
      ) : (
        <LinkButton
          to={`/user/${id}`}
          style={PROFILE_LINK_BUTTON_STYLES}>
          <ProfileImage
            src={
              image
                ? image
                : 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg?crop=0.667xw:1.00xh;0.128xw,0&resize=980:*'
            }
            alt="프로필"
          />
        </LinkButton>
      )}
      <UserInfo>
        <NameTag
          level={level}
          userName={name}
          userId={id}
          userLevel={level}
          isNav={true}
          showLevel={false}></NameTag>
        <LevelAndFollowers>
          <div>
            {userEmoji} Lv.{level}
          </div>
          <div>
            <Icon name="follower" /> {followers}
          </div>
        </LevelAndFollowers>
      </UserInfo>
      <More>
        {myId === id ? (
          <LinkButton
            to={`/mypage`}
            style={MORE_LINK_BUTTON_STYLES}>
            More
          </LinkButton>
        ) : (
          <LinkButton
            to={`/user/${id}`}
            style={MORE_LINK_BUTTON_STYLES}>
            More
          </LinkButton>
        )}
      </More>
    </ListItemContainer>
  );
};

export default UserListItem;

const ListItemContainer = styled.li`
  display: flex;
  height: 100px;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 24px;
  border: ${ANGOLA_STYLES.border.default};
  background: #fff;
  box-shadow: 0px 6px 0px 0px #404040;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${ANGOLA_STYLES.border.default};
  margin: 0px 20px;
  background: #9a9a9a;
`;

const UserInfo = styled.div`
  display: flex;
  padding: 12px 0px;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const LevelAndFollowers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: ${ANGOLA_STYLES.textSize.title};
`;

const More = styled.div`
  display: flex;
  width: 121px;
  justify-content: center;
  align-self: stretch;
  border-left: ${ANGOLA_STYLES.border.default};
  font-size: ${ANGOLA_STYLES.textSize.title};
  cursor: pointer;
`;
