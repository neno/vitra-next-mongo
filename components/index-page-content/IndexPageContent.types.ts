import { DomainType, IDomainContextProps, IListItem } from '../../types';

export interface IndexPageContentProps {
  chunkItems: IListItem[][];
  totalCount: number;
  domain: DomainType;
  useData: () => IDomainContextProps;
}
