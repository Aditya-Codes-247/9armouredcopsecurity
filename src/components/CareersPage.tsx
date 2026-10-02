import React from 'react';
import { ArrowLeft, Mail, ArrowUpRight } from 'lucide-react';
import careersImg from '../assets/images/careers.png';
import { gmailComposeUrl, COMPANY_CONTACT } from '../data/content';

interface CareersPageProps {
  onBack: () => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-24 sm:pt-28 pb-16 px-3 xs:px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white border border-[#E5E8EC] text-xs font-semibold text-[#0A1118] hover:border-[#C5A059] hover:text-[#C5A059] transition-all cursor-pointer cursor-target shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Careers Hero Card */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E8EC] shadow-xl sm:shadow-2xl bg-white">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-[16/7] w-full relative overflow-hidden">
              <img
                src={careersImg}
                alt="Build your career with 9 Armoured Cop Security Service"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118]/90 via-[#0A1118]/40 to-transparent" />

              {/* Overlay Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <span className="text-[10px] sm:text-xs font-bold tracking-ultra uppercase text-[#C5A059] mb-3">
                  Join Our Team
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Build your career with us
                </h1>
                <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mb-4 sm:mb-5" />
                <p className="text-sm sm:text-lg text-white/85 font-light max-w-lg leading-relaxed">
                  Submit your resume to apply for the first available opportunity
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-10 lg:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1118] mb-4">
                Career Opportunities
              </h2>
              <p className="text-[#0A1118]/70 text-xs sm:text-sm leading-relaxed font-light mb-8">
                At 9 Armoured Cop Security Service, we are committed to building a world-class team of security professionals. 
                Whether you are a seasoned veteran or an aspiring security specialist, we offer a dynamic work environment 
                with opportunities for growth, training, and professional development across Gujarat.
              </p>

              {/* What We Look For */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                <div className="p-4 sm:p-5 rounded-xl bg-[#F8F9FA] border border-[#E5E8EC] text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">
                    Security Professionals
                  </h4>
                  <p className="text-xs text-[#0A1118]/70 leading-relaxed">
                    Armed guards, close protection officers, and perimeter defense specialists with prior military or police experience.
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-xl bg-[#F8F9FA] border border-[#E5E8EC] text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">
                    Technical Specialists
                  </h4>
                  <p className="text-xs text-[#0A1118]/70 leading-relaxed">
                    CCTV surveillance operators, fire safety engineers, and electronic security system technicians.
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-xl bg-[#F8F9FA] border border-[#E5E8EC] text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">
                    Corporate Staff
                  </h4>
                  <p className="text-xs text-[#0A1118]/70 leading-relaxed">
                    HR managers, compliance officers, and administrative personnel to support our growing operations.
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-xl bg-[#F8F9FA] border border-[#E5E8EC] text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">
                    Facility Management
                  </h4>
                  <p className="text-xs text-[#0A1118]/70 leading-relaxed">
                    Housekeeping supervisors, maintenance crews, and hospitality support staff for corporate facilities.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href={gmailComposeUrl(
                    COMPANY_CONTACT.careersEmail,
                    'Career Application - 9 Armoured Cop Security Service',
                    'Full Name:\nPhone:\nPosition Applied For:\n'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0A1118] text-white font-bold text-xs tracking-ultra uppercase hover:bg-[#C5A059] transition-all duration-300 shadow-lg cursor-pointer cursor-target"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Your Resume</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+919898557772"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#F8F9FA] border border-[#E5E8EC] text-[#0A1118] font-bold text-xs tracking-ultra uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300 cursor-pointer cursor-target"
                >
                  <span>Call HR Department</span>
                </a>
              </div>

              <p className="mt-6 text-[11px] text-[#0A1118]/50 font-light">
                Send your resume to{' '}
                <a
                  href={gmailComposeUrl(
                    COMPANY_CONTACT.careersEmail,
                    'Career Application'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#C5A059] hover:underline cursor-target"
                >
                  careers@9armouredcopsecurity.com
                </a>
                {' '}with the subject line "Career Application" and we will get back to you within 5 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
