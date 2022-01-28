import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

type TScrollDirection = 'down' | 'up';

export const useScrollDirection = () => {
  const windowRef = useRef<any>(null);
  const pageOffsetRef = useRef(0);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [scrollDirection, setScrollDirection] =
    useState<TScrollDirection>('down');

  const handleScroll = useCallback(() => {
    const currentPageYOffset = windowRef.current.pageYOffset;
    const { current: lastPageYOffset } = pageOffsetRef;
    pageOffsetRef.current = currentPageYOffset;

    if (Math.abs(currentPageYOffset - lastPageYOffset) < 10) return;

    if (currentPageYOffset > lastPageYOffset) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    setShowSearchForm(currentPageYOffset > 2 * 97);
  }, []);

  useEffect(() => {
    windowRef.current = window;
    const { current: theWindow } = windowRef;
    theWindow.addEventListener('scroll', handleScroll);
    return () => {
      theWindow.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { scrollDirection, showSearchForm };
};
