import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterTours,
  filterUpcomingTours,
  calculateBookingEstimate,
  getTieredPricePerPerson,
  calculateDetailedQuote,
} from './tourFilters';
import { Tour, UpcomingTour } from '../types';

const mockTours: Tour[] = [
  {
    id: 't1',
    slug: 'tour-one',
    title: 'Laas Geel Rock Art',
    destination: 'Laas Geel & Hargeisa',
    region: 'Maroodi Jeex',
    duration: '3 Days',
    durationDays: 3,
    price: 800,
    pricingTiers: {
      soloPrice: 1200,
      doublePrice: 800,
      smallGroupPrice: 680,
      largeGroupPrice: 600,
    },
    category: 'Historical & Rock Art',
    image: '',
    secondaryImages: [],
    description: 'Ancient rock paintings',
    longOverview: '',
    groupSize: '8',
    physicalRating: 'Easy',
    bestSeason: 'Winter',
    highlights: ['Cave Paintings', 'Hargeisa Suuq'],
    itinerary: [],
    included: [],
    excluded: [],
    accommodation: '',
    travelInfo: '',
  },
  {
    id: 't2',
    slug: 'tour-two',
    title: 'Berbera Coastal Breeze',
    destination: 'Berbera Coast',
    region: 'Sahil',
    duration: '5 Days',
    durationDays: 5,
    price: 1200,
    category: 'Coastal & Beach',
    image: '',
    secondaryImages: [],
    description: 'Gulf of Aden beaches',
    longOverview: '',
    groupSize: '10',
    physicalRating: 'Easy',
    bestSeason: 'Nov - Feb',
    highlights: ['Bathelo Beach', 'Seafood'],
    itinerary: [],
    included: [],
    excluded: [],
    accommodation: '',
    travelInfo: '',
  },
  {
    id: 't3',
    slug: 'tour-three',
    title: 'Sheikh Mountain Trek',
    destination: 'Sheikh & Golis Range',
    region: 'Sahil',
    duration: '7 Days',
    durationDays: 7,
    price: 1600,
    category: 'Mountain & Trekking',
    image: '',
    secondaryImages: [],
    description: 'Highland passes',
    longOverview: '',
    groupSize: '6',
    physicalRating: 'Challenging',
    bestSeason: 'Autumn',
    highlights: ['Mountain pass', 'Golis gorges'],
    itinerary: [],
    included: [],
    excluded: [],
    accommodation: '',
    travelInfo: '',
  },
];

const mockDepartures: UpcomingTour[] = [
  {
    id: 'd1',
    tourSlug: 'tour-one',
    title: 'Laas Geel',
    destination: 'Laas Geel',
    departureDate: '2026-11-10',
    returnDate: '2026-11-13',
    duration: '3 Days',
    durationDays: 3,
    price: 800,
    availableSpaces: 3,
    totalSpaces: 8,
    guide: 'Jamaal',
  },
  {
    id: 'd2',
    tourSlug: 'tour-two',
    title: 'Berbera Beach',
    destination: 'Berbera',
    departureDate: '2026-12-05',
    returnDate: '2026-12-10',
    duration: '5 Days',
    durationDays: 5,
    price: 1200,
    availableSpaces: 5,
    totalSpaces: 10,
    guide: 'Khadar',
  },
];

test('filterTours filters correctly by category', () => {
  const result = filterTours(mockTours, { category: 'Coastal & Beach' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 't2');
});

test('filterTours filters correctly by duration (short)', () => {
  const result = filterTours(mockTours, { duration: 'short' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 't1');
});

test('filterTours filters by text search query', () => {
  const result = filterTours(mockTours, { searchQuery: 'Bathelo' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 't2');
});

test('filterTours sorts by price descending', () => {
  const result = filterTours(mockTours, { sortBy: 'price-desc' });
  assert.equal(result[0].price, 1600);
  assert.equal(result[result.length - 1].price, 800);
});

test('filterUpcomingTours filters by month and destination', () => {
  const novResults = filterUpcomingTours(mockDepartures, { month: '2026-11' });
  assert.equal(novResults.length, 1);
  assert.equal(novResults[0].id, 'd1');

  const berberaResults = filterUpcomingTours(mockDepartures, { destination: 'Berbera' });
  assert.equal(berberaResults.length, 1);
  assert.equal(berberaResults[0].id, 'd2');
});

test('calculateBookingEstimate calculates correct pricing and group discounts', () => {
  // 2 travelers, 0 single room supplement
  const quote1 = calculateBookingEstimate(1000, 2, 0);
  assert.equal(quote1.subtotal, 2000);
  assert.equal(quote1.groupDiscount, 0);
  assert.equal(quote1.total, 2000);

  // 4 travelers (eligible for 5% group discount) + 1 single room ($220)
  // subtotal = 4*1000 + 220 = 4220; discount = 4220 * 0.05 = 211; total = 4009
  const quote2 = calculateBookingEstimate(1000, 4, 1);
  assert.equal(quote2.subtotal, 4220);
  assert.equal(quote2.groupDiscount, 211);
  assert.equal(quote2.total, 4009);
});

test('getTieredPricePerPerson adjusts amount charged per individual based on group size', () => {
  const tour = mockTours[0];
  // 1 Solo traveler -> soloPrice (1200)
  const solo = getTieredPricePerPerson(tour, 1);
  assert.equal(solo.rate, 1200);
  assert.match(solo.tierName, /Solo/);

  // 2 Duo travelers -> doublePrice (800)
  const duo = getTieredPricePerPerson(tour, 2);
  assert.equal(duo.rate, 800);
  assert.equal(duo.savingsPerPerson, 400);

  // 3-5 Small Group -> smallGroupPrice (680)
  const smallGrp = getTieredPricePerPerson(tour, 3);
  assert.equal(smallGrp.rate, 680);

  // 6+ Large Group -> largeGroupPrice (600)
  const largeGrp = getTieredPricePerPerson(tour, 8);
  assert.equal(largeGrp.rate, 600);
});

test('calculateDetailedQuote calculates individual rate, destination logistics and total amount', () => {
  const tour = mockTours[0];
  const quote = calculateDetailedQuote(tour, 2, 0);

  assert.equal(quote.destination, 'Laas Geel & Hargeisa');
  assert.equal(quote.ratePerIndividual, 800);
  assert.equal(quote.travelers, 2);
  assert.equal(quote.totalAmount, 1600);
  assert.match(quote.securityInclusion, /SPU/);
});

test('filterTours filters correctly by country and region', () => {
  const multiCountryTours: Tour[] = [
    { ...mockTours[0], id: 'c1', country: 'Somaliland', region: 'Maroodi-Jeeh Region' },
    { ...mockTours[1], id: 'c2', country: 'Somaliland', region: 'Sahil Region' },
    { ...mockTours[2], id: 'c3', country: 'Djibouti', region: 'Gulf of Tadjoura' },
  ];

  const somalilandOnly = filterTours(multiCountryTours, { country: 'Somaliland' });
  assert.equal(somalilandOnly.length, 2);

  const djiboutiOnly = filterTours(multiCountryTours, { country: 'Djibouti' });
  assert.equal(djiboutiOnly.length, 1);
  assert.equal(djiboutiOnly[0].id, 'c3');

  const maroodiJeehOnly = filterTours(multiCountryTours, { region: 'Maroodi-Jeeh' });
  assert.equal(maroodiJeehOnly.length, 1);
  assert.equal(maroodiJeehOnly[0].id, 'c1');
});

