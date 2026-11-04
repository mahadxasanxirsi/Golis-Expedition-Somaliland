import React, { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
}

// Map of canonical image names to static public fallbacks
const STATIC_FALLBACK_MAP: Record<string, string> = {
  laasgeel: '/images/somaliland_hero_laasgeel_1793370051817.jpg',
  berbera: '/images/somaliland_berbera_coast_1793370051345.jpg',
  sheikh: '/images/somaliland_sheikh_mountains_1793370052369.jpg',
  hargeisa: '/images/somaliland_hargeisa_landmark_1793370052900.jpg',
  zeila: '/images/somaliland_zeila_heritage_1793370053648.jpg',
  erigavo: '/images/somaliland_erigavo_daallo_1793378054459.jpg',
  daallo: '/images/somaliland_erigavo_daallo_1793378054459.jpg',
};

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Somaliland destination',
  fallbackTitle,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setAttemptCount(0);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (attemptCount === 0 && currentSrc) {
      // Find matching static fallback if available
      const lower = currentSrc.toLowerCase();
      let matchedKey: string | null = null;
      for (const key of Object.keys(STATIC_FALLBACK_MAP)) {
        if (lower.includes(key)) {
          matchedKey = key;
          break;
        }
      }

      if (matchedKey && STATIC_FALLBACK_MAP[matchedKey] !== currentSrc) {
        setAttemptCount(1);
        setCurrentSrc(STATIC_FALLBACK_MAP[matchedKey]);
        return;
      }
    }

    // If already attempted or no alternative, show fallback placeholder
    setHasError(true);
  };

  if (hasError || !currentSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0F382A] to-[#1E2320] text-[#EAE4D7] p-6 text-center select-none ${className}`}
      >
        <Compass className="w-8 h-8 text-[#C5A059] mb-2" />
        <span className="text-xs uppercase tracking-wider text-[#C5A059] font-medium">Golis Expeditions</span>
        <span className="text-sm font-semibold mt-1 text-white">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading="lazy"
      onError={handleError}
      className={className}
      {...props}
    />
  );
};
