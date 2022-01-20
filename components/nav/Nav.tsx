import { FC } from 'react';
import { ContentContainer } from '..';
import { Logo } from '../logo';

export const Nav: FC = () => {
  return (
    <div>
      <ContentContainer>
        <div className="text-2xl md:text-4xl flex items-center h-full">
          <Logo />
        </div>
      </ContentContainer>

      <nav className="border-t">Navigation</nav>
    </div>
  );
};
