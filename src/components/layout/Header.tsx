import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Compass,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Plane,
  Tag,
  Search,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';
import {
  HornExploreFeaturesModal,
  FeatureModalType,
} from '../common/HornExploreFeaturesModal';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [toursDropdownOpen, setToursDropdownOpen] = useState(false);
  const [destinationsDropdownOpen, setDestinationsDropdownOpen] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeatureModal, setActiveFeatureModal] = useState<FeatureModalType>(null);
  const location = useLocation();

  // Close menus on page route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setToursDropdownOpen(false);
    setDestinationsDropdownOpen(false);
    setGalleryDropdownOpen(false);
  }, [location.pathname]);

  // Track scroll for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[13px] font-medium transition-colors hover:text-[#2d5a45] py-2 flex items-center gap-1 ${
      isActive ? 'text-[#2d5a45] font-bold' : 'text-slate-700'
    }`;

  return (
    <>
      {/* Clean Single White Bar Header (Macrobia style) */}
      <header
        className={`w-full z-40 sticky top-0 bg-white border-b border-slate-200/80 transition-all duration-300 ${
          scrolled ? 'shadow-md shadow-slate-900/5' : 'shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo: Dark forest green serif wordmark (GOLIS EXPEDITIONS - SOMALILAND) */}
            <Link
              to="/"
              aria-label="Golis Expeditions - Somaliland Tourism & Travel Home"
              className="flex flex-col group shrink-0"
            >
              <span className="font-serif font-black text-2xl tracking-[0.16em] text-[#2d5a45] leading-none uppercase">
                GOLIS
              </span>
              <span className="text-[9px] tracking-[0.22em] text-[#2d5a45]/85 font-bold uppercase mt-1 pl-0.5">
                EXPEDITIONS &bull; SOMALILAND
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-6">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              {/* About Us Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAboutDropdownOpen(true)}
                onMouseLeave={() => setAboutDropdownOpen(false)}
              >
                <button
                  id="about-us-dropdown-btn"
                  className="text-[13px] font-medium text-slate-700 hover:text-[#2d5a45] py-2 flex items-center gap-1 focus:outline-none cursor-pointer"
                  onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={aboutDropdownOpen}
                  aria-controls="about-us-dropdown-menu"
                  aria-label="About Us dropdown menu"
                >
                  <span>About Us</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 text-slate-400 group-hover:text-[#2d5a45]" aria-hidden="true" />
                </button>
                {aboutDropdownOpen && (
                  <div
                    id="about-us-dropdown-menu"
                    role="menu"
                    aria-labelledby="about-us-dropdown-btn"
                    className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <Link
                      to="/about"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Our Story & Mission
                    </Link>
                    <Link
                      to="/why-us"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Why Travel With Us
                    </Link>
                    <Link
                      to="/team"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Meet Our Team
                    </Link>
                    <Link
                      to="/testimonials"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Guest Testimonials
                    </Link>
                    <Link
                      to="/policies"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Travel & Safety Policies
                    </Link>
                  </div>
                )}
              </div>

              {/* Tour Packages Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setToursDropdownOpen(true)}
                onMouseLeave={() => setToursDropdownOpen(false)}
              >
                <div className="flex items-center">
                  <NavLink
                    to="/tours"
                    className={navLinkClass}
                    aria-label="View all tour packages"
                  >
                    <span>Tour Packages</span>
                  </NavLink>
                  <button
                    id="tours-dropdown-btn"
                    className="text-slate-400 hover:text-[#2d5a45] p-1 focus:outline-none cursor-pointer"
                    onClick={() => setToursDropdownOpen(!toursDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={toursDropdownOpen}
                    aria-controls="tours-dropdown-menu"
                    aria-label="Toggle Tour Packages sub-menu"
                  >
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" aria-hidden="true" />
                  </button>
                </div>
                {toursDropdownOpen && (
                  <div
                    id="tours-dropdown-menu"
                    role="menu"
                    aria-labelledby="tours-dropdown-btn"
                    className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <Link
                      to="/tours"
                      role="menuitem"
                      className="block px-4 py-2 text-xs font-bold text-[#2d5a45] hover:bg-[#2d5a45]/5 transition-colors border-b border-slate-100"
                    >
                      All Tour Packages
                    </Link>
                    <Link
                      to="/somaliland-tours"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Somaliland Tours (6 Regions)
                    </Link>
                    <Link
                      to="/combined-tours"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Combined Horn of Africa Tours
                    </Link>
                    <Link
                      to="/djibouti-tours"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Djibouti Tours
                    </Link>
                    <Link
                      to="/somalia-tours"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Somalia Tours
                    </Link>
                    <Link
                      to="/ethiopia-tours"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Ethiopia Tours
                    </Link>
                  </div>
                )}
              </div>

              {/* Destinations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDestinationsDropdownOpen(true)}
                onMouseLeave={() => setDestinationsDropdownOpen(false)}
              >
                <div className="flex items-center">
                  <NavLink
                    to="/destinations"
                    className={navLinkClass}
                    aria-label="View all destinations"
                  >
                    <span>Destinations</span>
                  </NavLink>
                  <button
                    id="destinations-dropdown-btn"
                    className="text-slate-400 hover:text-[#2d5a45] p-1 focus:outline-none cursor-pointer"
                    onClick={() => setDestinationsDropdownOpen(!destinationsDropdownOpen)}
                    aria-haspopup="true"
                    aria-expanded={destinationsDropdownOpen}
                    aria-controls="destinations-dropdown-menu"
                    aria-label="Toggle Destinations sub-menu"
                  >
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" aria-hidden="true" />
                  </button>
                </div>
                {destinationsDropdownOpen && (
                  <div
                    id="destinations-dropdown-menu"
                    role="menu"
                    aria-labelledby="destinations-dropdown-btn"
                    className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <Link
                      to="/destinations"
                      role="menuitem"
                      className="block px-4 py-2 text-xs font-bold text-[#2d5a45] hover:bg-[#2d5a45]/5 transition-colors border-b border-slate-100"
                    >
                      All Somaliland Destinations
                    </Link>
                    <Link
                      to="/destinations?region=Maroodi-Jeeh"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Maroodi-Jeeh (Hargeisa & Laas Geel)
                    </Link>
                    <Link
                      to="/destinations?region=Awdal"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Awdal (Borama & Zeila)
                    </Link>
                    <Link
                      to="/destinations?region=Sahil"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Sahil (Berbera & Sheikh)
                    </Link>
                    <Link
                      to="/destinations?region=Togdheer"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Togdheer (Burao Plateau)
                    </Link>
                    <Link
                      to="/destinations?region=Sanaag"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Sanaag (Erigavo & Daallo)
                    </Link>
                    <Link
                      to="/destinations?region=Sool"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Sool (Laas Caanood & Taleh)
                    </Link>
                  </div>
                )}
              </div>

              <NavLink to="/upcoming-tours" className={navLinkClass}>
                Upcoming Tours
              </NavLink>

              <NavLink to="/corporate-travel" className={navLinkClass}>
                Corporate & Logistics
              </NavLink>

              {/* Gallery Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setGalleryDropdownOpen(true)}
                onMouseLeave={() => setGalleryDropdownOpen(false)}
              >
                <button
                  id="gallery-dropdown-btn"
                  className="text-[13px] font-medium text-slate-700 hover:text-[#2d5a45] py-2 flex items-center gap-1 focus:outline-none cursor-pointer"
                  onClick={() => setGalleryDropdownOpen(!galleryDropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={galleryDropdownOpen}
                  aria-controls="gallery-dropdown-menu"
                  aria-label="Gallery dropdown menu"
                >
                  <span>Gallery</span>
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 text-slate-400" aria-hidden="true" />
                </button>
                {galleryDropdownOpen && (
                  <div
                    id="gallery-dropdown-menu"
                    role="menu"
                    aria-labelledby="gallery-dropdown-btn"
                    className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <Link
                      to="/gallery?tab=photos"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Photo Gallery
                    </Link>
                    <Link
                      to="/gallery?tab=videos"
                      role="menuitem"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-[#2d5a45]/5 hover:text-[#2d5a45] transition-colors"
                    >
                      Video Gallery
                    </Link>
                  </div>
                )}
              </div>

              <NavLink to="/travel-info" className={navLinkClass}>
                Travel Info
              </NavLink>

              <NavLink to="/blog" className={navLinkClass}>
                Blog
              </NavLink>

              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </nav>

            {/* Right Side: Phone Pill + WhatsApp + Admin */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {/* Call Any Time Pill (Exact Macrobia border pill) */}
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                aria-label={`Call any time: ${COMPANY_INFO.phone}`}
                className="flex items-center gap-2.5 border border-slate-300 hover:border-[#2d5a45] rounded-full pl-2 pr-4 py-1.5 transition-all text-slate-800 bg-white group shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#2d5a45] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-3 h-3 text-white" aria-hidden="true" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] font-normal text-slate-500 uppercase tracking-wider">
                    Call any time:
                  </span>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#2d5a45] transition-colors">
                    {COMPANY_INFO.phone}
                  </span>
                </div>
              </a>

              {/* WhatsApp Green Pill Button */}
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent('Hello Macrobia & Golis Expeditions, I would like to inquire about Somaliland tours.')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                title="Chat on WhatsApp"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xs hover:scale-105 transition-transform"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" aria-hidden="true" />
              </a>

              {/* Small Admin Link */}
              <Link
                to="/admin"
                aria-label="Admin Dashboard"
                className="text-[11px] font-bold text-slate-400 hover:text-[#2d5a45] uppercase tracking-wider transition-colors px-1.5 py-1 rounded hover:bg-slate-50"
              >
                Admin
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-[#2d5a45] hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-drawer"
            aria-label="Mobile navigation"
            className="xl:hidden bg-white border-t border-slate-200 px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto text-slate-800"
          >
            {/* Call and WhatsApp Quick Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-xs font-bold text-[#2d5a45]"
              >
                <Phone className="w-4 h-4" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1 rounded-full text-xs font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Quick Actions in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveFeatureModal('hotels-flights');
                }}
                className="flex items-center justify-center gap-1 bg-[#2d5a45] text-white p-2 rounded-lg text-xs font-semibold"
              >
                <Search className="w-3.5 h-3.5 text-white" />
                <span>Hotels & Flights</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveFeatureModal('plan-trip');
                }}
                className="flex items-center justify-center gap-1 bg-slate-100 text-slate-900 border border-slate-200 p-2 rounded-lg text-xs font-bold"
              >
                <Plane className="w-3.5 h-3.5 text-[#2d5a45]" />
                <span>Plan My Trip</span>
              </button>
            </div>

            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-800 hover:text-[#2d5a45] py-1"
            >
              Home
            </NavLink>

            <div className="border-t border-slate-100 pt-2 space-y-1">
              <div className="text-xs uppercase tracking-wider text-[#2d5a45] font-bold py-1">About Company</div>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-3 py-1 text-sm text-slate-600 hover:text-[#2d5a45]"
              >
                About Us
              </Link>
              <Link
                to="/why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-3 py-1 text-sm text-slate-600 hover:text-[#2d5a45]"
              >
                Why Travel With Us
              </Link>
              <Link
                to="/team"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-3 py-1 text-sm text-slate-600 hover:text-[#2d5a45]"
              >
                Meet Our Team
              </Link>
              <Link
                to="/testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-3 py-1 text-sm text-slate-600 hover:text-[#2d5a45]"
              >
                Customer Testimonials
              </Link>
              <Link
                to="/policies"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-3 py-1 text-sm text-slate-600 hover:text-[#2d5a45]"
              >
                Travel & Safety Policies
              </Link>
            </div>

            <div className="border-t border-slate-100 pt-2 space-y-1">
              <div className="text-xs uppercase tracking-wider text-[#2d5a45] font-bold py-1">
                Tour Packages & Horn Expeditions
              </div>
              <NavLink
                to="/tours"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-3 py-1 text-sm font-semibold text-slate-800 hover:text-[#2d5a45]"
              >
                All Tour Packages
              </NavLink>
              <NavLink
                to="/somaliland-tours"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-5 py-1 text-xs text-slate-600 hover:text-[#2d5a45]"
              >
                Somaliland Tours (6 Regions)
              </NavLink>
              <NavLink
                to="/combined-tours"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-5 py-1 text-xs text-slate-600 hover:text-[#2d5a45]"
              >
                Combined Horn of Africa Tours
              </NavLink>
              <NavLink
                to="/djibouti-tours"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-5 py-1 text-xs text-slate-600 hover:text-[#2d5a45]"
              >
                Djibouti Tours
              </NavLink>
              <NavLink
                to="/somalia-tours"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-5 py-1 text-xs text-slate-600 hover:text-[#2d5a45]"
              >
                Somalia Tours
              </NavLink>
              <NavLink
                to="/ethiopia-tours"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-5 py-1 text-xs text-slate-600 hover:text-[#2d5a45]"
              >
                Ethiopia Tours
              </NavLink>

              <div className="text-xs uppercase tracking-wider text-[#2d5a45] font-bold pt-2 pb-1">
                Somaliland 6 Official Regions
              </div>
              <NavLink
                to="/destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="block pl-3 py-1 text-sm font-semibold text-slate-800 hover:text-[#2d5a45]"
              >
                All Destinations & Sites
              </NavLink>
              <div className="grid grid-cols-2 gap-1 pl-3 pt-1">
                <Link
                  to="/destinations?region=Maroodi-Jeeh"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-600 hover:text-[#2d5a45] py-0.5"
                >
                  • Maroodi-Jeeh
                </Link>
                <Link
                  to="/destinations?region=Awdal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-600 hover:text-[#2d5a45] py-0.5"
                >
                  • Awdal
                </Link>
                <Link
                  to="/destinations?region=Sahil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-600 hover:text-[#2d5a45] py-0.5"
                >
                  • Sahil
                </Link>
                <Link
                  to="/destinations?region=Togdheer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-600 hover:text-[#2d5a45] py-0.5"
                >
                  • Togdheer
                </Link>
                <Link
                  to="/destinations?region=Sanaag"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-600 hover:text-[#2d5a45] py-0.5"
                >
                  • Sanaag
                </Link>
                <Link
                  to="/destinations?region=Sool"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-600 hover:text-[#2d5a45] py-0.5"
                >
                  • Sool
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-2 space-y-1">
                <NavLink
                  to="/upcoming-tours"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-slate-800 hover:text-[#2d5a45] py-1"
                >
                  Upcoming Departures
                </NavLink>
                <NavLink
                  to="/corporate-travel"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-slate-800 hover:text-[#2d5a45] py-1"
                >
                  Corporate & Logistics
                </NavLink>
                <NavLink
                  to="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-slate-800 hover:text-[#2d5a45] py-1"
                >
                  Photo & Video Gallery
                </NavLink>
                <NavLink
                  to="/travel-info"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-slate-800 hover:text-[#2d5a45] py-1"
                >
                  Visa & Travel Information
                </NavLink>
                <NavLink
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-slate-800 hover:text-[#2d5a45] py-1"
                >
                  Travel Blog
                </NavLink>
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-bold text-slate-400 hover:text-[#2d5a45] py-1"
                >
                  Administrator Portal
                </NavLink>
              </div>
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-semibold text-[#2d5a45] pt-2"
              >
                Contact Us
              </NavLink>
            </div>
          </nav>
        )}
      </header>

      {/* Feature Modals for Interactive Action Buttons */}
      <HornExploreFeaturesModal
        activeType={activeFeatureModal}
        onClose={() => setActiveFeatureModal(null)}
      />
    </>
  );
};
