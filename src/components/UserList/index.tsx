import styled from '@emotion/styled';
import { calculateLevel, getUserLevelInfo } from '@utils';
import useUserSort from '@pages/SearchPage/hooks/useUserSort';
import Spinner from '@components/Spinner';
import UserListItem from '@components/UserListItem';

interface UserListProps {
  keyword?: string;
  sort: string;
}

const UserList = ({ keyword, sort }: UserListProps) => {
  const { resultData, isUsersLoading, isSearchUsersLoading } = useUserSort({
    keyword,
    sort,
  });

  return (
    <>
      <UserListItems>
        {resultData?.map((user) => (
          <UserListItem
            key={user._id}
            id={user._id}
            image={user.image}
            name={user.fullName}
            level={calculateLevel(user)}
            followers={user.followers.length}
            userEmoji={getUserLevelInfo(calculateLevel(user)).userEmoji}
          />
        ))}
      </UserListItems>
      {(isUsersLoading || isSearchUsersLoading) && <Spinner />}
    </>
  );
};

export default UserList;

const UserListItems = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;
