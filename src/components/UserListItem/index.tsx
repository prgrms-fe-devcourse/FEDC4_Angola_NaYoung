import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import LinkButton from '@components/NavBar/LinkButton';

export const MoreLinkButtonStyles: CSSProperties = {
  all: 'unset',
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'yellow',
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
};
interface UserListItemProps {
  id: string;
  image: string;
  name: string;
  likes: number;
  followers: number;
}

const UserListItem = ({
  id,
  // image,
  name,
  likes,
  followers,
}: UserListItemProps) => {
  const ProfileLinkButtonStyles: CSSProperties = {
    all: 'unset',
    display: 'flex',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: '50%',
  };

  return (
    <List>
      <Profile>
        <LinkButton
          to={`/user/${id}`}
          style={ProfileLinkButtonStyles}>
          프로필
        </LinkButton>
      </Profile>
      <UserInfo>
        <div>{name} 🌱 🐣</div>
        <LikesAndFollowers>
          <div>👍{likes}</div>
          <div>🙍{followers}</div>
        </LikesAndFollowers>
      </UserInfo>
      <More>
        <LinkButton
          to={`/user/${id}`}
          style={MoreLinkButtonStyles}>
          More
        </LinkButton>
      </More>
    </List>
  );
};

export default UserListItem;

const List = styled.li`
  display: flex;
  border: 1px solid black;
  margin: 30px 0;
  gap: 20px;
  border-radius: 12px;
`;

const Profile = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-left: 10px;
  margin: 10px 0 10px 10px;
  cursor: pointer;
`;

const UserInfo = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
`;

const LikesAndFollowers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const More = styled.div`
  border-left: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  cursor: pointer;
`;
