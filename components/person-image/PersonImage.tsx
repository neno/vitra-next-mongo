import { FC } from 'react';
import Image from 'next/image';
import { IPersonImageProps } from './PersonImage.types';

export const PersonImage: FC<IPersonImageProps> = ({ src, alt }) => {
  return (
    <div className="relative w-full h-[640px]">
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
};
