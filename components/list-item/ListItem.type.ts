import { DomainType } from './../../types/enums';
import { IListItem } from '../../types';

export interface IListItemProps {
  item: IListItem;
  domain: DomainType;
}
