import React, { useEffect, useRef } from 'react';
import { ChevronDown, ShieldCheck, Radio, MapPin } from 'lucide-react';
import { ASSETS } from '../data/content';
import Plasma from './Plasma/Plasma';

/* Varsity-style block "9" geometry — hand-drawn to echo the strong, squared
   numerals in the company logo. Two CLOSED contours (outer + counter hole) so
   the golden snake can loop each one seamlessly with zero seam. */
const NINE_OUTER =
  'M 65 35 L 235 35 L 235 265 L 150 265 L 150 247 L 164 247 L 164 180 L 65 180 Z';
const NINE_COUNTER =
  'M 113 76 L 181 76 L 181 136 L 113 136 Z';

interface HeroProps {
  onOpenAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAudit }) => {
  const snakeGroupRef = useRef<SVGGElement | null>(null);

  /* Measure each closed contour and send one golden dash gliding around it
     forever — a perfectly smooth "snake" because dash + gap exactly equal the
     path length. Renders one static frame under prefers-reduced-motion. */
  useEffect(() => {
    const group = snakeGroupRef.current;
    if (!group) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const animations: Animation[] = [];
    group.querySelectorAll<SVGPathElement>('.nine-snake-path').forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len * 0.24} ${len * 0.76}`;
      if (!prefersReducedMotion) {
        animations.push(
          p.animate(
            [{ strokeDashoffset: '0' }, { strokeDashoffset: `${-len}` }],
            { duration: 6400, iterations: Infinity, easing: 'linear' }
          )
        );
      }
    });
    return () => animations.forEach((a) => a.cancel());
  }, []);

  const showcaseFrameRef = useRef<HTMLDivElement | null>(null);
  const showcaseOverlayRef = useRef<HTMLDivElement | null>(null);

  /* Scroll-driven fullscreen takeover: as the user scrolls, the headquarters
     frame scales from its resting card size until it covers the entire
     viewport, holds for a beat, then the sticky region releases and normal
     scrolling continues toward Portfolio Pillar 01. */
  useEffect(() => {
    const frame = showcaseFrameRef.current;
    const overlay = showcaseOverlayRef.current;
    const region = document.getElementById('heroShowcase');
    if (!frame || !overlay || !region) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const vw = document.documentElement.clientWidth || 1;
      const hold = vh * 0.25;
      const total = Math.max(region.offsetHeight - vh - hold, 1);
      const top = region.getBoundingClientRect().top;
      const p = Math.min(Math.max(-top / total, 0), 1);
      const eased = p * p * (3 - 2 * p);

      // transform-driven so the scroll stays buttery — layout size never changes
      const cover = Math.max(
        vw / Math.max(frame.offsetWidth, 1),
        vh / Math.max(frame.offsetHeight, 1)
      );
      const scale = 1 + (cover - 1) * eased;
      frame.style.transform = `scale(${scale.toFixed(4)})`;
      frame.style.borderRadius = `${(24 * (1 - eased)).toFixed(2)}px`;
      frame.style.borderColor = `rgba(229, 232, 236, ${(1 - eased).toFixed(3)})`;

      // glass caption fades away as the image takes over the screen
      const fade = Math.min(Math.max((0.82 - p) / 0.22, 0), 1);
      overlay.style.opacity = fade.toFixed(3);
      overlay.style.pointerEvents = fade < 0.05 ? 'none' : 'auto';
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 xs:pt-28 sm:pt-32 pb-14 sm:pb-16 px-3 xs:px-4 sm:px-6 bg-[#FFFFFF] scroll-mt-24">
      {/* Background Ambient Grid & Parallax Architecture */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-[#F0F2F5] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full">
        {/* Hero intro region — the gold liquid-plasma backdrop (React Bits
            <Plasma/>, tinted to the site palette) stretches across the full
            horizontal length of the page, from the top down to the end of the
            intro statement below. */}
        <div className="relative">
          <div className="hero-plasma-backdrop" aria-hidden="true">
            <Plasma
              color="#C5A059"
              speed={0.4}
              direction="forward"
              scale={1.5}
              opacity={0.5}
              mouseInteractive={false}
              renderScale={0.5}
              maxDpr={1.5}
              targetFps={45}
              iterations={50}
            />
          </div>

          <div className="relative max-w-6xl mx-auto w-full text-center">
        {/* Brand Identity — crest & wordmark. Crest fades in; a big hollow block
            "9" leads the wordmark — black outline with a golden gradient snake
            gliding along it, plus the metallic sheen on the name. */}
        <div className="flex flex-col items-center mb-6 sm:mb-10">

          <img
            src={ASSETS.crest}
            alt="9 Armoured Cop Security Service Official Logo"
            className="brand-fade-in w-36 sm:w-44 md:w-52 h-auto block mix-blend-multiply"
            style={{ animationDelay: '0.05s' }}
            referrerPolicy="no-referrer"
          />

          <div
            className="brand-fade-in flex items-center justify-center gap-2.5 sm:gap-4 mt-2 sm:mt-3"
            style={{ animationDelay: '0.35s' }}
          >
            {/* Big hollow block "9" (varsity numeral, outline only): a solid
                black track with a golden gradient snake gliding along it */}
            <svg
              viewBox="45 15 210 260"
              className="w-[clamp(56px,11.5vw,180px)] h-auto shrink-0"
              role="img"
              aria-label="9"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Golden gradient carried by the snake */}
                <linearGradient id="nineStrokeFlow" gradientUnits="userSpaceOnUse" x1="-80" y1="40" x2="380" y2="250">
                  <stop offset="0%" stopColor="#9E7D3B" />
                  <stop offset="22%" stopColor="#C5A059" />
                  <stop offset="40%" stopColor="#E5C98B" />
                  <stop offset="50%" stopColor="#FAF6ED" />
                  <stop offset="60%" stopColor="#E5C98B" />
                  <stop offset="78%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#9E7D3B" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="-230 0; 230 0; -230 0"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </linearGradient>

                <filter id="nineHalo" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>

                <filter id="nineDrop" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#9E7D3B" floodOpacity="0.35" />
                </filter>
              </defs>

              <g filter="url(#nineDrop)">
                {/* soft golden halo */}
                <path
                  d={NINE_OUTER}
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="14"
                  opacity="0.28"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  filter="url(#nineHalo)"
                />
                <path
                  d={NINE_COUNTER}
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="14"
                  opacity="0.28"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  filter="url(#nineHalo)"
                />

                {/* solid black outline track (site obsidian) */}
                <path
                  d={NINE_OUTER}
                  fill="none"
                  stroke="#0A1118"
                  strokeWidth="11"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d={NINE_COUNTER}
                  fill="none"
                  stroke="#0A1118"
                  strokeWidth="11"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* golden gradient snake gliding along the outline */}
                <g ref={snakeGroupRef}>
                  <path
                    className="nine-snake-path"
                    d={NINE_OUTER}
                    fill="none"
                    stroke="url(#nineStrokeFlow)"
                    strokeWidth="11"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <path
                    className="nine-snake-path"
                    d={NINE_COUNTER}
                    fill="none"
                    stroke="url(#nineStrokeFlow)"
                    strokeWidth="11"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </g>
              </g>
            </svg>

            <div className="brand-shine-name font-serif font-bold uppercase text-[clamp(1.5rem,5.2vw,3.75rem)] tracking-[0.13em] leading-tight px-2">
              Armoured Cop
            </div>
          </div>

          <span
            className="brand-fade-in inline-block mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-bold tracking-ultra uppercase text-[#C5A059]"
            style={{ animationDelay: '0.7s' }}
          >
            Security Service
          </span>
        </div>

        {/* Prestige Badge */}
        <div
          id="heroBadge"
          className="inline-flex items-center gap-2 xs:gap-2.5 px-3 xs:px-4 py-1.5 rounded-full bg-[#F8F9FA] border border-[#E5E8EC] mb-5 sm:mb-8 shadow-xs max-w-full cursor-target"
        >
          <img
            src={ASSETS.crest}
            alt="9 Armoured Cop Crest"
            className="w-4 h-4 object-contain shrink-0"
            referrerPolicy="no-referrer"
          />
          <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold tracking-luxury uppercase text-[#0A1118]/90 truncate">
            Government-Registered · Gujarat State Accreditations
          </span>
        </div>

        {/* Headline */}
        <h1
          id="heroHeadline"
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-serif font-bold text-[#0A1118] leading-[1.12] sm:leading-[1.08] tracking-tight mb-5 sm:mb-6 px-1"
        >
          Uncompromising Safety.<br />
          <span className="font-editorial italic font-normal text-[#C5A059]">Unrivaled Precision.</span>
        </h1>

        {/* Subtext */}
        <p
          id="heroSubtext"
          className="max-w-2xl mx-auto text-sm sm:text-lg md:text-xl text-[#0A1118]/70 font-sans font-light leading-relaxed mb-8 sm:mb-10 px-2"
        >
          Bespoke executive protection, integrated surveillance architecture, and mission-critical corporate workforce management across Gujarat.
        </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full text-center">
        {/* CTA Action Buttons */}
        <div
          id="heroCta"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto"
        >
          <a
            href="#protection"
            id="heroExploreBtn"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0A1118] text-white font-medium text-xs tracking-ultra uppercase hover:bg-[#C5A059] hover:text-white transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5 sm:gap-3 group cursor-pointer cursor-target"
          >
            <span>Explore The Portfolio</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          
          <button
            onClick={onOpenAudit}
            id="heroAuditBtn"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#F8F9FA] border border-[#E5E8EC] text-[#0A1118] font-medium text-xs tracking-ultra uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer cursor-target shadow-xs"
          >
            <span>Request Operational Enquiry/Audit</span>
          </button>
        </div>

        {/* Cinematic Fullscreen Takeover — the headquarters frame scales with
            scroll until it covers the entire viewport, holds for a beat, then
            the sticky region releases toward Portfolio Pillar 01. */}
        <div id="heroShowcase" className="relative h-[225vh] w-screen ml-[calc(50%_-_50vw)]">
          <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
            <div
              ref={showcaseFrameRef}
              className="relative w-full max-w-6xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden border border-[#E5E8EC] shadow-xl sm:shadow-2xl zoom-container will-change-transform"
            >
              <div className="aspect-[4/3] xs:aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full relative min-h-[260px] sm:min-h-[340px]">
                <img
                  src={ASSETS.tacticalHeadquartersMap}
                  alt="9 Armoured Cop Tactical Headquarters - Maruti Industrial Estate 2, Vatva, Ahmedabad"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118]/70 via-[#0A1118]/20 to-transparent" />

                {/* Bottom Overlay Glass Strip (fades out at full coverage) */}
                <div
                  ref={showcaseOverlayRef}
                  className="absolute bottom-3 xs:bottom-4 sm:bottom-6 left-3 xs:left-4 sm:left-6 right-3 xs:right-4 sm:right-6 flex flex-col md:flex-row items-start md:items-center justify-between p-3.5 xs:p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/94 backdrop-blur-md border border-white/60 shadow-lg text-left gap-3"
                >
                  <div>
                    <span className="text-[9px] xs:text-[10px] font-bold tracking-ultra text-[#C5A059] uppercase block mb-0.5">
                      Tactical Headquarters
                    </span>
                    <h4 className="text-xs xs:text-sm sm:text-base font-serif font-bold text-[#0A1118] leading-snug">
                      Vatva Command Base &amp; Central Depot · Maruti Industrial Estate - 2, Ahmedabad
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 xs:gap-3 sm:gap-5 text-[11px] sm:text-xs text-[#0A1118]/80 font-medium">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059] shrink-0" /> Maruti Industrial Estate 2
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059] shrink-0" /> 24/7 Rapid Motorcade
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059] shrink-0" /> Central Dispatch Depot
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Cue */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-2 text-[#0A1118]/40">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-ultra uppercase">Scroll to Experience</span>
          <div className="w-4 sm:w-5 h-7 sm:h-9 rounded-full border border-[#0A1118]/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 sm:h-2.5 bg-[#C5A059] rounded-full animate-bounce" />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};
