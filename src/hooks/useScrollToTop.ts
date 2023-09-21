import { useRef } from 'react';

export const useScrollToTop = <T extends HTMLElement>() => {
  const scrollTargetRef = useRef<T>(null);

  const scrollToTop = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return [scrollTargetRef, scrollToTop] as const;
};
