import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateHornExplorePricing,
  formatQty,
  formatCurrency,
  generateBookingReference,
} from './pricing';

test('formatQty formats single digits with leading zero', () => {
  assert.equal(formatQty(0), '00');
  assert.equal(formatQty(1), '01');
  assert.equal(formatQty(9), '09');
  assert.equal(formatQty(10), '10');
  assert.equal(formatQty(12), '12');
});

test('formatCurrency outputs clean dollar representation', () => {
  assert.equal(formatCurrency(350), '$350');
  assert.equal(formatCurrency(400), '$400');
  assert.equal(formatCurrency(180), '$180');
  assert.equal(formatCurrency(0), '$0');
});

test('calculateHornExplorePricing calculates exact hornexplore.com default breakdown (1 Adult, 0 Children)', () => {
  const result = calculateHornExplorePricing({
    adultCount: 1,
    childCount: 0,
    bookingDate: '31-Oct-2026',
  });

  assert.equal(result.bookingDate, '31-Oct-2026');
  assert.equal(result.adultRate, 350);
  assert.equal(result.adultOriginalRate, 400);
  assert.equal(result.childRate, 180);
  assert.equal(result.adultCount, 1);
  assert.equal(result.childCount, 0);
  assert.equal(result.adultQtyDisplay, '01');
  assert.equal(result.childQtyDisplay, '00');
  assert.equal(result.adultSubtotal, 350);
  assert.equal(result.childSubtotal, 0);
  assert.equal(result.totalAmount, 350);
  assert.equal(result.totalAmountDisplay, '$350');
  assert.equal(result.totalSavings, 50);

  // Line items check
  assert.equal(result.lineItems.length, 2);
  const adultItem = result.lineItems[0];
  assert.equal(adultItem.name, 'Adult');
  assert.equal(adultItem.priceDisplay, '$350');
  assert.equal(adultItem.qtyDisplay, '01');
  assert.equal(adultItem.amountDisplay, '$350');

  const childItem = result.lineItems[1];
  assert.equal(childItem.name, 'Children');
  assert.equal(childItem.priceDisplay, '$180');
  assert.equal(childItem.qtyDisplay, '00');
  assert.equal(childItem.amountDisplay, '$0');
});

test('calculateHornExplorePricing computes multi-traveler combinations correctly', () => {
  // 2 Adults + 1 Child: (2 * 350) + (1 * 180) = 700 + 180 = 880
  const result = calculateHornExplorePricing({
    adultCount: 2,
    childCount: 1,
    bookingDate: '31-Oct-2026',
  });

  assert.equal(result.adultSubtotal, 700);
  assert.equal(result.childSubtotal, 180);
  assert.equal(result.totalAmount, 880);
  assert.equal(result.totalAmountDisplay, '$880');
  assert.equal(result.totalTravelers, 3);
  assert.equal(result.totalSavings, 100);
});

test('calculateHornExplorePricing handles custom tour rates correctly', () => {
  const result = calculateHornExplorePricing({
    adultCount: 3,
    childCount: 2,
    adultRate: 350,
    adultOriginalRate: 400,
    childRate: 180,
    bookingDate: '15-Nov-2026',
  });

  // (3 * 350) + (2 * 180) = 1050 + 360 = 1410
  assert.equal(result.totalAmount, 1410);
  assert.equal(result.totalAmountDisplay, '$1,410');
  assert.equal(result.bookingDate, '15-Nov-2026');
});

test('generateBookingReference produces formatted reference code', () => {
  const ref = generateBookingReference('31-Oct-2026');
  assert.match(ref, /^HEX-31OCT2026-\d{4}$/);
});
