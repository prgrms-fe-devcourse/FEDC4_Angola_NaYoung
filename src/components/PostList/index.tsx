import { useEffect } from 'react';
import styled from '@emotion/styled';
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
    ? getSortPostList(searchPostsData, sort)
    : getSortPostList(allPostsData, sort);

  useEffect(() => {
    searchPostsDataRefetch();
  }, [keyword, searchPostsDataRefetch]);

  return (
    <>
      <PostListItems>
        {resultData?.map((post) => (
          <PostListItem
            key={post._id}
            id={post._id}
            image={post.author.image}
            title={post.title}
            likes={post.likes.length}
            comments={post.comments.length}
          />
        ))}
      </PostListItems>
      {(isAllPostsLoading || isSearchPostsLoading) && <Spinner />}
    </>
  );
};

export default PostList;

const PostListItems = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;
