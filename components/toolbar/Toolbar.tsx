import { ContentContainer, HoverButton, Icon } from '../../components';
import Link from 'next/link';
import { FC } from 'react';
import { IconType } from '../../types';
import styles from './Toolbar.module.scss';
import { IToolbarProps } from './Toolbar.types';

export const Toolbar: FC<IToolbarProps> = ({
  prevUrl,
  onToggleFavorite,
  isFavorite,
}) => {
  const cssClass = `block h-full px-3 flex flex-column items-center justify-center text-gray-400 border-r ${styles.btn}`;

  return (
    <ContentContainer isSection>
      <menu className="flex items-center h-[47px] border-l">
        <li className="h-full">
          <Link href={prevUrl}>
            <a className={cssClass}>
              <Icon iconName={IconType.Prev} />
            </a>
          </Link>
        </li>
        <li className="h-full">
          <button
            className={`${cssClass} ${isFavorite ? styles.active : ''}`}
            onClick={onToggleFavorite}
            title="Add to favorites"
          >
            <Icon iconName={IconType.Highlight} />
          </button>
        </li>
      </menu>
    </ContentContainer>
  );
};
