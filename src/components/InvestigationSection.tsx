import React from 'react';
import {
  Flame,
  Search,
  ClipboardCheck,
  Activity,
  Wrench,
  UserX,
  ShieldAlert,
  Scale,
  ChevronRight
} from 'lucide-react';
import BorderGlow from './BorderGlow/BorderGlow';
import { borderGlowPanel } from '../theme/glowTokens';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface InvestigationSectionProps {
  onScheduleAudit: (division: string) => void;
  onInitiateInquiry: (topic: string) => void;
}

export const InvestigationSection: React.FC<InvestigationSectionProps> = ({
  onScheduleAudit,
  onInitiateInquiry,
}) => {
  const sectionRef = useScrollReveal();

  return (
    <section id="investigation" className="py-20 sm:py-28 px-3 xs:px-4 sm:px-6 bg-[#F8F9FA] border-y border-[#E5E8EC] relative overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 scroll-animate animate-up">
          <span className="text-xs font-bold tracking-ultra text-[#C5A059] uppercase block mb-2 sm:mb-3">
            Portfolio Pillar 03
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-serif font-bold text-[#0A1118] mb-3 sm:mb-4">
            Tactical Investigation &amp; Fire Safety
          </h2>
          <p className="text-[#0A1118]/70 text-xs sm:text-base leading-relaxed px-2 font-light">
            Unwavering preparedness: From preemptive corporate fraud mitigation to mission-critical industrial fire safety engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 scroll-stagger">
          
          {/* Panel 1: Fire Safety & Disaster Protection */}
          <div className="scroll-animate animate-left">
            <BorderGlow {...borderGlowPanel}>
              <div className="border-glow-content p-5 sm:p-8 lg:p-10 relative flex flex-col justify-between card-shimmer">
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] sm:text-[11px] font-bold tracking-luxury uppercase hover-pulse">
                    <Flame className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    Disaster Mitigation
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-semibold text-[#0A1118]/40">
                    DIVISION // FS-09
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#0A1118] mb-3 sm:mb-4">
                  Industrial Fire Safety &amp; Mock Drills
                </h3>
                <p className="text-[#0A1118]/70 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light">
                  Certified risk evaluations under the Gujarat Fire Prevention and Life Safety Measures Act. We safeguard manufacturing plants, pharma hubs, and commercial high-rises.
                </p>

                <div className="space-y-3.5 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F0F2F5]/60 border border-[#E5E8EC] flex items-start gap-3.5 sm:gap-4 hover:border-[#C5A059]/40 transition-all duration-300 hover:shadow-md group">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center text-[#C5A059] shadow-xs shrink-0 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300">
                      <ClipboardCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                        Comprehensive Fire Safety Audits
                      </h5>
                      <p className="text-xs text-[#0A1118]/70 mt-0.5 sm:mt-1 leading-relaxed">
                        Full compliance verification, heat-map risk modeling, and issuance of NOC regulatory certifications.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F0F2F5]/60 border border-[#E5E8EC] flex items-start gap-3.5 sm:gap-4 hover:border-[#C5A059]/40 transition-all duration-300 hover:shadow-md group">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center text-[#C5A059] shadow-xs shrink-0 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                        Realistic Mock Drill Exercises
                      </h5>
                      <p className="text-xs text-[#0A1118]/70 mt-0.5 sm:mt-1 leading-relaxed">
                        Live evacuation simulations, smoke-chamber panic training, and designated floor warden certifications.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F0F2F5]/60 border border-[#E5E8EC] flex items-start gap-3.5 sm:gap-4 hover:border-[#C5A059]/40 transition-all duration-300 hover:shadow-md group">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center text-[#C5A059] shadow-xs shrink-0 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                        Hydrant &amp; Sprinkler Engineering
                      </h5>
                      <p className="text-xs text-[#0A1118]/70 mt-0.5 sm:mt-1 leading-relaxed">
                        Annual Maintenance Contracts (AMC), jockey pump tests, CO2 gas suppression, and hose reel overhauls.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 sm:pt-6 border-t border-[#E5E8EC]">
                <span className="text-[11px] sm:text-xs text-[#0A1118]/60 font-medium">
                  Certified by National Fire Safety Council
                </span>
                <button
                  onClick={() => onScheduleAudit('Industrial Fire Safety Audit & Mock Drill AMC')}
                  className="text-xs font-bold text-[#C5A059] tracking-luxury uppercase hover:underline flex items-center gap-1 cursor-pointer cursor-target"
                >
                  Schedule Audit <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              </div>
            </BorderGlow>
          </div>

          {/* Panel 2: Corporate Intelligence & Investigation */}
          <div className="scroll-animate animate-right">
            <BorderGlow {...borderGlowPanel}>
              <div className="border-glow-content p-5 sm:p-8 lg:p-10 relative flex flex-col justify-between card-shimmer">
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-900 border border-indigo-200 text-[10px] sm:text-[11px] font-bold tracking-luxury uppercase hover-pulse">
                    <Search className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    Corporate Intelligence
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-semibold text-[#0A1118]/40">
                    DIVISION // INTEL-04
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#0A1118] mb-3 sm:mb-4">
                  Corporate Investigation &amp; Due Diligence
                </h3>
                <p className="text-[#0A1118]/70 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 font-light">
                  Discreet, legally admissible intelligence gathering designed to insulate corporate assets, executive reputations, and cross-border partnership investments.
                </p>

                <div className="space-y-3.5 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F0F2F5]/60 border border-[#E5E8EC] flex items-start gap-3.5 sm:gap-4 hover:border-[#C5A059]/40 transition-all duration-300 hover:shadow-md group">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center text-[#C5A059] shadow-xs shrink-0 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300">
                      <UserX className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                        Pre &amp; Post Employment Vetting
                      </h5>
                      <p className="text-xs text-[#0A1118]/70 mt-0.5 sm:mt-1 leading-relaxed">
                        C-suite credential scrutiny, criminal court checks, reference authenticity, and financial debt profiles.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F0F2F5]/60 border border-[#E5E8EC] flex items-start gap-3.5 sm:gap-4 hover:border-[#C5A059]/40 transition-all duration-300 hover:shadow-md group">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center text-[#C5A059] shadow-xs shrink-0 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                        Internal Fraud &amp; Theft Forensics
                      </h5>
                      <p className="text-xs text-[#0A1118]/70 mt-0.5 sm:mt-1 leading-relaxed">
                        Supply-chain pilferage tracing, IP infringement audits, and undercover operational plant placement.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F0F2F5]/60 border border-[#E5E8EC] flex items-start gap-3.5 sm:gap-4 hover:border-[#C5A059]/40 transition-all duration-300 hover:shadow-md group">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white flex items-center justify-center text-[#C5A059] shadow-xs shrink-0 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                        Commercial Credit &amp; Counterparty Audits
                      </h5>
                      <p className="text-xs text-[#0A1118]/70 mt-0.5 sm:mt-1 leading-relaxed">
                        In-depth solvency verification and director reputational risk profiling prior to major mergers or leases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 sm:pt-6 border-t border-[#E5E8EC]">
                <span className="text-[11px] sm:text-xs text-[#0A1118]/60 font-medium">
                  Strict Attorney-Client Confidentiality Standard
                </span>
                <button
                  onClick={() => onInitiateInquiry('Confidential Corporate Fraud Investigation & Due Diligence')}
                  className="text-xs font-bold text-[#C5A059] tracking-luxury uppercase hover:underline flex items-center gap-1 cursor-pointer cursor-target"
                >
                  Initiate Inquiry <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              </div>
            </BorderGlow>
          </div>

        </div>

      </div>
    </section>
  );
};
