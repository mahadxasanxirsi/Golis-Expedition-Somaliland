export interface HornExplorePricingInput {
  adultCount: number;
  childCount: number;
  adultRate?: number;
  adultOriginalRate?: number;
  childRate?: number;
  bookingDate?: string;
}

export interface HornExploreLineItem {
  name: string;
  price: number;
  priceDisplay: string;
  originalPrice?: number;
  originalPriceDisplay?: string;
  qty: number;
  qtyDisplay: string;
  amount: number;
  amountDisplay: string;
}

export interface HornExplorePricingResult {
  bookingDate: string;
  adultRate: number;
  adultOriginalRate: number;
  childRate: number;
  adultCount: number;
  childCount: number;
  adultQtyDisplay: string;
  childQtyDisplay: string;
  adultSubtotal: number;
  childSubtotal: number;
  totalAmount: number;
  totalAmountDisplay: string;
  totalTravelers: number;
  totalSavings: number;
  lineItems: HornExploreLineItem[];
}

export const formatQty = (count: number): string => {
  const safeCount = Math.max(0, Math.floor(count || 0));
  return safeCount < 10 ? `0${safeCount}` : `${safeCount}`;
};

export const formatCurrency = (amount: number): string => {
  return `$${Math.round(amount).toLocaleString('en-US')}`;
};

export const calculateHornExplorePricing = (
  input: HornExplorePricingInput
): HornExplorePricingResult => {
  const adultCount = Math.max(0, Math.floor(input.adultCount || 0));
  const childCount = Math.max(0, Math.floor(input.childCount || 0));
  const adultRate = input.adultRate !== undefined ? input.adultRate : 350;
  const adultOriginalRate = input.adultOriginalRate !== undefined ? input.adultOriginalRate : 400;
  const childRate = input.childRate !== undefined ? input.childRate : 180;
  const bookingDate = input.bookingDate || '31-Oct-2026';

  const adultSubtotal = adultCount * adultRate;
  const childSubtotal = childCount * childRate;
  const totalAmount = adultSubtotal + childSubtotal;
  const totalTravelers = adultCount + childCount;
  const totalSavings = Math.max(0, (adultOriginalRate - adultRate) * adultCount);

  const adultLineItem: HornExploreLineItem = {
    name: 'Adult',
    price: adultRate,
    priceDisplay: formatCurrency(adultRate),
    originalPrice: adultOriginalRate,
    originalPriceDisplay: formatCurrency(adultOriginalRate),
    qty: adultCount,
    qtyDisplay: formatQty(adultCount),
    amount: adultSubtotal,
    amountDisplay: formatCurrency(adultSubtotal),
  };

  const childLineItem: HornExploreLineItem = {
    name: 'Children',
    price: childRate,
    priceDisplay: formatCurrency(childRate),
    qty: childCount,
    qtyDisplay: formatQty(childCount),
    amount: childSubtotal,
    amountDisplay: formatCurrency(childSubtotal),
  };

  return {
    bookingDate,
    adultRate,
    adultOriginalRate,
    childRate,
    adultCount,
    childCount,
    adultQtyDisplay: formatQty(adultCount),
    childQtyDisplay: formatQty(childCount),
    adultSubtotal,
    childSubtotal,
    totalAmount,
    totalAmountDisplay: formatCurrency(totalAmount),
    totalTravelers,
    totalSavings,
    lineItems: [adultLineItem, childLineItem],
  };
};

export const generateBookingReference = (date: string, prefix = 'HEX'): string => {
  const cleanDate = date.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${cleanDate}-${randomSuffix}`;
};
