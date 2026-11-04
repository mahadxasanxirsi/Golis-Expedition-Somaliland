import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/company';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(
    'Hello Macrobia & Golis Expeditions, I would like to inquire about Somaliland tours.'
  )}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat directly with HornExplore on WhatsApp at ${COMPANY_INFO.phone}`}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl hover:scale-108 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white" aria-hidden="true" />
        
        {/* Red notification dot matching Macrobia screenshot */}
        <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
      </a>
    </aside>
  );
};
