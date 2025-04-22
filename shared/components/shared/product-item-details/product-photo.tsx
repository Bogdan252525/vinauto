'use client';

import { cn } from '@/shared/lib/utils';
import { Image as PrismaImage } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface Props {
  images: PrismaImage[];
  className?: string;
}

export const ProductPhoto: React.FC<Props> = ({ images, className }) => {
  const primaryImage = images.find((image) => image.isPrimary);
  const [selectedImage, setSelectedImage] = React.useState(
    primaryImage || images[0]
  );

  console.log(images);
  return (
    <div className={cn('flex', className)}>
      <div className="mr-5 flex flex-col h-[440px] overflow-y-auto">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            alt={`Image ${image.id}`}
            width={0}
            height={0}
            sizes="100vw"
            priority
            onClick={() => setSelectedImage(image)}
            className={`w-16 h-auto cursor-pointer mb-2 border ${
              selectedImage.id === image.id
                ? 'border-blue-500'
                : 'border-gray-300'
            }`}
          />
        ))}
      </div>

      <div className='flex justify-start h-[440px] items-center'>
        <Image
          src={selectedImage.url}
          alt="Selected Image"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="w-72 h-auto max-h-[440px] object-contain"
        />
      </div>
    </div>
  );
};
