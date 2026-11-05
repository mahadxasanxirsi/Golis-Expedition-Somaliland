import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ChevronUp,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { COMPANY_INFO } from '../data/company';
import { submitInquiry } from '../lib/supabase';

// Web3Forms Form Access Key (Vite environment variable with user verified default fallback)
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'acc99d81-43f3-4405-994c-c3b9ab640030';

export const Contact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!subject.trim()) newErrors.subject = 'Subject is required';
    if (!message.trim()) newErrors.message = 'Please enter your message';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    setApiError(null);

    try {
      // 1. Save customer inquiry to Supabase database
      const dbResult = await submitInquiry({
        name: fullName,
        email,
        phone,
        inquiry_subject: subject,
        message,
      });

      // 2. Dispatch email notification to personal Gmail through Web3Forms
      try {
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('name', fullName.trim());
        formData.append('email', email.trim());
        formData.append('phone', phone.trim());
        formData.append('subject', 'New Expedition Inquiry - Golis Expeditions');
        formData.append('inquiry_subject', subject.trim());
        formData.append('message', message.trim());
        formData.append('from_name', fullName.trim());
        // Honeypot spam protection (remains blank for human submissions)
        formData.append('botcheck', '');

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          console.warn('Web3Forms notification log:', data?.message || 'Email dispatch non-blocking notice');
        }
      } catch (emailErr) {
        // Safe logging: Inquiry remains stored in Supabase even if email service has a transient issue
        console.warn('Web3Forms delivery non-blocking note:', emailErr);
      }

      if (dbResult.success) {
        setSubmitted(true);
        setFullName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
        setErrors({});
        setApiError(null);
      } else {
        setApiError('Sorry, your message could not be sent. Please try again.');
      }
    } catch {
      setApiError('Sorry, your message could not be sent. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: 'Do I need a visa before arriving in Somaliland?',
      a: 'Most passport holders can obtain a visa on arrival at Egal International Airport (HGA) in Hargeisa if they hold a pre-approved Visa Authorization Letter issued by our agency. Visas are also issued at Somaliland representative missions in London, Washington D.C., Addis Ababa, and Dubai.',
    },
    {
      q: 'Is traveling in Somaliland safe for international visitors?',
      a: 'Yes. Somaliland has enjoyed a stable, democratic government and peaceful civil society since 1991. The local population is renowned for its hospitality. Outside major cities, all tourists travel with a certified Special Protection Unit (SPU) escort as standard ministerial procedure.',
    },
    {
      q: 'What is the best time of year to visit Somaliland?',
      a: 'October through March is ideal. The weather in Hargeisa and the Sheikh mountains is comfortably warm during the day (24–28°C / 75–82°F) with cool evenings, and coastal Berbera avoids the extreme summer heat.',
    },
    {
      q: 'Can credit cards be used in Somaliland?',
      a: 'Credit card payment infrastructure is limited. We recommend carrying crisp, post-2013 US Dollar cash banknotes. US Dollars are universally accepted alongside the Somaliland Shilling. Some ATMs in Hargeisa support foreign Visa cards.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#0F382A] text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-lg border border-emerald-950">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Headquarters at Asha Mall, Goljano
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Contact {COMPANY_INFO.name} Somaliland
          </h1>
          <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed">
            {COMPANY_INFO.aboutText}
          </p>
          <div className="pt-1 text-xs text-[#C5A059] font-semibold">
            ✦ {COMPANY_INFO.logisticsConsultantBadge}
          </div>
        </div>
      </div>

      {/* Grid: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Details & Map Placeholder */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#161A18] font-display">
              Get in Touch
            </h2>

            <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0F382A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#161A18]">Office Location</strong>
                  <span className="text-slate-800 font-semibold">{COMPANY_INFO.address}</span>
                  <span className="block text-slate-500">{COMPANY_INFO.fullAddress}</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0F382A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block text-[#161A18]">Phone / WhatsApp</strong>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    aria-label={`Call primary phone: ${COMPANY_INFO.phone}`}
                    className="text-[#0F382A] font-bold font-mono hover:text-[#C5A059] transition-colors block"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <a
                    href={`tel:${COMPANY_INFO.secondaryPhone}`}
                    aria-label={`Call alternative phone: ${COMPANY_INFO.secondaryPhone}`}
                    className="text-slate-500 font-mono text-xs hover:text-[#0F382A] transition-colors block"
                  >
                    {COMPANY_INFO.secondaryPhone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0F382A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block text-[#161A18]">Send Mail</strong>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    aria-label={`Send email to ${COMPANY_INFO.email}`}
                    className="text-[#0F382A] font-semibold hover:text-[#C5A059] transition-colors block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.secondaryEmail}`}
                    aria-label={`Send email to ${COMPANY_INFO.secondaryEmail}`}
                    className="text-slate-500 text-xs hover:text-[#0F382A] transition-colors block"
                  >
                    {COMPANY_INFO.secondaryEmail}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#0F382A] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="block text-[#161A18]">Office Hours</strong>
                  <span className="text-slate-600">Saturday – Thursday: 8:00 AM – 6:00 PM (EAT)</span>
                </div>
              </li>
            </ul>

            {/* Social Media */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                Connect With Us
              </span>
              <div className="flex items-center gap-3 text-slate-600">
                <a
                  href="#social"
                  aria-label="Follow Golis Expeditions on Instagram"
                  className="p-2 rounded-lg bg-slate-100 hover:text-[#0F382A] transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#social"
                  aria-label="Follow Golis Expeditions on Facebook"
                  className="p-2 rounded-lg bg-slate-100 hover:text-[#0F382A] transition-colors"
                >
                  <Facebook className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#social"
                  aria-label="Follow Golis Expeditions on Twitter"
                  className="p-2 rounded-lg bg-slate-100 hover:text-[#0F382A] transition-colors"
                >
                  <Twitter className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="#social"
                  aria-label="Follow Golis Expeditions on YouTube"
                  className="p-2 rounded-lg bg-slate-100 hover:text-[#0F382A] transition-colors"
                >
                  <Youtube className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Somaliland Geographic Map Placeholder */}
          <div className="bg-[#FAF9F5] rounded-xl border border-slate-200 p-6 space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-[#0F382A]/10 text-[#0F382A] flex items-center justify-center mx-auto">
              <MapPin className="w-5 h-5 text-[#C5A059]" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-[#161A18] font-display">
              Somaliland Expedition Territory
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Operating throughout all six sovereign regions of Somaliland: Maroodi Jeex, Sahil, Awdal, Togdheer, Sanaag, and Sool.
            </p>
            <div className="text-[11px] font-mono text-slate-400 pt-1">
              9.5624° N, 44.0770° E · Hargeisa Head Office
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#161A18] font-display mb-1">
            Send an Expedition Message
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Fill in the details below to reach our expedition desk in Hargeisa.
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
              <h3 className="text-xl font-bold text-[#0F382A] font-display">
                Message Sent Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you! Your message has been sent successfully. Our team will contact you soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                aria-label="Send another message"
                className="text-xs font-bold text-[#0F382A] underline cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Web3Forms Honeypot Spam Protection */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {apiError && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-xs flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{apiError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-full-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="contact-full-name"
                    name="name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Michael Scott"
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'contact-name-error' : undefined}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                  {errors.fullName && (
                    <span id="contact-name-error" role="alert" className="text-[11px] text-red-500 font-medium">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="e.g. michael@example.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                  {errors.email && (
                    <span id="contact-email-error" role="alert" className="text-[11px] text-red-500 font-medium">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="+1 555-0123"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                  {errors.phone && (
                    <span id="contact-phone-error" role="alert" className="text-[11px] text-red-500 font-medium">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors({ ...errors, subject: '' });
                    }}
                    placeholder="e.g. Custom Private Tour to Laas Geel"
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A]"
                  />
                  {errors.subject && (
                    <span id="contact-subject-error" role="alert" className="text-[11px] text-red-500 font-medium">
                      {errors.subject}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Tell us about your proposed dates, group size, specific archaeological interests..."
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-msg-error' : undefined}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#0F382A] resize-none"
                />
                {errors.message && (
                  <span id="contact-msg-error" role="alert" className="text-[11px] text-red-500 font-medium">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-label="Send expedition message"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm py-3 rounded-lg shadow transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" aria-hidden="true" />
                    <span>Sending your message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center">
                Your message will be delivered directly to our expedition team in Hargeisa.
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-[#FAF9F5] rounded-2xl border border-slate-200 p-8 sm:p-10 space-y-6">
        <SectionHeading
          kicker="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Clear answers about traveling in Somaliland, visas, safety, and money."
          centered
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const headingId = `faq-heading-${idx}`;
            const panelId = `faq-panel-${idx}`;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm text-[#161A18] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-display">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#0F382A] shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                  >
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
