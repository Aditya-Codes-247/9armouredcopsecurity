import React from 'react';
import { X, ShieldAlert, FileText, PhoneCall } from 'lucide-react';
import { gmailComposeUrl, COMPANY_CONTACT } from '../../data/content';

interface LegalModalProps {
  title: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ title, isOpen, onClose }) => {
  if (!isOpen || !title) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E5E8EC] max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E5E8EC] flex items-center justify-center text-[#0A1118] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059]">
            {title === 'Ethics Hotline' ? (
              <PhoneCall className="w-5 h-5" />
            ) : title === 'Statutory Filings' ? (
              <FileText className="w-5 h-5" />
            ) : (
              <ShieldAlert className="w-5 h-5" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-ultra text-[#C5A059] uppercase block">
              Corporate Governance
            </span>
            <h3 className="text-xl font-serif font-bold text-[#0A1118]">
              {title}
            </h3>
          </div>
        </div>

        <div className="text-xs text-[#0A1118]/80 space-y-3 leading-relaxed font-light">
          {title === 'Privacy Charter' && (
            <>
              <p>
                9 Armoured Cop Security Service Pvt. Ltd. operates under strict data minimization standards. All client surveillance telemetry, biometrics, and personnel verification databases are encrypted at rest using AES-256 protocols.
              </p>
              <p>
                No telemetry is ever transmitted to third-party commercial brokers. Video streams from client SOC centers remain within Gujarat air-gapped server nodes.
              </p>
            </>
          )}

          {title === 'Statutory Filings' && (
            <>
              <p>
                As a registered Private Security Agency (Govt. of Gujarat License GUJ/SEC/2008/4819), our statutory filings are inspected regularly by state controlling authorities.
              </p>
              <p>
                Current filings on record include:
              </p>
              <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-[#0A1118]/90">
                <li>Form V &amp; Form XII Labor Registrations</li>
                <li>EPFO Monthly ECR Filing Confirmation</li>
                <li>ESIC Contribution Challans</li>
                <li>Audited Balance Sheets (MCA Registrar of Companies, Ahmedabad)</li>
              </ul>
            </>
          )}

          {title === 'Ethics Hotline' && (
            <>
              <p>
                We maintain an independent, whistle-blower protected Ethics Ombudsman for reporting any deviation from statutory wage compliance, workplace safety, or operational misconduct.
              </p>
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E8EC] space-y-1.5 font-mono text-[11px]">
                <div>
                  <span className="font-bold">Confidential Line 1: </span>
                  <a href="tel:+919081607192" className="hover:text-[#C5A059] transition-colors">
                    +91 9081607192
                  </a>
                </div>
                <div>
                  <span className="font-bold">Confidential Line 2: </span>
                  <a href="tel:+919898557772" className="hover:text-[#C5A059] transition-colors">
                    +91 9898557772
                  </a>
                </div>
                <div><span className="font-bold">Direct Email:</span>{' '}
                  <a
                    href={gmailComposeUrl(COMPANY_CONTACT.email)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C5A059] hover:underline"
                  >
                    9armouredcopsecurity@gmail.com
                  </a>
                </div>
                <div><span className="font-bold">Available:</span> 24 Hours · Dedicated Directorate Officer</div>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E8EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-[#0A1118] text-white text-xs font-semibold tracking-luxury hover:bg-[#C5A059] transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
