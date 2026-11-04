import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Clock,
  MapPin,
  Users,
  Check,
  X,
  Calendar,
  Shield,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  Building,
  Plane,
  Sparkles,
} from 'lucide-react';
import { TOURS_DATA } from '../data/tours';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { SectionHeading } from '../components/common/SectionHeading';
import { TourCard } from '../components/tours/TourCard';
import { InquiryForm } from '../components/tours/InquiryForm';
import { HornExploreBookingWidget } from '../components/tours/HornExploreBookingWidget';
import { calculateDetailedQuote } from '../utils/tourFilters';

export const TourDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [calcTravelers, setCalcTravelers] = useState(2);
  const [calcSingleRooms, setCalcSingleRooms] = useState(0);

  const tour = useMemo(() => {
    return TOURS_DATA.find((t) => t.slug === slug);
  }, [slug]);

  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Tour Package Not Found</h2>
        <p className="text-sm text-slate-600">The tour you are looking for does not exist or may have been updated.</p>
        <Link
          to="/tours"
          className="inline-flex items-center gap-2 bg-[#0F382A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
        >
          <span>Return to All Tours</span>
        </Link>
      </div>
    );
  }

  // Quote estimate calculation with destination logistics & individual pricing tiers
  const quote = calculateDetailedQuote(tour, calcTravelers, calcSingleRooms);

  // Related tours in Somaliland
  const relatedTours = TOURS_DATA.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Image & Header */}
      <div className="relative h-[420px] sm:h-[480px] bg-[#09231A] overflow-hidden">
        <ImageWithFallback
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 text-white">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#C5A059]">
              <span className="bg-[#0F382A]/90 px-2.5 py-1 rounded border border-[#C5A059]/40">
                {tour.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                {tour.destination}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
              {tour.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                {tour.duration}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#C5A059]" />
                {tour.groupSize}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#C5A059]" />
                SPU Escort Included
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details, Itinerary, Gallery, Inclusions */}
          <div className="lg:col-span-8 space-y-10">
            {/* 6. Tour Overview */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-[#161A18] font-display">
                Expedition Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {tour.longOverview}
              </p>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F382A] mb-3">
                  Trip Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
                  {tour.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 7. Day-by-Day Itinerary */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#161A18] font-display">
                    Day-by-Day Itinerary
                  </h2>
                  <p className="text-xs text-slate-500">Click any day to view detailed schedules and overnight stops.</p>
                </div>
              </div>

              <div className="space-y-3">
                {tour.itinerary.map((day) => {
                  const isOpen = activeDay === day.day;
                  const dayButtonId = `itinerary-day-btn-${day.day}`;
                  const dayPanelId = `itinerary-day-panel-${day.day}`;
                  return (
                    <div
                      key={day.day}
                      className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-200"
                    >
                      <button
                        type="button"
                        id={dayButtonId}
                        aria-expanded={isOpen}
                        aria-controls={dayPanelId}
                        onClick={() => setActiveDay(isOpen ? null : day.day)}
                        className={`w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm transition-colors cursor-pointer ${
                          isOpen ? 'bg-[#0F382A] text-white' : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2.5 py-1 rounded font-bold ${isOpen ? 'bg-[#C5A059] text-[#09231A]' : 'bg-slate-200 text-slate-700'}`}>
                            Day {day.day}
                          </span>
                          <span className="font-display text-sm sm:text-base">{day.title}</span>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#C5A059]" aria-hidden="true" /> : <ChevronDown className="w-4 h-4 text-slate-400" aria-hidden="true" />}
                      </button>

                      {isOpen && (
                        <div
                          id={dayPanelId}
                          role="region"
                          aria-labelledby={dayButtonId}
                          className="p-5 space-y-3 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                        >
                          <p>{day.description}</p>
                          {(day.meals || day.overnight) && (
                            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs">
                              {day.meals && (
                                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                                  <strong>Meals:</strong> {day.meals}
                                </span>
                              )}
                              {day.overnight && (
                                <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded">
                                  <strong>Overnight:</strong> {day.overnight}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 8. Image Gallery */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-[#161A18] font-display">
                Expedition Photography
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg overflow-hidden h-44 bg-slate-100">
                  <ImageWithFallback
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {tour.secondaryImages.map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden h-44 bg-slate-100">
                    <ImageWithFallback
                      src={img}
                      alt={`${tour.title} gallery ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 9 & 10. Inclusions & Exclusions */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-[#161A18] font-display">
                What's Included & Excluded
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Included Services</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {tour.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Excluded */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <X className="w-4 h-4 text-red-500" />
                    <span>Excluded Services</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {tour.excluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 11 & 12. Accommodation & Travel Information */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0F382A]">
                    <Building className="w-4 h-4 text-[#C5A059]" />
                    <span>Accommodations & Lodging</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tour.accommodation}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0F382A]">
                    <Plane className="w-4 h-4 text-[#C5A059]" />
                    <span>Travel Advice & Visas</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tour.travelInfo}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: HornExplore Booking Widget & Tour Facts */}
          <div className="lg:col-span-4 space-y-6">
            {/* HornExplore Official Booking & Price Calculator */}
            <HornExploreBookingWidget
              tourTitle={tour.title}
              tourSlug={tour.slug}
              adultRate={tour.adultPrice ?? 350}
              adultOriginalRate={tour.adultOriginalPrice ?? 400}
              childRate={tour.childPrice ?? 180}
            />

            {/* Tour Summary & Quote Estimator */}
            <div className="bg-[#FAF9F5] rounded-xl border border-slate-300/80 p-6 shadow-sm space-y-5">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                  Sample Demonstration Price
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-[#0F382A] font-mono tabular-nums">
                    ${tour.price}
                  </span>
                  <span className="text-xs text-slate-500">USD / person</span>
                </div>
              </div>

              {/* Fast Facts */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold">{tour.duration}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Region:</span>
                  <span className="font-semibold text-right">{tour.region}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Physical Rating:</span>
                  <span className="font-semibold">{tour.physicalRating}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Best Season:</span>
                  <span className="font-semibold">{tour.bestSeason}</span>
                </div>
              </div>

              {/* Interactive Quote Calculator */}
              <div className="pt-3 border-t border-slate-200 space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Live Expedition Quote Calculator
                  </span>
                  <span className="text-[10px] bg-[#0F382A]/10 text-[#0F382A] font-semibold px-2 py-0.5 rounded-full">
                    Somaliland Rates
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="travelers-select" className="text-slate-600 font-medium">Party Size:</label>
                  <select
                    id="travelers-select"
                    value={calcTravelers}
                    onChange={(e) => setCalcTravelers(Number(e.target.value))}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#0F382A]"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Traveler (Solo)' : 'Travelers'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="rooms-select" className="text-slate-600 font-medium">Single Room Supplement:</label>
                  <select
                    id="rooms-select"
                    value={calcSingleRooms}
                    onChange={(e) => setCalcSingleRooms(Number(e.target.value))}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-[#0F382A]"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 0 ? '(Twin/Shared)' : `(+${n * 220} USD)`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Individual Amount Charged */}
                <div className="bg-[#FAF9F5] p-3 rounded-lg border border-amber-200/70 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                    Amount Charged to the Individual
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-extrabold text-[#0F382A] font-mono tabular-nums">
                      ${quote.ratePerIndividual.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">USD / person</span>
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                    {quote.tierName}
                  </div>
                  {quote.savingsPerPerson > 0 && (
                    <div className="text-[11px] text-emerald-700 font-medium pt-0.5">
                      ✓ Saves ${quote.savingsPerPerson} per person sharing 4x4 & SPU security
                    </div>
                  )}
                  {quote.groupDiscount > 0 && (
                    <div className="text-[11px] text-emerald-700 font-medium">
                      ✓ 5% Group Discount applied (-${quote.groupDiscount})
                    </div>
                  )}
                </div>

                {/* Total Expedition Amount */}
                <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Total Expedition ({calcTravelers} {calcTravelers === 1 ? 'Guest' : 'Guests'}):
                  </span>
                  <span className="text-2xl font-extrabold text-[#0F382A] font-mono tabular-nums">
                    ${quote.totalAmount.toLocaleString()}
                  </span>
                </div>

                {/* Somaliland Logistics Inclusion Note */}
                <div className="text-[10px] text-slate-500 leading-tight space-y-0.5 pt-1 border-t border-slate-100">
                  <p><strong>Destination:</strong> {tour.destination}</p>
                  <p><strong>Security:</strong> Special Protection Unit (SPU) escort included</p>
                  <p><strong>Transport:</strong> {quote.transportationType}</p>
                </div>

                {/* Pricing Tiers Reference */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                    Standard Destination Tier Rates
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-600">
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="font-semibold block">Solo (1 Person)</span>
                      <span className="font-mono text-[#0F382A] font-bold">
                        ${tour.pricingTiers?.soloPrice ?? Math.round(tour.price * 1.42)}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="font-semibold block">Duo (2 People)</span>
                      <span className="font-mono text-[#0F382A] font-bold">
                        ${tour.pricingTiers?.doublePrice ?? tour.price}/pers
                      </span>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="font-semibold block">Small Grp (3-5)</span>
                      <span className="font-mono text-[#0F382A] font-bold">
                        ${tour.pricingTiers?.smallGroupPrice ?? Math.round(tour.price * 0.85)}/pers
                      </span>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded border border-slate-100">
                      <span className="font-semibold block">Expedition (6+)</span>
                      <span className="font-mono text-[#0F382A] font-bold">
                        ${tour.pricingTiers?.largeGroupPrice ?? Math.round(tour.price * 0.75)}/pers
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 14. Tour Enquiry Form Card */}
              <div className="pt-2">
                <h3 className="text-sm font-bold text-[#161A18] mb-3 font-display">
                  Book or Inquire for This Tour
                </h3>
                <InquiryForm initialTourSlug={tour.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 13. Related Tours */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-slate-200">
        <SectionHeading
          kicker="More Somaliland Journeys"
          title="Related Tour Packages"
          subtitle="Explore other adventures across the mountains, coastlines, and ancient ruins of Somaliland."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTours.map((relTour) => (
            <TourCard key={relTour.id} tour={relTour} />
          ))}
        </div>
      </div>
    </div>
  );
};
