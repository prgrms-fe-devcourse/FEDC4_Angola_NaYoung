import styled from '@emotion/styled';
import usePostSort from '@pages/SearchPage/hooks/usePostSort';
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
