import { FC, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ContentContainer, Icon } from '..';
import { IconType } from '../../types';
import { IListItemProps } from './ListItem.type';

export const ListItem: FC<IListItemProps> = ({
  item: { id, image, title, text },
  domain,
}) => {
  const itemPath = useMemo(() => {
    return `/${domain}/${id}`;
  }, [domain, id]);

  return (
    <div className="relative">
      <ContentContainer>
        <article className="flex items-center">
          <div className="flex-0 w-20 md:w-24 h-20 md:h-24">
            {image && (
              <Link href={itemPath}>
                <a>
                  <Image
                    src={image}
                    width={96}
                    height={96}
                    alt={title}
                    objectFit="contain"
                  />
                </a>
              </Link>
            )}
          </div>
          <div className="flex-1 ml-4">
            <Link href={itemPath}>
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
