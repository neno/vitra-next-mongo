import {
  DomainType,
  IDomainContextProps,
  IListItem,
  TSearchFunction,
} from '../../types';

export interface IndexPageContentProps {
  chunkItems: IListItem[][];
  totalCount: number;
  domain: DomainType;
  useData: () => IDomainContextProps;
  searchFunction: TSearchFunction;
}
