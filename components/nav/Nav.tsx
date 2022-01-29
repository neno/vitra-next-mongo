import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useVitraData } from '../../context/VitraContext';
import { useIsSmall } from '../../hooks/utils';
import { ContentContainer, Icon } from '..';
import { Logo } from '../logo';
import { IconType } from '../../types';
import styles from './Nav.module.scss';

const navItems = [
  { title: 'Objects', path: '/' },
  { title: 'Designers', path: '/designers' },
  { title: 'Manufacturers', path: '/manufacturers' },
  { title: 'Favorites', path: '/favorites', icon: IconType.Highlight },
];

export const Nav: FC = () => {
  const router = useRouter();
  const { setVitraData } = useVitraData();
  const isSmall = useIsSmall();

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return router.pathname === path || router.pathname.includes('/objects');
    }
    return router.pathname === path || router.pathname.includes(path);
  };

  const onClick = () => {
    !isSmall && setVitraData({ isNavOpen: false });
  };

  return (
    <div className="h-[100vh] border-r">
      <ContentContainer>
        <div className="text-2xl md:text-4xl flex items-center h-full p-4">
          <Logo />
        </div>
      </ContentContainer>
      <nav className="">
        <ul className="list-none border-b">
          {navItems.map((item) => (
            <li key={item.path}>
              <ContentContainer>
                <Link href={item.path}>
                  <a
                    onClick={onClick}
                    className={`flex h-full items-center p-4 text-xl md:text-xl ${
                      styles.link
                    } ${isActive(item.path) ? styles.active : ''}`}
                  >
                    {item.icon ? (
                      <>
                        <span className="inline-block mr-1">Favorites</span>
                        <Icon iconName={IconType.Highlight} />
                      </>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </a>
                </Link>
              </ContentContainer>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
