'use client';

import React, { useState, useEffect, useRef } from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface ObserverImageProps {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

const ObserverImage: React.FC<ObserverImageProps> = ({
  src,
  alt,
  className,
  imageClassName,
}) => {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px 100px 0px',
        // threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={imgRef} className={cn('relative w-full h-full', className)}>
      {isInView ? (
        <Image
          src={(src as StaticImageData)?.src || (src as unknown as string)}
          alt={alt}
          className={cn(
            'object-cover w-full h-full animate-in-fade',
            imageClassName
          )}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
        />
      )}
    </div>
  );
};

export default ObserverImage;
