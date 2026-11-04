import React, { useState } from 'react';
import {
  Briefcase,
  ShieldCheck,
  Building2,
  Users2,
  CalendarCheck,
  Send,
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
  User,
  Car,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { SOMALILAND_IMAGES } from '../data/images';
import { COMPANY_INFO } from '../data/company';

export const CorporateTravel: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [delegationSize, setDelegationSize] = useState('5-10');
  const [serviceType, setServiceType] = useState('Logistics & Investment Consultant');
  const [requirements, setRequirements] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactPerson.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/20 px-3 py-1 rounded-full border border-[#C5A059]/40 inline-block">
            {COMPANY_INFO.logisticsConsultantBadge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Logistics & Investment Consultant in Somaliland
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Headquartered at Asha Mall, Goljano, Hargeisa. Reliable field transportation, protocol arrangements, ministerial clearances, and investment mission consulting for corporate delegations, international NGOs, research teams, and conference attendees.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#0F382A]/10 text-[#0F382A] flex items-center justify-center font-bold">
            <Car className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#161A18] font-display">Executive Transportation</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Premium Toyota Land Cruisers with certified English-speaking drivers, GPS tracking, and government SPU security escort details.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#0F382A]/10 text-[#0F382A] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#161A18] font-display">Protocol & Permits</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Fast-track visa processing, Ministry of Foreign Affairs protocol assistance, and travel clearances across all 6 Somaliland regions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#0F382A]/10 text-[#0F382A] flex items-center justify-center font-bold">
            <Users2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#161A18] font-display">Conference & Retreats</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Full event coordination for executive retreats, boardroom venues in Hargeisa, and seaside strategy gatherings in Berbera.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#0F382A]/10 text-[#0F382A] flex items-center justify-center font-bold">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#161A18] font-display">Field Mission Support</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Comprehensive logistics for environmental surveys, academic research teams, and development organizations working in rural districts.
          </p>
        </div>
      </div>

      {/* Two Column: Profile and Enquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6 space-y-6">
          <SectionHeading
            kicker="Bespoke Solutions"
            title="Trusted Field Logistics Across Somaliland"
            subtitle="We handle the complex groundwork so your organization can focus entirely on achieving its mission."
            className="mb-0"
          />

          <div className="rounded-xl overflow-hidden shadow-md h-72 bg-slate-100">
            <ImageWithFallback
              src={SOMALILAND_IMAGES.hargeisaCity}
              alt="Hargeisa corporate hub"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              Operating in Somaliland requires established institutional trust, accredited security protocols, and reliable infrastructure. Golis Expeditions has supported trade missions, academic researchers from Europe and North America, and international NGO delegations visiting Hargeisa, Berbera, and regional outposts.
            </p>
            <p>
              From VIP airport tarmac greetings at Egal International Airport (HGA) to secured satellite communications during desert traversals, we provide dependable, discreet corporate travel services.
            </p>
          </div>
        </div>

        {/* Corporate Enquiry Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-bold text-[#161A18] font-display mb-1">
            Request a Corporate Travel Proposal
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Submit your delegation requirements for a customized corporate proposal and itinerary quote.
          </p>

          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-[#0F382A]/5 border border-[#0F382A]/20 rounded-xl p-8 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-[#0F382A] text-[#C5A059] rounded-full flex items-center justify-center mx-auto shadow">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <h4 className="text-lg font-bold text-[#0F382A] font-display">
                Corporate Inquiry Received
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Thank you, <strong>{contactPerson}</strong> at <strong>{companyName}</strong>. Our enterprise team will prepare a demonstration proposal.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                aria-label="Submit another corporate travel request"
                className="text-xs font-bold text-[#0F382A] hover:underline cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div role="alert" className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="corporate-company-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    id="corporate-company-name"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Horizon Energy Ltd."
                    aria-required="true"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                </div>

                <div>
                  <label htmlFor="corporate-contact-person" className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Person *
                  </label>
                  <input
                    id="corporate-contact-person"
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    aria-required="true"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="corporate-work-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Email *
                  </label>
                  <input
                    id="corporate-work-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    aria-required="true"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                </div>

                <div>
                  <label htmlFor="corporate-phone-number" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    id="corporate-phone-number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 7946 0991"
                    aria-required="true"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="corporate-delegation-size" className="block text-xs font-semibold text-slate-700 mb-1">
                    Delegation Size
                  </label>
                  <select
                    id="corporate-delegation-size"
                    value={delegationSize}
                    onChange={(e) => setDelegationSize(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="1-4">1 - 4 Delegates</option>
                    <option value="5-10">5 - 10 Delegates</option>
                    <option value="11-25">11 - 25 Delegates</option>
                    <option value="25+">25+ Delegates</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="corporate-service-type" className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Service Needed
                  </label>
                  <select
                    id="corporate-service-type"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Executive Delegation">Executive Delegation Logistics</option>
                    <option value="Field Research Support">Field Research & NGO Logistics</option>
                    <option value="Corporate Retreat">Corporate Retreat & Conference</option>
                    <option value="Security & Protocol">Government Protocol & SPU Security</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="corporate-requirements" className="block text-xs font-semibold text-slate-700 mb-1">
                  Mission Scope & Special Requirements
                </label>
                <textarea
                  id="corporate-requirements"
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Dates, destinations in Somaliland, meeting rooms needed..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 resize-none focus:outline-none focus:border-[#0F382A]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-label="Submit corporate travel proposal demo"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] text-white font-bold text-xs sm:text-sm py-3 rounded-lg shadow transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" aria-hidden="true" />
                    <span>Transmitting Proposal Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                    <span>Submit Corporate Inquiry (Demo)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
