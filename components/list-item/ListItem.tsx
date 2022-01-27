import { FC, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ContentContainer, Icon } from '..';
import { DomainType, IconType } from '../../types';
import { IListItemProps } from './ListItem.type';

export const ListItem: FC<IListItemProps> = ({
  item: { id, image, title, text },
  domain,
  showImage = true,
}) => {
  const itemPath = useMemo(() => {
    return `/${domain}/${id}`;
  }, [domain, id]);

  return (
    <div className="relative">
      <ContentContainer animate>
        <article className="flex items-center h-20 sm:h-24 overflow-hidden">
          {showImage && (
            <div className="flex-none w-20 sm:w-24 h-full relative">
              {image && (
                <Link href={itemPath}>
                  <a className="block relative h-full w-full bg-white">
                    <Image
                      src={image}
                      alt={title}
                      objectFit={
                        domain === DomainType.Objects ? 'contain' : 'cover'
                      }
                      layout="fill"
                      placeholder="blur"
                      blurDataURL={image}
                    />
                  </a>
                </Link>
              )}
            </div>
          )}
          <div className="flex-1 ml-2 sm:ml-4 overflow-hidden">
            <Link href={itemPath}>
              <a className="block w-max-full h-full flex flex-col justify-center mr-2">
                <h3 className="text-lg sm:text-xl w-full text-ellipsis overflow-hidden truncate">
                  {title}
                </h3>
                <p className="text-lg sm:text-xl w-full text-gray-400 text-ellipsis truncate">
                  {text}
                </p>
              </a>
            </Link>
          </div>
          <div className="flex-none text-gray-400 w-8">
            <Icon iconName={IconType.Next} />
          </div>
        </article>
      </ContentContainer>
    </div>
  );
};
