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

## Netlify & GitHub Deployment

### Deploying to Netlify (e.g. `golisexpedition.netlify.app`)

This project is pre-configured for Netlify:
1. **SPA Redirects**: `public/_redirects` ensures direct navigation to `/tours`, `/admin`, `/destinations`, etc. loads `index.html` with HTTP 200 without 404 errors.
2. **Build Settings**: `netlify.toml` automatically configures:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. **Image Bundling**: All high-definition expedition photography assets in `src/assets/images/` and `public/images/` are bundled and hashed by Vite so images load across any subdomain, domain, or CDN.

### Connecting to GitHub & Updating Netlify

To push this project to your GitHub repository:
```bash
# 1. Add your GitHub repository remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 2. Push main branch
git push -u origin main
```

If your Netlify site (`golisexpedition.netlify.app`) is connected to your GitHub repository:
- Any new push to `main` triggers an automatic build and deploy on Netlify.
- All images, routes, and admin login features will automatically be live.
