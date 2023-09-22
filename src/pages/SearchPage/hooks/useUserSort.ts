import { useEffect } from 'react';
import { useFetchSearchUsers } from '@apis/search';
import { useFetchUsers } from '@apis/user';
import { getSortUserList } from '../utils';

interface useSortProps {
  keyword?: string;
  sort: string;
}

const useUserSort = ({ keyword, sort }: useSortProps) => {
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

  return {
    resultData,
    isUsersLoading,
    isSearchUsersLoading,
  };
};

export default useUserSort;
