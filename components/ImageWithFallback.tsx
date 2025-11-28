'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  fill = false,
  width,
  height 
}: ImageWithFallbackProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`bg-gradient-to-br from-slate-700 to-slate-900 ${className}`}>
        <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
          {alt}
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={className}
          onError={() => setImgError(true)}
          unoptimized={src.startsWith('http')}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 400}
      height={height || 500}
      className={className}
      onError={() => setImgError(true)}
      unoptimized={src.startsWith('http')}
    />
  );
}

