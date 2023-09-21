import { useRef } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import Spinner from '@components/Spinner';
import { authInfoState } from '@store/auth';
import { calculateLevel } from '@utils/calculateUserLevel';
import useInfiniteScroll from './hooks/useInfiniteScroll';

const HomePage = () => {
  const auth = useRecoilValue(authInfoState);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { PostsData, isLoading, isPartPostsLoading } = useInfiniteScroll({
    containerRef,
  });

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
