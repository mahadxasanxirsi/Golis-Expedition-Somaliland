import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  Car,
  BookOpen,
  Sparkles,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      icon: Users,
      title: 'Experienced Local Guides & Historians',
      description: 'Our team comprises certified guides born and raised in Somaliland. They hold profound ancestral and cultural fluency, speaking English, Somali, and Arabic, giving you unmatched access to local communities, elders, and hidden archaeological sites.',
      points: [
        'Certified by the Somaliland Ministry of Tourism',
        'Direct clan liaison ensuring safe, respectful hospitality',
        'First-aid and wilderness survival trained',
      ],
    },
    {
      icon: Calendar,
      title: 'Carefully Planned Itineraries',
      description: 'We do not rush. Every journey is designed around ideal light conditions for photography at Laas Geel, comfortable travel windows during cooler hours, and adequate time to converse with locals over spiced tea.',
      points: [
        'Optimized for natural morning and evening light',
        'Sensible driving intervals with scenic rest halts',
        'Balanced cultural immersion and leisure time',
      ],
    },
    {
      icon: Car,
      title: 'Comfortable 4x4 Expedition Vehicles',
      description: 'Traversing the varied terrain of Somaliland—from paved highways to remote desert wadis and coastal sand tracks—demands rugged reliability. Our fleet consists exclusively of well-maintained Toyota Land Cruisers.',
      points: [
        'Air-conditioned 4WD vehicles equipped for sand tracks',
        'Satellite phones (Garmin inReach) and GPS navigation',
        'On-board cool boxes with unlimited mineral water',
      ],
    },
    {
      icon: BookOpen,
      title: 'Authentic Cultural Immersion',
      description: 'Rather than looking through a tour bus window, our guests share traditional goat roast feasts, visit bustling livestock auctions, attend poetry readings, and learn ancient nomadic navigation lore under star-lit skies.',
      points: [
        'Engage directly with pastoralist camel herders',
        'Learn classical Somali oral poetry and proverbs',
        'Visit artisan frankincense cooperatives in Hargeisa',
      ],
    },
    {
      icon: Sparkles,
      title: 'Personalized Travel Arrangements',
      description: 'Whether you are a solo traveler, an academic research delegation, a documentary film crew, or a group of friends, we customize schedules, dietary provisions, and accommodations to match your exact interests.',
      points: [
        'Flexible departure dates for private bookings',
        'Assistance with drone, film, and research ministry permits',
        'Dedicated point of contact in Hargeisa from inquiry to farewell',
      ],
    },
    {
      icon: Leaf,
      title: 'Responsible & Ethical Tourism',
      description: 'We take heritage stewardship seriously. A portion of every tour fee supports site guardian stipends at Laas Geel, and we leave every camping site and desert valley cleaner than we found it.',
      points: [
        'Strict zero-touch policies at all rock art caves',
        'Fair living wages for drivers, cooks, and guards',
        'Support for rural school supplies and water wells',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            The Gold Standard of Somaliland Travel
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Why Travel With Golis Expeditions?
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Discover why international travelers, researchers, and photographers choose us as their trusted expedition partners in Somaliland.
          </p>
        </div>
      </div>

      {/* 6 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F382A] text-[#C5A059] flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#161A18] font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                {pillar.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F382A] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#161A18] font-display">
          Ready to Begin Your Somaliland Journey?
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Explore our range of small group and private tour packages or speak directly with our expedition team in Hargeisa.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <span>Explore Tour Packages</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0F382A] text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg border border-slate-300 transition-colors"
          >
            <span>Contact Our Team</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
