import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Eye,
  Mountain,
  Shield,
  Tag,
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinations';
import { TOURS_DATA } from '../data/tours';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { SectionHeading } from '../components/common/SectionHeading';
import { TourCard } from '../components/tours/TourCard';

export const DestinationDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const destination = useMemo(() => {
    return DESTINATIONS_DATA.find((d) => d.slug === slug);
  }, [slug]);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Destination Not Found</h2>
        <p className="text-sm text-slate-600">The Somaliland destination requested is not listed.</p>
        <Link
          to="/destinations"
          className="inline-flex items-center gap-2 bg-[#0F382A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
        >
          <span>View All Somaliland Destinations</span>
        </Link>
      </div>
    );
  }

  // Related tours that visit this destination
  const relatedTours = TOURS_DATA.filter(
    (tour) =>
      tour.destination.toLowerCase().includes(destination.title.toLowerCase()) ||
      tour.title.toLowerCase().includes(destination.title.toLowerCase())
  );

  const primaryTour = relatedTours[0] || TOURS_DATA[0];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[460px] bg-[#09231A] overflow-hidden">
        <ImageWithFallback
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 text-white">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
              <span className="bg-[#0F382A]/90 px-2.5 py-1 rounded border border-[#C5A059]/40">
                {destination.region}
              </span>
              <span>·</span>
              <span className="text-slate-300">Somaliland</span>
              {destination.somaliName && (
                <>
                  <span>·</span>
                  <span className="text-slate-300 italic">{destination.somaliName}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
              {destination.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed max-w-2xl">
              {destination.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-[#161A18] font-display">
                About {destination.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {destination.fullOverview}
              </p>
            </section>

            {/* Top Attractions */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#161A18] font-display">
                Key Attractions & Heritage Sites
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.attractions.map((attraction, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                    <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">{attraction}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Things to Do */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#161A18] font-display">
                Recommended Activities & Experiences
              </h2>
              <ul className="space-y-3">
                {destination.thingsToDo.map((act, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-[#0F382A] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Photo Gallery */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#161A18] font-display">
                Destination Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {destination.gallery.map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden h-44 bg-slate-100">
                    <ImageWithFallback
                      src={img}
                      alt={`${destination.title} scenery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Fast Facts & Travel Window */}
          <div className="lg:col-span-4 space-y-6">
            {/* Destination Individual Pricing Card */}
            <div className="bg-[#FAF9F5] rounded-xl border border-amber-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Expedition Pricing
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  All-Inclusive
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block">Amount charged per individual:</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-[#0F382A] font-mono tabular-nums">
                    ${(primaryTour.pricingTiers?.doublePrice || primaryTour.price).toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-600">USD / person (Duo Rate)</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/80 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Individual Rates by Party Size
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Solo (1 Person)</span>
                    <span className="font-mono font-bold text-[#0F382A]">
                      ${(primaryTour.pricingTiers?.soloPrice || Math.round(primaryTour.price * 1.42)).toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block">Private 4x4 & SPU</span>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Small Grp (3-5)</span>
                    <span className="font-mono font-bold text-[#0F382A]">
                      ${(primaryTour.pricingTiers?.smallGroupPrice || Math.round(primaryTour.price * 0.85)).toLocaleString()}/pers
                    </span>
                    <span className="text-[9px] text-emerald-600 block">Save 15%+</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/80 text-[11px] text-slate-600">
                <div className="flex items-start gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Includes dedicated SPU armed police escort outside Hargeisa</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>Private 4WD Land Cruiser, driver, fuel & all regional entry permits</span>
                </div>
              </div>

              <Link
                to={`/tours/${primaryTour.slug}`}
                aria-label={`View ${destination.title} itinerary and book`}
                className="w-full flex items-center justify-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] text-white font-bold text-xs py-2.5 rounded-lg shadow transition-colors"
              >
                <span>View {destination.title} Itinerary & Book</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
              </Link>
            </div>

            <div className="bg-[#FAF9F5] rounded-xl border border-slate-300/80 p-6 shadow-sm space-y-5 sticky top-24">
              <h3 className="text-base font-bold text-[#161A18] font-display">
                Destination Quick Facts
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="py-2 border-b border-slate-200">
                  <span className="text-slate-400 font-medium block">Region & Coordinates</span>
                  <span className="font-semibold">{destination.region}</span>
                  {destination.coordinates && (
                    <span className="text-[11px] text-slate-500 block font-mono">{destination.coordinates}</span>
                  )}
                </div>

                {destination.fastFacts.elevation && (
                  <div className="py-2 border-b border-slate-200">
                    <span className="text-slate-400 font-medium block">Elevation</span>
                    <span className="font-semibold">{destination.fastFacts.elevation}</span>
                  </div>
                )}

                {destination.fastFacts.climate && (
                  <div className="py-2 border-b border-slate-200">
                    <span className="text-slate-400 font-medium block">Climate</span>
                    <span className="font-semibold">{destination.fastFacts.climate}</span>
                  </div>
                )}

                <div className="py-2 border-b border-slate-200">
                  <span className="text-slate-400 font-medium block">Best Time to Visit</span>
                  <span className="font-semibold">{destination.bestTimeToVisit}</span>
                </div>
              </div>

              {/* CTA Explore Tours */}
              <div className="pt-2">
                <Link
                  to="/tours"
                  aria-label="Explore all Somaliland tour packages"
                  className="w-full flex items-center justify-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] text-white font-bold text-xs sm:text-sm py-3 rounded-lg shadow transition-colors"
                >
                  <span>Explore Tour Packages</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 border-t border-slate-200">
          <SectionHeading
            kicker="Experience It in Person"
            title={`Tours Visiting ${destination.title}`}
            subtitle="Book an all-inclusive expedition featuring this iconic Somaliland destination."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
