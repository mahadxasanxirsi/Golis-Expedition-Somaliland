import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Somaliland destination',
  fallbackTitle,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0F382A] to-[#1E2320] text-[#EAE4D7] p-6 text-center select-none ${className}`}
      >
        <Compass className="w-8 h-8 text-[#C5A059] mb-2 animate-pulse" />
        <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">Somaliland Expedition</span>
        <span className="text-sm font-semibold mt-1 text-white">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
