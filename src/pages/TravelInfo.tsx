import React, { useState } from 'react';
import {
  Plane,
  DollarSign,
  Shield,
  Shirt,
  Sun,
  Smartphone,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';

export const TravelInfo: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const sections = [
    {
      icon: Plane,
      title: 'Flights & Arrival at Egal Airport (HGA)',
      content: 'International travelers fly directly into Egal International Airport (HGA) located in Hargeisa. Regular scheduled flights operate via Ethiopian Airlines (connecting through Addis Ababa), Flydubai (connecting through Dubai), and Air Arabia (connecting through Sharjah). Somaliland visas can be obtained upon arrival with pre-arranged visa letters issued by our agency, or directly from Somaliland representative offices in London, Washington, Addis Ababa, and Dubai.',
    },
    {
      icon: DollarSign,
      title: 'Currency, Cash & Mobile Money',
      content: 'Somaliland uses the Somaliland Shilling (SLSH), alongside the US Dollar (USD), which is universally accepted across all hotels, restaurants, and shops. ATMs accepting foreign Visa cards are available at major banks in Hargeisa (e.g., Premier Bank, Dahabshiil Bank). Somaliland is also one of the world’s most cashless societies, with nearly all vendors using mobile payments (Zaad and e-Dahab). Bringing clean, unblemished US Dollar banknotes (printed after 2013) is strongly recommended.',
    },
    {
      icon: Shield,
      title: 'Safety, Stability & Peace',
      content: 'Somaliland has maintained its own democratic government, police force, and currency since declaring independence in 1991. It is a completely distinct administrative and security environment from southern Somalia, enjoying peace and political stability for over three decades. Violent crime against visitors is virtually unheard of. Accompaniment by a licensed SPU officer outside major cities is standard protocol and provides seamless travel through regional checkpoints.',
    },
    {
      icon: Shirt,
      title: 'Dress Code & Cultural Respect',
      content: 'Somaliland is a traditional Muslim society with deep Islamic values. Modesty in dress is appreciated and expected. For women, loose-fitting, long trousers or maxi skirts with long-sleeved tops, along with a headscarf, are customary in public areas. Men typically wear long trousers and collared or casual shirts (shorts are generally avoided in public markets). Alcohol is strictly prohibited in Somaliland.',
    },
    {
      icon: Sun,
      title: 'Climate & Best Time to Visit',
      content: 'Somaliland enjoys sunshine year-round. The winter months from October to March are the most pleasant, with warm daytime temperatures (around 24–28°C / 75–82°F) and crisp highland evenings in Hargeisa and Sheikh. Coastal Berbera can be quite hot in the summer months (May–September), making the winter season ideal for beach and marine explorations.',
    },
  ];

  const packingItems = [
    'Sturdy walking shoes or light hiking boots for Laas Geel granite paths',
    'Lightweight, breathable cotton or linen long-sleeve clothing',
    'Comfortable lightweight headscarf / pashmina (for female travelers)',
    'Warm fleece or jacket for cool evenings in the Sheikh highlands',
    'Sun protection: wide-brim hat, high-SPF sunscreen, and sunglasses',
    'Pristine USD cash banknotes (post-2013 bills without tears or marks)',
    'UK-style 3-pin plug adapter (Type G) used throughout Somaliland hotels',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Essential Traveler Handbook
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Somaliland Travel Information
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Practical advice, flight routing, visa formalities, currency tips, and cultural etiquette to prepare for an unforgettable expedition to Somaliland.
          </p>
        </div>
      </div>

      {/* Info Topics */}
      <div className="space-y-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0F382A]/10 text-[#0F382A] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-display text-[#161A18]">
                  {sec.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-0 sm:pl-13">
                {sec.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recommended Packing Checklist */}
      <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold text-[#0F382A] tracking-wider">
            Preparation Guide
          </span>
          <h3 className="text-xl font-bold font-display text-[#161A18]">
            Recommended Packing Checklist for Somaliland
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
          {packingItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
