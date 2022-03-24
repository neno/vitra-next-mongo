import { IListItem } from '@types';
import useSWRInfinite from 'swr/infinite';

export const useInfiniteQuery = (
  queryKey: string,
  initialData: IListItem[]
) => {
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
    (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !previousPageData.after) return null;
      if (pageIndex === 0) return queryKey;
    }
  );
};
