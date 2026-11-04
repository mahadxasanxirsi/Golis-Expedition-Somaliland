import React, { useState } from 'react';
import {
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  Info,
  MapPin,
  Minus,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  X,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import {
  calculateHornExplorePricing,
  formatQty,
  generateBookingReference,
} from '../../utils/pricing';

interface HornExploreBookingWidgetProps {
  tourTitle?: string;
  tourSlug?: string;
  adultRate?: number;
  adultOriginalRate?: number;
  childRate?: number;
  onBookSuccess?: (reference: string) => void;
  className?: string;
}

export const HornExploreBookingWidget: React.FC<HornExploreBookingWidgetProps> = ({
  tourTitle = 'Somaliland Grand Discovery Tour',
  tourSlug = 'somaliland-discovery-tour',
  adultRate = 350,
  adultOriginalRate = 400,
  childRate = 180,
  onBookSuccess,
  className = '',
}) => {
  // Booking State matching hornexplore.com
  const [selectedDate, setSelectedDate] = useState('31-Oct-2026');
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Traveler Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Damal Hotel, Hargeisa');
  const [paymentMethod, setPaymentMethod] = useState('zaad');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing calculations
  const pricing = calculateHornExplorePricing({
    adultCount,
    childCount,
    adultRate,
    adultOriginalRate,
    childRate,
    bookingDate: selectedDate,
  });

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  const handleOpenBooking = () => {
    setBookingConfirmed(false);
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!email.trim() || !email.includes('@')) errors.email = 'Please provide a valid email';
    if (!phone.trim()) errors.phone = 'Please provide a phone / WhatsApp number';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ref = generateBookingReference(selectedDate);
      setBookingReference(ref);
      setIsSubmitting(false);
      setBookingConfirmed(true);
      if (onBookSuccess) onBookSuccess(ref);
    }, 800);
  };

  const presetDates = ['31-Oct-2026', '15-Nov-2026', '01-Dec-2026', '10-Jan-2027'];

  return (
    <div
      className={`bg-white rounded-2xl border-2 border-[#0F382A]/15 shadow-lg overflow-hidden transition-all ${className}`}
      data-testid="hornexplore-booking-widget"
    >
      {/* Brand & Trust Header */}
      <div className="bg-[#0F382A] text-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              {COMPANY_INFO.brandName}
            </span>
          </div>
          <span className="text-[11px] bg-[#C5A059]/20 text-[#EAE4D7] px-2.5 py-0.5 rounded-full border border-[#C5A059]/40 font-medium">
            Best Price Guarantee
          </span>
        </div>
        <h3 className="text-xl font-bold font-display mt-2 text-white">
          Book Your Somaliland Experience
        </h3>
        <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>SPU Security, 4x4 Land Cruiser & Certified Guide included</span>
        </p>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* 1. Date Selection Section */}
        <div className="space-y-2.5">
          <label
            htmlFor="booking-date-input"
            className="block text-sm font-bold text-[#0F382A] flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
            <span>Select Your Booking Date:</span>
          </label>

          <div className="relative">
            <input
              id="booking-date-input"
              type="text"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              aria-label="Select booking departure date"
              className="w-full font-mono text-base font-bold text-[#0F382A] px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#0F382A] transition-colors"
              placeholder="e.g. 31-Oct-2026"
            />
            <span className="absolute right-3.5 top-3.5 text-xs font-medium text-slate-400 pointer-events-none">
              DD-MMM-YYYY
            </span>
          </div>

          {/* Quick Date Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {presetDates.map((pDate) => (
              <button
                key={pDate}
                type="button"
                onClick={() => handleDateChange(pDate)}
                aria-label={`Select date ${pDate}`}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                  selectedDate === pDate
                    ? 'bg-[#0F382A] text-[#C5A059] font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {pDate}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Adult Pricing & Counter */}
        <div className="p-4 rounded-xl border border-slate-200 bg-[#FAF9F5] flex items-center justify-between gap-4">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Adult:</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-[#0F382A] font-mono tabular-nums">
                ${adultRate}
              </span>
              <span className="line-through text-sm font-semibold text-slate-400 font-mono">
                ${adultOriginalRate}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                SAVE ${adultOriginalRate - adultRate}
              </span>
            </div>
            <span className="text-[11px] text-slate-500">Ages 12+ (Full expedition services)</span>
          </div>

          {/* Quantity Controls for Adult */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
              disabled={adultCount <= 1}
              aria-label="Decrease adult count"
              className="w-9 h-9 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition-all font-bold"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className="w-10 text-center font-mono font-bold text-lg text-[#0F382A]"
              data-testid="adult-qty-display"
              aria-label={`${adultCount} adults selected`}
            >
              {pricing.adultQtyDisplay}
            </span>
            <button
              type="button"
              onClick={() => setAdultCount(adultCount + 1)}
              aria-label="Increase adult count"
              className="w-9 h-9 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 active:scale-95 flex items-center justify-center text-slate-700 transition-all font-bold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Children Pricing & Counter */}
        <div className="p-4 rounded-xl border border-slate-200 bg-[#FAF9F5] flex items-center justify-between gap-4">
          <div>
            <span className="text-sm font-bold text-slate-900 block">Children:</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black text-[#0F382A] font-mono tabular-nums">
                ${childRate}
              </span>
              <span className="text-xs text-slate-500">per child</span>
            </div>
            <span className="text-[11px] text-slate-500">Ages 4–11 (Sharing vehicle/lodge)</span>
          </div>

          {/* Quantity Controls for Children */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setChildCount(Math.max(0, childCount - 1))}
              disabled={childCount <= 0}
              aria-label="Decrease children count"
              className="w-9 h-9 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-slate-700 transition-all font-bold"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className="w-10 text-center font-mono font-bold text-lg text-[#0F382A]"
              data-testid="child-qty-display"
              aria-label={`${childCount} children selected`}
            >
              {pricing.childQtyDisplay}
            </span>
            <button
              type="button"
              onClick={() => setChildCount(childCount + 1)}
              aria-label="Increase children count"
              className="w-9 h-9 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 active:scale-95 flex items-center justify-center text-slate-700 transition-all font-bold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. Itemized Summary Receipt Table (matching exact prompt structure) */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Itemized Cost Receipt</span>
            <span className="text-[#0F382A] font-mono">Date: {selectedDate}</span>
          </div>

          <div className="space-y-2 text-sm text-slate-700">
            {/* Adult Line */}
            <div className="flex items-center justify-between py-1 border-b border-slate-100 font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Adult</span>
                <span className="text-xs text-slate-500">${adultRate} Price</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                  {pricing.adultQtyDisplay} QTY
                </span>
                <span className="font-bold text-[#0F382A] text-base w-16 text-right">
                  ${pricing.adultSubtotal}
                </span>
              </div>
            </div>

            {/* Children Line */}
            <div className="flex items-center justify-between py-1 border-b border-slate-100 font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Children</span>
                <span className="text-xs text-slate-500">${childRate} Price</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                  {pricing.childQtyDisplay} QTY
                </span>
                <span className="font-bold text-[#0F382A] text-base w-16 text-right">
                  ${pricing.childSubtotal}
                </span>
              </div>
            </div>

            {/* Total Amount Row */}
            <div className="pt-2 flex items-baseline justify-between text-base">
              <span className="font-bold text-[#161A18] font-display">Total Amount:</span>
              <span
                className="text-3xl font-extrabold text-[#0F382A] font-mono tabular-nums"
                data-testid="total-amount-display"
              >
                {pricing.totalAmountDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* 5. Book Now Button */}
        <button
          type="button"
          onClick={handleOpenBooking}
          aria-label={`Book Now for ${pricing.totalAmountDisplay} on ${selectedDate}`}
          className="w-full bg-[#0F382A] hover:bg-[#164E3A] active:bg-[#09231A] text-white font-extrabold text-base py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-[#C5A059]/40 group"
        >
          <span>Book Now</span>
          <span className="text-[#C5A059] group-hover:translate-x-1 transition-transform">→</span>
        </button>

        {/* Trust & Guarantee Micro-bar */}
        <div className="pt-2 text-center space-y-1">
          <p className="text-[11px] text-slate-500">
            Direct booking from Somaliland Head Office · Free date rescheduling
          </p>
          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-600 font-medium">
            <span className="flex items-center gap-1 text-[#0F382A]">
              <Phone className="w-3 h-3 text-[#C5A059]" />
              <span>{COMPANY_INFO.phone}</span>
            </span>
            <span>·</span>
            <span>{COMPANY_INFO.address}</span>
          </div>
        </div>
      </div>

      {/* 6. Interactive Booking Confirmation Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto"
        >
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
            {/* Modal Header */}
            <div className="bg-[#0F382A] text-white p-6 relative">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close booking modal"
                className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-1">
                <span>{COMPANY_INFO.brandName} Direct Booking</span>
              </div>
              <h3 id="booking-modal-title" className="text-xl sm:text-2xl font-bold font-display">
                {bookingConfirmed ? 'Booking Confirmed!' : 'Complete Your Tour Reservation'}
              </h3>
              <p className="text-xs text-slate-200 mt-1">
                {tourTitle} · Departure: {selectedDate}
              </p>
            </div>

            {bookingConfirmed ? (
              /* Success Screen */
              <div className="p-6 sm:p-8 space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-[#0F382A] font-display">
                    Thank You, {fullName}!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Your reservation for <strong>{tourTitle}</strong> on{' '}
                    <strong>{selectedDate}</strong> has been received by our Hargeisa operations team.
                  </p>
                </div>

                {/* Reservation Voucher Summary */}
                <div className="bg-[#FAF9F5] p-5 rounded-xl border border-slate-200 text-left space-y-3 font-mono text-xs">
                  <div className="flex justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500 font-sans">Booking Reference:</span>
                    <span className="font-bold text-[#0F382A] text-sm">{bookingReference}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-sans">Travelers:</span>
                    <span className="font-bold">
                      {pricing.adultCount} Adult{pricing.adultCount > 1 ? 's' : ''},{' '}
                      {pricing.childCount} Child{pricing.childCount > 1 ? 'ren' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-sans">Total Amount:</span>
                    <span className="font-bold text-[#0F382A] text-base">
                      {pricing.totalAmountDisplay}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-sans">Payment Mode:</span>
                    <span className="font-bold capitalize">{paymentMethod.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500 font-sans">Head Office:</span>
                    <span className="font-sans text-slate-700 font-medium">
                      {COMPANY_INFO.address}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Hello%20HornExplore,%20I%20have%20booked%20${encodeURIComponent(
                      tourTitle
                    )}%20for%20${encodeURIComponent(selectedDate)}%20(Ref:%20${bookingReference}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm via WhatsApp ({COMPANY_INFO.phone})</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
                  >
                    Done & Return to Tour
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleConfirmBooking} className="p-6 sm:p-8 space-y-5" noValidate>
                {/* Cost Header Review */}
                <div className="bg-[#FAF9F5] p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500 block">Departure Date:</span>
                    <span className="font-bold text-[#0F382A] font-mono text-sm">{selectedDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Party Size:</span>
                    <span className="font-bold text-slate-800">
                      {pricing.adultCount} Adult{pricing.adultCount > 1 ? 's' : ''} ·{' '}
                      {pricing.childCount} Child{pricing.childCount > 1 ? 'ren' : ''}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block">Total Due:</span>
                    <span className="font-black text-[#0F382A] text-base font-mono">
                      {pricing.totalAmountDisplay}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="traveler-name" className="block text-xs font-bold text-slate-700 mb-1">
                      Lead Traveler Full Name *
                    </label>
                    <input
                      id="traveler-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                      }}
                      placeholder="e.g. Mahad Hassan"
                      aria-required="true"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A]"
                    />
                    {formErrors.fullName && (
                      <span className="text-[11px] text-red-500 font-medium">{formErrors.fullName}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="traveler-email" className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="traveler-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        placeholder="you@domain.com"
                        aria-required="true"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A]"
                      />
                      {formErrors.email && (
                        <span className="text-[11px] text-red-500 font-medium">{formErrors.email}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="traveler-phone" className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="traveler-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                        }}
                        placeholder="+252 ... / +1 ..."
                        aria-required="true"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] focus:ring-1 focus:ring-[#0F382A]"
                      />
                      {formErrors.phone && (
                        <span className="text-[11px] text-red-500 font-medium">{formErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="traveler-pickup" className="block text-xs font-bold text-slate-700 mb-1">
                      Hargeisa Pickup Point / Hotel
                    </label>
                    <input
                      id="traveler-pickup"
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="e.g. Damal Hotel, Ambassador Hotel, or Egal Airport (HGA)"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                    />
                  </div>

                  {/* Payment Partner Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Select Payment Partner:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'zaad', label: 'Zaad Service', badge: 'Telesom' },
                        { id: 'edahab', label: 'e-Dahab', badge: 'Dahabshiil' },
                        { id: 'premier', label: 'Premier Bank', badge: 'Bank' },
                        { id: 'office', label: 'Asha Mall Office', badge: 'Cash' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPaymentMethod(item.id)}
                          aria-label={`Select ${item.label} payment option`}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            paymentMethod === item.id
                              ? 'border-[#0F382A] bg-[#0F382A]/5 ring-1 ring-[#0F382A]'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <span className="block text-xs font-bold text-slate-800">{item.label}</span>
                          <span className="text-[10px] text-slate-500">{item.badge}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submission CTA */}
                <div className="pt-3 border-t border-slate-200">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0F382A] hover:bg-[#164E3A] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <span>Processing Reservation...</span>
                    ) : (
                      <>
                        <span>Confirm Reservation ({pricing.totalAmountDisplay})</span>
                        <Check className="w-4 h-4 text-[#C5A059]" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Official HornExplore confirmation will be transmitted to {COMPANY_INFO.email}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
