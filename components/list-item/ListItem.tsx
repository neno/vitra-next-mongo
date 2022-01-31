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
    <ContentContainer animate>
      <div className="relative h-full w-full overflow-hidden">
        <motion.article
          className="flex space-x-2 sm:space-x-4 items-center h-20 sm:h-24 overflow-hidden"
          initial={{ x: 0 }}
          animate={
            showConfirmation
              ? { x: '-100%', transition: { type: 'tween' } }
              : { x: 0, transition: { type: 'tween' } }
          }
        >
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
          <div
            className={`flex-1 overflow-hidden ${
              !showImage ? 'pl-4 sm:pl-0' : ''
            }`}
          >
            <Link href={itemPath}>
              <a className="block w-max-full h-full flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl w-full text-ellipsis overflow-hidden truncate">
                  {title}
                </h3>
                <p className="text-lg sm:text-xl w-full text-gray-400 text-ellipsis truncate">
                  {text}
                </p>
              </a>
            </Link>
          </div>
          {!isFavorite && (
            <div className="flex-none text-gray-400 w-8">
              <Icon iconName={IconType.Next} />
            </div>
          )}
          {isFavorite && (
            <div>
              <button
                // className={`${cssClass} ${isFavorite ? styles.active : ''}`}
                onClick={doConfirm}
                title="Remove from favorites"
                className="flex-none relative block text-white bg-black flex p-1 rounded-full mr-4"
              >
                <Icon iconName={IconType.Highlight} size="1.5rem" />
              </button>
            </div>
          )}
        </motion.article>
        <AnimatePresence>
          {!!showConfirmation && (
            <motion.div
              className="absolute z-5 p-4 top-0 left-0 w-full h-full flex space-x-4 items-center justify-between text-white bg-red-800"
              initial={{ x: '-100%' }}
              animate={{ x: 0, transition: { type: 'tween' } }}
              exit={{ x: '-100%', transition: { type: 'tween' } }}
            >
              <p>Remove this item from favorites?</p>
              <div className="flex items-center space-x-4">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ContentContainer>
  );
};
