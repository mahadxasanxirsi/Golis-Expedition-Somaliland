export interface CompanyInfo {
  name: string;
  brandName: string;
  website: string;
  websiteDisplay: string;
  phone: string;
  phoneFormatted: string;
  phoneRaw: string;
  secondaryPhone: string;
  email: string;
  secondaryEmail: string;
  address: string;
  fullAddress: string;
  city: string;
  region: string;
  country: string;
  aboutText: string;
  logisticsConsultantBadge: string;
  copyright: string;
  paymentPartners: {
    name: string;
    description: string;
    badge: string;
  }[];
  quickLinks: {
    label: string;
    path: string;
  }[];
  featuredPricing: {
    defaultDate: string;
    adultPrice: number;
    adultOriginalPrice: number;
    childPrice: number;
  };
}

export const COMPANY_INFO: CompanyInfo = {
  name: 'Golis Expeditions - Somaliland Tourism & Travel',
  brandName: 'Golis Expeditions',
  website: 'https://hornexplore.com/',
  websiteDisplay: 'golisexpeditions.com',
  phone: '+252-63-6995562',
  phoneFormatted: '+252-63-6995562',
  phoneRaw: '+252636995562',
  secondaryPhone: '+252-6-344-433-34',
  email: 'mahdxasan0062z@gmail.com',
  secondaryEmail: 'info@hornexplore.com',
  address: 'Asha mall,Goljano,Hargeisa',
  fullAddress: 'Asha mall, Goljano, Hargeisa, Somaliland',
  city: 'Hargeisa',
  region: 'Maroodi-Jeeh',
  country: 'Somaliland',
  aboutText:
    'Welcome to Golis Expeditions where every journey begins with a dream and ends with unforgettable memories. Our travel specialists have in-depth knowledge of destinations across Somaliland and the Horn of Africa.',
  logisticsConsultantBadge: 'We offer logistics and investment consultant',
  copyright: 'Copyright 2026 Golis Expeditions - Somaliland Tourism & Travel',
  paymentPartners: [
    {
      name: 'Zaad Service',
      description: 'Telesom Mobile Money - Dial *888#',
      badge: 'ZAAD',
    },
    {
      name: 'e-Dahab',
      description: 'Dahabshiil Mobile Banking',
      badge: 'E-DAHAB',
    },
    {
      name: 'Premier Bank',
      description: 'Somaliland & East Africa Commercial Bank',
      badge: 'PREMIER',
    },
    {
      name: 'Visa & Mastercard',
      description: 'International Credit & Debit Cards',
      badge: 'VISA / MC',
    },
  ],
  quickLinks: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'privacy policy', path: '/policies' },
    { label: 'FAQS', path: '/contact' },
  ],
  featuredPricing: {
    defaultDate: '31-Oct-2026',
    adultPrice: 350,
    adultOriginalPrice: 400,
    childPrice: 180,
  },
};
