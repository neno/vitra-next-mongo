import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ContentContainer } from '..';
import { Logo } from '../logo';
import styles from './Nav.module.scss';

const navItems = [
  { title: 'Objects', path: '/' },
  { title: 'Designers', path: '/designers' },
  { title: 'Manufacturers', path: '/manufacturers' },
];

export const Nav: FC = () => {
  const router = useRouter();

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return router.pathname === path || router.pathname.includes('/objects');
    }
    return router.pathname === path;
  };

  return (
    <div className="h-full border-r">
      <ContentContainer>
        <div className="text-2xl md:text-4xl flex items-center h-full p-4">
          <Logo />
        </div>
      </ContentContainer>
      <nav>
        <ul className="list-none border-b">
          {navItems.map((item) => (
            <li key={item.path}>
              <ContentContainer>
                <Link href={item.path}>
                  <a
                    className={`flex h-full items-center p-4 text-xl md:text-xl ${
                      styles.link
                    } ${isActive(item.path) ? styles.active : ''}`}
                  >
                    {item.title}
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
