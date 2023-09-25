import { Spinner, UserListItem } from '@components';
import styled from '@emotion/styled';
import { calculateLevel, getUserLevelInfo } from '@utils';
import { NON_SEARCH_TEXT } from '@pages/SearchPage/constants';
import { useUserSort } from '@pages/SearchPage/hooks';

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
        {resultData?.length !== 0 ? (
          resultData?.map((user) => (
            <UserListItem
              key={user._id}
              id={user._id}
              image={user.image}
              name={user.fullName}
              level={calculateLevel(user)}
              followers={user.followers.length}
              userEmoji={getUserLevelInfo(calculateLevel(user)).userEmoji}
            />
          ))
        ) : (
          <div>{NON_SEARCH_TEXT}</div>
        )}
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
