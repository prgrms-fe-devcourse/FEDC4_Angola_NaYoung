import { useEffect } from 'react';
import UserListItem from '@components/UserListItem';
import { useFetchSearchUsers } from '@apis/search';
import { useFetchUsers } from '@apis/user';
import { getSortUserList } from './utils';

interface UserListProps {
  keyword?: string;
  sort: string;
}

const UserList = ({ keyword, sort }: UserListProps) => {
  const { searchUsersData, searchUsersDataRefetch } = useFetchSearchUsers({
    query: keyword,
  });
  const { usersData } = useFetchUsers();

  const resultData = keyword
    ? getSortUserList(searchUsersData, sort)
    : getSortUserList(usersData, sort);

  useEffect(() => {
    searchUsersDataRefetch();
  }, [keyword, searchUsersDataRefetch]);

  return (
    <ul>
      {resultData?.map((user) => (
        <UserListItem
          key={user._id}
          id={user._id}
          image={user.image}
          name={user.fullName}
          likes={user.likes.length}
          followers={user.followers.length}
        />
      ))}
    </ul>
  );
};

export default UserList;
