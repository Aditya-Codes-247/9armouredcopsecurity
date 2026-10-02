import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  PhoneCall,
  Globe,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Navigation as NavigationIcon,
  ShieldCheck,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { COMPANY_CONTACT, gmailComposeUrl } from '../data/content';
import BorderGlow from './BorderGlow/BorderGlow';
import { borderGlowSurface, borderGlowDark } from '../theme/glowTokens';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface HeadquartersSectionProps {
  onOpenAudit: () => void;
  onOpenCertificates?: () => void;
}

export const HeadquartersSection: React.FC<HeadquartersSectionProps> = ({
  onOpenAudit,
  onOpenCertificates,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const sectionRef = useScrollReveal();

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  return (
    <section
      id="headquarters"
      className="py-20 sm:py-28 px-3 xs:px-4 sm:px-6 bg-[#F8F9FA] border-t border-[#E5E8EC] relative scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 scroll-animate animate-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E8EC] text-[10px] sm:text-xs font-bold tracking-luxury text-[#C5A059] uppercase mb-3 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Corporate Command &amp; Logistics Hub</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-serif font-bold text-[#0A1118] mb-4 leading-tight">
            Headquarters &amp; Verified Contact
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mb-4 sm:mb-5" />
          <p className="text-[#0A1118]/70 text-xs sm:text-base leading-relaxed font-light px-2">
            The operational heartbeat of 9 Armoured Cop Security Service. Direct correspondence channels, physical dispatch base, and 24/7 command switchboard.
          </p>
        </div>

        {/* 4-Column Architectural Information Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10 sm:mb-12 scroll-stagger">
          
          {/* 1. Official Physical Address */}
          <div className="scroll-animate animate-up">
            <BorderGlow {...borderGlowSurface}>
              <div className="border-glow-content p-6 flex flex-col justify-between group card-shimmer">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0A1118] text-[#C5A059] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs float-accent">
                  <MapPin className="w-5 h-5" />
                </div>
              <span className="text-[10px] font-bold tracking-ultra uppercase text-[#C5A059] block mb-1.5">
                Physical Headquarters
              </span>
              <h3 className="text-base font-serif font-bold text-[#0A1118] mb-2.5">
                Registered Office Address
              </h3>
              <p className="text-xs text-[#0A1118]/80 leading-relaxed font-normal mb-4">
                {COMPANY_CONTACT.address}
              </p>
              <div className="inline-block px-2.5 py-1 rounded bg-[#F0F2F5] text-[10px] font-mono font-semibold text-[#0A1118]/70 mb-4">
                Landmark: {COMPANY_CONTACT.landmark}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E8EC] flex items-center gap-2">
              <a
                href={COMPANY_CONTACT.mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-[#0A1118] hover:bg-[#C5A059] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer cursor-target text-center"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => handleCopy(COMPANY_CONTACT.address, 'address')}
                className="p-2 rounded-lg bg-[#F8F9FA] hover:bg-[#E5E8EC] text-[#0A1118] transition-colors cursor-pointer cursor-target"
                title="Copy Address"
                aria-label="Copy Address"
              >
                {copiedField === 'address' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#0A1118]/70" />
                )}
              </button>
            </div>
            </div>
          </BorderGlow>
          </div>

          {/* 2. Official Email Correspondence */}
          <div className="scroll-animate animate-up">
            <BorderGlow {...borderGlowSurface}>
              <div className="border-glow-content p-6 flex flex-col justify-between group card-shimmer">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0A1118] text-[#C5A059] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs float-accent">
                  <Mail className="w-5 h-5" />
                </div>
              <span className="text-[10px] font-bold tracking-ultra uppercase text-[#C5A059] block mb-1.5">
                Official Correspondence
              </span>
              <h3 className="text-base font-serif font-bold text-[#0A1118] mb-2.5">
                Executive Email Address
              </h3>
              <a
                href={gmailComposeUrl(
                  COMPANY_CONTACT.infoEmail,
                  'General Inquiry - 9 Armoured Cop Security Service'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#0A1118] hover:text-[#C5A059] transition-colors block break-all mb-3 cursor-pointer cursor-target"
              >
                {COMPANY_CONTACT.infoEmail}
              </a>
              <p className="text-[11px] text-[#0A1118]/60 leading-relaxed font-light mb-4">
                Discreet communication channel for corporate RFP submissions, labor compliance inquiries, and board-level security enquiry/audits.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E8EC] flex items-center gap-2">
              <a
                href={gmailComposeUrl(
                  COMPANY_CONTACT.infoEmail,
                  'General Inquiry - 9 Armoured Cop Security Service'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-[#0A1118] hover:bg-[#C5A059] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer cursor-target text-center"
              >
                <span>Compose Email</span>
                <Mail className="w-3 h-3" />
              </a>
              <button
                onClick={() => handleCopy(COMPANY_CONTACT.infoEmail, 'email')}
                className="p-2 rounded-lg bg-[#F8F9FA] hover:bg-[#E5E8EC] text-[#0A1118] transition-colors cursor-pointer cursor-target"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#0A1118]/70" />
                )}
              </button>
            </div>
            </div>
          </BorderGlow>
          </div>

          {/* 3. 24/7 Telephone Switchboard */}
          <div className="scroll-animate animate-up">
            <BorderGlow {...borderGlowSurface}>
              <div className="border-glow-content p-6 flex flex-col justify-between group card-shimmer">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0A1118] text-[#C5A059] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs float-accent">
                  <PhoneCall className="w-5 h-5" />
                </div>
              <span className="text-[10px] font-bold tracking-ultra uppercase text-[#C5A059] block mb-1.5">
                24/7 Rapid Telephony
              </span>
              <h3 className="text-base font-serif font-bold text-[#0A1118] mb-2.5">
                Command Line &amp; Dispatch
              </h3>
              <div className="space-y-1.5 mb-3">
                {COMPANY_CONTACT.directors.map((director) => (
                  <a
                    key={director.phoneTel}
                    href={`tel:${director.phoneTel}`}
                    className="block cursor-pointer cursor-target"
                  >
                    <span className="text-xs font-semibold text-[#0A1118]/70 block">
                      {director.name}
                    </span>
                    <span className="text-sm font-bold text-[#0A1118] hover:text-[#C5A059] transition-colors block">
                      {director.phone}
                    </span>
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-4 inline-flex">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>24/7 Active Dispatch Standby</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E8EC] flex items-center gap-2">
              <a
                href={`tel:${COMPANY_CONTACT.directors[0].phoneTel}`}
                className="flex-1 py-2 px-3 rounded-lg bg-[#0A1118] hover:bg-[#C5A059] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer cursor-target text-center"
              >
                <span>Call Command</span>
                <PhoneCall className="w-3 h-3" />
              </a>
              <button
                onClick={() =>
                  handleCopy(
                    COMPANY_CONTACT.directors.map((d) => `${d.name} : ${d.phone}`).join(', '),
                    'phone'
                  )
                }
                className="p-2 rounded-lg bg-[#F8F9FA] hover:bg-[#E5E8EC] text-[#0A1118] transition-colors cursor-pointer cursor-target"
                title="Copy Phone Number"
                aria-label="Copy Phone Number"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#0A1118]/70" />
                )}
              </button>
            </div>
            </div>
          </BorderGlow>
          </div>

          {/* 4. Official Web Domain */}
          <div className="scroll-animate animate-up">
            <BorderGlow {...borderGlowSurface}>
              <div className="border-glow-content p-6 flex flex-col justify-between group card-shimmer">
              <div>
                <div className="w-11 h-11 rounded-xl bg-[#0A1118] text-[#C5A059] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-xs float-accent">
                  <Globe className="w-5 h-5" />
                </div>
              <span className="text-[10px] font-bold tracking-ultra uppercase text-[#C5A059] block mb-1.5">
                Digital Presence
              </span>
              <h3 className="text-base font-serif font-bold text-[#0A1118] mb-2.5">
                Official Web Portal
              </h3>
              <a
                href={COMPANY_CONTACT.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#0A1118] hover:text-[#C5A059] transition-colors block break-all mb-3 cursor-pointer cursor-target"
              >
                {COMPANY_CONTACT.website}
              </a>
              <p className="text-[11px] text-[#0A1118]/60 leading-relaxed font-light mb-4">
                Official corporate web domain and authorized information repository for client directives, tenders, and personnel verification.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E8EC] flex items-center gap-2">
              <a
                href={COMPANY_CONTACT.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-[#0A1118] hover:bg-[#C5A059] text-white text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer cursor-target text-center"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => handleCopy(COMPANY_CONTACT.website, 'website')}
                className="p-2 rounded-lg bg-[#F8F9FA] hover:bg-[#E5E8EC] text-[#0A1118] transition-colors cursor-pointer cursor-target"
                title="Copy Website URL"
                aria-label="Copy Website URL"
              >
                {copiedField === 'website' ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#0A1118]/70" />
                )}
              </button>
            </div>
            </div>
          </BorderGlow>
          </div>

        </div>

        {/* Location & Rapid Mobilization Showcase Strip */}
        <div className="scroll-animate animate-scale">
          <BorderGlow {...borderGlowDark}>
          <div className="border-glow-content p-6 sm:p-8 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#C5A059]/10 to-transparent pointer-events-none hidden lg:block" />
          
          <div className="space-y-2 max-w-2xl relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
              <span className="text-[10px] font-bold tracking-ultra uppercase text-[#C5A059]">
                Strategic Ahmedabad Hub · Vatva Industrial Cluster
              </span>
            </div>
            <h4 className="text-base sm:text-xl font-serif font-bold text-white leading-snug">
              Instant Mobilization Along All Gujarat Corridors
            </h4>
            <p className="text-xs text-white/75 font-light leading-relaxed">
              Located adjacent to Vatva Railway Station and SLM Mill Compound, our centralized dispatch depot maintains motorized tactical units ready to deploy across all Gujarat corridors instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <button
              onClick={onOpenAudit}
              className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-[#C5A059] text-[#0A1118] font-bold text-xs tracking-ultra uppercase hover:bg-[#E5C98B] transition-all whitespace-nowrap shadow-lg flex items-center justify-center gap-2 cursor-pointer cursor-target"
            >
              <span>Request Operational Enquiry/Audit</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {onOpenCertificates && (
              <button
                onClick={onOpenCertificates}
                className="flex-1 sm:flex-none px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs tracking-luxury uppercase transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer cursor-target"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Corporate Credentials</span>
              </button>
            )}
            </div>
            </div>
          </BorderGlow>
        </div>

      </div>
    </section>
  );
};
