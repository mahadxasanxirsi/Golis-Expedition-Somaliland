import React from 'react';
import { ShieldCheck, FileText, AlertCircle, Camera, Leaf, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';

export const Policies: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Safety, Compliance & Ethics
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Travel Policies & Safety Guidelines
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Transparent protocols designed to safeguard our travelers, respect local customs, and preserve Somaliland’s fragile prehistoric antiquities.
          </p>
        </div>
      </div>

      {/* Policies Accordion / Blocks */}
      <div className="space-y-6">
        {/* SPU Security Policy */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-[#0F382A]">
            <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-xl font-bold font-display text-[#161A18]">
              1. Special Protection Unit (SPU) Protocol
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            By official regulation of the Somaliland Ministry of Interior, all foreign visitors traveling outside major metropolitan city boundaries (such as journeying between Hargeisa and Berbera, or traveling to Laas Geel and Zeila) must be accompanied by an accredited Special Protection Unit (SPU) police escort.
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
            <li>SPU arrangements, ministerial clearance permits, and guard allowances are fully included in all Golis Expeditions tour quotes.</li>
            <li>Our assigned SPU escorts are courteous, professional, and familiar with tourist routes and checkpoint procedures.</li>
            <li>Travelers are never required to negotiate security arrangements directly; our lead guide handles all protocol.</li>
          </ul>
        </div>

        {/* Laas Geel Heritage Code */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-[#0F382A]">
            <AlertCircle className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-xl font-bold font-display text-[#161A18]">
              2. Archaeological Preservation Code (Laas Geel & Caves)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The prehistoric rock murals at Laas Geel, Dhagah-Kuure, and other shelters have survived for over 5,000 years due to dry granite overhangs. To ensure they remain unharmed for future generations:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
            <li><strong>Strict Zero-Touch Policy:</strong> Touching rock surfaces with hands, fingers, or walking sticks is strictly prohibited. Skin oils accelerate pigment degradation.</li>
            <li><strong>No Splashing or Moisture:</strong> Under no circumstance may water or liquids be applied to the rock faces.</li>
            <li><strong>Stay on Designated Footpaths:</strong> Visitors must walk exclusively along established granite paths guided by the resident site guardian.</li>
          </ul>
        </div>

        {/* Photography & Drones */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-[#0F382A]">
            <Camera className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-xl font-bold font-display text-[#161A18]">
              3. Photography & Drone Regulations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Somaliland is extraordinarily hospitable, and street photography is generally welcomed. However, respect and discretion are fundamental:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
            <li>Always ask before photographing individuals, especially women and elderly community members.</li>
            <li>Photography of government buildings, military installations, telecommunication masts, or police checkpoints is strictly forbidden.</li>
            <li>Drone flights require advance written permission and registration with the Ministry of Civil Aviation and Ministry of Tourism. We assist guests with drone clearance paperwork upon booking.</li>
          </ul>
        </div>

        {/* Booking, Payment & Cancellation */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-[#0F382A]">
            <FileText className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-xl font-bold font-display text-[#161A18]">
              4. Booking, Payment & Cancellation Terms
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our demonstration terms reflect standard expedition travel parameters:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
            <li><strong>Deposit:</strong> A 20% deposit confirms vehicle reservation, hotel blocks, and ministerial permit filings.</li>
            <li><strong>Final Balance:</strong> Payable 30 days prior to arrival in Hargeisa.</li>
            <li><strong>Cancellations:</strong> Cancellations made 45+ days prior to departure receive a full refund less ministerial permit processing fees. Cancellations between 30–15 days receive a 50% refund.</li>
          </ul>
        </div>

        {/* Environmental Pledge */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-[#0F382A]">
            <Leaf className="w-6 h-6 text-[#C5A059]" />
            <h2 className="text-xl font-bold font-display text-[#161A18]">
              5. Leave-No-Trace & Wildlife Respect
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We operate with deep respect for Somaliland’s fragile arid ecosystem:
          </p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 pl-4 list-disc">
            <li>All litter is packed out of valleys and coastal beaches.</li>
            <li>Wildlife such as gazelles, Somali wild asses, and seabirds must never be harassed or approached closely.</li>
            <li>Campfires are restricted to designated stones and extinguished thoroughly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
