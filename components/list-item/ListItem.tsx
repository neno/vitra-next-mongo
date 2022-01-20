import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IListItemProps } from './ListItem.types';
import { ContentContainer, Icon } from '..';
import { IconType } from '../../types';

export const ListItem: FC<IListItemProps> = ({ id, imageUrl, title, text }) => {
  return (
    <div className="relative z-0 hover:shadow-md hover:z-10">
      <ContentContainer>
        <article className="flex items-center">
          <div className="flex-0 w-20 md:w-24 h-20 md:h-24">
            {imageUrl && (
              <Link href={`/products/${id}`}>
                <a>
                  <Image
                    src={imageUrl}
                    width={96}
                    height={96}
                    alt="Vitra Design Museum Logo"
                  />
                </a>
              </Link>
            )}
          </div>
          <div className="flex-1 ml-4">
            <Link href={`/products/${id}`}>
              <a>
                <h3 className="text-xl md:text-xl">{title}</h3>
                <p className="text-base md:text-xl text-gray-400">{text}</p>
              </a>
            </Link>
          </div>
          <Icon iconName={IconType.Next} />
        </article>
      </ContentContainer>
    </div>
  );
};
