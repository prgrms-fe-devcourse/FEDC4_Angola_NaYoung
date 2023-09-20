import { useEffect, useRef, useState } from 'react';

export const useElementWidth = (defaultWidth: number) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [elementWidth, setElementWidth] = useState<number>(defaultWidth);

  useEffect(() => {
    if (elementRef.current) {
      setElementWidth(elementRef.current.offsetWidth);
    } else {
      setElementWidth(defaultWidth);
    }
  }, [defaultWidth]);

  return [elementRef, elementWidth] as const;
};
