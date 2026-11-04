import React from 'react';
import { Search, Grid, List, RotateCcw } from 'lucide-react';
import { TourFilterOptions } from '../../utils/tourFilters';
import { SOMALILAND_REGIONS } from '../../data/regions';

interface TourFilterProps {
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDestination: string;
  onDestinationChange: (dest: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedDuration: string;
  onDurationChange: (dur: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  sortBy: TourFilterOptions['sortBy'];
  onSortChange: (sort: TourFilterOptions['sortBy']) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  categories: string[];
  destinations: string[];
}

export const TourFilter: React.FC<TourFilterProps> = ({
  selectedCountry,
  onSelectCountry,
  selectedRegion,
  onSelectRegion,
  searchQuery,
  onSearchChange,
  selectedDestination,
  onDestinationChange,
  selectedCategory,
  onCategoryChange,
  selectedDuration,
  onDurationChange,
  maxPrice,
  onMaxPriceChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onReset,
  hasActiveFilters,
  categories,
  destinations,
}) => {
  const pillOptions = [
    { id: 'all', label: 'All Tours' },
    { id: 'Somaliland', label: 'Somaliland Tours' },
    { id: 'Combined', label: 'Combined Tours' },
    { id: 'Djibouti', label: 'Djibouti Tours' },
    { id: 'Somalia', label: 'Somalia Tours' },
    { id: 'Ethiopia', label: 'Ethiopia Tours' },
  ];

  return (
    <div className="space-y-6">
      {/* Dark Forest Green Header #2d5a45 with Outlined Pill Buttons */}
      <div className="bg-[#2d5a45] text-white rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight leading-tight max-w-3xl mx-auto">
          All Private & Group tours available throughout the Year
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light">
          Filter by country or constitutional region to view curated archeological expeditions, coastal escapes, and mountain treks.
        </p>

        {/* 6 pill-outlined category buttons on dark green */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2">
          {pillOptions.map((opt) => {
            const isActive = selectedCountry.toLowerCase() === opt.id.toLowerCase();
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectCountry(opt.id)}
                aria-pressed={isActive}
                className={`rounded-full px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#2d5a45] shadow-lg font-bold scale-102'
                    : 'bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-white'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Somaliland Constitutional 6 Regions Pills (when Somaliland or All is selected) */}
      {(selectedCountry === 'all' || selectedCountry === 'Somaliland') && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2d5a45]">
              Somaliland 6 Official Regions:
            </span>
            {selectedRegion !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectRegion('all')}
                className="text-xs text-[#2d5a45] hover:underline font-semibold cursor-pointer"
              >
                Clear Region Filter
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSelectRegion('all')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                selectedRegion === 'all'
                  ? 'bg-[#2d5a45] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Regions
            </button>
            {SOMALILAND_REGIONS.map((reg) => {
              const active = selectedRegion.toLowerCase() === reg.name.toLowerCase();
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => onSelectRegion(reg.name)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                    active
                      ? 'bg-[#2d5a45] text-white font-bold shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{reg.name}</span>
                  <span className={`text-[10px] ml-1 ${active ? 'text-white/80' : 'text-slate-400'}`}>
                    ({reg.regionalCapital.split(' ')[0]})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Secondary Controls in a Clean White Bar */}
      <div
        className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-5"
        role="search"
        aria-label="Filter tour packages"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-grow max-w-lg">
            <label htmlFor="tours-search-input" className="sr-only">
              Search tours by keyword or destination
            </label>
            <input
              id="tours-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tours, sites, keywords (e.g. Laas Geel, whale sharks)..."
              aria-label="Search tours, sites, keywords"
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-full border border-slate-300 focus:outline-none focus:border-[#2d5a45] focus:ring-1 focus:ring-[#2d5a45]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" aria-hidden="true" />
          </div>

          {/* View Toggles & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="tours-sort-select" className="text-xs text-slate-500 font-medium whitespace-nowrap">
                Sort By:
              </label>
              <select
                id="tours-sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as TourFilterOptions['sortBy'])}
                aria-label="Sort tours by"
                className="text-xs sm:text-sm px-3.5 py-2 rounded-full border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2d5a45]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration-asc">Duration: Shortest</option>
                <option value="duration-desc">Duration: Longest</option>
              </select>
            </div>

            {/* Layout Toggle */}
            <div
              className="flex items-center border border-slate-300 rounded-full overflow-hidden p-0.5"
              role="group"
              aria-label="Layout view mode"
            >
              <button
                type="button"
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#2d5a45] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
                aria-label="Grid view layout"
                aria-pressed={viewMode === 'grid'}
              >
                <Grid className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-[#2d5a45] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
                aria-label="List view layout"
                aria-pressed={viewMode === 'list'}
              >
                <List className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Reset Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onReset}
                aria-label="Reset tour search filters"
                className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Detailed Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label htmlFor="filter-destination" className="block text-xs font-semibold text-slate-700 mb-1">
              Destination
            </label>
            <select
              id="filter-destination"
              value={selectedDestination}
              onChange={(e) => onDestinationChange(e.target.value)}
              aria-label="Filter tours by destination"
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2d5a45]"
            >
              {destinations.map((d) => (
                <option key={d} value={d}>
                  {d === 'all' ? 'All Specific Destinations' : d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-category" className="block text-xs font-semibold text-slate-700 mb-1">
              Tour Category
            </label>
            <select
              id="filter-category"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter tours by category"
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2d5a45]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter-duration" className="block text-xs font-semibold text-slate-700 mb-1">
              Duration
            </label>
            <select
              id="filter-duration"
              value={selectedDuration}
              onChange={(e) => onDurationChange(e.target.value)}
              aria-label="Filter tours by duration"
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-none focus:border-[#2d5a45]"
            >
              <option value="all">Any Duration</option>
              <option value="short">Short Trips (1 - 3 Days)</option>
              <option value="medium">Medium Trips (4 - 5 Days)</option>
              <option value="long">Grand Expeditions (6+ Days)</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="filter-price-slider" className="text-xs font-semibold text-slate-700">
                Max Sample Price
              </label>
              <span className="text-xs font-mono font-bold text-[#2d5a45]">${maxPrice}</span>
            </div>
            <input
              id="filter-price-slider"
              type="range"
              min={600}
              max={3500}
              step={50}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              role="slider"
              aria-label="Maximum sample price"
              aria-valuemin={600}
              aria-valuemax={3500}
              aria-valuenow={maxPrice}
              aria-valuetext={`$${maxPrice} USD`}
              className="w-full accent-[#2d5a45] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
