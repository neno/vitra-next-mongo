import { FC } from 'react';
import { motion } from 'framer-motion';
import { IContentContainerProps } from './ContentContainer.types';
import styles from './ContentContainer.module.scss';

const whileHover = {
  scale: 1.05,
  transition: { duration: 0.3, ease: 'easeInOut' },
  translateY: -1,
  zIndex: 10,
  borderBottomColor: '#e5e7eb',
};

export const ContentContainer: FC<IContentContainerProps> = ({
  children,
  isSection = false,
  animate = false,
}) => {
  const renderContent = () => {
    const cssClass = `max-w-screen-sm mx-auto ${
      isSection ? '' : 'h-20 sm:h-24'
    }`;

    return <div className={cssClass}>{children}</div>;
  };

  if (animate) {
    return (
      <motion.div
        className={`border-t relative z-1 bg-white overflow-hidden border-b border-b-white`}
        whileHover={whileHover}
      >
        {renderContent()}
      </motion.div>
    );
  }

  return (
    <div className="border-t relative z-1 bg-white overflow-hidden border-b border-b-white">
      {renderContent()}
    </div>
  );
};
