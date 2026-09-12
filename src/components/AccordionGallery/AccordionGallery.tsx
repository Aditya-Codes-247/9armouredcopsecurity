/**
 * AccordionGallery — React Bits GSAP-powered expanding image accordion.
 *
 * 9 Armoured Cop integration:
 *  - Colors come from the design system (src/theme/glowTokens.ts): gold
 *    accent bar, obsidian overlay dim, white caption text.
 *  - Added optional controlled mode (`activeIndex` + `onActiveChange`) so
 *    the gallery can stay in sync with the Tactical Divisions selector in
 *    the left column of Portfolio Pillar 01. Uncontrolled usage with
 *    `defaultIndex` behaves exactly like the stock component.
 */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

import './AccordionGallery.css';

export interface AccordionGalleryItem {
  /** Panel image URL. */
  image: string;
  /** Caption revealed on the expanded panel. */
  label?: string;
  /** Optional link — panels with a link render as anchors. */
  link?: string;
  /** Alt text for the image. */
  alt?: string;
}

export interface AccordionGalleryProps {
  /** The panels to render. */
  items?: AccordionGalleryItem[];
  /** Index of the panel expanded on load (uncontrolled mode). */
  defaultIndex?: number;
  /** Controlled active panel index. Omit for uncontrolled behavior. */
  activeIndex?: number;
  /** Fires whenever the active panel changes (hover, click, focus, keys). */
  onActiveChange?: (index: number) => void;
  /** Colour of the caption accent bar and the focus ring. */
  accentColor?: string;
  /** Colour used for the legibility gradient and collapsed-panel dimming. */
  overlayColor?: string;
  /** Colour of the caption text. */
  textColor?: string;
  /** Desaturate collapsed panels; restore colour on the expanded one. */
  grayscale?: boolean;
  /** Whether captions reveal on the expanded panel. */
  showLabels?: boolean;
  /** Duration of the expand / collapse transition in seconds. */
  duration?: number;
  /** GSAP easing used for every transition. */
  ease?: string;
  /** Strength of the internal image drift as panels resize (0 disables). */
  parallax?: number;
  /** Degrees of 3D rotation on collapsed panels. */
  tilt?: number;
  /** Delay between caption bar and text reveal, in seconds. */
  stagger?: number;
  /** How a panel expands on pointer devices. Focus and tap always expand. */
  trigger?: 'hover' | 'click';
  /** Height of the row in pixels. */
  height?: number;
  /** Gap between panels in pixels. */
  gap?: number;
  /** Corner radius of each panel in pixels. */
  radius?: number;
  /** Fraction of the row the expanded panel occupies (0.2 – 0.9). */
  expandRatio?: number;
  /** Lay the accordion out as a row or a column. */
  orientation?: 'horizontal' | 'vertical';
  /** Additional CSS classes for the wrapper. */
  className?: string;
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  activeIndex,
  onActiveChange,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = ''
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const textRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;

  // Controlled / uncontrolled active-index pattern.
  const isControlled = activeIndex !== undefined;
  const clampIndex = (i: number) => Math.min(Math.max(i, 0), count - 1);
  const [internalActive, setInternalActive] = useState(() =>
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0))
  );
  const active = isControlled ? clampIndex(activeIndex) : internalActive;

  const setActiveValue = useCallback(
    (i: number) => {
      if (!isControlled) setInternalActive(i);
      onActiveChange?.(i);
    },
    [isControlled, onActiveChange]
  );

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = (i: number) => {
    if (trigger === 'hover') setActiveValue(i);
  };

  const handleClick = (i: number, e: React.MouseEvent) => {
    if (i !== active) {
      e.preventDefault();
      setActiveValue(i);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveValue((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveValue((i - 1 + count) % count);
    }
  };
  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      } as React.CSSProperties}
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag: React.ElementType = item.link ? 'a' : 'div';
        return (
          <Tag
            key={i}
            ref={el => { panelRefs.current[i] = el; }}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link || undefined}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActiveValue(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={el => { mediaRefs.current[i] = el; }}>
                <img src={item.image} alt={item.alt || item.label || ''} draggable={false} />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={el => { barRefs.current[i] = el; }} />
                <span className="ag-panel__text" ref={el => { textRefs.current[i] = el; }}>
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;

