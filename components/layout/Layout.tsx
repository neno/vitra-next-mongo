import { FC } from 'react';
import { Icon } from '..';
import { useVitraData } from '../../context/VitraContext';
import { IconType } from '../../types';
import { Nav } from '../nav';

export const Layout: FC = ({ children }) => {
  const {
    vitraData: { isNavOpen },
    setVitraData,
  } = useVitraData();

  const toggleNav = () => {
    setVitraData({ isNavOpen: !isNavOpen });
  };

  return (
    <>
      <div className="w-[100vw] w-max-[100vw] z-0 relative mx-auto sm:flex bg-white w-full min-h-full">
        {isNavOpen && (
          <div className=" top-0 left-0 h-full z-20 bg-white w-[100vw] sm:w-[167px] ">
            <Nav />
          </div>
        )}
        <main
          className={`flex-grow flex-shrink relative z-5 h-full ${
            isNavOpen ? 'sm:max-w-[calc(100%_-_167px)]' : ''
          }`}
        >
          {children}
        </main>
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
