import { useRef } from 'react';
import { PostViewer, Spinner } from '@components';
import styled from '@emotion/styled';
import { Comment } from '@type';
import { useRecoilValue } from 'recoil';
import { authInfoState } from '@store/auth';
import { calculateLevel } from '@utils/calculateUserLevel';
import { splitCommentBySeparator } from '@utils/parseDataBySeparator';
import { useInfiniteScroll } from './hooks';

const HomePage = () => {
  const auth = useRecoilValue(authInfoState);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { PostsData, isLoading, isPartPostsLoading } = useInfiniteScroll({
    containerRef,
  });

  const getUserVoteValue = (comments: Comment[]) => {
    if (!auth) return;
    const userComment = comments.find(
      (comment) => comment.author._id === auth.userId,
    )?.comment;
    return userComment ? splitCommentBySeparator(userComment).vote : undefined;
  };

  return (
    <Container>
      {PostsData?.map((post, index) => (
        <PostViewer
          key={index}
          postId={post._id}
          authorName={post.author.fullName}
          authorId={post.author._id}
          authorLevel={calculateLevel(post.author)}
          postTitle={post.title}
          likeId={post.likes.find((like) => like.user === auth?.userId)?._id}
          voteValue={getUserVoteValue(post.comments)}
          numberOfComments={post.comments.length}
          numberOfLikes={post.likes.length}></PostViewer>
      ))}
      <div ref={containerRef} />
      {isPartPostsLoading || isLoading ? <Spinner size={50} /> : null}
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
