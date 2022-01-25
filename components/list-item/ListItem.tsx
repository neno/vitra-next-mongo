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
      <ContentContainer>
        <article className="flex items-center h-[96px] overflow-hidden">
          {showImage && (
            <div className="flex-none w-20 md:w-24 h-20 md:h-24 bg-white relative">
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
          <div className="flex-1 ml-4">
            <Link href={itemPath}>
              <a className="block w-full flex items-center overflow-hidden">
                <div className="flex-1 relative">
                  <h3 className="text-xl md:text-xl max-w-[480px] text-ellipsis whitespace-nowrap overflow-hidden">
                    {title}
                  </h3>
                  <p className="text-base md:text-xl text-gray-400 max-w-[480px] text-ellipsis whitespace-nowrap overflow-hidden">
                    {text}
                  </p>
                </div>
                <div className="flex-none">
                  <Icon iconName={IconType.Next} />
                </div>
              </a>
            </Link>
          </div>
        </article>
      </ContentContainer>
    </div>
  );
};
