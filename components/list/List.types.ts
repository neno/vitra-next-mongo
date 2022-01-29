import { DomainType } from './../../types/enums';
import { IListItem } from '../../types';

export interface IListProps {
  items: IListItem[];
  domain: DomainType;
  showImage?: boolean;
  isFavorite?: boolean;
}
