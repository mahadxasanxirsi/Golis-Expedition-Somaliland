/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { WhyUs } from './pages/WhyUs';
import { Team } from './pages/Team';
import { Testimonials } from './pages/Testimonials';
import { Policies } from './pages/Policies';
import { Tours } from './pages/Tours';
import { TourDetails } from './pages/TourDetails';
import { Destinations } from './pages/Destinations';
import { DestinationDetails } from './pages/DestinationDetails';
import { UpcomingTours } from './pages/UpcomingTours';
import { CorporateTravel } from './pages/CorporateTravel';
import { TravelInfo } from './pages/TravelInfo';
import { Gallery } from './pages/Gallery';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E2320]">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/team" element={<Team />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/somaliland-tours" element={<Tours defaultCountry="Somaliland" />} />
            <Route path="/combined-tours" element={<Tours defaultCountry="Combined" />} />
            <Route path="/djibouti-tours" element={<Tours defaultCountry="Djibouti" />} />
            <Route path="/somalia-tours" element={<Tours defaultCountry="Somalia" />} />
            <Route path="/ethiopia-tours" element={<Tours defaultCountry="Ethiopia" />} />
            <Route path="/tours/:slug" element={<TourDetails />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetails />} />
            <Route path="/upcoming-tours" element={<UpcomingTours />} />
            <Route path="/corporate-travel" element={<CorporateTravel />} />
            <Route path="/travel-info" element={<TravelInfo />} />
            <Route path="/visa-info" element={<TravelInfo />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<Admin />} />
            <Route path="/admin/overview" element={<Admin />} />
            <Route path="/admin/messages" element={<Admin />} />
            <Route path="/admin/messages/:id" element={<Admin />} />
            <Route path="/admin/settings" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
