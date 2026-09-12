import React, { useEffect, useRef, useState } from 'react';
import { Shield, UserCheck, Truck, Cctv, Award, ArrowUpRight, LucideIcon } from 'lucide-react';
import BorderGlow from './BorderGlow/BorderGlow';
import DepthCarousel, { DepthCarouselApi, DepthCarouselItem } from './DepthCarousel/DepthCarousel';
import { borderGlowDark } from '../theme/glowTokens';
import { TACTICAL_DIVISIONS } from '../data/content';
import { TacticalDivision } from '../types';

interface ProtectionSectionProps {
  onOpenSop: (division: TacticalDivision) => void;
  onRequestDeployment: (serviceName: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Shield,
  UserCheck,
  Truck,
  Cctv
};

/* Depth carousel sizing — the four Tactical Division cards scale with the
   viewport so they render larger on desktop (the headline request) while
   staying snug and legible on tablets and phones. Re-evaluated on resize. */
interface CarouselCfg {
  cardWidth: number;
  cardHeight: number;
  radius: number;
  spread: number;
  depth: number;
  wrapperHeight: number;
}

const getCarouselCfg = (): CarouselCfg => {
  const vw = typeof window === 'undefined' ? 1280 : window.innerWidth;
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight;

  let cardWidth: number;
  let cardHeight: number;
  let spread: number;
  let depth: number;
  let radius: number;

  if (vw >= 1440) {
    cardWidth = 440; cardHeight = 560; spread = 150; depth = 260; radius = 22;
  } else if (vw >= 1024) {
    cardWidth = 420; cardHeight = 540; spread = 140; depth = 250; radius = 22;
  } else if (vw >= 768) {
    cardWidth = 380; cardHeight = 490; spread = 125; depth = 225; radius = 20;
  } else if (vw >= 640) {
    cardWidth = 340; cardHeight = 445; spread = 110; depth = 200; radius = 18;
  } else {
    cardWidth = Math.min(320, Math.max(272, vw - 56));
    cardHeight = 400; spread = 85; depth = 175; radius = 16;
  }

  /* Wrapper must clear the card plus a little headroom, but cap at 70% of the
     viewport height so the pinned column (header, cards, progress, strip) all
     stay inside the h-screen sticky viewport on short laptops / phones. */
  const wrapperHeight = Math.round(Math.max(cardHeight + 48, Math.min(vh * 0.7, 800)));

  return { cardWidth, cardHeight, radius, spread, depth, wrapperHeight };
};

export const ProtectionSection: React.FC<ProtectionSectionProps> = ({
  onOpenSop,
  onRequestDeployment
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselCfg, setCarouselCfg] = useState<CarouselCfg>(getCarouselCfg);
  const regionRef = useRef<HTMLDivElement | null>(null);
  const barTrackRef = useRef<HTMLDivElement | null>(null);
  const barThumbRef = useRef<HTMLDivElement | null>(null);
  const carouselApiRef = useRef<DepthCarouselApi | null>(null);
  const progressRef = useRef(0);

  /* Pinned depth journey: vertical scroll progress scrubs the four Tactical
     Division cards through the <DepthCarousel /> depth stack and updates the
     visible progress bar. A short hold at full progress hands control back
     to normal vertical scrolling. */
  useEffect(() => {
    const region = regionRef.current;
    const bar = barTrackRef.current;
    const thumb = barThumbRef.current;
    if (!region || !bar || !thumb) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const hold = vh * 0.25;
      const total = Math.max(region.offsetHeight - vh - hold, 1);
      const top = region.getBoundingClientRect().top;
      const p = Math.min(Math.max(-top / total, 0), 1);
      progressRef.current = p;

      carouselApiRef.current?.scrubTo(p);

      const barW = bar.clientWidth;
      const thumbW = Math.max(barW / TACTICAL_DIVISIONS.length, 48);
      thumb.style.width = `${thumbW.toFixed(1)}px`;
      thumb.style.transform = `translateX(${(p * (barW - thumbW)).toFixed(2)}px)`;

      const idx = Math.min(
        TACTICAL_DIVISIONS.length - 1,
        Math.round(p * (TACTICAL_DIVISIONS.length - 1))
      );
      setSelectedIndex(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Keep the depth cards sized to the viewport (bigger on desktop, snug on
     mobile) so the Tactical Division stack stays legible and never overflows. */
  useEffect(() => {
    const onResize = () => setCarouselCfg(getCarouselCfg());
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Jump the pinned journey to a chosen division (mobile chips). */
  const scrollToDivision = (idx: number) => {
    setSelectedIndex(idx);
    const region = regionRef.current;
    if (!region) return;
    const vh = window.innerHeight || 1;
    const hold = vh * 0.25;
    const total = Math.max(region.offsetHeight - vh - hold, 1);
    const p = TACTICAL_DIVISIONS.length > 1 ? idx / (TACTICAL_DIVISIONS.length - 1) : 0;
    const regionTop = region.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: regionTop + p * total, behavior: 'smooth' });
  };

  /* Depth carousel slides — every division keeps its full card content:
     division badge, icon, name, short description and the SOP action. */
  const divisionItems: DepthCarouselItem[] = TACTICAL_DIVISIONS.map((div) => {
    const Icon = iconMap[div.iconName] || Shield;
    return {
      image: div.image,
      alt: div.fullTitle,
      content: (
        <div className="depth-card-copy">
          <div className="flex items-center justify-between mb-1.5">
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur border border-white/60 text-[9px] font-bold tracking-ultra uppercase text-[#0A1118]">
              {div.divisionNumber}
            </span>
            <Icon className="w-4 h-4 text-[#C5A059] shrink-0" />
          </div>
          <h4 className="text-sm sm:text-base lg:text-lg font-serif font-bold text-white mt-1 mb-1 leading-tight">
            {div.name}
          </h4>
          <p className="text-[10px] sm:text-[11px] lg:text-xs text-white/85 leading-snug depth-card-copy__desc">
            {div.shortDesc}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSop(div);
            }}
            className="mt-2.5 self-start inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#C5A059] text-[#0A1118] text-[9px] sm:text-[10px] lg:text-[11px] font-bold tracking-ultra uppercase hover:bg-[#0A1118] hover:text-white transition-all cursor-pointer cursor-target"
          >
            <span>View Division SOP</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      )
    };
  });

  return (
    <section id="protection" className="relative py-20 sm:py-28 px-3 xs:px-4 sm:px-6 bg-[#F8F9FA] border-y border-[#E5E8EC] scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <span className="text-xs font-bold tracking-ultra text-[#C5A059] uppercase block mb-2 sm:mb-3">
            Portfolio Pillar 01
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-serif font-bold text-[#0A1118] mb-4 sm:mb-5">
            The Standard of Protection
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mb-4 sm:mb-6" />
          <p className="text-[#0A1118]/70 text-xs sm:text-base leading-relaxed px-2 font-light">
            Engineered protection protocols blending discrete armed vigilance with dignified ceremonial hospitality, securing Gujarat’s most influential leaders and enterprises.
          </p>

          {/* Quick Mobile Horizontal Division Chips */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto pt-6 pb-2 scrollbar-none justify-start sm:justify-center">
            {TACTICAL_DIVISIONS.map((div, idx) => (
              <button
                key={div.id}
                onClick={() => scrollToDivision(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer cursor-target border ${
                  idx === selectedIndex
                    ? 'bg-[#0A1118] text-white border-[#0A1118] shadow-sm'
                    : 'bg-white text-[#0A1118]/70 border-[#E5E8EC] hover:border-[#C5A059]'
                }`}
              >
                <span>{div.divisionNumber} · {div.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Depth Journey — vertical scroll drives the four Tactical
            Divisions through the depth stack with the visible progress bar. */}
        <div
          id="protectionHorizontal"
          ref={regionRef}
          className="relative h-[350vh] w-screen ml-[calc(50%_-_50vw)]"
        >
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
            {/* Header row — heading, live counter and scroll hint */}
            <div className="px-4 sm:px-10 lg:px-16 flex items-end justify-between gap-4 mb-4 sm:mb-6">
              <h3 className="text-xs font-bold tracking-ultra text-[#0A1118]/40 uppercase">
                Tactical Divisions
              </h3>
              <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                <span className="hidden sm:inline text-[10px] font-bold tracking-ultra uppercase text-[#0A1118]/40">
                  Keep scrolling — divisions advance in depth
                </span>
                <span className="text-xs font-mono text-[#0A1118]/60">
                  {String(selectedIndex + 1).padStart(2, '0')} / {String(TACTICAL_DIVISIONS.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Depth carousel — 4 tactical division cards scrubbed by scroll */}
            <div
              className="relative w-full"
              style={{ height: carouselCfg.wrapperHeight }}
            >
              <DepthCarousel
                items={divisionItems}
                cardWidth={carouselCfg.cardWidth}
                cardHeight={carouselCfg.cardHeight}
                radius={carouselCfg.radius}
                tint="#0A1118"
                depth={carouselCfg.depth}
                spread={carouselCfg.spread}
                tilt={28}
                tiltDirection="right"
                perspective={1500}
                visibleCards={TACTICAL_DIVISIONS.length}
                falloff={0.22}
                blur={7}
                duration={750}
                ease="power3.out"
                autoplay={false}
                loop={false}
                showControls
                showIndicators
                disableWheel
                onChange={(idx) => setSelectedIndex(idx)}
                onApi={(api) => {
                  carouselApiRef.current = api;
                  api.scrubTo(progressRef.current);
                }}
              />
            </div>

            {/* Visible journey progress (driven by vertical scroll) */}
            <div className="px-4 sm:px-10 lg:px-16 mt-4 sm:mt-6">
              <div ref={barTrackRef} className="relative h-1.5 sm:h-2 w-full rounded-full bg-[#0A1118]/10">
                <div
                  ref={barThumbRef}
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#9E7D3B] via-[#C5A059] to-[#E5C98B]"
                  style={{ width: '25%' }}
                />
              </div>
            </div>

            {/* Regulatory Endorsement strip (pinned during the journey) */}
            <div className="px-4 sm:px-10 lg:px-16 mt-4 sm:mt-6">
              <div className="max-w-6xl mx-auto">
                <BorderGlow {...borderGlowDark} borderRadius={12} glowRadius={24}>
                  <div className="border-glow-content p-4 sm:p-5 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-ultra text-[#C5A059] block">
                        Operational Governance
                      </span>
                      <p className="text-xs text-white/90 font-medium">100% Statutorily Registered &amp; Insured Force</p>
                    </div>
                    <div className="h-9 w-9 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                </BorderGlow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};