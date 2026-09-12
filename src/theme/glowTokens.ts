/**
 * Design-token mapping for <BorderGlow />.
 *
 * Single source of truth mirroring the Tailwind v4 `@theme` block in
 * src/index.css. Update the hex values here when the brand palette changes
 * and every card wrapped with <BorderGlow /> follows automatically.
 *
 *   --color-gold:        #C5A059  → brand accent (mesh color 1 + glow hue)
 *   --color-gold-light:  #E5C98B  → mesh color 2
 *   --color-gold-dark:   #9E7D3B  → mesh color 3
 *   --color-obsidian:    #0A1118  → dark surface (dark cards)
 *   --color-canvas-white: #FFFFFF → standard card surface
 *   --color-canvas-light: #F8F9FA → tinted card surface
 */

export interface BorderGlowTokens {
  colors: string[];
  glowColor: string;
  backgroundColor: string;
  borderRadius: number;
  edgeSensitivity: number;
  glowRadius: number;
  glowIntensity: number;
  coneSpread: number;
  animated: boolean;
  fillOpacity: number;
}

/** Gold triad from the @theme accent tokens. */
export const BRAND_GOLD = ['#C5A059', '#E5C98B', '#9E7D3B'] as const;

/** #C5A059 expressed as space-separated HSL "H S L" for the outer glow. */
export const GOLD_GLOW_HSL = '39 48 56';

/** Standard surface cards: white canvas (rounded-2xl grids & detail cards). */
export const borderGlowSurface: BorderGlowTokens = {
  colors: [...BRAND_GOLD],
  glowColor: GOLD_GLOW_HSL,
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  edgeSensitivity: 30,
  glowRadius: 28,
  glowIntensity: 0.9,
  coneSpread: 25,
  animated: false,
  fillOpacity: 0.35,
};

/** Tinted surface cards: canvas-light (#F8F9FA) cards on white sections. */
export const borderGlowSurfaceAlt: BorderGlowTokens = {
  ...borderGlowSurface,
  backgroundColor: '#F8F9FA',
};

/** Large editorial panels (rounded-2xl sm:rounded-3xl → 24px). */
export const borderGlowPanel: BorderGlowTokens = {
  ...borderGlowSurface,
  borderRadius: 24,
  glowRadius: 24,
};

/** Compact feature rows (rounded-xl → 12px, subtler glow). */
export const borderGlowRow: BorderGlowTokens = {
  ...borderGlowSurface,
  borderRadius: 12,
  glowRadius: 20,
  glowIntensity: 0.75,
  fillOpacity: 0.25,
};

/** Dark obsidian cards (bg-[#0A1118] strips) — stronger gold glow. */
export const borderGlowDark: BorderGlowTokens = {
  colors: [...BRAND_GOLD],
  glowColor: GOLD_GLOW_HSL,
  backgroundColor: '#0A1118',
  borderRadius: 16,
  edgeSensitivity: 30,
  glowRadius: 32,
  glowIntensity: 1.1,
  coneSpread: 25,
  animated: false,
  fillOpacity: 0.5,
};

/**
 * Site-wide CursorGrid lattice — pointer-reactive gold shimmer.
 * maxOpacity 0.35 keeps text readable on light canvas surfaces; the click
 * pulse uses the same gold so the effect reads as one system with the
 * BorderGlow cards and the TargetCursor accent color.
 */
export const cursorGridTokens = {
  color: BRAND_GOLD[0],
  cellSize: 72,
  radius: 160,
  falloff: 'smooth',
  holdTime: 400,
  fadeDuration: 800,
  lineWidth: 1.1,
  maxOpacity: 0.35,
  fillOpacity: 0,
  gridOpacity: 0,
  cellRadius: 0,
  clickPulse: true,
  pulseSpeed: 600,
} as const;

/**
 * AccordionGallery (Portfolio Pillar 01 right column) — gold caption accent
 * bar, obsidian legibility overlay, white captions over photography.
 */
export const accordionGalleryTokens = {
  accentColor: BRAND_GOLD[0],
  overlayColor: '#0A1118',
  textColor: '#FFFFFF',
} as const;