import React, { useState } from 'react';
import { MapPin, PhoneCall, Mail, ShieldCheck, CheckCircle2, Globe, ExternalLink } from 'lucide-react';
import { REGIONAL_HUBS, COMPANY_CONTACT, gmailComposeUrl } from '../data/content';
import { ConsultationFormData } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    corporateEntity: '',
    officerName: '',
    email: '',
    phone: '',
    service: initialService || 'Executive VIP Close Protection & Motorcade',
    requirements: '',
    ndaRequired: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useScrollReveal();

  // Update if initial service changes from outside (e.g. user clicked request deployment)
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/audit-directive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.warn('Backend notification dispatch notice:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        corporateEntity: '',
        officerName: '',
        email: '',
        phone: '',
        service: 'Executive VIP Close Protection & Motorcade',
        requirements: '',
        ndaRequired: true,
      });

      // Clear alert after 7 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 7000);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-3 xs:px-4 sm:px-6 bg-[#FFFFFF] relative scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Contact Left: Information & Corporate Credentials */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 scroll-animate animate-left">
            <div>
              <span className="text-xs font-bold tracking-ultra text-[#C5A059] uppercase block mb-2 sm:mb-3">
                Direct Engagement
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-serif font-bold text-[#0A1118] mb-3 sm:mb-4">
                Request a Confidential Security Audit
              </h2>
              <p className="text-[#0A1118]/70 text-xs sm:text-base leading-relaxed font-light">
                Whether deploying 50 perimeter guards to an industrial plant or retaining close executive protection for a visiting trade delegation, our directors are available 24/7.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 pt-2">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                    Headquarters &amp; Command Hub
                  </h4>
                  <p className="text-xs text-[#0A1118]/70 mt-1 leading-relaxed">
                    {COMPANY_CONTACT.address}
                  </p>
                  <a
                    href={COMPANY_CONTACT.mapsQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C5A059] hover:underline mt-1 cursor-target"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                    Direct Enterprise Line
                  </h4>
                  <div className="mt-1 space-y-1">
                    {COMPANY_CONTACT.directors.map((director) => (
                      <a
                        key={director.phoneTel}
                        href={`tel:${director.phoneTel}`}
                        className="hover:text-[#C5A059] transition-colors cursor-target font-semibold text-[#0A1118] text-sm block"
                      >
                        {director.phone}
                      </a>
                    ))}
                    <span className="block text-[11px] text-[#0A1118]/60 mt-0.5">24/7 Command Dispatch &amp; Operations Support</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                    Secure Communications
                  </h4>
                  <p className="text-xs text-[#0A1118]/70 mt-1 break-all xs:break-normal">
                    <a
                      href={gmailComposeUrl(COMPANY_CONTACT.email)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C5A059] transition-colors cursor-target font-medium text-[#0A1118]"
                    >
                      {COMPANY_CONTACT.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1118]">
                    Official Enterprise Website
                  </h4>
                  <p className="text-xs text-[#0A1118]/70 mt-1">
                    <a
                      href={COMPANY_CONTACT.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C5A059] transition-colors inline-flex items-center gap-1 cursor-target font-medium text-[#0A1118]"
                    >
                      <span>{COMPANY_CONTACT.website}</span>
                      <ExternalLink className="w-3 h-3 text-[#C5A059]" />
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Regional Coverage Badges */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#F8F9FA] border border-[#E5E8EC]">
              <span className="text-[10px] font-bold uppercase tracking-ultra text-[#C5A059] block mb-2.5 sm:mb-3">
                Regional Response Hubs
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-[#0A1118]">
                {REGIONAL_HUBS.map((hub, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white rounded-lg border border-[#E5E8EC] shadow-2xs hover:border-[#C5A059]/40 transition-colors"
                  >
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Right: High-Converting Executive Consultation Form */}
          <div className="lg:col-span-7 scroll-animate animate-right">
            <div className="p-5 xs:p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-[#F8F9FA] border border-[#E5E8EC] shadow-xl relative card-shimmer">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1118] mb-1">
                Operational Intake Protocol
              </h3>
              <p className="text-xs text-[#0A1118]/60 mb-6 sm:mb-8 font-light">
                All inquiries subject to non-disclosure obligations. Response dispatched within 2 business hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" id="consultationForm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-ultra text-[#0A1118] mb-2">
                      Corporate Entity / Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.corporateEntity}
                      onChange={(e) => setFormData({ ...formData, corporateEntity: e.target.value })}
                      placeholder="e.g. Adani Group / Reliance Ind."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E8EC] text-xs text-[#0A1118] focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-ultra text-[#0A1118] mb-2">
                      Executive Officer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.officerName}
                      onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                      placeholder="e.g. Vice President Infrastructure"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E8EC] text-xs text-[#0A1118] focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-ultra text-[#0A1118] mb-2">
                      Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="officer@corporate.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E8EC] text-xs text-[#0A1118] focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-ultra text-[#0A1118] mb-2">
                      Direct Telephone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98980 00000"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E8EC] text-xs text-[#0A1118] focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-ultra text-[#0A1118] mb-2">
                    Primary Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E8EC] text-xs text-[#0A1118] focus:outline-none focus:border-[#C5A059] transition-colors"
                  >
                    <option>Executive VIP Close Protection &amp; Motorcade</option>
                    <option>Guarding Services (Access Control &amp; Patrolling)</option>
                    <option>Electronic Surveillance &amp; Thermal CCTV Systems</option>
                    <option>Cash &amp; High-Value Asset Transportation</option>
                    <option>Corporate Payroll &amp; Statutory Labor Governance</option>
                    <option>Facility Housekeeping &amp; Flexible Staffing</option>
                    <option>Guest House &amp; Healthcare Support Operations</option>
                    <option>Industrial Fire Safety Audit &amp; Mock Drill AMC</option>
                    <option>Confidential Corporate Fraud Investigation &amp; Due Diligence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-ultra text-[#0A1118] mb-2">
                    Facility Scope &amp; Security Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Detail square footage, number of shifts, geographic location in Gujarat, or anticipated threat timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E8EC] text-xs text-[#0A1118] focus:outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>

                <div className="flex items-start sm:items-center gap-3">
                  <input
                    type="checkbox"
                    id="ndaCheck"
                    checked={formData.ndaRequired}
                    onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                    className="mt-0.5 sm:mt-0 w-4 h-4 text-[#C5A059] border-[#E5E8EC] rounded focus:ring-[#C5A059] accent-[#C5A059] cursor-target cursor-pointer"
                  />
                  <label htmlFor="ndaCheck" className="text-xs text-[#0A1118]/70 select-none cursor-pointer cursor-target">
                    Execute mutual preliminary Non-Disclosure Agreement (NDA) prior to site visit.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#0A1118] text-white font-serif font-bold text-xs tracking-ultra uppercase hover:bg-[#C5A059] hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer cursor-target disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING DIRECTIVE...</span>
                  ) : (
                    <>
                      <span>TRANSMIT AUDIT DIRECTIVE</span>
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>

                {submitted && (
                  <div
                    id="formSuccess"
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Protocol Dispatched. Our Senior Security Director will establish contact within 120 minutes.
                    </span>
                  </div>
                )}
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
