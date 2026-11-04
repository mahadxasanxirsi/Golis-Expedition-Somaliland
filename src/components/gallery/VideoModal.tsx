import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, MapPin, Sparkles } from 'lucide-react';
import { VideoItem } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface VideoModalProps {
  video: VideoItem;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-heading"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-[#09231A] border border-emerald-900 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-emerald-950 text-white bg-[#061811]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Somaliland Expedition Footage</span>
            <span className="text-slate-400 text-xs" aria-hidden="true">·</span>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C5A059]" aria-hidden="true" />
              {video.location}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close video player modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          <ImageWithFallback
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isPlaying ? 'scale-105 filter brightness-90' : 'filter brightness-75'
            }`}
          />

          {/* Ambient Lighting & Scan lines */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Simulated Floating Player Indicator */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-white text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" aria-hidden="true" />
            <span>4K UHD 60FPS Demonstration Stream</span>
          </div>

          {/* Center Play/Pause Overlay */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause expedition video' : 'Play expedition video'}
            className="absolute p-5 rounded-full bg-[#0F382A]/80 hover:bg-[#0F382A] text-white border-2 border-[#C5A059] shadow-2xl hover:scale-110 transition-transform cursor-pointer"
          >
            {isPlaying ? <Pause className="w-8 h-8 text-[#C5A059]" aria-hidden="true" /> : <Play className="w-8 h-8 text-[#C5A059] ml-1" aria-hidden="true" />}
          </button>

          {/* Interactive Player Scrub Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-2">
            <label htmlFor="video-scrubber-input" className="sr-only">
              Video scrubber timeline
            </label>
            <input
              id="video-scrubber-input"
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              role="slider"
              aria-label="Video scrubber timeline"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
            />
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" aria-hidden="true" /> : <Volume2 className="w-4 h-4" aria-hidden="true" />}
                </button>
                <span className="font-mono text-[11px] text-slate-300">01:42 / {video.duration}</span>
              </div>
              <span className="text-[11px] text-[#C5A059] font-medium">Somaliland Protected Heritage Archive</span>
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div className="p-5 bg-[#09231A] text-slate-200 space-y-2">
          <h3 id="video-modal-heading" className="text-lg font-bold text-white font-display">{video.title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{video.description}</p>
        </div>
      </div>
    </div>
  );
};
