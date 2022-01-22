import { ContentContainer } from '../../components';
import { FC } from 'react';
import { IAsideProps } from './Aside.type';

export const Aside: FC<IAsideProps> = ({ children, title }) => {
  return (
    <aside>
      <ContentContainer isSection>
        <h2 className="pb-2 pt-16 text-gray-400 text-xl md:text-xl">{title}</h2>
      </ContentContainer>
      {children}
    </aside>
  );
};
