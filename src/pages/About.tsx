import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Award, Users, HeartHandshake, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { SOMALILAND_IMAGES } from '../data/images';
import { COMPANY_INFO } from '../data/company';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Headquarters: Asha Mall, Goljano, Hargeisa
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            About {COMPANY_INFO.name} Somaliland
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            {COMPANY_INFO.aboutText}
          </p>
          <div className="pt-2 text-xs font-semibold text-[#C5A059]">
            ✦ {COMPANY_INFO.logisticsConsultantBadge}
          </div>
        </div>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <SectionHeading
            kicker="Our Company"
            title="Where Every Journey Begins With a Dream"
            subtitle="Somaliland is one of the safest and most culturally intact regions in East Africa, yet remained largely unseen by global travelers."
            className="mb-0"
          />
          <p className="text-sm text-slate-600 leading-relaxed">
            Headquartered at Asha Mall in Goljano, Hargeisa, <strong>{COMPANY_INFO.name}</strong> operates as Somaliland’s premier travel and logistics agency. Our travel specialists have in-depth knowledge of destinations across all regions—from the ancient rock art of Laas Geel and the Daallo highlands of Erigavo to the historic coastlines of Berbera and Zeila.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Beyond leisure tourism, we provide comprehensive ground logistics, investment consultancy, hotel reservations, and official ministerial authorizations with certified Special Protection Unit (SPU) details.
          </p>
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden shadow-md h-64 bg-slate-100">
            <ImageWithFallback
              src={SOMALILAND_IMAGES.laasGeel}
              alt="Laas Geel"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-xl overflow-hidden shadow-md h-64 bg-slate-100 pt-6">
            <ImageWithFallback
              src={SOMALILAND_IMAGES.sheikhMountains}
              alt="Sheikh Mountains"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mission & Core Pillars */}
      <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200 p-8 sm:p-12 space-y-8">
        <SectionHeading
          kicker="Values"
          title="Our Foundational Principles"
          subtitle="How we operate every expedition with precision, responsibility, and cultural pride."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#0F382A]" />
            <h3 className="text-base font-bold text-[#161A18] font-display">Uncompromising Safety & Permits</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every itinerary is coordinated with the Somaliland Ministry of Tourism and Antiquities, utilizing licensed Special Protection Unit (SPU) personnel and GPS tracking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#0F382A]" />
            <h3 className="text-base font-bold text-[#161A18] font-display">Local Economic Dignity</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              100% of our operations support Somalilanders: from driver salaries to rural guesthouses and local site guardians.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
            <Compass className="w-6 h-6 text-[#0F382A]" />
            <h3 className="text-base font-bold text-[#161A18] font-display">Archaeological Integrity</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We strictly enforce zero-touch policies at rock art caves to prevent humidity and oil degradation of millennia-old pigments.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation to Team and Why Us */}
      <div className="bg-[#09231A] text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-950">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold font-display text-white">
            Meet the Historians & Leaders Behind Your Journey
          </h3>
          <p className="text-xs sm:text-sm text-[#EAE4D7]/80">
            Get to know our certified guides, logistics chiefs, and cultural researchers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/team"
            className="bg-[#C5A059] hover:bg-[#b08e4d] text-[#09231A] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Meet Our Team
          </Link>
          <Link
            to="/why-us"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg border border-white/20 transition-colors"
          >
            Why Travel With Us
          </Link>
        </div>
      </div>
    </div>
  );
};
