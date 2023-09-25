import { Icon, Image, LinkButton, NameTag } from '@components';
import { BUTTON_VALUES, USER_PROFILE_IMAGE } from '@constants';
import styled from '@emotion/styled';
import { MORE_LINK_BUTTON_STYLES } from '@styles';
import { ANGOLA_STYLES } from '@styles/commonStyles';

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
  return (
    <ListItemContainer>
      <ImageContainer>
        <Image
          src={image ? image : USER_PROFILE_IMAGE.DEFAULT_SRC}
          alt="프로필"
          size={60}
        />
      </ImageContainer>

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
        <LinkButton
          to={`/user/${id}`}
          style={MORE_LINK_BUTTON_STYLES}>
          {BUTTON_VALUES.MORE_TEXT}
        </LinkButton>
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

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 16px;

  @media (max-width: 600px) {
    margin: 0 0 0 10px;
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

  @media (max-width: 800px) {
    display: none;
  }
`;

const More = styled.div`
  display: flex;
  width: 121px;
  justify-content: center;
  align-self: stretch;
  border-left: ${ANGOLA_STYLES.border.default};
  font-size: ${ANGOLA_STYLES.textSize.title};
  cursor: pointer;

  @media (max-width: 800px) {
    width: 80px;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;
