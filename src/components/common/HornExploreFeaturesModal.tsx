import React, { useState } from 'react';
import {
  Building,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  MapPin,
  Phone,
  Plane,
  Search,
  Sparkles,
  Tag,
  Users,
  X,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

export type FeatureModalType = 'hotels-flights' | 'plan-trip' | 'travel-deals' | null;

interface HornExploreFeaturesModalProps {
  activeType: FeatureModalType;
  onClose: () => void;
}

export const HornExploreFeaturesModal: React.FC<HornExploreFeaturesModalProps> = ({
  activeType,
  onClose,
}) => {
  if (!activeType) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-10 text-white/80 hover:text-white p-1 rounded-lg bg-black/20 hover:bg-black/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {activeType === 'hotels-flights' && <HotelsFlightsContent onClose={onClose} />}
        {activeType === 'plan-trip' && <PlanTripContent onClose={onClose} />}
        {activeType === 'travel-deals' && <TravelDealsContent onClose={onClose} />}
      </div>
    </div>
  );
};

/* 1. Search Hotels & Flights View */
const HotelsFlightsContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<'hotels' | 'flights'>('hotels');
  const [city, setCity] = useState('Hargeisa');
  const [checkIn, setCheckIn] = useState('2026-10-31');
  const [guests, setGuests] = useState('2');
  const [flightOrigin, setFlightOrigin] = useState('Dubai (DXB)');

  const hotels = [
    {
      name: 'Damal Hotel Hargeisa',
      city: 'Hargeisa',
      stars: 4,
      rate: '$85 / night',
      amenities: 'City view, Free WiFi, Restaurant, Airport Shuttle',
      distance: 'Asha Mall / Goljano vicinity (5 mins)',
    },
    {
      name: 'Ambassador Hotel Hargeisa',
      city: 'Hargeisa',
      stars: 4,
      rate: '$95 / night',
      amenities: 'Gardens, Conference Hall, International Dining',
      distance: 'Airport Road',
    },
    {
      name: 'Mansaar Hotel Berbera',
      city: 'Berbera Coast',
      stars: 3,
      rate: '$75 / night',
      amenities: 'Beachfront, Fresh Seafood, Sea view balconies',
      distance: 'Bathelo Beach',
    },
    {
      name: 'Sanaag Highland Hotel',
      city: 'Erigavo',
      stars: 3,
      rate: '$60 / night',
      amenities: 'Mountain views, Daallo Forest access, Fireplace',
      distance: 'Erigavo Central',
    },
  ];

  const flights = [
    {
      airline: 'Ethiopian Airlines',
      route: 'Addis Ababa (ADD) ➔ Hargeisa (HGA)',
      duration: '1h 30m',
      frequency: 'Daily (2x Flights)',
      price: 'From $240',
    },
    {
      airline: 'flydubai',
      route: 'Dubai (DXB) ➔ Hargeisa (HGA)',
      duration: '3h 35m',
      frequency: '4x Weekly',
      price: 'From $420',
    },
    {
      airline: 'Air Djibouti',
      route: 'Djibouti (JIB) ➔ Hargeisa (HGA)',
      duration: '45m',
      frequency: 'Daily Flights',
      price: 'From $180',
    },
    {
      airline: 'Daallo Airlines',
      route: 'Mogadishu (MGQ) ➔ Hargeisa (HGA)',
      duration: '1h 45m',
      frequency: '3x Weekly',
      price: 'From $210',
    },
  ];

  return (
    <div>
      <div className="bg-[#0F382A] text-white p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-1">
          <Plane className="w-4 h-4" />
          <span>HornExplore Logistics & Travel Services</span>
        </div>
        <h3 id="feature-modal-title" className="text-2xl font-bold font-display">
          Search Hotels & Flights in Somaliland
        </h3>
        <p className="text-xs text-slate-200 mt-1">
          Direct reservation coordination from our Asha Mall headquarters in Goljano, Hargeisa.
        </p>

        {/* Tab switch */}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={() => setTab('hotels')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              tab === 'hotels' ? 'bg-[#C5A059] text-[#09231A]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Hotels & Accommodations
          </button>
          <button
            type="button"
            onClick={() => setTab('flights')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              tab === 'flights' ? 'bg-[#C5A059] text-[#09231A]' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            International Flights to HGA
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
        {tab === 'hotels' ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Destination City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 font-bold text-slate-800"
                >
                  <option value="Hargeisa">Hargeisa (Capital)</option>
                  <option value="Berbera">Berbera (Coast)</option>
                  <option value="Erigavo">Erigavo (Daallo Mountains)</option>
                  <option value="Borama">Borama (Awdal)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Arrival Date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 font-bold text-slate-800"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded p-1.5 font-bold text-slate-800"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests (Standard)</option>
                  <option value="4">4 Guests (Family)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
                Verified Somaliland Partner Accommodations
              </span>
              {hotels.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-[#0F382A] transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0F382A]">{h.name}</span>
                      <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded">
                        ★ {h.stars} Stars
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{h.amenities}</p>
                    <span className="text-[11px] text-[#C5A059] font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {h.distance}
                    </span>
                  </div>
                  <div className="text-right sm:shrink-0">
                    <span className="text-sm font-bold text-[#0F382A] font-mono block">{h.rate}</span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="text-xs font-bold text-[#0F382A] hover:text-[#C5A059] inline-flex items-center gap-1 mt-1"
                    >
                      <span>Book via HornExplore</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
              Direct Flight Connections to Hargeisa Egal Airport (HGA)
            </span>
            {flights.map((f, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-[#0F382A] transition-all bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-bold text-sm text-[#0F382A]">{f.airline}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-1">{f.route}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                    <span>Flight Time: {f.duration}</span>
                    <span>·</span>
                    <span>Schedule: {f.frequency}</span>
                  </div>
                </div>
                <div className="text-right sm:shrink-0">
                  <span className="text-sm font-bold text-[#0F382A] font-mono block">{f.price}</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-xs font-bold text-[#0F382A] hover:text-[#C5A059] inline-flex items-center gap-1 mt-1"
                  >
                    <span>Inquire Flight Support</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>Airport pickup & SPU security escort arranged for all bookings.</span>
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="font-bold text-[#0F382A] hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-[#C5A059]" />
            <span>{COMPANY_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

/* 2. Plan My Trip View */
const PlanTripContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [destination, setDestination] = useState('All Highlights (Hargeisa, Laas Geel, Berbera, Erigavo)');
  const [duration, setDuration] = useState('7 Days');
  const [travelers, setTravelers] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <div>
      <div className="bg-[#0F382A] text-white p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4" />
          <span>✈ Plan My Trip</span>
        </div>
        <h3 id="feature-modal-title" className="text-2xl font-bold font-display">
          Custom Somaliland Travel Planner
        </h3>
        <p className="text-xs text-slate-200 mt-1">
          Tailored itineraries crafted by local travel specialists at Asha mall, Goljano, Hargeisa.
        </p>
      </div>

      <div className="p-6">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#0F382A]">Trip Plan Request Received!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Our travel specialists will prepare your custom itinerary and contact you on WhatsApp / Phone (
              <strong>{phone}</strong>).
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#0F382A] text-white text-xs font-bold py-2.5 px-6 rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Where do you want to explore?
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-300 bg-white"
              >
                <option value="All Highlights">
                  All Highlights (Hargeisa, Laas Geel, Berbera, Erigavo)
                </option>
                <option value="Archaeological Focus">
                  Archaeological & Rock Art (Laas Geel, Dhagah Kure)
                </option>
                <option value="Coastal & Maritime">
                  Coastal & Historic Harbors (Berbera, Zeila, Saadadin Islands)
                </option>
                <option value="Mountain & Highlands">
                  Highlands & Daallo Escarpment (Erigavo, Mount Shimbiris, Sheikh)
                </option>
                <option value="Business & Investment">
                  Logistics & Investment Consultant Tour
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trip Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="3 Days">3 Days (Express Weekend)</option>
                  <option value="5 Days">5 Days (Discovery)</option>
                  <option value="7 Days">7 Days (Full Grand Expedition)</option>
                  <option value="10+ Days">10+ Days (Comprehensive Horn of Africa)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Number of Travelers</label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value={1}>1 Traveler (Solo)</option>
                  <option value={2}>2 Travelers (Duo)</option>
                  <option value={4}>4 Travelers (Small Group)</option>
                  <option value={8}>8+ Travelers (Delegation / Group)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mahad Hassan"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp / Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+252-6-344-433-34"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0F382A] hover:bg-[#164E3A] text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow transition-colors"
            >
              Submit Custom Trip Plan Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/* 3. Travel Deals View */
const TravelDealsContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const deals = [
    {
      title: 'HornExplore 31-Oct-2026 Special Departure',
      rate: '$350',
      originalRate: '$400',
      savings: 'Save $50 per adult',
      childRate: '$180',
      destinations: 'Hargeisa, Laas Geel, Berbera',
      badge: 'User Featured Deal',
      dates: '31-Oct-2026',
    },
    {
      title: 'Daallo & Erigavo Mountain Explorer',
      rate: '$480',
      originalRate: '$550',
      savings: 'Save $70 per person',
      childRate: '$220',
      destinations: 'Erigavo, Daallo Forest, Mount Shimbiris',
      badge: 'Highland Special',
      dates: '15-Nov-2026',
    },
    {
      title: 'Zeila & Gulf of Aden Coastal Expedition',
      rate: '$390',
      originalRate: '$450',
      savings: 'Save $60 per person',
      childRate: '$190',
      destinations: 'Zeila, Borama, Saadadin Archipelago',
      badge: 'Coast & Archipelago',
      dates: '01-Dec-2026',
    },
  ];

  return (
    <div>
      <div className="bg-[#0F382A] text-white p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-1">
          <Tag className="w-4 h-4" />
          <span>Exclusive Seasonal Offers</span>
        </div>
        <h3 id="feature-modal-title" className="text-2xl font-bold font-display">
          HornExplore Travel Deals & Discounts
        </h3>
        <p className="text-xs text-slate-200 mt-1">
          Guaranteed departure discounts with all-inclusive 4x4 transport and SPU security.
        </p>
      </div>

      <div className="p-6 space-y-3.5 max-h-[60vh] overflow-y-auto">
        {deals.map((deal, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0F382A] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-[#C5A059]/20 text-[#0F382A] px-2 py-0.5 rounded border border-[#C5A059]/40">
                  {deal.badge}
                </span>
                <span className="text-xs font-mono font-bold text-slate-600">
                  Date: {deal.dates}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#0F382A] mt-1">{deal.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{deal.destinations}</p>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                ✓ {deal.savings} (Children: {deal.childRate})
              </div>
            </div>

            <div className="text-right sm:shrink-0 flex sm:flex-col items-center sm:items-end justify-between">
              <div>
                <span className="text-xs text-slate-400 line-through mr-1 font-mono">
                  {deal.originalRate}
                </span>
                <span className="text-xl font-black text-[#0F382A] font-mono">{deal.rate}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-1 text-xs bg-[#0F382A] text-white px-3 py-1.5 rounded-lg font-bold hover:bg-[#164E3A]"
              >
                Book This Deal
              </button>
            </div>
          </div>
        ))}

        <div className="pt-2 text-center text-xs text-slate-500">
          More inquiries? Call <strong>{COMPANY_INFO.phone}</strong> or email{' '}
          <strong>{COMPANY_INFO.email}</strong>.
        </div>
      </div>
    </div>
  );
};
