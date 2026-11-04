import { Tour, UpcomingTour } from '../types';

export interface TourFilterOptions {
  searchQuery?: string;
  country?: string; // 'all' | 'Somaliland' | 'Djibouti' | 'Somalia' | 'Ethiopia' | 'Combined'
  region?: string;  // e.g. 'Maroodi-Jeeh', 'Awdal', 'Sahil', 'Togdheer', 'Sanaag', 'Sool'
  destination?: string;
  category?: string;
  maxPrice?: number;
  duration?: string; // e.g. "short" (1-3 days), "medium" (4-5 days), "long" (6+ days)
  sortBy?: 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' | 'featured';
}

export function filterTours(tours: Tour[], options: TourFilterOptions): Tour[] {
  return tours.filter((tour) => {
    // Country filter
    if (options.country && options.country !== 'all') {
      const tourCountry = tour.country || 'Somaliland';
      if (tourCountry.toLowerCase() !== options.country.toLowerCase()) {
        return false;
      }
    }

    // Region filter
    if (options.region && options.region !== 'all') {
      const regQuery = options.region.toLowerCase();
      if (!tour.region.toLowerCase().includes(regQuery)) {
        return false;
      }
    }

    // Search query matches title, destination, highlights, or description
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      const matchTitle = tour.title.toLowerCase().includes(q);
      const matchDest = tour.destination.toLowerCase().includes(q);
      const matchDesc = tour.description.toLowerCase().includes(q);
      const matchHighlights = tour.highlights.some((h) => h.toLowerCase().includes(q));
      if (!matchTitle && !matchDest && !matchDesc && !matchHighlights) {
        return false;
      }
    }

    // Destination filter
    if (options.destination && options.destination !== 'all') {
      const destQuery = options.destination.toLowerCase();
      if (!tour.destination.toLowerCase().includes(destQuery)) {
        return false;
      }
    }

    // Category filter
    if (options.category && options.category !== 'all') {
      if (tour.category !== options.category) {
        return false;
      }
    }

    // Max Price filter
    if (options.maxPrice && options.maxPrice > 0) {
      if (tour.price > options.maxPrice) {
        return false;
      }
    }

    // Duration filter
    if (options.duration && options.duration !== 'all') {
      if (options.duration === 'short' && tour.durationDays > 3) return false;
      if (options.duration === 'medium' && (tour.durationDays < 4 || tour.durationDays > 5)) return false;
      if (options.duration === 'long' && tour.durationDays < 6) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (options.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'duration-asc':
        return a.durationDays - b.durationDays;
      case 'duration-desc':
        return b.durationDays - a.durationDays;
      case 'featured':
      default:
        return 0;
    }
  });
}

export function filterUpcomingTours(
  departures: UpcomingTour[],
  filters: { month?: string; destination?: string }
): UpcomingTour[] {
  return departures.filter((dep) => {
    if (filters.destination && filters.destination !== 'all') {
      if (!dep.destination.toLowerCase().includes(filters.destination.toLowerCase())) {
        return false;
      }
    }
    if (filters.month && filters.month !== 'all') {
      // departureDate is "YYYY-MM-DD"
      const depMonth = dep.departureDate.substring(0, 7); // e.g. "2026-11"
      if (depMonth !== filters.month) {
        return false;
      }
    }
    return true;
  });
}

export interface QuoteCalculation {
  basePerPerson: number;
  travelers: number;
  singleRooms: number;
  subtotal: number;
  groupDiscount: number;
  total: number;
}

export interface DetailedTourQuote {
  tourId: string;
  tourSlug: string;
  tourTitle: string;
  destination: string;
  region: string;
  duration: string;
  travelers: number;
  singleRooms: number;
  ratePerIndividual: number;
  tierName: string;
  savingsPerPerson: number;
  transportationType: string;
  securityInclusion: string;
  subtotal: number;
  singleSupplementTotal: number;
  groupDiscount: number;
  totalAmount: number;
}

