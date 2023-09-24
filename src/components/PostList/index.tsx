import styled from '@emotion/styled';
import { NON_SEARCH_TEXT } from '@pages/SearchPage/constants';
import { usePostSort } from '@pages/SearchPage/hooks';
import PostListItem from '@components/PostListItem';
import Spinner from '@components/Spinner';

interface PostListProps {
  keyword?: string;
  sort: string;
}

const PostList = ({ keyword, sort }: PostListProps) => {
  const { resultData, isAllPostsLoading, isSearchPostsLoading } = usePostSort({
    keyword,
    sort,
  });

  return (
    <>
      <PostListItems>
        {resultData?.length !== 0 ? (
          resultData?.map((post) => (
            <PostListItem
              key={post._id}
              id={post._id}
              title={post.title}
              likes={post.likes.length}
              comments={post.comments.length}
            />
          ))
        ) : (
          <div>{NON_SEARCH_TEXT}</div>
        )}
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
