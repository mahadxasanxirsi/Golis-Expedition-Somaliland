import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { GalleryItem } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ImageLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-white pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-[#C5A059] font-bold uppercase tracking-wider">{currentItem.category}</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
            {currentItem.location}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Close image lightbox"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-grow flex items-center justify-center py-4">
        <button
          type="button"
          onClick={onPrev}
          aria-label="View previous photo"
          className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:scale-105 transition-all focus:outline-none cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-[#C5A059]" aria-hidden="true" />
        </button>

        <div className="max-w-5xl max-h-[75vh] w-full h-full flex items-center justify-center">
          <ImageWithFallback
            src={currentItem.image}
            alt={currentItem.title}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          aria-label="View next photo"
          className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:scale-105 transition-all focus:outline-none cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-[#C5A059]" aria-hidden="true" />
        </button>
      </div>

      {/* Bottom Caption */}
      <div className="pt-3 border-t border-white/10 text-center max-w-2xl mx-auto">
        <h4 id="lightbox-title" className="text-base font-bold text-white font-display">{currentItem.title}</h4>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">{currentItem.caption}</p>
      </div>
    </div>
  );
};
