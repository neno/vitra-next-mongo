import { FC } from 'react';
import Image from 'next/image';

export const Logo: FC = () => {
  const ratio = 37 / 51;
  const width = 80;
  const height = width * ratio;
  return (
    <Image
      src="/icons/VDM_Logo_Vektor_RGB.svg"
      width={width}
      height={height}
      alt="Vitra Design Museum Logo"
    />
  );
};
