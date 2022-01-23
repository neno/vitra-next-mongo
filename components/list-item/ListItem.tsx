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
        <article className="flex items-center h-[96px]">
          {showImage && (
            <div className="flex-0 w-20 md:w-24 h-20 md:h-24 relative">
              {image && (
                <Link href={itemPath}>
                  <a>
                    <Image
                      src={image}
                      width={96}
                      height={96}
                      alt={title}
                      objectFit={
                        domain === DomainType.Objects ? 'contain' : 'cover'
                      }
                      layout="fill"
                    />
                  </a>
                </Link>
              )}
            </div>
          )}
          <div className="flex-1 ml-4">
            <Link href={itemPath}>
              <a className="block w-full overflow-hidden">
                <h3 className="text-xl md:text-xl max-w-[95%] text-ellipsis whitespace-nowrap overflow-hidden">
                  {title}
                </h3>
                <p className="text-base md:text-xl text-gray-400 max-w-[95%] text-ellipsis whitespace-nowrap overflow-hidden">
                  {text}
                </p>
              </a>
            </Link>
          </div>
          <Icon iconName={IconType.Next} />
        </article>
      </ContentContainer>
    </div>
  );
};
