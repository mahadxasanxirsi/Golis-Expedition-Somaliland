import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Destination } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <ImageWithFallback
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold block">
            {destination.region}
          </span>
          <h3 className="text-xl font-bold text-white font-display leading-tight">
            <Link
              to={`/destinations/${destination.slug}`}
              aria-label={`View ${destination.title} guide and attractions`}
              className="hover:underline"
            >
              {destination.title}
            </Link>
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
          {destination.shortDescription}
        </p>

        {/* Attractions snippet */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium truncate max-w-[170px]">
            {destination.attractions[0]}
          </span>
          <Link
            to={`/destinations/${destination.slug}`}
            aria-label={`Explore ${destination.title} destination in ${destination.region}`}
            className="inline-flex items-center gap-1 font-semibold text-[#0F382A] group-hover:text-[#C5A059] transition-colors shrink-0"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};