export function getTieredPricePerPerson(
  tour: Tour,
  travelers: number
): { rate: number; tierName: string; savingsPerPerson: number } {
  const safeCount = Math.max(1, travelers);

  if (tour.pricingTiers) {
    if (safeCount === 1) {
      return {
        rate: tour.pricingTiers.soloPrice,
        tierName: 'Solo Traveler (Private 4x4 & Dedicated SPU Escort)',
        savingsPerPerson: 0,
      };
    } else if (safeCount === 2) {
      return {
        rate: tour.pricingTiers.doublePrice,
        tierName: 'Duo / Pair (Shared 4x4 & SPU Escort)',
        savingsPerPerson: tour.pricingTiers.soloPrice - tour.pricingTiers.doublePrice,
      };
    } else if (safeCount <= 5) {
      return {
        rate: tour.pricingTiers.smallGroupPrice,
        tierName: 'Small Group (3–5 Guests - Shared Logistics)',
        savingsPerPerson: tour.pricingTiers.soloPrice - tour.pricingTiers.smallGroupPrice,
      };
    } else {
      return {
        rate: tour.pricingTiers.largeGroupPrice,
        tierName: 'Group Expedition (6+ Guests - Maximum Value)',
        savingsPerPerson: tour.pricingTiers.soloPrice - tour.pricingTiers.largeGroupPrice,
      };
    }
  }

  // Realistic fallback based on standard Somaliland expedition operations
  if (safeCount === 1) {
    const solo = Math.round(tour.price * 1.42);
    return {
      rate: solo,
      tierName: 'Solo Traveler (Private 4x4 & SPU)',
      savingsPerPerson: 0,
    };
  } else if (safeCount === 2) {
    return {
      rate: tour.price,
      tierName: 'Duo / Pair (Standard Shared Rate)',
      savingsPerPerson: Math.round(tour.price * 0.42),
    };
  } else if (safeCount <= 5) {
    const smallGrp = Math.round(tour.price * 0.85);
    return {
      rate: smallGrp,
      tierName: 'Small Group (3–5 Guests)',
      savingsPerPerson: Math.round(tour.price * 1.42) - smallGrp,
    };
  } else {
    const largeGrp = Math.round(tour.price * 0.75);
    return {
      rate: largeGrp,
      tierName: 'Group Expedition (6+ Guests)',
      savingsPerPerson: Math.round(tour.price * 1.42) - largeGrp,
    };
  }
}

export function calculateDetailedQuote(
  tour: Tour,
  travelers: number,
  singleRooms: number = 0
): DetailedTourQuote {
  const safeTravelers = Math.max(1, travelers);
  const safeRooms = Math.max(0, singleRooms);
  const { rate, tierName, savingsPerPerson } = getTieredPricePerPerson(tour, safeTravelers);
  
  const baseCost = rate * safeTravelers;
  const singleSupplementRate = 220;
  const singleSupplementTotal = safeRooms * singleSupplementRate;
  const subtotal = baseCost + singleSupplementTotal;

  // Additional 5% promotional discount for large pre-booked groups (4+ travelers)
  const groupDiscount = safeTravelers >= 4 ? Math.round(subtotal * 0.05) : 0;
  const totalAmount = subtotal - groupDiscount;

  return {
    tourId: tour.id,
    tourSlug: tour.slug,
    tourTitle: tour.title,
    destination: tour.destination,
    region: tour.region,
    duration: tour.duration,
    travelers: safeTravelers,
    singleRooms: safeRooms,
    ratePerIndividual: rate,
    tierName,
    savingsPerPerson,
    transportationType:
      safeTravelers <= 4
        ? 'Private 4WD Toyota Land Cruiser (Air Conditioned)'
        : 'Multiple 4WD Toyota Land Cruisers Convoy',
    securityInclusion: 'Special Protection Unit (SPU) Police Escort & Ministry Travel Permits',
    subtotal,
    singleSupplementTotal,
    groupDiscount,
    totalAmount,
  };
}

export function calculateBookingEstimate(
  pricePerPerson: number,
  travelers: number,
  singleRooms: number = 0
): QuoteCalculation {
  const safeTravelers = Math.max(1, travelers);
  const safeRooms = Math.max(0, singleRooms);
  const baseCost = pricePerPerson * safeTravelers;
  const singleSupplementRate = 220; // fictional sample single room supplement
  const supplementCost = safeRooms * singleSupplementRate;
  const subtotal = baseCost + supplementCost;

  // 5% discount for groups of 4 or more
  const groupDiscount = safeTravelers >= 4 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal - groupDiscount;

  return {
    basePerPerson: pricePerPerson,
    travelers: safeTravelers,
    singleRooms: safeRooms,
    subtotal,
    groupDiscount,
    total,
  };
}
