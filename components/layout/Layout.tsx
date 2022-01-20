import { FC } from 'react';
import { Nav } from '../nav';

export const Layout: FC = ({ children }) => {
  return (
    <div className="container mx-auto flex bg-white">
      <div className="">
        <Nav />
      </div>
      <main className="flex-grow flex-shrink">{children}</main>
    </div>
  );
};
