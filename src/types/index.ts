export type TourCategory = 'Historical & Rock Art' | 'Coastal & Beach' | 'Mountain & Trekking' | 'Cultural & City' | 'Expedition & Safari';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string;
  overnight?: string;
}

export interface TourPricingTier {
  soloPrice: number;        // Rate for 1 solo traveler (dedicated 4x4 + private SPU security + driver)
  doublePrice: number;      // Standard rate per person for 2 travelers sharing 4x4 & SPU
  smallGroupPrice: number;  // Discounted rate per person for 3 to 5 travelers sharing logistics
  largeGroupPrice: number;  // Maximum discount rate per person for 6+ travelers
}

export type TourCountry = 'Somaliland' | 'Djibouti' | 'Somalia' | 'Ethiopia' | 'Combined';

export interface Tour {
  id: string;
  slug: string;
  title: string;
  country?: TourCountry;
  destination: string;
  region: string;
  duration: string;
  durationDays: number;
  price: number;
  adultPrice?: number;
  adultOriginalPrice?: number;
  childPrice?: number;
  pricingTiers?: TourPricingTier;
  category: TourCategory;
  image: string;
  secondaryImages: string[];
  description: string;
  longOverview: string;
  groupSize: string;
  physicalRating: 'Easy' | 'Moderate' | 'Challenging';
  bestSeason: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  accommodation: string;
  travelInfo: string;
}

export interface Destination {
  id: string;
  slug: string;
  title: string;
  somaliName?: string;
  region: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullOverview: string;
  attractions: string[];
  thingsToDo: string[];
  bestTimeToVisit: string;
  coordinates?: string;
  fastFacts: {
    elevation?: string;
    climate?: string;
    highlights?: string;
  };
}

export interface UpcomingTour {
  id: string;
  tourSlug: string;
  title: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  duration: string;
  durationDays: number;
  price: number;
  availableSpaces: number;
  totalSpaces: number;
  guide: string;
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  tourTaken: string;
  rating: number;
  date: string;
  review: string;
  avatar?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  experience: string;
  languages: string[];
  image: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Archaeology' | 'Coast & Sea' | 'Mountains' | 'Culture & City';
  location: string;
  image: string;
  caption: string;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  location: string;
  description: string;
  videoSrc?: string;
}
