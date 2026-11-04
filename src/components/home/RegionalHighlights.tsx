import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Building,
  GraduationCap,
  Ship,
  Mountain,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { SOMALILAND_REGIONS, SomalilandRegion } from '../../data/regions';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { SectionHeading } from '../common/SectionHeading';

export const RegionalHighlights: React.FC = () => {
  const getRegionIcon = (id: string) => {
    switch (id) {
      case 'maroodi-jeeh':
        return <Building className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />;
      case 'awdal':
        return <GraduationCap className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />;
      case 'sahil':
        return <Ship className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />;
      case 'togdheer':
        return <Compass className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />;
      case 'sanaag':
        return <Mountain className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />;
      case 'sool':
        return <Shield className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />;
      default:
        return <MapPin className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />;
    }
  };

  return (
    <section
      aria-label="Regional Highlights of Somaliland"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <SectionHeading
          kicker="Constitutional Administrative Divisions"
          title="Regional Highlights of Somaliland"
          subtitle="Discover the six official regions of Somaliland—from the prehistoric rock art of Maroodi-Jeeh and the deep-sea ports of Sahil to the cloud-crowned peaks of Sanaag."
          className="mb-0"
        />
        <Link
          to="/destinations"
          aria-label="View all Somaliland regions and destinations"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F382A] hover:text-[#C5A059] transition-colors shrink-0"
        >
          <span>Explore All 6 Regions</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Dynamic 6-Region Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOMALILAND_REGIONS.map((region) => (
          <article
            key={region.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group hover:-translate-y-1"
          >
            {/* Card Image with Badges */}
            <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
              <ImageWithFallback
                src={region.image}
                alt={`${region.name} Region, Somaliland`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Highlights Tag */}
              <div className="absolute top-3 left-3 bg-[#0F382A]/90 backdrop-blur-sm text-[#C5A059] text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#C5A059]/40 flex items-center gap-1.5">
                {getRegionIcon(region.id)}
                <span>{region.highlightsTag}</span>
              </div>

              {/* Area Badge */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-slate-200 text-[10px] font-mono px-2 py-0.5 rounded">
                {region.landArea}
              </div>

              {/* Bottom Card Title Overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059]">
                  Regional Capital: {region.regionalCapital}
                </div>
                <h3 className="text-xl font-bold font-display leading-tight text-white flex items-center justify-between">
                  <span>{region.name}</span>
                  <span className="text-xs font-mono text-slate-300 font-normal">
                    {region.somaliName}
                  </span>
                </h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {region.keyCharacteristics}
              </p>

              {/* Key Attractions Preview */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Top Attractions:
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {region.keyAttractions.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 truncate">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-mono">
                  Pop: {region.populationEstimate}
                </div>

                <Link
                  to={`/destinations?region=${encodeURIComponent(region.name + ' Region')}`}
                  aria-label={`Explore ${region.name} destinations and itineraries`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F382A] group-hover:text-[#C5A059] transition-colors"
                >
                  <span>Explore Region</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
