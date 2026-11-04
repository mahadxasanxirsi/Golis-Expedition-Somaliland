import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Tour } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface TourCardProps {
  tour: Tour;
  viewMode?: 'grid' | 'list';
}

export const TourCard: React.FC<TourCardProps> = ({ tour, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row group">
        <div className="md:w-72 lg:w-80 relative shrink-0 h-56 md:h-auto overflow-hidden bg-slate-100">
          <ImageWithFallback
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-[#2d5a45]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {tour.category}
          </div>
          {/* Duration badge at bottom-right of image as white pill */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-slate-100">
            <Clock className="w-3.5 h-3.5 text-[#2d5a45]" aria-hidden="true" />
            <span>{tour.duration}</span>
          </div>
        </div>

        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#2d5a45]" aria-hidden="true" />
                {tour.destination}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#2d5a45]" aria-hidden="true" />
                {tour.groupSize || 'Private & Small Group'}
              </span>
            </div>

            <Link
              to={`/tours/${tour.slug}`}
              aria-label={`View itinerary and details for ${tour.title}`}
              className="block text-xl font-bold text-slate-900 hover:text-[#2d5a45] transition-colors font-display"
            >
              {tour.title}
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {tour.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Price per person</div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-[#2d5a45] font-mono tabular-nums">
                  ${tour.adultPrice || tour.price}
                </span>
                <span className="text-xs text-slate-500 font-normal">USD / pers</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/tours/${tour.slug}`}
                aria-label={`View details for ${tour.title}`}
                className="border border-[#2d5a45] text-[#2d5a45] hover:bg-[#2d5a45]/5 rounded-full px-4 py-2 text-xs font-bold transition-all"
              >
                View Details
              </Link>
              <Link
                to={`/tours/${tour.slug}#booking`}
                aria-label={`Enquire about ${tour.title}`}
                className="bg-[#2d5a45] hover:bg-[#234736] text-white rounded-full px-5 py-2 text-xs font-bold shadow-xs transition-all"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Card Image */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <ImageWithFallback
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#2d5a45]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {tour.category}
        </div>
        {/* Macrobia exact duration badge: bottom-right white pill */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-slate-100">
          <Clock className="w-3.5 h-3.5 text-[#2d5a45]" aria-hidden="true" />
          <span>{tour.duration}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col justify-between flex-grow space-y-3.5">
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-[#2d5a45] shrink-0" aria-hidden="true" />
            <span className="truncate">{tour.destination}</span>
          </div>

          <Link
            to={`/tours/${tour.slug}`}
            aria-label={`View itinerary and details for ${tour.title}`}
            className="block text-lg font-bold text-slate-900 hover:text-[#2d5a45] transition-colors leading-snug font-display line-clamp-1"
          >
            {tour.title}
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {tour.description}
          </p>
        </div>

        {/* Duration / Group / Price info */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1 text-[11px]">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{tour.groupSize || 'Private / Small Group'}</span>
          </span>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block -mb-0.5">From</span>
            <span className="font-bold text-[#2d5a45] text-base font-mono">${tour.adultPrice || tour.price}</span>
            <span className="text-[10px] text-slate-500"> / pers</span>
          </div>
        </div>

        {/* Card Footer: Outlined green pill "View Details" + Solid green pill "Enquire" */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2.5">
          <Link
            to={`/tours/${tour.slug}`}
            aria-label={`View details and pricing for ${tour.title}`}
            className="flex-1 text-center border border-[#2d5a45] text-[#2d5a45] hover:bg-[#2d5a45]/5 rounded-full py-2 text-xs font-bold transition-all cursor-pointer"
          >
            View Details
          </Link>
          <Link
            to={`/tours/${tour.slug}#booking`}
            aria-label={`Enquire about booking ${tour.title}`}
            className="flex-1 text-center bg-[#2d5a45] hover:bg-[#234736] text-white rounded-full py-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  );
};
