import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import PostViewer from '@components/PostViewer';
import Spinner from '@components/Spinner';
import { useFetchPartPosts } from '@apis/post';
import { authInfoState } from '@atoms/index';
import { Post } from '@type/index';

const INTERACTION_OPTION = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const auth = useRecoilValue(authInfoState);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [loading, setLoading] = useState(false);
  const { partPostsData, isPartPostsLoading, partPostsRefetch } =
    useFetchPartPosts(offset, limit);
  const [addPostData, setAddPostData] = useState<Post[]>([]);

  useEffect(() => {
    setOffset(5);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !partPostsData || partPostsData.length < 5) return;

    const handleIntersection = async (
      [entry]: IntersectionObserverEntry[],
      io: IntersectionObserver,
    ) => {
      if (loading) return;

      if (entry.isIntersecting) {
        setLoading(true);
        console.log('감지', offset);
        setOffset((prev) => prev + 5);
        await partPostsRefetch();
        io.unobserve(entry.target);
        setLoading(false);
      }
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      INTERACTION_OPTION,
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [partPostsData, partPostsRefetch, offset, loading]);

  useEffect(() => {
    if (partPostsData) {
      setAddPostData((prev) => [...prev, ...partPostsData]);
    }
  }, [partPostsData]);

  return (
    <Container>
      {addPostData?.map((post, index) => (
        <PostViewer
          key={index}
          postId={post._id}
          authorName={post.author.fullName}
          authorId={post.author._id}
          postTitle={post.title}
          likeId={post.likes.find((like) => like.user === auth?.userId)?._id}
          numberOfComments={post.comments.length}
          numberOfLikes={post.likes.length}></PostViewer>
      ))}
      <ObserverDiv ref={containerRef}></ObserverDiv>
      {isPartPostsLoading || loading ? <Spinner size={50} /> : null}
      {loading ? null : <div></div>}
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  width: 80%;
  border: 1px solid black;
  border-top: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ObserverDiv = styled.div``;
