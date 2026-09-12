import React from 'react';
import { X, ShieldCheck, Award, FileCheck, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../../data/content';

interface CertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificatesModal: React.FC<CertificatesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const certs = [
    {
      title: 'State Operating License (Gujarat)',
      authority: 'Controlling Authority, Home Department, Govt. of Gujarat',
      regNo: 'GUJ/SEC/2008/4819-R',
      status: 'Active & Verified',
      validity: 'Valid across Ahmedabad, Gandhinagar, Surat, Vadodara, Rajkot',
      desc: 'Authorized for armed & unarmed static security, tactical patrol services, and close protection.'
    },
    {
      title: 'Quality Assurance & Operations Standard',
      authority: 'Standardized Quality & Security Management Systems',
      regNo: 'CERT-QA-STD-88219',
      status: 'Certified Management System',
      validity: 'Security Guarding, VIP Escort, Cash Logistics & Facility Operations',
      desc: 'Annual surveillance audit certifying institutional adherence to zero-defect security delivery, standard operating procedures, and rigorous cadre training.'
    },
    {
      title: 'Statutory Labor Law & Factory Act Compliance',
      authority: 'Office of the Labour Commissioner, Gujarat',
      regNo: 'LAB-GUJ-CONT-441209',
      status: '100% Audit Cleared',
      validity: 'Form V, Form XII, Minimum Wages, ESIC & EPFO Reg. GJ/AHM/0038910',
      desc: 'Principal employer indemnification against any joint-liability or labor grievance. Automated biometric wage records disbursed before the 7th of every month.'
    },
    {
      title: 'Fidelity Guarantee & Public Liability Coverage',
      authority: 'National Insurance Company Ltd.',
      regNo: 'POL-FG-PL-2024-991204',
      status: 'Comprehensive Underwriting',
      validity: 'INR 100,000,000 Total Aggregate Insured Sum',
      desc: 'Comprehensive public liability insurance, transit bullion fidelity insurance, and accidental injury compensation under Workmen’s Compensation Act.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E5E8EC] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E5E8EC] flex items-center justify-center text-[#0A1118] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-white border border-[#E5E8EC] p-1 flex items-center justify-center shadow-xs shrink-0">
            <img
              src={ASSETS.crest}
              alt="9 Armoured Cop Crest"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-ultra text-[#C5A059] uppercase block">
              Regulatory Verification
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1118]">
              Statutory Licenses &amp; Accreditations
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#0A1118]/70 mb-8 font-light leading-relaxed">
          Official statutory credentials and legal operating authorizations held by 9 Armoured Cop Security Service Pvt. Ltd. under the Government of Gujarat.
        </p>

        <div className="space-y-4">
          {certs.map((c, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#F8F9FA] border border-[#E5E8EC] hover:border-[#C5A059]/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="text-base font-serif font-bold text-[#0A1118] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  {c.title}
                </h4>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {c.status}
                </span>
              </div>

              <div className="text-xs text-[#0A1118]/70 space-y-1 mb-2 font-mono">
                <div><span className="font-semibold text-[#0A1118]">Authority:</span> {c.authority}</div>
                <div><span className="font-semibold text-[#0A1118]">Registry / Policy No:</span> {c.regNo}</div>
                <div><span className="font-semibold text-[#0A1118]">Jurisdiction:</span> {c.validity}</div>
              </div>

              <p className="text-xs text-[#0A1118]/70 font-light border-t border-[#E5E8EC] pt-2">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#E5E8EC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#0A1118]/60 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-[#C5A059]" /> Certified true copies available for corporate vendor onboarding
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0A1118] text-white text-xs font-semibold tracking-luxury hover:bg-[#C5A059] transition-colors cursor-pointer"
          >
            DISMISS VIEWER
          </button>
        </div>
      </div>
    </div>
  );
};
