import { SOMALILAND_IMAGES } from './images';

export interface SomalilandRegion {
  id: string;
  name: string;
  somaliName: string;
  regionalCapital: string;
  keyCharacteristics: string;
  landArea: string;
  populationEstimate: string;
  image: string;
  majorTowns: string[];
  keyAttractions: string[];
  destinations: string[];
  economicPillars: string[];
  highlightsTag: string;
}

export const SOMALILAND_REGIONS: SomalilandRegion[] = [
  {
    id: 'maroodi-jeeh',
    name: 'Maroodi-Jeeh',
    somaliName: 'Maroodi Jeex',
    regionalCapital: 'Hargeisa (Also the national capital)',
    keyCharacteristics:
      'The most populous region and the central economic, governmental, and administrative hub of Somaliland.',
    landArea: '17,429 km²',
    populationEstimate: '1,500,000+',
    image: SOMALILAND_IMAGES.hargeisaCity,
    highlightsTag: 'Capital & Neolithic Rock Art',
    majorTowns: ['Hargeisa', 'Gabiley', 'Wajaale', 'Salahley'],
    keyAttractions: [
      'Laas Geel Prehistoric Rock Art (5,000+ years old)',
      'Dhagah-Kuure Granite Rock Paintings',
      'Hargeisa Open-Air Camel & Livestock Market',
      'MiG-17 Freedom Square & War Memorial',
      'Hargeisa Cultural Centre & Redsea Foundation',
      'Naasa Hablood Twin Granite Peaks',
    ],
    destinations: ['hargeisa', 'laas-geel', 'dhagah-kuure'],
    economicPillars: [
      'National Finance & Banking',
      'Import & Wholesale Logistics',
      'Livestock Trade Hub',
      'Higher Education & Government Administration',
    ],
  },
  {
    id: 'awdal',
    name: 'Awdal',
    somaliName: 'Awdal',
    regionalCapital: 'Borama',
    keyCharacteristics:
      'Located in the far northwest bordering Ethiopia and Djibouti; famous for its educational institutions and lush agricultural hills.',
    landArea: '21,374 km²',
    populationEstimate: '450,000+',
    image: SOMALILAND_IMAGES.zeilaHeritage,
    highlightsTag: 'Academia & Adal Sultanate Ruins',
    majorTowns: ['Borama', 'Zeila (Saylac)', 'Baki', 'Lughaya'],
    keyAttractions: [
      'Ancient port city of Zeila (Saylac) and Adal Sultanate coral ruins',
      'Masjid al-Qiblatayn (7th-century Mosque of the Two Qiblas)',
      'Amoud University historic valley campus (pioneer of post-war higher education)',
      'Saadadin Archipelago and pristine coral reef diving spots',
      'Lush guava and mango orchard valleys of Borama',
    ],
    destinations: ['zeila', 'borama'],
    economicPillars: [
      'Higher Education & Academia',
      'Agricultural Horticulture (Fruit & Vegetables)',
      'Cross-Border Ethiopian & Djiboutian Commerce',
      'Maritime Artisanal Fisheries',
    ],
  },
  {
    id: 'sahil',
    name: 'Sahil',
    somaliName: 'Saaxil',
    regionalCapital: 'Berbera',
    keyCharacteristics:
      'The central coastal strip; features the nation’s modernized primary deep-water seaport and dramatic mountain passes.',
    landArea: '26,228 km²',
    populationEstimate: '350,000+',
    image: SOMALILAND_IMAGES.berberaCoast,
    highlightsTag: 'Deep Seaport & Bathelo Coast',
    majorTowns: ['Berbera', 'Sheikh', 'Mandheera', 'Bullaxaar'],
    keyAttractions: [
      'Modernized Berbera Deep-Sea Seaport & DP World Free Economic Zone',
      'Old Ottoman coral stone merchant district and dhow building yards',
      'Bathelo Beach and warm Gulf of Aden waters',
      'Sheikh Mountain Pass hairpin escarpment & highland canyon trails',
      'Cold War 4.14-km airstrip (former NASA Space Shuttle emergency runway)',
    ],
    destinations: ['berbera', 'sheikh'],
    economicPillars: [
      'International Maritime Shipping & Port Logistics',
      'Red Sea & Gulf of Aden Livestock Export Seaport',
      'Coastal Beach & Cultural Tourism',
      'Commercial Salt Production & Fisheries',
    ],
  },
  {
    id: 'togdheer',
    name: 'Togdheer',
    somaliName: 'Togdheer',
    regionalCapital: 'Burao (Burco)',
    keyCharacteristics:
      'The central inland plateau region; major crossroads and traditional livestock trade hub where Somaliland modern independence was reaffirmed.',
    landArea: '38,663 km²',
    populationEstimate: '600,000+',
    image: SOMALILAND_IMAGES.sheikhMountains,
    highlightsTag: 'Inland Crossroads & Somali Poetry',
    majorTowns: ['Burao (Burco)', 'Oodweyne', 'Buhoodle', 'Yirowe'],
    keyAttractions: [
      'Historical 1991 Grand Conference independence declaration site (Freedom Hall)',
      'Togdheer Seasonal Riverbed and historic colonial bridge',
      'Burao Central Livestock Suuq (largest camel trade terminal in East Africa)',
      'Classical Somali Poetry academies and oral heritage tea houses',
      'Historic trade routes connecting northern ports to the Hawd pastures',
    ],
    destinations: ['burco'],
    economicPillars: [
      'Pastoralist Camel & Sheep Husbandry',
      'Inland Transshipment & Cargo Trucking',
      'Leatherwork, Tanning & Artisanal Crafts',
      'Wholesale Commodity Distribution',
    ],
  },
  {
    id: 'sanaag',
    name: 'Sanaag',
    somaliName: 'Sanaag',
    regionalCapital: 'Erigavo (Ceerigaabo)',
    keyCharacteristics:
      'The largest region by land area; features a highly diverse mountainous terrain, pristine Daallo cloud forest, and Mount Shimbiris (2,460m).',
    landArea: '53,374 km²',
    populationEstimate: '380,000+',
    image: SOMALILAND_IMAGES.erigavoDaallo,
    highlightsTag: 'Daallo Cloud Forest & Mt Shimbiris',
    majorTowns: ['Erigavo (Ceerigaabo)', 'Maydh', 'Heis (Xiis)', 'Badhan'],
    keyAttractions: [
      'Daallo Cloud Forest National Reserve & 1,000m sheer limestone cliffs',
      'Mount Shimbiris (2,460 m / 8,071 ft – Somaliland’s rooftop summit)',
      'Ancient cliffside Frankincense (Maydi: Boswellia frereana) groves',
      'Historic maritime harbor of Maydh (Tomb of Sheikh Isaaq)',
      'Organic Sanaag mountain wildflower honey & herbal tea traditions',
      'Site of the historic 1993 Sanaag Reconciliation Peace Assembly',
    ],
    destinations: ['erigavo'],
    economicPillars: [
      'Wild Frankincense & Myrrh Gum Resin Harvesting',
      'Highland Beekeeping & Organic Honey Production',
      'Mountain Eco-Trekking & Adventure Tourism',
      'Artisanal Fishing along the Sanaag Gulf Coast',
    ],
  },
  {
    id: 'sool',
    name: 'Sool',
    somaliName: 'Sool',
    regionalCapital: 'Laas Caanood (Las Anod)',
    keyCharacteristics:
      'The southeastern border region; known for its historic anti-colonial Daraawiish fortresses, expansive grazing plains, and rich pastoral heritage.',
    landArea: '25,036 km²',
    populationEstimate: '320,000+',
    image: SOMALILAND_IMAGES.laasGeel,
    highlightsTag: 'Daraawiish Fortresses of Taleh & Nugaal',
    majorTowns: ['Laas Caanood (Las Anod)', 'Taleh (Taleex)', 'Aynaba', 'Hudun'],
    keyAttractions: [
      'Historic Taleh Stone Fortress Complex (Capital of the anti-colonial Daraawiish Movement led by Sayid Mohamed Abdullah Hassan)',
      'Aynaba Desert Oases & ancient pastoralist watering wells',
      'Expansive Nugaal Valley savanna grazing plains',
      'Traditional nomadic livestock seasonal encampments',
      'Carved stone memorial towers and classical poetic recitation heritage',
    ],
    destinations: ['laas-caanood'],
    economicPillars: [
      'Nomadic Pastoralist Livestock (Camels & Blackhead Somali Sheep)',
      'Cross-Plateau Overland Commerce & Trucking',
      'Historic Fort Heritage & Antiques',
      'Traditional Leather Crafting',
    ],
  },
];
