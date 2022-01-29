import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '..';
import { useVitraData } from '../../context/VitraContext';
import { IconType } from '../../types';
import { Nav } from '../nav';
import { useIsSmall } from '../../hooks/utils';
import { widthNavigation } from '../../constants';

export const Layout: FC = ({ children }) => {
  const isSmall = useIsSmall();

  const navWidth = isSmall ? `${widthNavigation}` : '100vw';

  const variantsNav = {
    initial: { marginLeft: `-${navWidth}` },
    animate: { marginLeft: 0 },
  };

  const variantsMain = {
    initial: { marginLeft: 0 },
    animate: { marginLeft: navWidth },
  };

  const {
    vitraData: { isNavOpen },
    setVitraData,
  } = useVitraData();

  const toggleNav = () => {
    setVitraData({ isNavOpen: !isNavOpen });
  };

  return (
    <>
      <div className="w-[100vw] w-max-[100vw] z-0 relative mx-auto block sm:flex bg-white w-full h-full min-h-full">
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              className={`fixed flex-none w-[${
                navWidth ?? ''
              }] top-0 h-full z-20 bg-white overflow-hidden`}
              initial={variantsNav.initial}
              animate={variantsNav.animate}
              exit={variantsNav.initial}
            >
              <Nav />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.main
          className={`flex-grow flex-shrink relative z-5 h-full ml-[${widthNavigation}]`}
          initial={variantsMain.initial}
          animate={isNavOpen ? variantsMain.animate : variantsMain.initial}
        >
          {children}
        </motion.main>
      </div>
      <button
        onClick={toggleNav}
        className="fixed top-0 right-0 z-10 w-20 sm:w-24 h-20 sm:h-24 flex-none flex justify-center items-center "
        aria-label="Toggle navigation"
      >
        <Icon iconName={IconType.Menu} size="2.5rem" />
      </button>
    </>
  );
};
