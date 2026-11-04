import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight, UserCheck } from 'lucide-react';
import { UpcomingTour } from '../../types';

interface UpcomingTourCardProps {
  departure: UpcomingTour;
  onBookClick?: (dep: UpcomingTour) => void;
}

export const UpcomingTourCard: React.FC<UpcomingTourCardProps> = ({ departure, onBookClick }) => {
  const percentage = Math.round(((departure.totalSpaces - departure.availableSpaces) / departure.totalSpaces) * 100);

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5 text-[#0F382A] font-semibold bg-[#0F382A]/5 px-2.5 py-1 rounded">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Departs: {departure.departureDate}</span>
          </span>
          <span className="text-slate-400 text-[11px]">Demo Departure</span>
        </div>

        {/* Title */}
        <div>
          <Link
            to={`/tours/${departure.tourSlug}`}
            className="text-base sm:text-lg font-bold text-[#161A18] hover:text-[#0F382A] transition-colors leading-snug block font-display"
          >
            {departure.title}
          </Link>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <MapPin className="w-3 h-3 text-[#0F382A]" />
            <span>{departure.destination}</span>
          </div>
        </div>

        {/* Departure Meta */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Duration</span>
            <span className="font-semibold">{departure.duration}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Lead Guide</span>
            <span className="font-semibold truncate block">{departure.guide}</span>
          </div>
        </div>

        {/* Availability Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#0F382A]" aria-hidden="true" />
              <span>Available Spaces:</span>
            </span>
            <span className="font-bold text-[#0F382A]">
              {departure.availableSpaces} left <span className="text-slate-400 font-normal">/ {departure.totalSpaces}</span>
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={departure.totalSpaces - departure.availableSpaces}
            aria-valuemin={0}
            aria-valuemax={departure.totalSpaces}
            aria-label={`Capacity: ${departure.availableSpaces} of ${departure.totalSpaces} spaces remaining for ${departure.title}`}
            className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                departure.availableSpaces <= 2 ? 'bg-amber-600' : 'bg-[#0F382A]'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">Individual Rate</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-[#0F382A] font-mono tabular-nums">${departure.price}</span>
            <span className="text-[11px] text-slate-500 font-normal">USD / pers</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onBookClick ? (
            <button
              type="button"
              onClick={() => onBookClick(departure)}
              aria-label={`Reserve demo seat for ${departure.title} departing ${departure.departureDate}`}
              className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#09231A] text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Reserve Seat</span>
            </button>
          ) : (
            <Link
              to={`/tours/${departure.tourSlug}`}
              aria-label={`View tour details for ${departure.title}`}
              className="bg-[#0F382A] hover:bg-[#164E3A] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 text-[#C5A059]" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
