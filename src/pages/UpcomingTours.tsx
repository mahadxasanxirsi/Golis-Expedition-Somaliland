import React, { useState, useMemo } from 'react';
import { Calendar, Filter, RotateCcw, MapPin, X } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { UpcomingTourCard } from '../components/tours/UpcomingTourCard';
import { InquiryForm } from '../components/tours/InquiryForm';
import { UPCOMING_TOURS_DATA } from '../data/upcomingTours';
import { UpcomingTour } from '../types';
import { filterUpcomingTours } from '../utils/tourFilters';

export const UpcomingTours: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedDeparture, setSelectedDeparture] = useState<UpcomingTour | null>(null);

  const months = [
    { value: 'all', label: 'All Upcoming Months' },
    { value: '2026-11', label: 'November 2026' },
    { value: '2026-12', label: 'December 2026' },
    { value: '2027-01', label: 'January 2027' },
    { value: '2027-02', label: 'February 2027' },
    { value: '2027-03', label: 'March 2027' },
  ];

  const destinations = ['all', 'Hargeisa', 'Laas Geel', 'Berbera', 'Sheikh', 'Zeila', 'Erigavo'];

  const filteredDepartures = useMemo(() => {
    return filterUpcomingTours(UPCOMING_TOURS_DATA, {
      month: selectedMonth,
      destination: selectedDestination,
    });
  }, [selectedMonth, selectedDestination]);

  const handleReset = () => {
    setSelectedMonth('all');
    setSelectedDestination('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Guaranteed Small-Group Departures
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Upcoming Somaliland Tour Departures
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Join fellow cultural explorers and photography enthusiasts on scheduled departures with guaranteed small groups (max 8–12 participants). Note: All dates and seat counts are demonstration data.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4" role="search" aria-label="Filter upcoming departures">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Month Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="upcoming-month-filter" className="text-xs text-slate-500 font-medium">
              Month:
            </label>
            <select
              id="upcoming-month-filter"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              aria-label="Filter departures by month"
              className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#0F382A]"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Destination Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="upcoming-destination-filter" className="text-xs text-slate-500 font-medium">
              Destination:
            </label>
            <select
              id="upcoming-destination-filter"
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              aria-label="Filter departures by destination"
              className="text-xs sm:text-sm px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#0F382A]"
            >
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d === 'all' ? 'All Destinations' : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(selectedMonth !== 'all' || selectedDestination !== 'all') && (
          <button
            type="button"
            onClick={handleReset}
            aria-label="Clear upcoming tour filters"
            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Departures Grid */}
      {filteredDepartures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDepartures.map((departure) => (
            <UpcomingTourCard
              key={departure.id}
              departure={departure}
              onBookClick={(dep) => setSelectedDeparture(dep)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
          <p className="text-base font-semibold text-slate-700">No departures found for this month and destination.</p>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset filters and view all departures"
            className="text-xs font-bold text-white bg-[#0F382A] px-4 py-2 rounded-lg cursor-pointer"
          >
            View All Departures
          </button>
        </div>
      )}

      {/* Quick Reserve Modal */}
      {selectedDeparture && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reserve-modal-title"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedDeparture(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              aria-label="Close reservation modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div>
              <span className="text-xs uppercase font-bold text-[#C5A059] block">
                Reserve Departure
              </span>
              <h3 id="reserve-modal-title" className="text-lg font-bold text-[#161A18] font-display">
                {selectedDeparture.title}
              </h3>
              <p className="text-xs text-slate-500">
                Departure: <strong>{selectedDeparture.departureDate}</strong> ({selectedDeparture.duration}) · Sample Rate: ${selectedDeparture.price}/person
              </p>
            </div>

            <InquiryForm
              initialTourSlug={selectedDeparture.tourSlug}
              onSuccess={() => setTimeout(() => setSelectedDeparture(null), 3000)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
