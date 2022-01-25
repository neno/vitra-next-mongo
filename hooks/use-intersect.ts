import { useCallback, useEffect, useRef, useState } from 'react';
import { IListItem } from '../types';

export const useIntersect = (
  chunkItems: IListItem[][],
  addMoreItems: () => void
) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [doObserve, setDoObserve] = useState(true);

  // const remainingItemsRef = useRef<IListItem[][]>(chunkItems);
  // const [items, setItems] = useState<IListItem[]>([]);

  // const addMoreItems = useCallback(() => {
  //   if (remainingItemsRef.current.length > 0) {
  //     const chunk = remainingItemsRef.current.splice(0, 1).flat();
  //     setItems([...items, ...chunk]);
  //   }
  // }, [items]);

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

  return { loadMoreRef, setDoObserve };
};
