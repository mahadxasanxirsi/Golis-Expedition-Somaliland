import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Building,
  GraduationCap,
  Ship,
  Mountain,
  Shield,
  Layers,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { DESTINATIONS_DATA } from '../data/destinations';
import { SOMALILAND_REGIONS, SomalilandRegion } from '../data/regions';
import { COMPANY_INFO } from '../data/company';

export const Destinations: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [activeRegionInfo, setActiveRegionInfo] = useState<SomalilandRegion | null>(null);

  const regionFilterList = [
    { id: 'all', label: 'All 6 Regions' },
    { id: 'Maroodi-Jeeh Region', label: 'Maroodi-Jeeh' },
    { id: 'Awdal Region', label: 'Awdal' },
    { id: 'Sahil Region', label: 'Sahil' },
    { id: 'Togdheer Region', label: 'Togdheer' },
    { id: 'Sanaag Region', label: 'Sanaag' },
    { id: 'Sool Region', label: 'Sool' },
  ];

  const filteredDestinations =
    selectedRegion === 'all'
      ? DESTINATIONS_DATA
      : DESTINATIONS_DATA.filter((d) => d.region === selectedRegion);

  const regionIcon = (id: string) => {
    switch (id) {
      case 'maroodi-jeeh':
        return <Building className="w-5 h-5 text-[#C5A059]" />;
      case 'awdal':
        return <GraduationCap className="w-5 h-5 text-[#C5A059]" />;
      case 'sahil':
        return <Ship className="w-5 h-5 text-[#C5A059]" />;
      case 'togdheer':
        return <Compass className="w-5 h-5 text-[#C5A059]" />;
      case 'sanaag':
        return <Mountain className="w-5 h-5 text-[#C5A059]" />;
      case 'sool':
        return <Shield className="w-5 h-5 text-[#C5A059]" />;
      default:
        return <MapPin className="w-5 h-5 text-[#C5A059]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* 1. Page Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            <Compass className="w-4 h-4" />
            <span>Under the Constitution of Somaliland</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
            The 6 Official Regions of Somaliland
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Under the Constitution of Somaliland, the country is officially divided into six primary administrative regions. These divisions serve as the primary geographical units through which the national government provides regional administration and services.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#EAE4D7]">
            <span className="bg-[#C5A059]/20 px-3 py-1 rounded-full border border-[#C5A059]/40 font-semibold">
              ✦ All 6 Regions Safe & Guided
            </span>
            <span>Headquarters: {COMPANY_INFO.address}</span>
            <span>·</span>
            <span>Phone: {COMPANY_INFO.phone}</span>
          </div>
        </div>
      </div>

      {/* 2. The 6 Official Regions Interactive Overview Table & Cards */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F382A]">
              Constitutional Regional Divisions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161A18] font-display">
              The 6 Official Regions
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Explore regional characteristics, capitals, and landmarks
          </span>
        </div>

        {/* 6 Regions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOMALILAND_REGIONS.map((reg) => (
            <div
              key={reg.id}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-[#0F382A] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0F382A] text-white flex items-center justify-center">
                      {regionIcon(reg.id)}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#161A18] font-display">
                        {reg.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {reg.somaliName}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded">
                    {reg.landArea}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">
                    Regional Capital
                  </span>
                  <span className="text-xs font-bold text-[#0F382A]">{reg.regionalCapital}</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-0.5">
                    Key Characteristics
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {reg.keyCharacteristics}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Major Landmarks:
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-500">
                    {reg.keyAttractions.slice(0, 2).map((attr, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#C5A059] font-bold">›</span>
                        <span className="line-clamp-1">{attr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const match = regionFilterList.find((r) => r.label === reg.name);
                    if (match) setSelectedRegion(match.id);
                  }}
                  className="text-xs font-bold text-[#0F382A] hover:text-[#C5A059] flex items-center gap-1 transition-colors"
                >
                  <span>Filter {reg.name} Tours</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRegionInfo(reg)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Regional Destination Showcase */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F382A]">
              Curated Sites & Landmarks
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161A18] font-display">
              Destinations Across All 6 Regions ({filteredDestinations.length})
            </h2>
          </div>

          {/* Region Filter Buttons */}
          <div
            role="group"
            aria-label="Filter destinations by region"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl max-w-fit"
          >
            {regionFilterList.map((rf) => (
              <button
                key={rf.id}
                type="button"
                aria-pressed={selectedRegion === rf.id}
                onClick={() => setSelectedRegion(rf.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedRegion === rf.id
                    ? 'bg-[#0F382A] text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 bg-white sm:bg-transparent'
                }`}
              >
                {rf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* Modal for Region Deep Dive */}
      {activeRegionInfo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F382A] text-white flex items-center justify-center">
                  {regionIcon(activeRegionInfo.id)}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-[#0F382A]">
                    {activeRegionInfo.name} Region
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Somali: {activeRegionInfo.somaliName}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveRegionInfo(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
                aria-label="Close region details"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div>
                <strong className="block text-slate-900 font-sans">Regional Capital:</strong>
                <span>{activeRegionInfo.regionalCapital}</span>
              </div>
              <div>
                <strong className="block text-slate-900 font-sans">Key Characteristics:</strong>
                <p className="text-slate-600 leading-relaxed">
                  {activeRegionInfo.keyCharacteristics}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Land Area:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {activeRegionInfo.landArea}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Population Est:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {activeRegionInfo.populationEstimate}
                  </span>
                </div>
              </div>

              <div>
                <strong className="block text-slate-900 font-sans mb-1">
                  Key Attractions & Heritage:
                </strong>
                <ul className="space-y-1 text-xs text-slate-600">
                  {activeRegionInfo.keyAttractions.map((attr, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#C5A059] font-bold">✓</span>
                      <span>{attr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveRegionInfo(null)}
              className="w-full bg-[#0F382A] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              Close Region Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
