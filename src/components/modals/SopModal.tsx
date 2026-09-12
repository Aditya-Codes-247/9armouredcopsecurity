import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { TacticalDivision } from '../../types';

interface SopModalProps {
  division: TacticalDivision | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestDeployment: (name: string) => void;
}

export const SopModal: React.FC<SopModalProps> = ({
  division,
  isOpen,
  onClose,
  onRequestDeployment
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  if (!isOpen || !division) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);

      // Trigger simulated download prompt
      const element = document.createElement('a');
      const file = new Blob([
        `9 ARMOURED COP SECURITY SERVICE PVT. LTD. - STANDARD OPERATING PROCEDURE (SOP)\n` +
        `DOCUMENT ID: SOP-${division.ref}-2025\n` +
        `DIVISION: ${division.name}\n` +
        `CATEGORY: ${division.category}\n` +
        `STATUS: ${division.status}\n\n` +
        `SUMMARY:\n${division.desc}\n\n` +
        `CORE PROTOCOLS:\n` +
        division.features.map(f => `* ${f.title}: ${f.desc}`).join('\n') +
        `\n\nSTATUTORY GUARANTEE: Registered Gujarat State License GUJ/SEC/2008/4819\n` +
        `HEADQUARTERS: Shed No- 26, Maruti Industrial Estate - 2, SLM mill Compound, Nr. Vatva Rly station Vatva, Ahmedabad 382445.\n` +
        `CONTACT: +91-9157092555 | 9armouredcopsecurity@gmail.com | www.9armouredcopsecurity.com`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `SOP_${division.id.toUpperCase()}_SPEC_SHEET.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadComplete(false), 4000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E5E8EC] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-10 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#F0F2F5] hover:bg-[#E5E8EC] flex items-center justify-center text-[#0A1118] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-[#C5A059]/15 text-[#C5A059]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-ultra text-[#C5A059] uppercase block">
              Document Ref: SOP-{division.ref}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1118]">
              Standard Operating Procedure
            </h3>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E8EC]">
          <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider block">
            {division.divisionNumber} · {division.category}
          </span>
          <h4 className="text-base font-serif font-bold text-[#0A1118] mt-0.5 mb-2">
            {division.fullTitle}
          </h4>
          <p className="text-xs text-[#0A1118]/70 leading-relaxed font-light">
            {division.desc}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#0A1118] flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#C5A059]" /> Core Tactical Standards
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {division.features.map((feat, i) => (
              <div key={i} className="p-3 rounded-lg bg-[#F0F2F5]/60 border border-[#E5E8EC]">
                <span className="text-xs font-bold text-[#0A1118] block">{feat.title}</span>
                <span className="text-[11px] text-[#0A1118]/70 leading-snug block mt-0.5">{feat.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            Strict Confidentiality Clause: This tactical specification is provided under NDA for internal corporate appraisal and vendor qualification only.
          </span>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E5E8EC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0A1118] text-white text-xs font-semibold tracking-luxury hover:bg-[#C5A059] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-75"
          >
            {downloading ? (
              <span>GENERATING DOCUMENT...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>DOWNLOAD SOP ({division.specSheetSize})</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestDeployment(division.name);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F0F2F5] hover:bg-[#E5E8EC] text-[#0A1118] text-xs font-semibold tracking-luxury transition-colors cursor-pointer text-center"
          >
            REQUEST SQUAD DEPLOYMENT
          </button>
        </div>

        {downloadComplete && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Document specification downloaded successfully to your local terminal.</span>
          </div>
        )}
      </div>
    </div>
  );
};
