import React, { useState, useMemo } from 'react';
import { Send, CheckCircle2, Loader2, Calendar, Users, Phone, Mail, User, Shield, Compass, Sparkles } from 'lucide-react';
import { TOURS_DATA } from '../../data/tours';
import { calculateDetailedQuote } from '../../utils/tourFilters';

interface InquiryFormProps {
  initialTourSlug?: string;
  onSuccess?: () => void;
  className?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialTourSlug,
  onSuccess,
  className = '',
}) => {
  const [selectedTour, setSelectedTour] = useState(
    initialTourSlug || TOURS_DATA[0]?.slug || ''
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const currentTour = useMemo(() => {
    return TOURS_DATA.find((t) => t.slug === selectedTour) || TOURS_DATA[0];
  }, [selectedTour]);

  const quote = useMemo(() => {
    if (!currentTour) return null;
    return calculateDetailedQuote(currentTour, travelers, 0);
  }, [currentTour, travelers]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp is required';
    }
    if (!travelDate) {
      newErrors.travelDate = 'Preferred travel date is required';
    }
    if (!selectedTour) {
      newErrors.selectedTour = 'Please select a tour package';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate frontend submission latency (no external API calls)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 1200);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setTravelDate('');
    setTravelers(2);
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`bg-[#0F382A]/5 border border-[#0F382A]/20 rounded-xl p-8 text-center space-y-4 ${className}`}
      >
        <div className="w-12 h-12 bg-[#0F382A] text-[#C5A059] rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-[#0F382A] font-display">
          Expedition Inquiry Received!
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          Thank you, <strong>{fullName}</strong>. This is a demonstration booking confirmation. In a real-world scenario, our expedition coordinator in Hargeisa would contact you within 24 hours with your customized itinerary.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            aria-label="Submit another demonstration inquiry"
            className="text-xs font-semibold text-[#0F382A] hover:underline cursor-pointer"
          >
            Submit Another Demo Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} noValidate>
      {/* Selected Tour */}
      <div>
        <label htmlFor="inquiry-tour-select" className="block text-xs font-semibold text-slate-700 mb-1">
          Tour Package *
        </label>
        <select
          id="inquiry-tour-select"
          value={selectedTour}
          onChange={(e) => setSelectedTour(e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.selectedTour}
          aria-describedby={errors.selectedTour ? 'inquiry-tour-error' : undefined}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A] bg-white text-slate-800"
        >
          {TOURS_DATA.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.title} ({t.duration} - ${t.price}/person)
            </option>
          ))}
        </select>
        {errors.selectedTour && (
          <span id="inquiry-tour-error" role="alert" className="text-[11px] text-red-500 font-medium">
            {errors.selectedTour}
          </span>
        )}
      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="inquiry-full-name" className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <input
              id="inquiry-full-name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              placeholder="e.g. John Doe"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'inquiry-name-error' : undefined}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A]"
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" aria-hidden="true" />
          </div>
          {errors.fullName && (
            <span id="inquiry-name-error" role="alert" className="text-[11px] text-red-500 font-medium">
              {errors.fullName}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <input
              id="inquiry-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="e.g. travel@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A]"
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" aria-hidden="true" />
          </div>
          {errors.email && (
            <span id="inquiry-email-error" role="alert" className="text-[11px] text-red-500 font-medium">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Phone & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-slate-700 mb-1">
            Phone / WhatsApp *
          </label>
          <div className="relative">
            <input
              id="inquiry-phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              placeholder="+1 555-0199"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A]"
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" aria-hidden="true" />
          </div>
          {errors.phone && (
            <span id="inquiry-phone-error" role="alert" className="text-[11px] text-red-500 font-medium">
              {errors.phone}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="inquiry-travel-date" className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Date *
          </label>
          <div className="relative">
            <input
              id="inquiry-travel-date"
              type="date"
              value={travelDate}
              onChange={(e) => {
                setTravelDate(e.target.value);
                if (errors.travelDate) setErrors({ ...errors, travelDate: '' });
              }}
              aria-required="true"
              aria-invalid={!!errors.travelDate}
              aria-describedby={errors.travelDate ? 'inquiry-date-error' : undefined}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A]"
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" aria-hidden="true" />
          </div>
          {errors.travelDate && (
            <span id="inquiry-date-error" role="alert" className="text-[11px] text-red-500 font-medium">
              {errors.travelDate}
            </span>
          )}
        </div>
      </div>

      {/* Number of Travelers */}
      <div>
        <label htmlFor="inquiry-travelers-slider" className="block text-xs font-semibold text-slate-700 mb-1">
          Number of Travellers
        </label>
        <div className="flex items-center gap-3">
          <input
            id="inquiry-travelers-slider"
            type="range"
            min={1}
            max={12}
            value={travelers}
            role="slider"
            aria-valuemin={1}
            aria-valuemax={12}
            aria-valuenow={travelers}
            aria-valuetext={`${travelers} ${travelers === 1 ? 'person' : 'people'}`}
            aria-label="Number of travellers"
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="w-full accent-[#0F382A]"
          />
          <span
            aria-live="polite"
            className="text-xs font-bold text-[#0F382A] bg-slate-100 px-3 py-1 rounded border border-slate-200 shrink-0 font-mono"
          >
            {travelers} {travelers === 1 ? 'person' : 'people'}
          </span>
        </div>
      </div>

      {/* Live Destination & Individual Pricing Card */}
      {quote && currentTour && (
        <div
          role="region"
          aria-label="Live expedition pricing estimate"
          className="bg-[#FAF9F5] border border-amber-200/80 rounded-xl p-3.5 space-y-2 text-xs"
        >
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Amount Charged Per Individual
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-extrabold text-[#0F382A] font-mono tabular-nums">
                  ${quote.ratePerIndividual.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-600">USD / person</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Total Expedition ({travelers} {travelers === 1 ? 'Guest' : 'Guests'})
              </span>
              <span className="text-lg font-bold text-[#C5A059] font-mono tabular-nums">
                ${quote.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-1 pt-1 text-[11px] text-slate-600">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Destination:</span>
              <span className="text-slate-800 text-right truncate max-w-[190px]">{currentTour.destination}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Pricing Tier:</span>
              <span className="font-medium text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                {quote.tierName}
              </span>
            </div>
            {quote.savingsPerPerson > 0 && (
              <div className="text-emerald-700 font-medium">
                ✓ Shared 4x4 transport & security saves ${quote.savingsPerPerson} per person
              </div>
            )}
            {quote.groupDiscount > 0 && (
              <div className="text-emerald-700 font-medium">
                ✓ 5% Group Booking Discount applied (-${quote.groupDiscount})
              </div>
            )}
            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-500 border-t border-slate-200/60">
              <Shield className="w-3.5 h-3.5 text-[#C5A059] shrink-0" aria-hidden="true" />
              <span>Includes SPU security escort, 4WD Land Cruiser, ministry permits & accommodation</span>
            </div>
          </div>
        </div>
      )}

      {/* Message / Special Requests */}
      <div>
        <label htmlFor="inquiry-special-requests" className="block text-xs font-semibold text-slate-700 mb-1">
          Special Requests / Questions
        </label>
        <textarea
          id="inquiry-special-requests"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Dietary requirements, single room preferences, arrival details..."
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A] resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-label="Submit expedition tour inquiry demo"
        className="w-full inline-flex items-center justify-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] text-white font-bold text-xs sm:text-sm py-3 rounded-lg shadow-md transition-all duration-200 disabled:opacity-70 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" aria-hidden="true" />
            <span>Processing Demo Booking...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
            <span>Submit Tour Enquiry (Demo)</span>
          </>
        )}
      </button>

      <div className="text-[11px] text-slate-500 text-center">
        * No payment required. This is a frontend demonstration form.
      </div>
    </form>
  );
};
