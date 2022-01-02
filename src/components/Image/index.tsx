import { ImageProps } from 'next/image';
import React from 'react';
import Image from 'next/image';

const RImage = ({ ...props }: ImageProps) => {
  return <Image width="100%" height="100%" {...props} />;
};

export default RImage;
