import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { ArrowRight, Compass, MapPin } from 'lucide-react';
import { SOMALILAND_IMAGES } from '../../data/images';
import { ImageWithFallback } from '../common/ImageWithFallback';

const HERO_SLIDES = [
  {
    image: SOMALILAND_IMAGES.laasGeel,
    kicker: 'Prehistoric Archaeology & Rock Shelters',
    heading: 'Discover the Beauty of Somaliland',
    subheading: 'Stand before 5,000-year-old neolithic rock art murals at Laas Geel, painted with sacred ochre that has defied millennia.',
    destination: 'Laas Geel, Maroodi Jeex Region',
    tourLink: '/tours/laas-geel-historical-adventure',
  },
  {
    image: SOMALILAND_IMAGES.berberaCoast,
    kicker: 'Untamed Gulf of Aden Coastline',
    heading: 'Explore. Experience. Remember Somaliland.',
    subheading: 'Miles of tranquil golden beaches, turquoise water, historic Ottoman merchant quarters, and the freshest seafood in the Horn.',
    destination: 'Berbera Coast, Sahil Region',
    tourLink: '/tours/berbera-coastal-escape',
  },
  {
    image: SOMALILAND_IMAGES.sheikhMountains,
    kicker: 'High Alpine Golis Mountain Pass',
    heading: 'Cross the Majestic Highland Escarpment',
    subheading: 'Winding mountain hairpin roads, deep rocky canyons, juniper tree groves, and refreshing cool breezes at 1,400 meters altitude.',
    destination: 'Sheikh Pass, Golis Mountains',
    tourLink: '/tours/sheikh-mountain-adventure',
  },
  {
    image: SOMALILAND_IMAGES.hargeisaCity,
    kicker: 'Vibrant Horn of Africa Capital',
    heading: 'The Warm & Welcoming Pulse of Hargeisa',
    subheading: 'Experience lively open-air livestock auctions, legendary money markets, poetry salons, and world-class Somali hospitality.',
    destination: 'Hargeisa City & Naasa Hablood',
    tourLink: '/tours/hargeisa-city-experience',
  },
  {
    image: SOMALILAND_IMAGES.zeilaHeritage,
    kicker: 'Ancient Red Sea Maritime Outpost',
    heading: 'Journey into the Adal Sultanate of Zeila',
    subheading: 'The 7th-century Mosque of the Two Qiblas and coastal coral stone ruins whispering stories of ancient global trade routes.',
    destination: 'Zeila (Saylac), Awdal Coast',
    tourLink: '/tours/zeila-historical-journey',
  },
];

export const HeroSlider: React.FC = () => {
  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Somaliland destinations and expeditions"
      className="relative w-full h-[620px] sm:h-[680px] lg:h-[740px] bg-[#09231A] overflow-hidden select-none"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{
          clickable: true,
        }}
        loop
        className="w-full h-full"
      >
        {HERO_SLIDES.map((slide, idx) => (
          <SwiperSlide
            key={idx}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide.heading} (${idx + 1} of ${HERO_SLIDES.length})`}
            className="relative w-full h-full"
          >
            {/* Background Image with Fallback */}
            <div className="absolute inset-0 w-full h-full">
              <ImageWithFallback
                src={slide.image}
                alt={slide.heading}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
              />
              {/* Cinematic Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#09231A]/80 via-transparent to-transparent hidden md:block" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-8 lg:px-12 flex flex-col justify-end pb-16 sm:pb-24 lg:pb-28">
              <div className="max-w-3xl space-y-3 sm:space-y-4">
                {/* Location indicator */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#09231A]/80 backdrop-blur-md border border-[#C5A059]/40 text-[#C5A059] text-[11px] sm:text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" aria-hidden="true" />
                  <span>{slide.destination}</span>
                  <span className="text-white/40" aria-hidden="true">·</span>
                  <span className="text-white/80">{slide.kicker}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance font-display drop-shadow-md">
                  {slide.heading}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 leading-relaxed max-w-2xl text-pretty drop-shadow">
                  {slide.subheading}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/tours"
                    aria-label={`Explore tour packages for ${slide.destination}`}
                    className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#b08e4d] text-[#09231A] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <span>Explore Our Tours</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  <Link
                    to="/destinations"
                    aria-label="Discover all Somaliland destinations and regions"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-lg backdrop-blur-md border border-white/30 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Compass className="w-4 h-4 text-[#C5A059]" aria-hidden="true" />
                    <span>Discover Somaliland</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
