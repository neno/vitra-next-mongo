import { FC } from 'react';

export const ContentContainer: FC = ({ children }) => {
  return (
    <div className="border-t">
      <div className="max-w-screen-sm mx-auto px-4 md:px-0 h-20 md:h-24">
        {children}
      </div>
    </div>
  );
};
