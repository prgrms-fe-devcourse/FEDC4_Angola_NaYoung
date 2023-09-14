import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import LinkButton from '@components/NavBar/LinkButton';
import { authInfoState } from '@atoms/index';
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
  const auth = useRecoilValue(authInfoState);
  const myId = auth?.userId;

  return (
    <List>
      <Profile>
        {myId === id ? (
          <LinkButton
            to={`/mypage`}
            style={PROFILE_LINK_BUTTON_STYLES}>
            프로필
          </LinkButton>
        ) : (
          <LinkButton
            to={`/user/${id}`}
            style={PROFILE_LINK_BUTTON_STYLES}>
            프로필
          </LinkButton>
        )}
      </Profile>
      <UserInfo>
        <div>{name} 🌱 🐣</div>
        <LikesAndFollowers>
          <div>👍{likes}</div>
          <div>🙍{followers}</div>
        </LikesAndFollowers>
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
