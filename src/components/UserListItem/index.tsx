import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import Icon from '@components/Icon';
import Image from '@components/Image';
import LinkButton from '@components/LinkButton';
import NameTag from '@components/NameTag';
import { authInfoState } from '@store/auth';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { MORE_LINK_BUTTON_STYLES } from '@styles/index';

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
      <Image
        src={
          image
            ? image
            : 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg?crop=0.667xw:1.00xh;0.128xw,0&resize=980:*'
        }
        alt="프로필"
        size={60}
        style={{ margin: '0 20px' }}
      />
      <UserInfo>
        <div className="user_name">
          <NameTag
            level={level}
            userName={name}
            userId={id}
            userLevel={level}
            isNav={true}
            showLevel={false}></NameTag>
        </div>

        <LevelAndFollowers>
          <div>
            {userEmoji} Lv.{level}
          </div>
          <div>
            <Icon name="follower" /> {followers}
          </div>
        </LevelAndFollowers>
      </UserInfo>
      <More className="more">
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
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: ${ANGOLA_STYLES.shadow.button.default};
  overflow: hidden;
  &:has(.user_name:hover, .more:hover) {
    box-shadow: ${ANGOLA_STYLES.shadow.button.hover};
  }
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
