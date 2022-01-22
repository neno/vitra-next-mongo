import { FC } from 'react';
import { Nav } from '../nav';

export const Layout: FC = ({ children }) => {
  return (
    <div className="container relative mx-auto flex bg-white border-r border-l w-full min-h-full">
      <div className="fixed top-0 h-full z-20 bg-white w-[160px]">
        <Nav />
      </div>
      <main className="flex-grow flex-shrink relative z-5 h-full">
        {children}
      </main>
    </div>
  );
};
