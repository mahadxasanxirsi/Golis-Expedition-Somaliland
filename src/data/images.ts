// Static asset resolution compatible with both Vite production bundler (Netlify/custom domains) and Node.js
export const SOMALILAND_IMAGES = {
  laasGeel: new URL('../assets/images/somaliland_hero_laasgeel_1793370051817.jpg', import.meta.url).href,
  berberaCoast: new URL('../assets/images/somaliland_berbera_coast_1793370051345.jpg', import.meta.url).href,
  sheikhMountains: new URL('../assets/images/somaliland_sheikh_mountains_1793370052369.jpg', import.meta.url).href,
  hargeisaCity: new URL('../assets/images/somaliland_hargeisa_landmark_1793370052900.jpg', import.meta.url).href,
  zeilaHeritage: new URL('../assets/images/somaliland_zeila_heritage_1793370053648.jpg', import.meta.url).href,
  erigavoDaallo: new URL('../assets/images/somaliland_erigavo_daallo_1793378054459.jpg', import.meta.url).href,
};
