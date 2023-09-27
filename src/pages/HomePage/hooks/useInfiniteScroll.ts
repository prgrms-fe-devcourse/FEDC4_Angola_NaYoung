import type { MutableRefObject } from 'react';
import { useEffect, useState } from 'react';
import type { Post } from '@type';
import { useFetchPartPosts } from '@apis/post';
import { INTERACTION_OPTION, LIMIT } from '../constants';

interface useInfinityScroll {
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

const useInfiniteScroll = ({ containerRef }: useInfinityScroll) => {
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [PostsData, setPostsData] = useState<Post[]>([]);
  const { partPostsData, isPartPostsLoading, partPostsRefetch } =
    useFetchPartPosts(offset, LIMIT);

  useEffect(() => {
    setOffset(5);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !partPostsData || partPostsData.length < LIMIT) return;

    const handleIntersection = async (
      [entry]: IntersectionObserverEntry[],
      io: IntersectionObserver,
    ) => {
      if (isLoading) return;
      if (entry.isIntersecting) {
        setIsLoading(true);
        setOffset((prev) => prev + LIMIT);
        await partPostsRefetch();
        io.unobserve(entry.target);
        setIsLoading(false);
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
  }, [partPostsData, partPostsRefetch, isLoading, containerRef]);

  useEffect(() => {
    if (partPostsData) {
      setPostsData((prev) => [...prev, ...partPostsData]);
    }
  }, [partPostsData]);

  return { PostsData, isLoading, isPartPostsLoading };
};

export default useInfiniteScroll;
