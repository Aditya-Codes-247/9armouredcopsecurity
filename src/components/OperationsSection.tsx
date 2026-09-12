import React from 'react';
import { Database, Sparkles, Hotel, CheckCircle2, ArrowRight, LucideIcon } from 'lucide-react';
import BorderGlow from './BorderGlow/BorderGlow';
import { borderGlowSurfaceAlt } from '../theme/glowTokens';
import { ENTERPRISE_OPERATIONS } from '../data/content';
import { EnterpriseOperation } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface OperationsSectionProps {
  onSelectOperation: (op: EnterpriseOperation) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Database,
  Sparkles,
  Hotel
};

export const OperationsSection: React.FC<OperationsSectionProps> = ({ onSelectOperation }) => {
  const sectionRef = useScrollReveal();

  return (
    <section id="operations" className="py-20 sm:py-28 px-3 xs:px-4 sm:px-6 bg-[#FFFFFF] scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#E5E8EC] gap-4 scroll-animate animate-up">
          <div>
            <span className="text-xs font-bold tracking-ultra text-[#C5A059] uppercase block mb-2 sm:mb-3">
              Portfolio Pillar 02
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1118]">
              Enterprise Operations &amp; Staffing
            </h2>
          </div>
          <p className="text-[#0A1118]/60 text-xs sm:text-sm md:text-base max-w-md font-light leading-relaxed">
            Comprehensive human resource logistics, institutional facility management, and regulatory compliance tailored for multinational enterprises across Gujarat.
          </p>
        </div>

        {/* 3-Column Luxury Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 scroll-stagger">
          {ENTERPRISE_OPERATIONS.map((op) => {
            const Icon = iconMap[op.iconName] || Database;
            return (
              <div key={op.id} className="scroll-animate animate-up">
                <BorderGlow {...borderGlowSurfaceAlt}>
                  <div className="border-glow-content p-6 sm:p-8 group flex flex-col justify-between card-shimmer">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-[#E5E8EC] flex items-center justify-center text-[#0A1118] mb-5 sm:mb-6 group-hover:bg-[#0A1118] group-hover:text-[#C5A059] transition-all duration-300 shadow-xs float-accent">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-bold tracking-ultra text-[#C5A059] uppercase block mb-2">
                      {op.category}
                    </span>

                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A1118] mb-2 sm:mb-3">
                      {op.title}
                    </h3>

                    <p className="text-[#0A1118]/70 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light">
                      {op.desc}
                    </p>

                    <ul className="space-y-2.5 text-xs text-[#0A1118]/80 mb-6 sm:mb-8">
                      {op.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onSelectOperation(op)}
                    className="pt-4 border-t border-[#E5E8EC]/80 flex items-center justify-between text-xs font-semibold text-[#0A1118] group-hover:text-[#C5A059] transition-colors cursor-pointer cursor-target w-full text-left"
                  >
                    <span className="tracking-wider">{op.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
