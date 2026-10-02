import React from 'react';
import { MapPin } from 'lucide-react';
import BorderGlow from './BorderGlow/BorderGlow';
import { borderGlowSurface } from '../theme/glowTokens';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SERVICE_LOCATIONS = [
  'Gujarat',
  'Maharashtra',
  'M.P',
  'Punjab',
  'Haryana',
  'Chandigarh',
  'Bihar',
  'Sikkim',
  'Assam',
  'W.B',
  'Odisha',
  'A.P',
  'Telengana',
  'Tamilnadu',
];

export const LocationsSection: React.FC = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="locations"
      className="py-20 sm:py-28 px-3 xs:px-4 sm:px-6 bg-[#FFFFFF] relative scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 scroll-animate animate-up">
          <span className="text-xs font-bold tracking-ultra text-[#C5A059] uppercase block mb-2 sm:mb-3">
            Service Coverage
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-serif font-bold text-[#0A1118] mb-4 sm:mb-5">
            Locations
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mb-4 sm:mb-6" />
          <p className="text-[#0A1118]/70 text-xs sm:text-base leading-relaxed px-2 font-light">
            Our presence across India — with our strategic headquarters in Gujarat,
            we provide executive protection, surveillance and workforce services
            across the regions highlighted below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Map image */}
          <div className="lg:col-span-7 scroll-animate animate-left">
            <BorderGlow {...borderGlowSurface}>
              <div className="border-glow-content overflow-hidden">
                <img
                  src="/map.jpg"
                  alt="Map showing company service locations across India"
                  className="w-full h-auto object-contain bg-[#FAF6ED]"
                  loading="lazy"
                />
              </div>
            </BorderGlow>
          </div>

          {/* Location list */}
          <div className="lg:col-span-5 scroll-animate animate-right">
            <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#F8F9FA] border border-[#E5E8EC] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                <span className="text-[11px] font-bold uppercase tracking-ultra text-[#C5A059]">
                  Our Presence in India
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A1118] mb-2">
                Where we provide our services
              </h3>
              <p className="text-xs text-[#0A1118]/60 leading-relaxed font-light mb-5">
                Headquartered at Vatva, Ahmedabad (Gujarat) with rapid mobilization
                along Ahmedabad &amp; GIFT City transit corridors, and active
                service coverage across:
              </p>
              <div className="flex flex-wrap gap-2">
                {SERVICE_LOCATIONS.map((loc) => (
                  <span
                    key={loc}
                    className="px-3 py-1.5 bg-white rounded-lg border border-[#E5E8EC] shadow-2xs text-xs font-medium text-[#0A1118] hover:border-[#C5A059]/50 transition-colors"
                  >
                    {loc}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-md inline-flex">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Headquarters: Gujarat · Pan-India Deployment Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
