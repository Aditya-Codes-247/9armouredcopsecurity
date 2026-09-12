import React from 'react';
import { ASSETS, COMPANY_CONTACT } from '../data/content';
import { MapPin, Mail, PhoneCall, Globe, ExternalLink, Briefcase } from 'lucide-react';

interface FooterProps {
  onOpenCertificates: () => void;
  onOpenLegal: (title: string) => void;
  onOpenCareers: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCertificates, onOpenLegal, onOpenCareers }) => {
  return (
    <footer className="bg-white border-t border-[#E5E8EC] py-12 sm:py-16 px-4 sm:px-6 text-[#0A1118]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          
          {/* Brand & Address info */}
          <div className="max-w-xl space-y-3">
            <div className="flex items-center gap-3.5">
              <img
                src={ASSETS.crest}
                alt="9 Armoured Cop Security Service Official Logo"
                className="h-10 sm:h-12 w-auto object-contain shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-sm font-bold tracking-tight text-[#0A1118]">
                  {COMPANY_CONTACT.legalName}
                </h3>
                <p className="text-[10px] text-[#0A1118]/50 tracking-wider uppercase font-semibold">
                  EST. 2008 · STATE REGISTRATION GUJ/SEC/2008/4819
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-[#0A1118]/70 pt-1">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {COMPANY_CONTACT.address}
              </p>
            </div>
          </div>

          {/* Quick Contact & Verified Channels */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 text-xs text-[#0A1118]/80">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
                Official Web Portal
              </span>
              <a
                href={COMPANY_CONTACT.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium hover:text-[#C5A059] transition-colors cursor-target"
              >
                <span>{COMPANY_CONTACT.website}</span>
                <ExternalLink className="w-3 h-3 text-[#C5A059]" />
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
                Direct Email
              </span>
              <a
                href={`mailto:${COMPANY_CONTACT.email}`}
                className="inline-flex items-center gap-1.5 font-medium hover:text-[#C5A059] transition-colors cursor-target"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{COMPANY_CONTACT.email}</span>
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
                Command Switchboard
              </span>
              <a
                href={`tel:${COMPANY_CONTACT.phoneTel}`}
                className="inline-flex items-center gap-1.5 font-medium hover:text-[#C5A059] transition-colors cursor-target"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{COMPANY_CONTACT.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Separator & Compliance / Legal links */}
        <div className="pt-6 border-t border-[#E5E8EC] flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-xs text-[#0A1118]/70 tracking-wider uppercase font-medium">
            <button
              onClick={() => onOpenLegal('Privacy Charter')}
              className="hover:text-[#C5A059] transition-colors cursor-pointer cursor-target"
            >
              Privacy Charter
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('Statutory Filings')}
              className="hover:text-[#C5A059] transition-colors cursor-pointer cursor-target"
            >
              Statutory Filings
            </button>
            <span>·</span>
            <button
              onClick={onOpenCertificates}
              className="hover:text-[#C5A059] transition-colors cursor-pointer cursor-target font-bold text-[#0A1118]"
            >
              Corporate Accreditations
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('Ethics Hotline')}
              className="hover:text-[#C5A059] transition-colors cursor-pointer cursor-target"
            >
              Ethics Hotline
            </button>
            <span>·</span>
            <button
              onClick={onOpenCareers}
              className="hover:text-[#C5A059] transition-colors cursor-pointer cursor-target inline-flex items-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Careers</span>
            </button>
          </div>

          <p className="text-xs text-[#0A1118]/50 font-light">
            © 2025 9 Armoured Cop Security Service Pvt. Ltd. All Rights Reserved.
          </p>
        </div>

        {/* Contact Us Tile */}
        <div className="pt-6 border-t border-[#E5E8EC]">
          <a
            href="mailto:info@9armouredcopsecurity.com?subject=General%20Inquiry%20-%209%20Armoured%20Cop%20Security%20Service"
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F8F9FA] border border-[#E5E8EC] hover:border-[#C5A059]/50 hover:bg-[#FAF6ED] transition-all duration-300 group cursor-pointer cursor-target max-w-sm mx-auto"
          >
            <div className="w-8 h-8 rounded-full bg-[#0A1118] text-[#C5A059] flex items-center justify-center shrink-0 group-hover:bg-[#C5A059] group-hover:text-white transition-all duration-300">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-ultra text-[#C5A059] block">
                Contact Us
              </span>
              <span className="text-xs font-semibold text-[#0A1118] group-hover:text-[#C5A059] transition-colors">
                info@9armouredcopsecurity.com
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#0A1118]/30 group-hover:text-[#C5A059] transition-colors ml-1" />
          </a>
        </div>

      </div>
    </footer>
  );
};
