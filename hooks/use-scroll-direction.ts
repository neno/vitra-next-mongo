import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

type TScrollDirection = 'down' | 'up';

export const useScrollDirection = () => {
  const windowRef = useRef<any>(null);
  const pageOffsetRef = useRef(0);
  const [isSticky, setIsSticky] = useState(false);
  const [scrollDirection, setScrollDirection] =
    useState<TScrollDirection>('down');

  const handleScroll = () => {
    const currentPageYOffset = windowRef.current.pageYOffset;
    const { current: lastPageYOffset } = pageOffsetRef;
    pageOffsetRef.current = currentPageYOffset;

    if (Math.abs(currentPageYOffset - lastPageYOffset) < 10) return;

    if (currentPageYOffset > lastPageYOffset) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    setIsSticky(currentPageYOffset > 2 * 97);
  };

  const debouncedScrollHandler = debounce(handleScroll, 200);

  useEffect(() => {
    windowRef.current = window;
    const { current: theWindow } = windowRef;
    const scrollListener = theWindow.addEventListener(
      'scroll',
      debouncedScrollHandler
    );
    return () => theWindow.removeEventListener('scroll', scrollListener);
  }, []);

  return { scrollDirection, isSticky };
};
