import { useCallback, useEffect, useRef, useState } from 'react';
import { IListItem } from 'types';

export const useIntersect = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const remainingItemsRef = useRef<IListItem[][]>([]);
  const [items, setItems] = useState<IListItem[]>([]);
  const [doObserve, setDoObserve] = useState(true);

  const addMoreItems = useCallback(() => {
    const { current: remainingItems } = remainingItemsRef;
    if (remainingItems.length > 0) {
      const [chunk] = remainingItems.splice(0, 1);
      setItems([...items, ...chunk]);
    }
  }, [items]);

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && doObserve) {
          addMoreItems();
        }
      });
    },
    [addMoreItems, doObserve]
  );

  useEffect(() => {
    addMoreItems();
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    observer.current = new IntersectionObserver(onIntersect, {
      rootMargin: '0px 0px 100px 0px',
    });

    const { current: currentObserver } = observer;
    currentObserver.observe(loadMoreRef.current);
    return () => currentObserver.disconnect();
  }, [onIntersect]);

  return { items, remainingItemsRef, loadMoreRef, setDoObserve };
};
