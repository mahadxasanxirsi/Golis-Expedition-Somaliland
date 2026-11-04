# Golis Expeditions - Somaliland Tourism & Travel Website

A modern, premium, responsive and fully interactive tourism portal for Somaliland, inspired by high-end expedition agencies with original branding, typography, and visual assets.

## Featured Somaliland Destinations
- **Laas Geel**: Ancient Neolithic rock art caves with 5,000+ year-old ochre murals.
- **Berbera**: Historic coastal seaport on the Gulf of Aden with Ottoman architecture & untouched beaches.
- **Sheikh**: High-altitude alpine mountain pass through the Golis escarpment.
- **Hargeisa**: The vibrant capital of Somaliland, camel markets, and cultural centres.
- **Zeila (Saylac)**: Medieval Adal Sultanate coastal ruins and the 7th-century Mosque of the Two Qiblas.
- **Borama**: Mountain university city in the western Awdal highlands.
- **Burco (Burao)**: Commercial crossroads, Togdheer seasonal riverbed, and poetry heritage.
- **Dhagah-Kuure**: Prehistoric rock art formations northwest of Hargeisa.
- **Erigavo (Ceerigaabo)**: Highland capital of Sanaag, mist-shrouded Daallo Forest, Mount Shimbiris (2,460m), and Maydi frankincense groves.

## Technology Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom brand tokens (Deep Forest Green, Warm Sand, Muted Gold)
- **Navigation**: React Router DOM
- **Carousels**: Swiper.js (Autoplay, Fade Effects, Navigation, Pagination)
- **Icons**: Lucide React
- **Forms & Validation**: Full client-side React form handling with instant validation, loading feedback, and demo submission states
- **Testing**: Node.js test runner (`node:test` + `node:assert/strict`)

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:3000`.

### 3. Run Unit Tests
```bash
npx --yes tsx --test src/utils/tourFilters.test.ts
```

### 4. Build for Production
```bash
npm run build
```

## Architecture Notes
- **Frontend-Only**: No backend, database, or external APIs are connected. All tour data, itineraries, pricing calculations, filters, and blog posts are driven by typed local datasets in `/src/data/`.
- **Somaliland-Exclusive**: Exclusively showcases Somaliland destinations and cultural heritage.
