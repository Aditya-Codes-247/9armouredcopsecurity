import React from 'react';
import { Shield } from 'lucide-react';
import BorderGlow from './BorderGlow/BorderGlow';
import { borderGlowRow } from '../theme/glowTokens';
import { ASSETS, TRAINING_PILLARS } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const TrainingAcademySection: React.FC = () => {
  const sectionRef = useScrollReveal();

  return (
    <section id="training" className="py-20 sm:py-28 px-3 xs:px-4 sm:px-6 bg-[#FFFFFF] scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Academy Narrative */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 scroll-animate animate-left">
            <span className="text-xs font-bold tracking-ultra text-[#C5A059] uppercase block">
              Tactical Excellence
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-serif font-bold text-[#0A1118] leading-tight">
              The Human Element.<br />
              <span className="font-editorial italic font-normal text-[#C5A059]">
                Crafted, Not Merely Hired.
              </span>
            </h2>
            <p className="text-[#0A1118]/70 text-xs sm:text-base leading-relaxed font-light">
              Every 9 Armoured Cop security officer undergoes intensive 160-hour pedagogical and physical conditioning at our dedicated Gujarat Training Institute prior to on-site deployment.
            </p>

            <div className="space-y-3.5 sm:space-y-4 pt-2 scroll-stagger">
              {TRAINING_PILLARS.map((pillar) => (
                <div key={pillar.step} className="scroll-animate animate-up">
                  <BorderGlow {...borderGlowRow}>
                    <div className="border-glow-content flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-4 card-shimmer">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 float-accent">
                      {pillar.step}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0A1118] uppercase tracking-wide">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#0A1118]/60 mt-0.5 sm:mt-1 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                    </div>
                  </BorderGlow>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Training Image & Background Verification Showcase */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0 scroll-animate animate-right">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E8EC] shadow-xl sm:shadow-2xl zoom-container">
              <div className="aspect-[4/3] w-full relative min-h-[260px]">
                <img
                  src={ASSETS.tacticalCadre}
                  alt="Tactical Protection Cadre"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118]/85 via-[#0A1118]/20 to-transparent" />

                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
                  <div className="inline-block px-3 py-1 bg-[#C5A059] text-[#0A1118] rounded font-bold text-[9px] sm:text-[10px] tracking-ultra uppercase mb-2">
                    Vetting Protocol
                  </div>
                  <h3 className="text-lg sm:text-2xl font-serif font-bold text-white mb-1.5 sm:mb-2">
                    Zero-Tolerance Background Verification
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    Fingerprint database clearance across Gujarat Police records, residential home visits, and military service discharge evaluations.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Stat Accent Box */}
            <div className="absolute -bottom-4 -right-1 sm:-bottom-8 sm:right-6 bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[#E5E8EC] shadow-xl sm:shadow-2xl flex items-center gap-3 sm:gap-4 max-w-[calc(100%-2rem)] hover-pulse">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#0A1118]">100%</span>
                <span className="text-[9px] sm:text-[11px] block uppercase font-bold tracking-wider text-[#0A1118]/60">
                  Police Verified Personnel
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
