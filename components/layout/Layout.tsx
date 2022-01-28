import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '..';
import { useVitraData } from '../../context/VitraContext';
import { IconType } from '../../types';
import { Nav } from '../nav';
import { useIsSmall } from '../../hooks/utils';

export const Layout: FC = ({ children }) => {
  const isSmall = useIsSmall();

  const navWidth = isSmall ? '10.5rem' : '100vw';
  console.log('isSmall', isSmall, navWidth);

  const versionsNav = {
    initial: { marginLeft: `-${navWidth}` },
    animate: { marginLeft: 0 },
  };

  const versionsMain = {
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
        <motion.div
          className={`fixed flex-none w-[${navWidth}] top-0 h-full z-20 bg-white overflow-hidden white`}
          initial={versionsNav.initial}
          animate={isNavOpen ? versionsNav.animate : versionsNav.initial}
        >
          <Nav />
        </motion.div>
        <motion.main
          className={`flex-grow flex-shrink relative z-5 h-full ml-[10.5rem]`}
          initial={versionsMain.initial}
          animate={isNavOpen ? versionsMain.animate : versionsMain.initial}
        >
          {children}
        </motion.main>
      </div>
      <button
        onClick={toggleNav}
        className="fixed  top-0 right-0 z-10 w-20 sm:w-24 h-20 sm:h-24 flex-none flex justify-center items-center bg-white/75 rounded-full"
      >
        <Icon iconName={IconType.Menu} size="2.5rem" />
      </button>
    </>
  );
};
