import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { TourCard } from '../components/tours/TourCard';
import { TourFilter } from '../components/tours/TourFilter';
import { TOURS_DATA } from '../data/tours';
import { filterTours, TourFilterOptions } from '../utils/tourFilters';

interface ToursProps {
  defaultCountry?: string;
}

export const Tours: React.FC<ToursProps> = ({ defaultCountry }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL query parameters or props
  const queryCountry = searchParams.get('country') || defaultCountry || 'all';
  const queryRegion = searchParams.get('region') || 'all';
  const querySearch = searchParams.get('q') || '';

  const [selectedCountry, setSelectedCountry] = useState<string>(queryCountry);
  const [selectedRegion, setSelectedRegion] = useState<string>(queryRegion);
  const [searchQuery, setSearchQuery] = useState(querySearch);
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sortBy, setSortBy] = useState<TourFilterOptions['sortBy']>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync if prop or search params change
  useEffect(() => {
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    } else {
      const c = searchParams.get('country');
      if (c) setSelectedCountry(c);
      const r = searchParams.get('region');
      if (r) setSelectedRegion(r);
    }
  }, [defaultCountry, searchParams]);

  const categories = useMemo(() => {
    const cats = new Set(TOURS_DATA.map((t) => t.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const destinations = [
    'all',
    'Hargeisa',
    'Laas Geel',
    'Berbera',
    'Sheikh',
    'Zeila',
    'Erigavo',
    'Laas Caanood',
    'Djibouti City',
    'Mogadishu',
    'Harar',
  ];

  const filteredTours = useMemo(() => {
    return filterTours(TOURS_DATA, {
      country: selectedCountry,
      region: selectedRegion,
      searchQuery,
      destination: selectedDestination,
      category: selectedCategory,
      duration: selectedDuration,
      maxPrice,
      sortBy,
    });
  }, [selectedCountry, selectedRegion, searchQuery, selectedDestination, selectedCategory, selectedDuration, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedRegion('all');
    setSelectedDestination('all');
    setSelectedCategory('all');
    setSelectedDuration('all');
    setMaxPrice(3500);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCountry !== 'all' ||
    selectedRegion !== 'all' ||
    selectedDestination !== 'all' ||
    selectedCategory !== 'all' ||
    selectedDuration !== 'all' ||
    maxPrice < 3500 ||
    sortBy !== 'featured';

  const selectCountryTab = (countryId: string) => {
    setSelectedCountry(countryId);
    if (countryId !== 'Somaliland' && countryId !== 'all') {
      setSelectedRegion('all');
    }
    const params = new URLSearchParams(searchParams);
    if (countryId === 'all') {
      params.delete('country');
    } else {
      params.set('country', countryId);
    }
    setSearchParams(params);
  };

  const selectRegionBadge = (regionName: string) => {
    setSelectedRegion(regionName);
    const params = new URLSearchParams(searchParams);
    if (regionName === 'all') {
      params.delete('region');
    } else {
      params.set('region', regionName);
    }
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Macrobia Dark Green Tour Filter Header & Secondary Controls Bar */}
      <TourFilter
        selectedCountry={selectedCountry}
        onSelectCountry={selectCountryTab}
        selectedRegion={selectedRegion}
        onSelectRegion={selectRegionBadge}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDestination={selectedDestination}
        onDestinationChange={setSelectedDestination}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onReset={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        categories={categories}
        destinations={destinations}
      />

      {/* Results Count & Feedback */}
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium px-1"
      >
        <span>
          Showing <strong>{filteredTours.length}</strong> {filteredTours.length === 1 ? 'tour package' : 'tour packages'}
        </span>
        {hasActiveFilters && (
          <span className="text-[#2d5a45] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2d5a45]" />
            <span>
              Active Filters:{' '}
              {selectedCountry !== 'all' ? selectedCountry : ''}
              {selectedRegion !== 'all' ? ` • ${selectedRegion}` : ''}
            </span>
          </span>
        )}
      </div>

      {/* Tour Cards Grid / List */}
      {filteredTours.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <p className="text-base text-slate-800 font-semibold font-serif">
            No tours match your current filter criteria.
          </p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try choosing a different country pill, adjusting your price range, or clearing search keywords.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 bg-[#2d5a45] text-white text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer hover:bg-[#234736] transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
