import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Shield,
  ArrowRight,
  CreditCard,
  Building2,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import { DESTINATIONS_DATA } from '../../data/destinations';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterError('Please provide a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSubmitted(true);
  };

  return (
    <footer className="bg-[#09231A] text-slate-300 border-t border-emerald-950/80">
      {/* 1. "Want to take tour packages? Explore tours" CTA Banner */}
      <div className="bg-[#0D3024] border-b border-emerald-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059] block">
              Somaliland & Horn of Africa
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Want to take tour packages?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Personalized expeditions, ancient rock art permits, coastal escapes, and mountain treks.
            </p>
          </div>

          <Link
            to="/tours"
            aria-label="Explore tours - HornExplore tour packages"
            className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08e4d] text-[#09231A] font-extrabold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md transition-all duration-200 shrink-0 hover:scale-105"
          >
            <span>Explore tours</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* 2. Newsletter Strip */}
      <div className="bg-[#071912] border-b border-emerald-950/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Join The Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-[#EAE4D7]/80">
              To receive our best monthly deals
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-2 bg-[#164E3A] text-[#C5A059] px-5 py-3 rounded-lg border border-[#C5A059]/40 text-xs sm:text-sm"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Thank you! You are subscribed to receive our best monthly deals.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-center gap-2 max-w-md w-full"
                noValidate
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Enter Your Email for HornExplore monthly deals
                </label>
                <div className="relative w-full">
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    placeholder="Enter Your Email..."
                    aria-required="true"
                    aria-invalid={!!newsletterError}
                    aria-describedby={newsletterError ? 'footer-newsletter-error' : undefined}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-lg bg-[#0F382A] border border-emerald-800 text-white placeholder-slate-400 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                  {newsletterError && (
                    <span
                      id="footer-newsletter-error"
                      role="alert"
                      className="absolute -bottom-5 left-0 text-[11px] text-red-400 font-medium"
                    >
                      {newsletterError}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  aria-label="Subscribe to monthly deals newsletter"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C5A059] hover:bg-[#b08e4d] text-[#09231A] font-bold text-xs sm:text-sm px-6 py-3 rounded-lg transition-colors shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Footer Logo & "Find About Horn explore" */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              aria-label="Golis Expeditions - Somaliland Tourism & Travel Home"
              className="flex items-center gap-3 group inline-block"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#164E3A] to-[#09231A] border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059] shadow">
                <Compass className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tight text-white">
                  GOLIS<span className="text-[#C5A059]"> EXPEDITIONS</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-slate-400">
                  Somaliland Tourism & Travel
                </span>
              </div>
            </Link>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                Find About Golis Expeditions
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {COMPANY_INFO.aboutText}
              </p>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-900 text-[11px] text-[#C5A059]">
                <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{COMPANY_INFO.logisticsConsultantBadge}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="#social"
                aria-label="Follow HornExplore on Instagram"
                className="p-2 rounded-full bg-[#0E3527] hover:text-[#C5A059] transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#social"
                aria-label="Follow HornExplore on Facebook"
                className="p-2 rounded-full bg-[#0E3527] hover:text-[#C5A059] transition-colors"
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#social"
                aria-label="Follow HornExplore on Twitter"
                className="p-2 rounded-full bg-[#0E3527] hover:text-[#C5A059] transition-colors"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#social"
                aria-label="Follow HornExplore on YouTube"
                className="p-2 rounded-full bg-[#0E3527] hover:text-[#C5A059] transition-colors"
              >
                <Youtube className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick link */}
          <div className="lg:col-span-2 space-y-3">
            <h4 id="footer-quicklink-heading" className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Quick link
            </h4>
            <nav aria-labelledby="footer-quicklink-heading">
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/policies" className="hover:text-white transition-colors">
                    privacy policy
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    FAQS
                  </Link>
                </li>
                <li>
                  <Link to="/tours" className="hover:text-white transition-colors">
                    Tour Packages
                  </Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-white transition-colors">
                    Destinations
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* More Inquiry */}
          <div className="lg:col-span-3 space-y-3">
            <h4 id="footer-inquiry-heading" className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              More Inquiry
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Telephone / WhatsApp</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    aria-label={`Telephone: ${COMPANY_INFO.phoneRaw}`}
                    className="hover:text-white transition-colors font-mono font-bold"
                  >
                    {COMPANY_INFO.phoneRaw}
                  </a>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    {COMPANY_INFO.phone}
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Send Mail</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    aria-label={`Send Mail: ${COMPANY_INFO.email}`}
                    className="hover:text-white transition-colors font-semibold"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Address</span>
                  <span className="text-slate-200 font-medium">
                    {COMPANY_INFO.address}
                  </span>
                  <span className="block text-[11px] text-slate-400">Somaliland</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Payment Partner */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              Payment Partner
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We accept official local Somaliland mobile money, regional banking, and major international card networks:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {COMPANY_INFO.paymentPartners.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-[#071912] border border-emerald-900/60 p-2.5 rounded-lg flex flex-col justify-between"
                >
                  <span className="text-xs font-bold text-slate-100">{partner.name}</span>
                  <span className="text-[10px] text-[#C5A059] font-mono mt-0.5">{partner.badge}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
              <span>Secure transaction processed through licensed partners.</span>
            </div>
          </div>
        </div>

        {/* 4. Bottom Copyright & Link */}
        <div className="mt-12 pt-8 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="font-mono text-slate-300">
            {COMPANY_INFO.copyright}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/policies" className="hover:text-slate-200 transition-colors">
              privacy policy
            </Link>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              FAQS
            </Link>
            <Link to="/admin" className="hover:text-[#C5A059] transition-colors font-medium">
              Admin Portal
            </Link>
            <span className="text-slate-500" aria-hidden="true">|</span>
            <span className="text-[#C5A059] font-medium">
              Asha mall, Goljano, Hargeisa
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
