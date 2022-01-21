import { FC } from 'react';
import Image from 'next/image';
import { IDetailImageProps } from './DetailImage.types';
import { ContentContainer } from 'components';

export const DetailImage: FC<IDetailImageProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center">
      <Image src={src} width={640} height={640} alt={alt} objectFit="contain" />
    </div>
  );
};
