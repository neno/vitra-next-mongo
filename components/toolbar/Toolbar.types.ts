import { DomainType } from '../../types';

export interface IToolbarProps {
  prevUrl: string;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}
