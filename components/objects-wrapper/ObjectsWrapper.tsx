import { FC } from 'react';

export const ObjectsWrapper: FC = ({ children }) => {
  return (
    <div className="w-[100vw] w-max-[100vw] relative mx-auto flex bg-white border-r border-l w-full min-h-full">
      <div className="fixed top-0 h-full z-20 bg-white w-[160px]">
        <Nav />
      </div>
      <main className="flex-grow flex-shrink relative z-5 h-full">
        {children}
      </main>
    </div>
  );
};
