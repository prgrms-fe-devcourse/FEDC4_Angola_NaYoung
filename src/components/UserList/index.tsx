import { useEffect } from 'react';
import { calculateLevel, getUserLevelInfo } from '@utils';
import Spinner from '@components/Spinner';
import UserListItem from '@components/UserListItem';
import { useFetchSearchUsers } from '@apis/search';
import { useFetchUsers } from '@apis/user';
import { getSortUserList } from './utils';

interface UserListProps {
  keyword?: string;
  sort: string;
}

const UserList = ({ keyword, sort }: UserListProps) => {
  const { usersData, isUsersLoading } = useFetchUsers();
  const { searchUsersData, isSearchUsersLoading, searchUsersDataRefetch } =
    useFetchSearchUsers({
      query: keyword,
    });

  const resultData = keyword
    ? getSortUserList(searchUsersData, sort)
    : getSortUserList(usersData, sort);

  useEffect(() => {
    searchUsersDataRefetch();
  }, [keyword, searchUsersDataRefetch]);

  return (
    <>
      <ul>
        {resultData?.map((user) => (
          <UserListItem
            key={user._id}
            id={user._id}
            image={user.image}
            name={user.fullName}
            level={calculateLevel(user)}
            followers={user.followers.length}
            userEmoji={getUserLevelInfo(calculateLevel(user)).userEmoji}
            userColor={getUserLevelInfo(calculateLevel(user)).userColor}
          />
        ))}
      </ul>
      {(isUsersLoading || isSearchUsersLoading) && <Spinner />}
    </>
  );
};

export default UserList;
