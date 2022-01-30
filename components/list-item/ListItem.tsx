import { FC, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '../../hooks/useFavorites';
import { ContentContainer, Icon } from '..';
import { DomainType, IconType } from '../../types';
import { IListItemProps } from './ListItem.type';
import { motion, AnimatePresence } from 'framer-motion';

export const ListItem: FC<IListItemProps> = ({
  item: { id, image, title, text },
  domain,
  showImage = true,
  isFavorite = false,
}) => {
  const { toggleFavorite } = useFavorites();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const itemPath = useMemo(() => {
    return `/${domain}/${id}`;
  }, [domain, id]);

  const doConfirm = () => {
    setShowConfirmation(true);
  };

  const removeFromFavorites = () => {
    toggleFavorite({ id, image, title, text }, domain);
    setShowConfirmation(false);
  };

  return (
    <div className="relative">
      <ContentContainer animate>
        <article className="flex items-center h-20 sm:h-24 overflow-hidden space-x-2 sm:space-x-4">
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
          <div className="flex-1 overflow-hidden h-full relative">
            <AnimatePresence>
              {!showConfirmation && (
                <motion.div
                  className="h-full w-full flex items-center"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0, transition: { type: 'tween' } }}
                  exit={{ x: '-100%', transition: { type: 'tween' } }}
                >
                  <Link href={itemPath}>
                    <a className="flex-1 relative z-1 w-max-full h-full flex flex-col justify-center">
                      <h3 className="text-lg sm:text-xl w-full text-ellipsis overflow-hidden truncate">
                        {title}
                      </h3>
                      <p className="text-lg sm:text-xl w-full text-gray-400 text-ellipsis truncate">
                        {text}
                      </p>
                    </a>
                  </Link>
                  {!isFavorite && (
                    <div className="flex-none text-gray-400 w-8">
                      <Icon iconName={IconType.Next} />
                    </div>
                  )}
                  {isFavorite && (
                    <button
                      // className={`${cssClass} ${isFavorite ? styles.active : ''}`}
                      onClick={doConfirm}
                      title="Remove from favorites"
                      className="text-white bg-black flex p-1 rounded-full"
                    >
                      <Icon iconName={IconType.Highlight} size="1.5rem" />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {!!showConfirmation && (
                <motion.div
                  className="absolute z-5 p-4 top-0 left-0 w-full h-full flex space-x-4 justify-center text-white bg-red-800"
                  initial={{ x: '-100%' }}
                  animate={{ x: 0, transition: { type: 'tween' } }}
                  exit={{ x: '-100%', transition: { type: 'tween' } }}
                >
                  <p>
                    Do you really want to remove this item from your favorites?
                  </p>
                  <button
                    className="px-2 border"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={removeFromFavorites}
                    className="px-2 border bg-white text-orange-700"
                  >
                    Remove
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </article>
      </ContentContainer>
    </div>
  );
};
