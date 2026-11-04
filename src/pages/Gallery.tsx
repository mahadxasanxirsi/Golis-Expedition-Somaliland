import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Image, Video, Play, MapPin, ZoomIn, Eye } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { ImageLightbox } from '../components/gallery/ImageLightbox';
import { VideoModal } from '../components/gallery/VideoModal';
import { GALLERY_PHOTOS, GALLERY_VIDEOS } from '../data/gallery';
import { GalleryItem, VideoItem } from '../types';

export const Gallery: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') === 'videos' ? 'videos' : 'photos';

  // Photo gallery filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Video gallery modal
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const categories = ['all', 'Archaeology', 'Coast & Sea', 'Mountains', 'Culture & City'];

  const filteredPhotos = selectedCategory === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const setTab = (tab: 'photos' | 'videos') => {
    setSearchParams({ tab });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Visual Archive of Somaliland
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Photo & Video Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Immerse yourself in high-resolution photography and cinematic field video documenting the neolithic cave paintings, Red Sea coasts, and highland canyons of Somaliland.
          </p>
        </div>
      </div>

      {/* Main Tab Controls (Photos vs Videos) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div role="tablist" aria-label="Gallery media format" className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            id="photos-tab"
            role="tab"
            aria-selected={currentTab === 'photos'}
            aria-controls="photos-tab-panel"
            onClick={() => setTab('photos')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              currentTab === 'photos'
                ? 'bg-[#0F382A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Image className="w-4 h-4" aria-hidden="true" />
            <span>Photo Gallery ({GALLERY_PHOTOS.length})</span>
          </button>
          <button
            type="button"
            id="videos-tab"
            role="tab"
            aria-selected={currentTab === 'videos'}
            aria-controls="videos-tab-panel"
            onClick={() => setTab('videos')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              currentTab === 'videos'
                ? 'bg-[#0F382A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4" aria-hidden="true" />
            <span>Video Gallery ({GALLERY_VIDEOS.length})</span>
          </button>
        </div>

        {/* Category Filters for Photos */}
        {currentTab === 'photos' && (
          <div role="group" aria-label="Filter photos by category" className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F382A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Images' : cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Photos Grid */}
      {currentTab === 'photos' && (
        <div id="photos-tab-panel" role="tabpanel" aria-labelledby="photos-tab">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View photo: ${item.title}, ${item.location}`}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-slate-200 bg-slate-100 text-left w-full focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-[#C5A059] font-bold">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-sm font-bold font-display leading-snug mt-1">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                    <ZoomIn className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
                    <span>Click to expand</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxIndex !== null && (
            <ImageLightbox
              items={filteredPhotos}
              currentIndex={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onPrev={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev === 0 ? filteredPhotos.length - 1 : prev - 1) : 0
                )
              }
              onNext={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev === filteredPhotos.length - 1 ? 0 : prev + 1) : 0
                )
              }
            />
          )}
        </div>
      )}

      {/* Tab 2: Videos Grid */}
      {currentTab === 'videos' && (
        <div id="videos-tab-panel" role="tabpanel" aria-labelledby="videos-tab">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GALLERY_VIDEOS.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
              >
                {/* Video Thumbnail with Play Button */}
                <button
                  type="button"
                  onClick={() => setSelectedVideo(video)}
                  aria-label={`Play video: ${video.title} (${video.duration})`}
                  className="relative aspect-video overflow-hidden cursor-pointer bg-slate-900 w-full text-left focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                >
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  {/* Play Button Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#0F382A]/90 group-hover:bg-[#0F382A] border-2 border-[#C5A059] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-[#C5A059] ml-1 fill-[#C5A059]" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[11px] font-mono text-white">
                    {video.duration}
                  </div>
                </button>

                <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-[#0F382A] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
                      {video.location}
                    </span>
                    <h3 className="text-lg font-bold text-[#161A18] font-display">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedVideo(video)}
                    aria-label={`Watch video reel: ${video.title}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F382A] hover:text-[#C5A059] pt-2 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
                    <span>Watch Video Reel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Video Player Modal */}
          {selectedVideo && (
            <VideoModal
              video={selectedVideo}
              onClose={() => setSelectedVideo(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};
