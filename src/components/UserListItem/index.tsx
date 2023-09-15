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
  userEmoji: string;
  userColor: string;
}

const UserListItem = ({
  id,
  image,
  name,
  likes,
  followers,
  userEmoji,
  userColor,
}: UserListItemProps) => {
  const auth = useRecoilValue(authInfoState);
  const myId = auth?.userId;

  return (
    <List>
      <div>
        {myId === id ? (
          <LinkButton
            to={`/mypage`}
            style={PROFILE_LINK_BUTTON_STYLES}>
            <img
              src={
                image
                  ? image
                  : 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg?crop=0.667xw:1.00xh;0.128xw,0&resize=980:*'
              }
              alt="프로필"
              style={{ width: '70px', height: '70px', borderRadius: '50%' }}
            />
          </LinkButton>
        ) : (
          <LinkButton
            to={`/user/${id}`}
            style={PROFILE_LINK_BUTTON_STYLES}>
            <img
              src={
                image
                  ? image
                  : 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg?crop=0.667xw:1.00xh;0.128xw,0&resize=980:*'
              }
              alt="프로필"
              style={{ width: '70px', height: '70px', borderRadius: '50%' }}
            />
          </LinkButton>
        )}
      </div>
      <UserInfo>
        <UserName color={userColor}>
          {name} {userEmoji}
        </UserName>
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

const UserInfo = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
`;

const UserName = styled.div`
  font-weight: 600;
  color: ${(props) => props.color};
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
