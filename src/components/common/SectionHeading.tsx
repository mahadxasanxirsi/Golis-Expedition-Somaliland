import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  centered = false,
  className = '',
  light = false,
}) => {
  return (
    <div className={`space-y-3 mb-10 ${centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <div className={`text-xs uppercase tracking-widest font-semibold flex items-center gap-2 ${centered ? 'justify-center' : ''} ${light ? 'text-[#C5A059]' : 'text-[#0F382A]'}`}>
          <span className="w-6 h-[2px] bg-[#C5A059]" />
          <span>{kicker}</span>
          {centered && <span className="w-6 h-[2px] bg-[#C5A059]" />}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-balance ${
          light ? 'text-white' : 'text-[#161A18]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm sm:text-base leading-relaxed ${light ? 'text-[#EAE4D7]/80' : 'text-[#4A5568]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
