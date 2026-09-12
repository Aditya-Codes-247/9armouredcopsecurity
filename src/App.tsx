/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TargetCursor } from './components/TargetCursor';
import CursorGrid from './components/CursorGrid/CursorGrid';
import { cursorGridTokens } from './theme/glowTokens';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProtectionSection } from './components/ProtectionSection';
import { OperationsSection } from './components/OperationsSection';
import { InvestigationSection } from './components/InvestigationSection';
import { TrainingAcademySection } from './components/TrainingAcademySection';
import { ContactSection } from './components/ContactSection';
import { HeadquartersSection } from './components/HeadquartersSection';
import { Footer } from './components/Footer';
import { CareersPage } from './components/CareersPage';

import { CertificatesModal } from './components/modals/CertificatesModal';
import { SopModal } from './components/modals/SopModal';
import { AuditModal } from './components/modals/AuditModal';
import { LegalModal } from './components/modals/LegalModal';

import { TacticalDivision, EnterpriseOperation } from './types';

export default function App() {
  // Modal states
  const [certificatesOpen, setCertificatesOpen] = useState(false);
  const [selectedDivisionForSop, setSelectedDivisionForSop] = useState<TacticalDivision | null>(null);
  const [sopModalOpen, setSopModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [auditDefaultService, setAuditDefaultService] = useState<string>('Executive VIP Close Protection & Motorcade');
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);
  const [careersOpen, setCareersOpen] = useState(false);

  // Hash-based routing for careers page
  useEffect(() => {
    const checkHash = () => {
      setCareersOpen(window.location.hash === '#careers');
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenCareers = () => {
    window.location.hash = '#careers';
  };

  const handleCloseCareers = () => {
    window.location.hash = '';
  };

  const handleOpenAudit = (serviceName?: string) => {
    if (serviceName) {
      setAuditDefaultService(serviceName);
    }
    setAuditModalOpen(true);
  };

  const handleOpenSop = (division: TacticalDivision) => {
    setSelectedDivisionForSop(division);
    setSopModalOpen(true);
  };

  const handleSelectOperation = (op: EnterpriseOperation) => {
    handleOpenAudit(`${op.category}: ${op.title}`);
  };

  const handleScheduleAudit = (divisionTitle: string) => {
    handleOpenAudit(divisionTitle);
  };

  const handleInitiateInquiry = (topic: string) => {
    handleOpenAudit(topic);
  };

  const handleOpenLegal = (title: string) => {
    setLegalModalTitle(title);
  };

  return (
    <div className="min-h-screen bg-white text-[#0A1118] font-sans antialiased selection:bg-[#C5A059] selection:text-white">
      {/* Careers Page (conditional render) */}
      {careersOpen && <CareersPage onBack={handleCloseCareers} />}

      {/* Main App (hidden when careers page is open) */}
      {!careersOpen && (
        <>
          {/* Precision Tactical Target Cursor */}
          <TargetCursor
            targetSelector=".cursor-target, button, a, input, select, textarea, [role='button']"
            cursorColor="var(--cursor-color, #0A1118)"
            cursorColorOnTarget="var(--cursor-color-target, #C5A059)"
            spinDuration={2.5}
            hoverDuration={0.2}
            parallaxOn={true}
          />

          {/* CursorGrid — gold pointer-reactive lattice overlay (site-wide).
              Layered above content, below nav (z-40), progress bar & modals (z-50). */}
          <CursorGrid {...cursorGridTokens} className="cursor-grid--app-overlay" />

          {/* Navigation Header */}
          <Navigation />

          {/* Main Content Sections */}
          <main>
            <Hero onOpenAudit={() => handleOpenAudit()} />

            <ProtectionSection
              onOpenSop={handleOpenSop}
              onRequestDeployment={(serviceName) => handleOpenAudit(serviceName)}
            />

            <OperationsSection onSelectOperation={handleSelectOperation} />

            <InvestigationSection
              onScheduleAudit={handleScheduleAudit}
              onInitiateInquiry={handleInitiateInquiry}
            />

            <TrainingAcademySection />

            <ContactSection initialService={auditDefaultService} />

            <HeadquartersSection
              onOpenAudit={() => handleOpenAudit()}
              onOpenCertificates={() => setCertificatesOpen(true)}
            />
          </main>

          {/* Footer */}
          <Footer
            onOpenCertificates={() => setCertificatesOpen(true)}
            onOpenLegal={handleOpenLegal}
            onOpenCareers={handleOpenCareers}
          />

          {/* Interactive Modals */}
          <CertificatesModal
            isOpen={certificatesOpen}
            onClose={() => setCertificatesOpen(false)}
          />

          <SopModal
            division={selectedDivisionForSop}
            isOpen={sopModalOpen}
            onClose={() => setSopModalOpen(false)}
            onRequestDeployment={(serviceName) => handleOpenAudit(serviceName)}
          />

          <AuditModal
            isOpen={auditModalOpen}
            onClose={() => setAuditModalOpen(false)}
            defaultService={auditDefaultService}
          />

          <LegalModal
            title={legalModalTitle}
            isOpen={!!legalModalTitle}
            onClose={() => setLegalModalTitle(null)}
          />
        </>
      )}
    </div>
  );
}
