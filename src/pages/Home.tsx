import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  Award,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Star,
  Quote,
  Sparkles,
  Car,
  BookOpen,
  Leaf,
  Globe,
} from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { SectionHeading } from '../components/common/SectionHeading';
import { TourCard } from '../components/tours/TourCard';
import { UpcomingTourCard } from '../components/tours/UpcomingTourCard';
import { DestinationCard } from '../components/destinations/DestinationCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { TOURS_DATA } from '../data/tours';
import { DESTINATIONS_DATA } from '../data/destinations';
import { UPCOMING_TOURS_DATA } from '../data/upcomingTours';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { BLOG_DATA } from '../data/blog';
import { SOMALILAND_IMAGES } from '../data/images';
import { COMPANY_INFO } from '../data/company';
import { HornExploreBookingWidget } from '../components/tours/HornExploreBookingWidget';
import { Tour } from '../types';
import { RegionalHighlights } from '../components/home/RegionalHighlights';

export const Home: React.FC = () => {
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState<string>('upcoming');

  const homeCategoryTabs = [
    { id: 'upcoming', label: 'Upcoming Tours' },
    { id: 'combined', label: 'Combined Tours' },
    { id: 'djibouti', label: 'Djibouti Tours' },
    { id: 'somaliland', label: 'Somaliland Tours' },
    { id: 'somalia', label: 'Somalia Tours' },
    { id: 'ethiopia', label: 'Ethiopia Tours' },
  ];

  const displayedHomeTours = React.useMemo(() => {
    let tours: Tour[] = [];
    switch (activeCategoryFilter) {
      case 'upcoming':
        tours = TOURS_DATA.slice(0, 6);
        break;
      case 'combined':
        tours = TOURS_DATA.filter((t) => t.country === 'Combined');
        if (tours.length === 0) {
          tours = [TOURS_DATA[11]]; // Combined Horn Odyssey
        }
        break;
      case 'djibouti':
        tours = TOURS_DATA.filter((t) => t.country === 'Djibouti' || t.destination.toLowerCase().includes('djibouti'));
        break;
      case 'somaliland':
        tours = TOURS_DATA.filter((t) => (t.country || 'Somaliland') === 'Somaliland').slice(0, 6);
        break;
      case 'somalia':
        tours = TOURS_DATA.filter((t) => t.country === 'Somalia' || t.destination.toLowerCase().includes('mogadishu'));
        break;
      case 'ethiopia':
        tours = TOURS_DATA.filter((t) => t.country === 'Ethiopia' || t.destination.toLowerCase().includes('harar'));
        break;
      default:
        tours = TOURS_DATA.slice(0, 6);
    }
    // Strict deduplication safeguard by unique tour ID
    const seen = new Set<string>();
    return tours.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });
  }, [activeCategoryFilter]);

  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-12">
      {/* SECTION 3: Hero Image Slider */}
      <section aria-label="Hero Destination Showcase">
        <HeroSlider />
      </section>

      {/* SECTION 3.5: HornExplore Quick Booking & Cost Calculator Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-[#0F382A] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-emerald-900/60 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#EAE4D7] px-3 py-1 rounded-full text-xs font-bold border border-[#C5A059]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{COMPANY_INFO.logisticsConsultantBadge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Find About Golis Expeditions
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {COMPANY_INFO.aboutText}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-emerald-900/60 text-xs">
              <div className="bg-[#09231A] p-3 rounded-xl border border-emerald-950">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Headquarters</span>
                <span className="font-bold text-[#EAE4D7]">{COMPANY_INFO.address}</span>
              </div>
              <div className="bg-[#09231A] p-3 rounded-xl border border-emerald-950">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Call / WhatsApp</span>
                <span className="font-bold text-[#C5A059] font-mono">{COMPANY_INFO.phone}</span>
              </div>
              <div className="bg-[#09231A] p-3 rounded-xl border border-emerald-950 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Official Site</span>
                <span className="font-bold text-[#EAE4D7]">{COMPANY_INFO.websiteDisplay}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HornExploreBookingWidget
              tourTitle="Somaliland Grand Discovery Tour"
              adultRate={350}
              adultOriginalRate={400}
              childRate={180}
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0F382A]">
              <span className="w-5 h-[2px] bg-[#C5A059]" />
              <span>Authentic Horn of Africa Heritage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#161A18] tracking-tight font-display">
              Welcome to Somaliland with Golis Expeditions
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Step into an extraordinary, sovereign democratic nation nestled in the Horn of Africa. Somaliland offers the world’s most pristine Neolithic rock art, undisturbed miles of golden Gulf of Aden coastlines, dramatic mountain canyons, and a hospitality so profound it leaves an indelible mark on every traveler.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              At <strong>{COMPANY_INFO.brandName}</strong>, we operate private and small-group journeys crafted with deep local roots, rigorous safety standards, and dedicated government permissions. Discover a peaceful land where ancient history and warm nomadic traditions greet you with open arms.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg shadow transition-colors"
              >
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </Link>
              <Link
                to="/travel-info"
                className="inline-flex items-center gap-2 bg-[#FAF9F5] hover:bg-slate-100 text-[#0F382A] text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg border border-slate-300 transition-colors"
              >
                <Compass className="w-4 h-4 text-[#C5A059]" />
                <span>Learn About Somaliland</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <div className="rounded-xl overflow-hidden shadow-sm h-48 sm:h-56">
                <ImageWithFallback
                  src={SOMALILAND_IMAGES.laasGeel}
                  alt="Laas Geel Rock Art"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="bg-[#FAF9F5] p-3.5 rounded-xl border border-slate-200 text-center">
                <span className="text-xs uppercase tracking-wider text-[#0F382A] font-bold block">5,000+ Years</span>
                <span className="text-[11px] text-slate-500">Neolithic Cave Art</span>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <div className="bg-[#0F382A] text-white p-3.5 rounded-xl border border-[#C5A059]/40 text-center">
                <span className="text-xs uppercase tracking-wider text-[#C5A059] font-bold block">100% Somaliland</span>
                <span className="text-[11px] text-slate-300">Curated Local Travel</span>
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm h-48 sm:h-56">
                <ImageWithFallback
                  src={SOMALILAND_IMAGES.berberaCoast}
                  alt="Berbera Coastline"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4.5: Regional Highlights of Somaliland (The 6 Constitutional Regions) */}
      <RegionalHighlights />

      {/* SECTION 5: Featured Tour Packages (Macrobia Dark Forest Green #2d5a45 Section) */}
      <section className="bg-[#2d5a45] text-white py-16 sm:py-24 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
              All Private & Group tours available throughout the Year
            </h2>

            {/* 6 pill-outlined buttons on dark green matching Macrobia screenshot */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2">
              {homeCategoryTabs.map((tab) => {
                const isActive = activeCategoryFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategoryFilter(tab.id)}
                    aria-pressed={isActive}
                    className={`rounded-full px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#2d5a45] shadow-lg font-bold scale-102'
                        : 'bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tour Cards Grid on Dark Green Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {displayedHomeTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {/* White "View All Tour Packages" Rounded Pill Button */}
          <div className="text-center pt-4">
            <Link
              to="/tours"
              aria-label="View all tour packages"
              className="inline-flex items-center gap-2 bg-white text-[#2d5a45] hover:bg-slate-100 font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <span>View All Tour Packages</span>
              <ArrowRight className="w-4 h-4 text-[#2d5a45]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: Upcoming Tours */}
      <section className="bg-[#FAF9F5] border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading
              kicker="Scheduled Departures"
              title="Upcoming Small-Group Tours"
              subtitle="Join an intimate scheduled departure with guaranteed dates. Sample spaces and dates shown below for demonstration."
              className="mb-0"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 italic">Demonstration availability</span>
              <Link
                to="/upcoming-tours"
                aria-label="View full upcoming departures calendar"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F382A] hover:text-[#C5A059] transition-colors"
              >
                <span>Full Calendar</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {UPCOMING_TOURS_DATA.slice(0, 4).map((departure) => (
              <UpcomingTourCard key={departure.id} departure={departure} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: About Our Company */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 h-[440px] relative">
              <ImageWithFallback
                src={SOMALILAND_IMAGES.sheikhMountains}
                alt="Sheikh Mountains Somaliland"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#C5A059] font-bold">Local Knowledge</span>
                <p className="text-sm font-semibold">Decades of combined field expertise across Somaliland plateaus.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              kicker="About Golis Expeditions"
              title="Pioneering Authentic Travel Across Somaliland"
              subtitle="Founded by veteran Somaliland guides and cultural historians, we believe in opening Somaliland to mindful global travelers while protecting its delicate antiquities."
              className="mb-0"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F382A]/10 text-[#0F382A] flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-[#161A18] font-display">Our Mission</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To provide safe, immersive, and culturally enriching expeditions throughout Somaliland that support regional communities and celebrate our rich archaeological inheritance.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F382A]/10 text-[#0F382A] flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-[#161A18] font-display">Our Vision</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To establish Somaliland as the benchmark for responsible, heritage-first cultural tourism in Africa, characterized by safety, environmental care, and deep community respect.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#0F382A] hover:bg-[#164E3A] text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Why Travel With Us? */}
      <section className="bg-[#09231A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            kicker="The Golis Difference"
            title="Why Travel With Us?"
            subtitle="Explore Somaliland with the confidence that comes from deep regional roots, accredited expedition leaders, and first-rate logistics."
            centered
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Experienced local guides */}
            <div className="bg-[#0F382A] p-6 rounded-xl border border-emerald-900/60 space-y-3 hover:border-[#C5A059]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#164E3A] text-[#C5A059] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Experienced Local Guides</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Native guides certified by the Somaliland Ministry of Tourism with fluent English, historical depth, and intimate clan relationships that open welcoming doors.
              </p>
            </div>

            {/* 2. Carefully planned itineraries */}
            <div className="bg-[#0F382A] p-6 rounded-xl border border-emerald-900/60 space-y-3 hover:border-[#C5A059]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#164E3A] text-[#C5A059] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Carefully Planned Itineraries</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Balanced travel pacing designed around optimal lighting for photography at Laas Geel, scenic highland hikes, and relaxed coastal evenings.
              </p>
            </div>

            {/* 3. Comfortable transportation */}
            <div className="bg-[#0F382A] p-6 rounded-xl border border-emerald-900/60 space-y-3 hover:border-[#C5A059]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#164E3A] text-[#C5A059] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Comfortable 4x4 Transportation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Modern Toyota Land Cruisers equipped with air conditioning, satellite communicators, first-aid equipment, and veteran desert drivers.
              </p>
            </div>

            {/* 4. Cultural experiences */}
            <div className="bg-[#0F382A] p-6 rounded-xl border border-emerald-900/60 space-y-3 hover:border-[#C5A059]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#164E3A] text-[#C5A059] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Deep Cultural Immersion</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Authentic encounters with camel nomads, traditional Somali tea house chats, classical poetry recitations, and genuine hospitality.
              </p>
            </div>

            {/* 5. Personalized travel arrangements */}
            <div className="bg-[#0F382A] p-6 rounded-xl border border-emerald-900/60 space-y-3 hover:border-[#C5A059]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#164E3A] text-[#C5A059] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Personalized Travel Arrangements</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Bespoke flexibility for photographers, university researchers, corporate delegations, and independent solo explorers alike.
              </p>
            </div>

            {/* 6. Responsible tourism */}
            <div className="bg-[#0F382A] p-6 rounded-xl border border-emerald-900/60 space-y-3 hover:border-[#C5A059]/40 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#164E3A] text-[#C5A059] flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-display text-white">Responsible Heritage Tourism</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Strict adherence to site preservation guidelines at Laas Geel, fair living wages for drivers, and patronizing locally owned guesthouses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Somaliland Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            kicker="Explore the Regions"
            title="Somaliland Destinations"
            subtitle="From ancient seaports to prehistoric caves and cloud-kissed mountain passes, explore the sovereign beauty of Somaliland."
            className="mb-0"
          />
          <Link
            to="/destinations"
            aria-label="View all Somaliland destination guides"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F382A] hover:text-[#C5A059] transition-colors"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DESTINATIONS_DATA.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* SECTION 10: Social Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF9F5] to-[#EAE4D7]/50 rounded-2xl border border-slate-300/80 p-8 sm:p-12 space-y-8">
          <SectionHeading
            kicker="Community & Heritage"
            title="Our Commitment to Social Impact & Conservation"
            subtitle="We believe that ethical tourism must be a direct engine for community dignity, environmental awareness, and cultural preservation across Somaliland."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
              <HeartHandshake className="w-6 h-6 text-[#0F382A]" aria-hidden="true" />
              <h4 className="text-base font-bold text-[#161A18] font-display">Supporting Local Communities</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We contract resident culinary artisans, local drivers, and village elders in rural Somaliland, ensuring that tourism revenue flows directly to host families.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
              <ShieldCheck className="w-6 h-6 text-[#0F382A]" aria-hidden="true" />
              <h4 className="text-base font-bold text-[#161A18] font-display">Antiquities Preservation</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We partner with site guardians at Laas Geel and Dhagah-Kuure, training our travelers in zero-touch cave etiquette to safeguard neolithic pigments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm space-y-3">
              <Leaf className="w-6 h-6 text-[#0F382A]" aria-hidden="true" />
              <h4 className="text-base font-bold text-[#161A18] font-display">Leave-No-Trace Principles</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                All expedition waste is packed out from desert wadis, plastic usage is curtailed with reusable hydration vessels, and natural wildlife habitats are honored.
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 italic">
            * Demonstration social impact goals highlighting our sustainable travel vision.
          </div>
        </div>
      </section>

      {/* SECTION 11: Travel Blog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            kicker="Dispatches & Stories"
            title="Somaliland Travel Blog"
            subtitle="Essays, history notes, and practical field advice written by our guides and archaeologists."
            className="mb-0"
          />
          <Link
            to="/blog"
            aria-label="View all Somaliland travel blog articles"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F382A] hover:text-[#C5A059] transition-colors"
          >
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_DATA.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#0F382A]/90 backdrop-blur-sm text-[#C5A059] text-[10px] font-bold px-2 py-0.5 rounded">
                  {post.category}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#161A18] group-hover:text-[#0F382A] transition-colors leading-snug font-display">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    to="/blog"
                    aria-label={`Read article: ${post.title}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F382A] hover:text-[#C5A059] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: Customer Testimonials */}
      <section className="bg-[#FAF9F5] border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeading
            kicker="Traveler Experiences"
            title="What Our Guests Say"
            subtitle="Authentic reflections from explorers who traveled with us across Somaliland."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.slice(0, 3).map((testi) => (
              <div
                key={testi.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(testi.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase text-slate-400 font-semibold">Demo Review</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{testi.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#161A18]">{testi.name}</h4>
                    <span className="text-[11px] text-slate-500 block">{testi.country}</span>
                  </div>
                  <span className="text-[10px] text-[#0F382A] font-semibold bg-[#0F382A]/5 px-2 py-0.5 rounded">
                    {testi.tourTaken.split(' ')[0]} Tour
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/testimonials"
              aria-label="Read all customer testimonials and reviews"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0F382A] hover:text-[#C5A059] transition-colors"
            >
              <span>Read All Customer Testimonials</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 13: Partners and Affiliations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center space-y-6">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
            Demonstration Partners & Affiliations
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors">
              <span className="text-xs font-bold text-slate-700 block font-display">Somaliland Hospitality Forum</span>
              <span className="text-[10px] text-slate-400">Accredited Member</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors">
              <span className="text-xs font-bold text-slate-700 block font-display">Horn Heritage Society</span>
              <span className="text-[10px] text-slate-400">Archaeological Liaison</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors">
              <span className="text-xs font-bold text-slate-700 block font-display">Gulf of Aden Maritime Trust</span>
              <span className="text-[10px] text-slate-400">Coastal Safety Affiliate</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors">
              <span className="text-xs font-bold text-slate-700 block font-display">Golis Conservation Network</span>
              <span className="text-[10px] text-slate-400">Eco-Trek Partner</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
