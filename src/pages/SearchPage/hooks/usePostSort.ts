import { useEffect } from 'react';
import { useFetchAllPosts } from '@apis/post';
import { useFetchSearchPosts } from '@apis/search';
import { getSortPostList } from '../utils';

interface useSortProps {
  keyword?: string;
  sort: string;
}

const usePostSort = ({ keyword, sort }: useSortProps) => {
  const { allPostsData, isAllPostsLoading } = useFetchAllPosts();
  const { searchPostsData, isSearchPostsLoading, searchPostsDataRefetch } =
    useFetchSearchPosts({
      query: keyword,
    });

  const resultData = keyword
    ? getSortPostList(searchPostsData, sort)
    : getSortPostList(allPostsData, sort);

  useEffect(() => {
    searchPostsDataRefetch();
  }, [keyword, searchPostsDataRefetch]);

  return {
    resultData,
    isAllPostsLoading,
    isSearchPostsLoading,
  };
};

export default usePostSort;
