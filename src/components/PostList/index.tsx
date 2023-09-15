import { useEffect } from 'react';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';
import { useFetchAllPosts } from '@apis/post';
import { useFetchSearchPosts } from '@apis/search';
import { getSortPostList } from './utils';

interface PostListProps {
  keyword?: string;
  sort: string;
}

const PostList = ({ keyword, sort }: PostListProps) => {
  const { allPostsData, isAllPostsLoading } = useFetchAllPosts();
  const { searchPostsData, isSearchPostsLoading, searchPostsDataRefetch } =
    useFetchSearchPosts({
      query: keyword,
    });

  const resultData = keyword
    ? getSortPostList(searchPostsData, sort, keyword)
    : getSortPostList(allPostsData, sort, keyword);

  useEffect(() => {
    searchPostsDataRefetch();
  }, [keyword, searchPostsDataRefetch]);

  // useEffect(() => {
  //   allPostsRefetch();
  // }, [sort, allPostsRefetch]);
  return (
    <>
      <ul>
        {resultData?.map((post) => (
          <PostListItem
            key={post._id}
            id={post._id}
            image={post.author.image}
            title={post.title}
          />
        ))}
      </ul>
      {(isAllPostsLoading || isSearchPostsLoading) && <Spinner />}
    </>
  );
};

export default PostList;
