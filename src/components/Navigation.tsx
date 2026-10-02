import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Mail, ChevronRight } from 'lucide-react';
import { ASSETS, COMPANY_CONTACT, gmailComposeUrl } from '../data/content';

interface NavigationProps {
  onOpenAudit?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenAudit }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home', num: '01' },
    { label: 'PROTECTION', href: '#protection', id: 'protection', num: '02' },
    { label: 'OPERATIONS', href: '#operations', id: 'operations', num: '03' },
    { label: 'SURVEILLANCE', href: '#investigation', id: 'investigation', num: '04' },
    { label: 'ACADEMY', href: '#training', id: 'training', num: '05' },
    { label: 'AUDIT INTAKE', href: '#contact', id: 'contact', num: '06' },
    { label: 'ABOUT US', href: '#locations', id: 'locations', num: '07' },
  ];

  // Monitor scroll progress, sticky state, and active section
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(winScroll > 30);

      // Section scroll spy
      const sections = ['headquarters', 'locations', 'contact', 'training', 'investigation', 'operations', 'protection', 'home'];
      const scrollPos = winScroll + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key and screen resize for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (sectionId === 'home' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      {/* Top Ambient Progress Bar */}
      <div
        id="scrollProgressBar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#C5A059] via-[#E5C98B] to-[#C5A059] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Glassmorphic Nav Header */}
      <header
        id="mainHeader"
        className={`fixed top-2.5 sm:top-4 lg:top-5 left-0 right-0 z-40 px-2.5 sm:px-5 md:px-8 max-w-7xl mx-auto pointer-events-none transition-all duration-300 ${
          scrolled ? 'top-2 sm:top-3 lg:top-4' : ''
        }`}
      >
        <div className="glass-nav rounded-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 lg:py-4 flex items-center justify-between pointer-events-auto transition-all">
          
          {/* Brand Logo with 9 Armoured Cop & Security Service on line below */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home', 'home')}
            className="flex items-center gap-2 sm:gap-2.5 md:gap-3 group shrink-0 select-none cursor-pointer cursor-target"
            aria-label="9 Armoured Cop Security Service Home"
          >
            <div className="h-9 sm:h-10 md:h-11 w-auto flex items-center shrink-0">
              <img
                src={ASSETS.crest}
                alt="9 Armoured Cop Security Service Official Logo"
                className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-xs sm:text-sm md:text-base tracking-wider text-[#0A1118] leading-tight whitespace-nowrap">
                9 Armoured Cop
              </span>
              <span className="text-[8px] sm:text-[9.5px] md:text-[10px] font-semibold tracking-luxury uppercase text-[#C5A059] leading-tight whitespace-nowrap">
                Security Service
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-4 lg:space-x-5 xl:space-x-7 text-xs xl:text-sm font-semibold tracking-wider xl:tracking-ultra text-[#0A1118]/80">
            {navLinks.map((item) => {
              const isActive =
                activeSection === item.id ||
                (item.id === 'locations' && activeSection === 'headquarters');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href, item.id)}
                  className={`transition-all duration-300 cursor-pointer cursor-target relative py-1.5 px-1.5 flex items-center ${
                    isActive
                      ? 'text-[#C5A059] font-bold'
                      : 'hover:text-[#C5A059] text-[#0A1118]/80'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#C5A059] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-full text-[#0A1118] hover:bg-[#F0F2F5] transition-colors cursor-pointer cursor-target flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 sm:p-6 rounded-2xl bg-white/98 backdrop-blur-xl border border-[#E5E8EC] shadow-2xl pointer-events-auto space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            {/* Header info inside drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E8EC]">
              <div className="flex items-center gap-2.5">
                <img
                  src={ASSETS.crest}
                  alt="9 Armoured Cop Logo"
                  className="w-6 h-6 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-bold uppercase tracking-ultra text-[#0A1118]/80">
                  9 Armoured Cop · Navigation
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#C5A059] bg-[#FAF6ED] px-2.5 py-0.5 rounded-full">
                Gujarat Registered
              </span>
            </div>

            {/* Nav list */}
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => {
                const isActive =
                  activeSection === item.id ||
                  (item.id === 'locations' && activeSection === 'headquarters');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href, item.id)}
                    className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-between text-xs font-semibold tracking-wider cursor-target ${
                      isActive
                        ? 'bg-[#FAF6ED] text-[#C5A059] font-bold shadow-xs'
                        : 'text-[#0A1118] hover:bg-[#F8F9FA] hover:text-[#C5A059]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[#0A1118]/40">
                        {item.num}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-[#C5A059] translate-x-0.5' : 'text-[#0A1118]/30'}`} />
                  </a>
                );
              })}
            </div>

            {/* Mobile Contact Quick Links */}
            <div className="pt-3 border-t border-[#E5E8EC] space-y-2 text-xs">
              {COMPANY_CONTACT.directors.map((director) => (
                <a
                  key={director.phoneTel}
                  href={`tel:${director.phoneTel}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#F8F9FA] hover:bg-[#FAF6ED] text-[#0A1118] transition-colors cursor-target"
                >
                  <span className="flex items-center gap-2 text-[#0A1118]/80 font-medium">
                    <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" /> {director.phone}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-[#C5A059] tracking-wider">
                    24/7 Line
                  </span>
                </a>
              ))}

              <a
                href={gmailComposeUrl(COMPANY_CONTACT.email)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 px-3 rounded-lg text-[#0A1118]/70 hover:text-[#C5A059] transition-colors text-[11px] cursor-target"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span className="truncate">{COMPANY_CONTACT.email}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#0A1118]/40 backdrop-blur-xs z-30 lg:hidden pointer-events-auto transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

