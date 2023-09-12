import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import HomePost from '@components/HomePost';
import { getSortPostList } from '@components/PostList/utils';
import Spinner from '@components/Spinner';
import { useFetchAllPosts } from '@apis/post';
import { authInfoState } from '@atoms/index';
import { Post } from '@type/index';

interface HomePageProps {
  sort?: string;
}

const INTERACTION_OPTION = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const HomePage = ({ sort }: HomePageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const auth = useRecoilValue(authInfoState);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(4);
  const [loading, setLoading] = useState(false);
  const [resultPostData, setResultPostData] = useState<Post[]>([]);
  const { allPostsData, allPostsLoading, allPostsRefetch } = useFetchAllPosts(
    offset,
    limit,
  );

  const resultData = getSortPostList(resultPostData, sort);

  useEffect(() => {
    allPostsRefetch();
  }, [offset, sort, allPostsRefetch]);

  useEffect(() => {
    if (allPostsData) {
      setResultPostData((prev) => [...prev, ...allPostsData]);
    }
  }, [allPostsData]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !allPostsData || allPostsData.length < 4) return;

    const handleIntersection = async (
      entries: IntersectionObserverEntry[],
      io: IntersectionObserver,
    ) => {
      if (loading) return;

      if (entries[0].isIntersecting) {
        setLoading(true);

        setOffset((prev) => prev + 4);
        io.unobserve(entries[0].target);
        setTimeout(() => {
          setLoading(false);
        }, 200);
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
  }, [allPostsRefetch, allPostsData, loading, offset]);

  return (
    <Container>
      {resultData?.map((post) => (
        <HomePost
          key={post._id}
          postId={post._id}
          authorName={post.author.fullName}
          authorId={post.author._id}
          postTitle={post.title}
          likeId={post.likes.find((like) => like.user === auth?.userId)?._id}
          numberOfComments={post.comments.length}
          numberOfLikes={post.likes.length}></HomePost>
      ))}
      <ObserverDiv ref={containerRef}></ObserverDiv>
      {allPostsLoading || loading ? <Spinner size={50} /> : null}
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
