import React from 'react';
import { UserCheck, Globe2, Award, Mail } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { TEAM_DATA } from '../data/team';

export const Team: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Certified Expedition Leaders
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Meet Our Somaliland Team
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Our team brings together professional field archaeologists, veteran desert expedition drivers, logistics directors, and local cultural storytellers based in Hargeisa.
          </p>
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM_DATA.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            {/* Visual Header / Avatar Banner */}
            <div className="bg-gradient-to-br from-[#0F382A] to-[#1E2320] p-6 text-white text-center relative">
              <div className="w-20 h-20 rounded-full bg-[#164E3A] border-2 border-[#C5A059] flex items-center justify-center text-white text-xl font-bold font-display mx-auto shadow-md">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h3 className="text-lg font-bold font-display text-white mt-3">{member.name}</h3>
              <span className="text-xs text-[#C5A059] font-medium block">{member.role}</span>
            </div>

            {/* Body */}
            <div className="p-5 flex-grow space-y-4 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                {member.bio}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Award className="w-3.5 h-3.5 text-[#0F382A] shrink-0" />
                  <span className="font-semibold">{member.experience}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Globe2 className="w-3.5 h-3.5 text-[#0F382A] shrink-0" />
                  <span>{member.languages.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
