import { useEffect, useRef, useState, useCallback } from "react";
import {
  Check, X, Menu, ChevronLeft, ChevronRight,
  Plus, Minus, Home, ArrowRight, ChevronDown
} from "lucide-react";

/* ══════════════════════════════════════════════
   CUSTOM PREMIUM ICONS — hand-crafted SVG set
═══════════════════════════════════════════════ */
type IconProps = { size?: number; className?: string; style?: React.CSSProperties };

function IcCrown({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M3 19h18"/>
      <path d="M3 19L6 8l5 5.5L12 4l1 9.5L18 8l3 11"/>
      <circle cx="3" cy="19" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="21" cy="19" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="6" cy="8" r="1.4" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="4" r="1.4" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="8" r="1.4" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IcGem({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M6 3h12l4 5.5L12 22 2 8.5z"/>
      <path d="M2 8.5h20" strokeWidth="0.8" opacity="0.55"/>
      <path d="M6 3L2 8.5M18 3l4 5.5" strokeWidth="0.8" opacity="0.55"/>
      <path d="M12 3L7 8.5 12 22l5-13.5z" strokeWidth="0.7" opacity="0.25"/>
    </svg>
  );
}

function IcFlower({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <ellipse cx="12" cy="6" rx="2.5" ry="4.2" transform="rotate(0 12 12)"/>
      <ellipse cx="12" cy="6" rx="2.5" ry="4.2" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="6" rx="2.5" ry="4.2" transform="rotate(120 12 12)"/>
      <ellipse cx="12" cy="6" rx="2.5" ry="4.2" transform="rotate(180 12 12)"/>
      <ellipse cx="12" cy="6" rx="2.5" ry="4.2" transform="rotate(240 12 12)"/>
      <ellipse cx="12" cy="6" rx="2.5" ry="4.2" transform="rotate(300 12 12)"/>
      <circle cx="12" cy="12" r="2.8" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
    </svg>
  );
}

function IcSpark({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2L13.5 9.5 21 8 14.5 12 21 16 13.5 14.5 12 22 10.5 14.5 3 16 9.5 12 3 8 10.5 9.5z"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" opacity="0.5"/>
    </svg>
  );
}

function IcCamera({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M23 18a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
      <circle cx="12" cy="13" r="4"/>
      <circle cx="12" cy="13" r="1.5" fill="currentColor" stroke="none" opacity="0.4"/>
      <circle cx="18.5" cy="9.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IcPhone({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M6.6 3A2 2 0 014.8 4.2l-1 2.5a2 2 0 000 1.4 16 16 0 0012.1 12.1 2 2 0 001.4 0l2.5-1a2 2 0 001.2-1.8 14.4 14.4 0 00-.5-3.2 1 1 0 00-1.3-.7l-3 1a1 1 0 01-1.1-.3 8 8 0 01-3.8-3.8 1 1 0 01.3-1.1l1-3a1 1 0 00-.7-1.3A14.4 14.4 0 006.6 3z"/>
    </svg>
  );
}

function IcFork({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M3 2v7c0 1.66 1.34 3 3 3s3-1.34 3-3V2"/>
      <path d="M6 2v20M6 9v13"/>
      <path d="M15 2c0 4.42 3.58 8 8 8V2h-8z"/>
      <path d="M21 22V10"/>
    </svg>
  );
}

function IcNote({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  );
}

function IcHeadset({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M3 18v-6a9 9 0 0118 0v6"/>
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/>
    </svg>
  );
}

function IcPillar({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M3 21h18M3 7h18M5 7v14M9 7v14M15 7v14M19 7v14"/>
      <path d="M2 3l10-1 10 1v4H2z"/>
    </svg>
  );
}

function IcAuto({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M5 17H3a2 2 0 01-2-2v-4l2-5h14l2 5v4a2 2 0 01-2 2h-2"/>
      <circle cx="7.5" cy="17.5" r="2.5"/>
      <circle cx="16.5" cy="17.5" r="2.5"/>
      <path d="M5 9h14"/>
    </svg>
  );
}

function IcLeaf({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M11 20A7 7 0 014 13c0-5 4.5-10 9-12 4.5 2 9 7 9 12a7 7 0 01-7 7 7 7 0 01-4-1"/>
      <path d="M20 13c0 5-4.5 9-9 9" opacity="0.5"/>
      <path d="M13 20c.3-4.5-3.5-8-9-7" opacity="0.5"/>
    </svg>
  );
}

function IcShield({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4" strokeWidth="1.5"/>
    </svg>
  );
}

function IcPeople({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="9" cy="7" r="4"/>
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
      <path d="M16 3.13a4 4 0 010 7.75" opacity="0.6"/>
      <path d="M21 21v-2a4 4 0 00-3-3.85" opacity="0.6"/>
    </svg>
  );
}

function IcClock({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IcMedal({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="15" r="7"/>
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
      <path d="M15 7l-3-3-3 3V2h6z" opacity="0.6"/>
      <path d="M10 15h4M12 13v4" strokeWidth="1.2"/>
    </svg>
  );
}

function IcRuler({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M1 18L8 4l15 7-7 14L1 18z"/>
      <path d="M6 16l2-4M9.5 14.5l1-2.5M13 13l1-2.5M16.5 11.5l1-2.5" strokeWidth="1"/>
    </svg>
  );
}

function IcEarth({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  );
}

function IcSend({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

function IcInsta({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IcHeart({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      <path d="M12 8c0 0 2 1.5 2 4" strokeWidth="1" opacity="0.35"/>
    </svg>
  );
}

function IcCalendar({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="2"/>
    </svg>
  );
}

function IcWrench({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}

function IcArrowMove({ size=24, className='', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2v20M2 12l4-4-4 4M20 12l-4 4 4-4M2 12l4 4"/>
      <path d="M12 2l-4 4M12 2l4 4M12 22l-4-4M12 22l4-4"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   GALLERY — Hand-crafted SVG Illustration Scenes
═══════════════════════════════════════════════ */
function GalCouple({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20 100V70c0-8 5-14 14-16" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <circle cx="20" cy="56" r="10" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <path d="M60 100V70c0-8-5-14-14-16" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <circle cx="60" cy="56" r="10" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <path d="M34 100v-8c0-3.3 2.7-6 6-6s6 2.7 6 6v8" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
      <path d="M20 68c3 6 17 6 20 0" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M5 30 Q40 0 75 30" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.2"/>
      <path d="M2 40 Q40 8 78 40" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
      <circle cx="40" cy="44" r="3" fill="currentColor" opacity="0.4"/>
      <path d="M37 44 Q40 39 43 44" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <circle cx="25" cy="25" r="1" fill="currentColor" opacity="0.25"/>
      <circle cx="55" cy="22" r="1" fill="currentColor" opacity="0.25"/>
      <circle cx="40" cy="18" r="1.5" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

function GalBouquet({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" className={className}>
      <path d="M40 95 L40 55" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <path d="M40 75 Q30 65 20 60" stroke="currentColor" strokeWidth="1.5" opacity="0.35"/>
      <path d="M40 70 Q50 62 58 58" stroke="currentColor" strokeWidth="1.5" opacity="0.35"/>
      <ellipse cx="40" cy="45" rx="10" ry="12" stroke="currentColor" strokeWidth="1.2" opacity="0.6"/>
      <ellipse cx="24" cy="42" rx="9" ry="11" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <ellipse cx="56" cy="42" rx="9" ry="11" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <ellipse cx="32" cy="28" rx="8" ry="10" stroke="currentColor" strokeWidth="1.2" opacity="0.45"/>
      <ellipse cx="48" cy="28" rx="8" ry="10" stroke="currentColor" strokeWidth="1.2" opacity="0.45"/>
      <circle cx="40" cy="44" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="41" r="4.5" fill="currentColor" opacity="0.22"/>
      <circle cx="56" cy="41" r="4.5" fill="currentColor" opacity="0.22"/>
      <circle cx="32" cy="27" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="27" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M33 95 Q38 88 40 95 Q42 88 47 95" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
    </svg>
  );
}

function GalCandles({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" className={className}>
      <rect x="22" y="55" width="10" height="36" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <rect x="35" y="40" width="10" height="51" rx="2" stroke="currentColor" strokeWidth="1.3" opacity="0.7"/>
      <rect x="48" y="50" width="10" height="41" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <path d="M27 55 Q28 46 27 38 Q30 42 30 55" fill="currentColor" opacity="0.4"/>
      <path d="M40 40 Q41 30 40 20 Q44 26 44 40" fill="currentColor" opacity="0.55"/>
      <path d="M53 50 Q54 42 53 34 Q56 38 56 50" fill="currentColor" opacity="0.4"/>
      <ellipse cx="27" cy="40" rx="2.5" ry="3.5" fill="currentColor" opacity="0.6"/>
      <ellipse cx="40" cy="22" rx="3" ry="4" fill="currentColor" opacity="0.75"/>
      <ellipse cx="53" cy="36" rx="2.5" ry="3.5" fill="currentColor" opacity="0.6"/>
      <circle cx="27" cy="37" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="18" r="1.2" fill="currentColor" opacity="0.6"/>
      <circle cx="53" cy="33" r="1" fill="currentColor" opacity="0.5"/>
      <path d="M12 92h56" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
      <path d="M15 96h50" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
    </svg>
  );
}

function GalToast({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" className={className}>
      <path d="M24 90L28 45l-12-10h20L24 90z" stroke="currentColor" strokeWidth="1.3" opacity="0.6"/>
      <path d="M56 90L52 45l12-10H44L56 90z" stroke="currentColor" strokeWidth="1.3" opacity="0.6"/>
      <path d="M24 85h0" stroke="currentColor" strokeWidth="1"/>
      <path d="M28 65h-8M28 72h-8M26 78h-4" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
      <path d="M52 65h8M52 72h8M54 78h4" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
      <path d="M36 35 Q40 22 44 35" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
      <circle cx="30" cy="28" r="1" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="18" r="1.2" fill="currentColor" opacity="0.5"/>
      <circle cx="50" cy="25" r="1" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="48" r="2" fill="currentColor" opacity="0.2"/>
      <circle cx="56" cy="48" r="2" fill="currentColor" opacity="0.2"/>
      <path d="M24 90h0L56 90" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}

function GalDance({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" className={className}>
      <circle cx="30" cy="18" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.55"/>
      <circle cx="52" cy="18" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.55"/>
      <path d="M22 26c-4 4-6 10-5 16" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
      <path d="M38 26c0 4-2 8-4 12" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
      <path d="M22 42l-8 18" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <path d="M34 38l8 22" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <path d="M22 42l12-4" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <path d="M44 26c3 4 7 9 8 14" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
      <path d="M60 26c4 4 6 10 4 16" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
      <path d="M60 42l10 18" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <path d="M48 40l-8 18" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <path d="M38 26 Q41 20 44 26" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <circle cx="28" cy="72" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
      <circle cx="52" cy="75" r="3" stroke="currentColor" strokeWidth="0.8" opacity="0.2"/>
    </svg>
  );
}

function GalCake({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" className={className}>
      <ellipse cx="40" cy="90" rx="26" ry="5" fill="currentColor" opacity="0.1"/>
      <rect x="22" y="72" width="36" height="18" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.6"/>
      <rect x="26" y="52" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.65"/>
      <rect x="30" y="34" width="20" height="18" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.7"/>
      <path d="M22 75h36M26 56h28M30 40h20" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.3"/>
      <path d="M35 34 Q37 25 35 18 Q40 22 45 18 Q43 25 45 34" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.45"/>
      <ellipse cx="40" cy="18" rx="3" ry="4" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="14" r="1.5" fill="currentColor" opacity="0.6"/>
      <path d="M28 78l2 8M36 78l2 8M44 78l2 8M52 78l2 8" stroke="currentColor" strokeWidth="0.7" opacity="0.2"/>
      <path d="M32 57l2 10M38 57l2 10M44 57l2 10" stroke="currentColor" strokeWidth="0.7" opacity="0.2"/>
    </svg>
  );
}

function GalFloral({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className}>
      {[0,45,90,135,180,225,270,315].map(angle => (
        <ellipse key={angle} cx="40" cy="20" rx="7" ry="13"
          transform={`rotate(${angle} 40 40)`}
          stroke="currentColor" strokeWidth="1" opacity="0.45"
          fill="currentColor" fillOpacity="0.05"/>
      ))}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map(angle => (
        <ellipse key={angle} cx="40" cy="24" rx="4" ry="8"
          transform={`rotate(${angle} 40 40)`}
          stroke="currentColor" strokeWidth="0.7" opacity="0.25"/>
      ))}
      <circle cx="40" cy="40" r="9" fill="currentColor" opacity="0.4" stroke="currentColor" strokeWidth="0.5"/>
      <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function GalLights({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className}>
      <path d="M5 20 Q20 28 40 18 Q60 8 75 20" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
      <path d="M5 35 Q20 43 40 33 Q60 23 75 35" stroke="currentColor" strokeWidth="0.8" opacity="0.35"/>
      <path d="M5 50 Q20 58 40 48 Q60 38 75 50" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      {[12,24,36,48,60].map((x,i) => (
        <g key={i} transform={`translate(${x} ${18+i*0.5})`}>
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
          <ellipse cx="0" cy="11" rx="3.5" ry="5" fill="currentColor" opacity="0.4"/>
          <circle cx="0" cy="11" r="2" fill="currentColor" opacity="0.25"/>
        </g>
      ))}
      {[8,20,32,44,56,68].map((x,i) => (
        <g key={i} transform={`translate(${x} ${33})`}>
          <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="0.7" opacity="0.3"/>
          <ellipse cx="0" cy="10" rx="3" ry="4" fill="currentColor" opacity="0.3"/>
        </g>
      ))}
      {[5,18,30,43,55,70].map((x,i) => (
        <circle key={i} cx={x} cy={50+Math.sin(i)*3} r="2.5" fill="currentColor" opacity="0.25"/>
      ))}
      <circle cx="15" cy="10" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="5" r="1.5" fill="currentColor" opacity="0.5"/>
      <circle cx="65" cy="10" r="1" fill="currentColor" opacity="0.5"/>
      <circle cx="28" cy="65" r="1.2" fill="currentColor" opacity="0.35"/>
      <circle cx="52" cy="62" r="1" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

function GalFamily({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" className={className}>
      <circle cx="40" cy="16" r="10" stroke="currentColor" strokeWidth="1.3" opacity="0.7"/>
      <circle cx="18" cy="22" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.55"/>
      <circle cx="62" cy="22" r="8" stroke="currentColor" strokeWidth="1.2" opacity="0.55"/>
      <circle cx="10" cy="38" r="5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <circle cx="70" cy="38" r="5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <path d="M30 26c-4 4-6 10-6 16" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
      <path d="M50 26c4 4 6 10 6 16" stroke="currentColor" strokeWidth="1.3" opacity="0.5"/>
      <path d="M30 42l-4 20" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <path d="M50 42l4 20" stroke="currentColor" strokeWidth="1.3" opacity="0.4"/>
      <path d="M36 26v16" stroke="currentColor" strokeWidth="1.4" opacity="0.6"/>
      <path d="M44 26v16" stroke="currentColor" strokeWidth="1.4" opacity="0.6"/>
      <path d="M36 42l4 22 4-22" stroke="currentColor" strokeWidth="1.4" opacity="0.55"/>
      <path d="M10 43l5 20" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
      <path d="M70 43l-5 20" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
      <path d="M10 90h60" stroke="currentColor" strokeWidth="0.7" opacity="0.2"/>
    </svg>
  );
}

function GalSceneCamera({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className}>
      <rect x="10" y="25" width="60" height="44" rx="5" stroke="currentColor" strokeWidth="1.4" opacity="0.6"/>
      <path d="M26 25v-8l8-5h12l8 5v8" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      <circle cx="40" cy="47" r="15" stroke="currentColor" strokeWidth="1.3" opacity="0.65"/>
      <circle cx="40" cy="47" r="10" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <circle cx="40" cy="47" r="5" fill="currentColor" opacity="0.25"/>
      <circle cx="40" cy="47" r="2" fill="currentColor" opacity="0.45"/>
      <circle cx="62" cy="33" r="3" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <circle cx="62" cy="33" r="1" fill="currentColor" opacity="0.35"/>
      <rect x="16" y="32" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      <path d="M48 38c3 0 6 1 8 3" stroke="currentColor" strokeWidth="0.8" opacity="0.3" strokeLinecap="round"/>
    </svg>
  );
}

function GalCrownScene({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className}>
      <path d="M10 64h60" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <path d="M10 64L20 30l15 18L40 16l5 32 15-18 10 34" stroke="currentColor" strokeWidth="1.4" opacity="0.65"/>
      <circle cx="20" cy="30" r="3.5" fill="currentColor" opacity="0.45"/>
      <circle cx="40" cy="16" r="4" fill="currentColor" opacity="0.55"/>
      <circle cx="60" cy="30" r="3.5" fill="currentColor" opacity="0.45"/>
      <rect x="12" y="64" width="56" height="8" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
      <ellipse cx="25" cy="51" rx="3" ry="4" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      <ellipse cx="40" cy="50" rx="4" ry="5" stroke="currentColor" strokeWidth="0.9" opacity="0.35"/>
      <ellipse cx="55" cy="51" rx="3" ry="4" stroke="currentColor" strokeWidth="0.8" opacity="0.3"/>
      <circle cx="25" cy="51" r="1.5" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="50" r="2" fill="currentColor" opacity="0.35"/>
      <circle cx="55" cy="51" r="1.5" fill="currentColor" opacity="0.3"/>
      <circle cx="15" cy="20" r="1" fill="currentColor" opacity="0.3"/>
      <circle cx="65" cy="20" r="1" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

function GalMoment({ className='' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className}>
      <path d="M18 40 Q18 22 30 22 Q40 22 40 40 Q40 58 50 58 Q62 58 62 40" stroke="currentColor" strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
      <circle cx="18" cy="40" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="62" cy="40" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="30" cy="24" r="2" fill="currentColor" opacity="0.25"/>
      <circle cx="50" cy="56" r="2" fill="currentColor" opacity="0.25"/>
      <circle cx="15" cy="20" r="1.5" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="12" r="1" fill="currentColor" opacity="0.35"/>
      <circle cx="65" cy="20" r="1.5" fill="currentColor" opacity="0.4"/>
      <circle cx="15" cy="60" r="1" fill="currentColor" opacity="0.25"/>
      <circle cx="65" cy="58" r="1.5" fill="currentColor" opacity="0.35"/>
      <path d="M36 30 Q40 26 44 30 Q40 36 36 30z" fill="currentColor" opacity="0.35"/>
      <path d="M40 30 Q44 24 48 30" stroke="currentColor" strokeWidth="0.8" opacity="0.25" fill="none"/>
      <path d="M32 30 Q36 24 40 30" stroke="currentColor" strokeWidth="0.8" opacity="0.25" fill="none"/>
      <path d="M36 50 Q40 44 44 50 Q40 56 36 50z" fill="currentColor" opacity="0.3"/>
    </svg>
  );
}

/* ── URL PARAMS ── */
function getVenue() {
  const p = new URLSearchParams(window.location.search);
  const color    = p.get('color')   || 'C9A843';
  const color2   = p.get('color2')  || 'E8C96B';
  const colorD   = p.get('colord')  || '8B6914';
  const toRgb = (h: string) => [
    parseInt(h.slice(0,2),16),
    parseInt(h.slice(2,4),16),
    parseInt(h.slice(4,6),16)
  ].join(', ');
  document.documentElement.style.setProperty('--gold',     '#'+color);
  document.documentElement.style.setProperty('--gold2',    '#'+color2);
  document.documentElement.style.setProperty('--gold-dark','#'+colorD);
  document.documentElement.style.setProperty('--gold-rgb', toRgb(color));
  return {
    name:     p.get('name')    || 'Bagtly Köşk',
    tagline:  p.get('tag')     || 'Arzuwyňyzdaky toý — biziň elimizde.',
    city:     p.get('city')    || 'Aşgabat',
    phone:    p.get('phone')   || '+993 12 34-56-78',
    phone2:   p.get('phone2')  || '',
    address:  p.get('addr')    || 'Arçabil şaýoly 110',
    color, color2, colorD,
    guests:   p.get('guests')  || '500',
    halls:    p.get('halls')   || '3',
    founded:  p.get('est')     || '2015',
    events:   p.get('events')  || '1200+',
    parking:  p.get('parking') || '200',
    instagram:p.get('ig')      || '',
    telegram: p.get('tg')      || '',
    logo:     p.get('logo')    || null,
    minprice: p.get('price')   || '25',
  };
}

/* ── HALLS DATA ── */
function makeHalls(count: number, v: ReturnType<typeof getVenue>) {
  const base = parseInt(v.minprice);
  const g    = parseInt(v.guests);
  const all = [
    {
      id:1, name:'Şa Zaly', name_en:'ROYAL HALL',
      Icon: IcCrown,
      cap: Math.floor(g*0.8), area:'800 m²', ceiling:'6 metr', style:'Klassik Lýuks',
      tag:'Iň Uly Zal', priceFrom: base+10,
      features:['Kristal çyralar','Ak mermer pol','Altyn bezeg panelleri','Sahna & sahypa','VIP otaglary','Öz giriş'],
      gradient:'radial-gradient(ellipse at 60% 30%, rgba(201,168,67,0.15) 0%, rgba(139,26,46,0.06) 60%, transparent 80%)',
    },
    {
      id:2, name:'Bahar Zaly', name_en:'SPRING HALL',
      Icon: IcFlower,
      cap: Math.floor(g*0.5), area:'500 m²', ceiling:'4.5 metr', style:'Häzirki Zaman',
      tag:'Iň Meşhur', priceFrom: base,
      features:['Panorama penjireler','LED display diwary','Döwrebap yşyk','Öz aşhanasy','Foýe bölümi','Açyk howly giriş'],
      gradient:'radial-gradient(ellipse at 40% 40%, rgba(100,150,201,0.12) 0%, rgba(201,168,67,0.08) 60%, transparent 80%)',
    },
    {
      id:3, name:'Altyn Zal', name_en:'GOLDEN HALL',
      Icon: IcGem,
      cap: Math.floor(g*0.3), area:'300 m²', ceiling:'4 metr', style:'Ykjam Premium',
      tag:'Ykjam & Lýuks', priceFrom: base-5,
      features:['Altyn bezeg','Çeýe düzüm','Tegelek stol mümkin','Özel yşyklandyryş','Lýuks garderop','Kiçi guruplar ideal'],
      gradient:'radial-gradient(ellipse at 50% 50%, rgba(201,168,67,0.18) 0%, rgba(139,105,20,0.08) 50%, transparent 75%)',
    },
    {
      id:4, name:'Açyk Howly', name_en:'GARDEN COURT',
      Icon: IcLeaf,
      cap: Math.floor(g*0.6), area:'1200 m²', ceiling:'Açyk asman', style:'Açyk Tebigat',
      tag:'Açyk Howly', priceFrom: base-8,
      features:['Ýaşyl bag gurşawy','Çadyr gurmak mümkin','Açyk sahna','Milli öwüşgin','Tomus üçin amatly','Foto üçin ajaýyp'],
      gradient:'radial-gradient(ellipse at 50% 60%, rgba(27,107,58,0.15) 0%, rgba(201,168,67,0.05) 50%, transparent 75%)',
    },
  ];
  return all.slice(0, count);
}

/* ── SERVICES DATA ── */
const ALL_SVCS = [
  { cat:'food',  Icon:IcFork,      name:'Premium Milli Tagam',      desc:'Türkmen milli tagamlary — palaw, çorba, kebap, şaşlyk iň ökde aşpezler tarapyndan. Her stol üçin aýratyn hyzmat.',       list:['3 menýu saýlawy','Gazly & gazsyz içgiler','Tort we süýjülikler','Gije naharlygy'], note:'Adama görä ylalaşyk' },
  { cat:'food',  Icon:IcSpark,     name:'Halkara Menýu',            desc:'Ýewropa, Aziýa we Gündogar tagamlary. Daşary ýurtly myhmanlaryňyz hem öz tagamyny tapar.',                               list:['5 tapgyr naharlygy','Kokteýl sagady','Açyk bar (alkogolsyz)','Premium süýjülikler'], note:'Adama görä ylalaşyk' },
  { cat:'decor', Icon:IcFlower,    name:'Gül we Zal Bezeği',        desc:'Professional floristler siziň reňk palettiňize görä doly zaly bezäp berýär.',                                            list:['Zal bezegi','Stol gülleri','Giriş arkasy','Gelin stolynyň bezegi'], note:'Pakete görä' },
  { cat:'decor', Icon:IcSpark,     name:'Yşyk Dizaýny',             desc:'LED, kristal, şem yşyklary. Romantik ýa-da şäwweli — islän atmosferany döredýäris.',                                     list:['LED perde yşyklar','Stol şemleri','Sahna yşyklandyrma','Reňk üýtgedip bilýän ulgam'], note:'Pakete görä' },
  { cat:'music', Icon:IcNote,      name:'Milli Toý Sazandalary',    desc:'Türkmen milli sazy — dutar, gyjak, deprek ansamblymyz her toý üçin.',                                                    list:['3-5 sazanda','Milli & häzirki repertuar','Ses ulgamy','4-6 sagat'], note:'Ylalaşyk' },
  { cat:'music', Icon:IcHeadset,   name:'Toý Tamadasy',             desc:'Toýuňyzyň ähli bölümini bir yzygiderlilikde alyp barjak hünärmen tamada.',                                               list:['Doly gün hyzmat','2 dil (TM/RU)','Oýun & bäsleşik','Programma meýilnamasy'], note:'Ylalaşyk' },
  { cat:'photo', Icon:IcCamera,    name:'Foto & Wideo Hyzmat',      desc:'2 suratçy + wideograf. Drone, studio çykyş, sosial media klip.',                                                        list:['2 suratçy + 1 wideograf','Howa suraty (Drone)','Albom + USB','Sosial media klip'], note:'Ylalaşyk' },
  { cat:'hotel', Icon:IcPillar,    name:'Myhmanhana Otaglary',      desc:'Daşary şäherden gelen myhmanlar üçin hyzmatdaş myhmanhana bilen ýeňilleşdirilen baha.',                                  list:['Gelinlik öý (1 gije mugt)','Ýeňilleşdirilen baha','Aeroporta transfer','VIP salam çemeni'], note:'Myhman sanyna görä' },
  { cat:'trans', Icon:IcAuto,      name:'Toý Transport',            desc:'Bezeg bilen taýýarlanan awtoulaglar gelin-ýigit we myhmanlar üçin.',                                                     list:['Gelin awtoulagy','Myhmanlary getirmek','Aeroporta transfer','Gün boý hyzmat'], note:'Awtoulag sanyna görä' },
];

const SVC_CATS = [
  { id:'all',   Icon:IcSpark,   label:'Hemmesi' },
  { id:'food',  Icon:IcFork,    label:'Aşhana' },
  { id:'decor', Icon:IcFlower,  label:'Bezeg' },
  { id:'music', Icon:IcNote,    label:'Saz' },
  { id:'photo', Icon:IcCamera,  label:'Suratçy' },
  { id:'hotel', Icon:IcPillar,  label:'Myhmanhana' },
  { id:'trans', Icon:IcAuto,    label:'Transport' },
];

/* ── TESTIMONIALS ── */
const TSTS = [
  { groom:'Merdan',  bride:'Aýgül',     year:'2024', hall:'Şa Zaly',    guests:350, q:'Ähli zat — nahary, bezegi, sazy — hemmesi kämil derejede gurnaldy. Myhmanlarmyz henizem gürrüň edýärler!',                  badge:'Iň kämil toý' },
  { groom:'Döwlet',  bride:'Ogulgerek', year:'2024', hall:'Bahar Zaly', guests:220, q:'Daşary ýurtly garyndaşlarymyz "Bu biziň gören iň gowy toý mekanymyz" diýdiler. Bize garşylyk üçin köp sag boluň!',          badge:'Halkara derejede' },
  { groom:'Serdar',  bride:'Läle',      year:'2023', hall:'Altyn Zal',  guests:120, q:'Kiçiräk, ýöne örän lýuks toý etmek isledik. Altyn Zal biziň islegimize doly laýyk geldi. Maslahatçymyz ajaýypdy!',           badge:'Ykjam lýuks' },
  { groom:'Rejep',   bride:'Maýa',      year:'2023', hall:'Şa Zaly',    guests:480, q:'480 adamy kabul etdik. Her stola gözegçilik, her myhmanyň ýeri — topar muny kämil derejede ýerine ýetirdi.',                  badge:'Uly toý, kämil gurnama' },
  { groom:'Yhlas',   bride:'Gülälek',   year:'2024', hall:'Açyk Howly', guests:300, q:'Açyk howluda gün batymynda toý etdik. Yşyklar, güller, saz — ol pursat biziň bütin ömrümize ýatda galar!',                   badge:'Açyk howly, ak gün' },
  { groom:'Batyr',   bride:'Nargözel',  year:'2023', hall:'Bahar Zaly', guests:200, q:'Maslahatçy hanym bize ilki güniň özünden toý gününe çenli ýol görkezdi. Biz diňe begendik — galan ähli zat olarda.',          badge:'Alada bilen hyzmat' },
];

/* ── GALLERY DATA ── */
const GALLERY = [
  { Scene: GalCouple,      label:'Gelin & Ýigit',     gradient:'linear-gradient(145deg,#0e0008,#1a001a)',  span:'row-2' },
  { Scene: GalBouquet,     label:'Zal Bezegi',         gradient:'linear-gradient(145deg,#0d0900,#1a1200)',  span:'' },
  { Scene: GalCandles,     label:'Şem Agşamy',         gradient:'linear-gradient(145deg,#08060f,#120a18)',  span:'' },
  { Scene: GalToast,       label:'Toý Tostu',          gradient:'linear-gradient(145deg,#060810,#0d1020)',  span:'' },
  { Scene: GalDance,       label:'Ilkinji Tans',        gradient:'linear-gradient(145deg,#0e0002,#1a0010)',  span:'row-2' },
  { Scene: GalCake,        label:'Toý Torti',          gradient:'linear-gradient(145deg,#0a0700,#140e00)',  span:'' },
  { Scene: GalFloral,      label:'Gül Bezegi',         gradient:'linear-gradient(145deg,#030609,#070e12)',  span:'' },
  { Scene: GalLights,      label:'Yşyk Sehiri',        gradient:'linear-gradient(145deg,#050510,#0e0e1e)',  span:'' },
  { Scene: GalFamily,      label:'Maşgala Pursady',    gradient:'linear-gradient(145deg,#050905,#0c130c)',  span:'col-2' },
  { Scene: GalSceneCamera, label:'Surat Pursady',      gradient:'linear-gradient(145deg,#0d0800,#1a1200)',  span:'' },
  { Scene: GalCrownScene,  label:'Şaý-seherde',        gradient:'linear-gradient(145deg,#08080f,#12121a)',  span:'' },
  { Scene: GalMoment,      label:'Ýatdan çykmajak an', gradient:'linear-gradient(145deg,#0c0900,#1a1400)', span:'' },
];

/* ── FAQ ── */
const FAQS = [
  { q:'Zaly nähili wagtlykda bron etmek gerek?',              a:'Meşhur sene we zallary (esasan tomus we güýz) 6-12 aý öňünden bron etmek maslahat berilýär. Başga seneler üçin 2-3 aý ýeterli.' },
  { q:'Myhmanlaryň iň az we iň köp sany nämeler?',            a:'Iň az 50 adam. Iň köp sany siziň saýlan zalyňyza görä üýtgeýär. Sanyňyza görä dogry zal maslahat berler.' },
  { q:'Öz aşpezimizi ýa-da tamadamyzy getirip bilerismi?',    a:'Bu barada öňünden ylalaşmak gerek. Käbir halatlarda öz hünärmenlerinizi getirip bilýärsiňiz, ýöne salgylanma töleg bolup biler.' },
  { q:'Bron etmek üçin öňünden töleg näçe?',                  a:'Bron tassyklamak üçin umumy bahanyň 30%-i öňünden tölenýär. Galan bölek toýdan 7-30 gün öňünden tamamlanýar.' },
  { q:'Öz bezegiňizi getirmek mümkinmi?',                     a:'Hawa. Öz bezeg materiallaryňyzy getirip bilersiňiz. Toýdan 2-3 sagat öňünden zala girip bolýar.' },
  { q:'Toý güni ýagmyr ýagsa? (Açyk howly)',                  a:'Açyk howly üçin howanyň erbetleşmegi halynda howa çadyry ýa-da ýapyk bölüme geçiriş mümkinçiligimiz bar. Bu öňünden ylalaşylýar.' },
  { q:'Çagalar üçin aýratyn menýu barmy?',                    a:'Hawa. Çagalar üçin aýratyn menýu we ýokary oturgyç hyzmatymyz bar.' },
  { q:'Daşary ýurtly myhmanlar üçin nähili hyzmatlar bar?',   a:'Rus, iňlis dilinde hyzmat edip bilýäris. Aeroportdan transfer, myhmanhana bron we terjimeçi hyzmatlarymyz bar.' },
];

/* ── ORNAMENT SVGs ── */
function CornerOrnament({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2 L2 30" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      <path d="M2 2 L30 2" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      <path d="M2 2 L12 12" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="2" cy="2" r="2.5" fill="currentColor" opacity="0.7"/>
      <circle cx="2" cy="16" r="1" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="2" r="1" fill="currentColor" opacity="0.3"/>
      <path d="M8 2 L8 8 L14 8" stroke="currentColor" strokeWidth="0.4" opacity="0.25"/>
    </svg>
  );
}

function DiamondGem({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 1L11 4.5L6 11L1 4.5Z" fill="currentColor" opacity="0.9"/>
      <path d="M1 4.5H11M3 1.5L6 4.5L9 1.5M3 7.5L6 4.5L9 7.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
    </svg>
  );
}

function ArabesqueSVG({ size = 300, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ position:'absolute', pointerEvents:'none', color:'var(--gold)', opacity:0.045, ...style }}>
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.4"/>
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.3"/>
      <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.3"/>
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.4"/>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.5"/>
      <g transform="translate(100,100)">
        {[0,45,90,135,180,225,270,315].map(angle => (
          <g key={angle} transform={`rotate(${angle})`}>
            <ellipse ry="40" rx="6" fill="currentColor" opacity="0.25"/>
            <ellipse ry="70" rx="3" fill="currentColor" opacity="0.12"/>
          </g>
        ))}
      </g>
      {[0,90,180,270].map(r => (
        <g key={r} transform={`rotate(${r},100,100)`}>
          <path d="M100 10 C80 40,80 60,100 100 C120 60,120 40,100 10" fill="currentColor" opacity="0.08"/>
        </g>
      ))}
    </svg>
  );
}

function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
      <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      <path d="M18 3 L21 15 L33 18 L21 21 L18 33 L15 21 L3 18 L15 15 Z" fill="currentColor" opacity="0.8"/>
      <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.9"/>
      <circle cx="18" cy="4"  r="1.2" fill="currentColor" opacity="0.6"/>
      <circle cx="18" cy="32" r="1.2" fill="currentColor" opacity="0.6"/>
      <circle cx="4"  cy="18" r="1.2" fill="currentColor" opacity="0.6"/>
      <circle cx="32" cy="18" r="1.2" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

/* Nav-specific ornamental border */
function NavBorderSVG() {
  return (
    <svg viewBox="0 0 1440 8" fill="none" preserveAspectRatio="none"
      style={{ position:'absolute', bottom:0, left:0, right:0, width:'100%', height:8 }}>
      <path d="M0 4 Q360 8 720 4 Q1080 0 1440 4" stroke="url(#navGrad)" strokeWidth="0.8"/>
      <defs>
        <linearGradient id="navGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="transparent"/>
          <stop offset="0.2" stopColor="rgba(201,168,67,0.5)"/>
          <stop offset="0.5" stopColor="rgba(201,168,67,0.9)"/>
          <stop offset="0.8" stopColor="rgba(201,168,67,0.5)"/>
          <stop offset="1" stopColor="transparent"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── HOOKS ── */
function useCountUp(target: number, go: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let curr = 0;
    const step = target / 80;
    const id = setInterval(() => {
      curr = Math.min(curr + step, target);
      setN(Math.floor(curr));
      if (curr >= target) clearInterval(id);
    }, 25);
    return () => clearInterval(id);
  }, [go, target]);
  return n;
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); }}, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${vis ? 'visible' : ''} ${className}`}>{children}</div>;
}

function AnimStat({ value, label, Icon, suffix = '' }: { value: string; label: string; Icon: React.FC<IconProps>; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  const num = parseInt(value.replace(/\D/g,'')) || 0;
  const hasSuffix = value.includes('+') ? '+' : suffix;
  const c = useCountUp(num, go);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); }}, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="stat-cell" ref={ref}>
      <div className="stat-cell-icon"><Icon size={28} /></div>
      <span className="stat-cell-num">{go ? c.toLocaleString()+hasSuffix : '0'+hasSuffix}</span>
      <span className="stat-cell-label">{label}</span>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="hero-stat">
      <span className="hero-stat-num">{value}</span>
      <span className="hero-stat-label">{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
export default function App() {
  const venue  = getVenue();
  const halls  = makeHalls(parseInt(venue.halls), venue);

  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [svcat,      setSvcat]      = useState('all');
  const [tstIdx,     setTstIdx]     = useState(0);
  const [openFaq,    setOpenFaq]    = useState<number|null>(null);
  const [calcG,      setCalcG]      = useState(150);
  const [calcPkg,    setCalcPkg]    = useState('premium');
  const [selHall,    setSelHall]    = useState('');
  const [selPkg,     setSelPkg]     = useState('');
  const [priceHint,  setPriceHint]  = useState('');
  const [showExtras, setShowExtras] = useState(false);
  const [success,    setSuccess]    = useState<null|{ name:string; partner:string; date:string; guests:string; hall:string }>(null);
  const [form, setForm] = useState({ name:'', partner:'', phone:'', email:'', date:'', guests:'', source:'', notes:'', foreign:false, ownPhoto:false, special:'' });

  const touchStartX = useRef(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const t = setInterval(() => setTstIdx(i => (i+1) % TSTS.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.title = `${venue.name} — ${venue.city} | Premium Toý Mekany`;
  }, []);

  const calcPrice = useCallback(() => {
    const base = parseInt(venue.minprice);
    const map: Record<string,number|null> = { bashlangyc: base, premium: base+15, lyuks: null };
    const pp = map[calcPkg];
    if (!pp) return 'Ylalaşyk esasynda';
    return (calcG * pp).toLocaleString() + ' TMT-dan başlaýar';
  }, [calcG, calcPkg, venue.minprice]);

  function launchConfetti() {
    const colors = ['#C9A843','#E8C96B','#FDF8EE','#fff','#D4AF6E'];
    for (let i = 0; i < 90; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const s = Math.random() * 10 + 4;
      el.style.cssText = `left:${Math.random()*100}vw;top:-10px;width:${s}px;height:${s}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${Math.random()*3+2}s;animation-delay:${Math.random()}s;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5500);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selHall) return;
    launchConfetti();
    setSuccess({ name:form.name, partner:form.partner, date:form.date, guests:form.guests, hall:selHall });
  }

  const tstCurr = TSTS[tstIdx];
  const minDate = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
  const filtSvc = svcat === 'all' ? ALL_SVCS : ALL_SVCS.filter(s => s.cat === svcat);

  const packages = [
    {
      name:'Başlangyç Toý', badge:'YKJAM PAKET',
      pp: parseInt(venue.minprice), pnote: null as string|null,
      min: 50, max: 150,
      features: [
        {t:'Altyn Zal (saýlama)', inc:true},
        {t:'Standart milli menýu', inc:true},
        {t:'Stol bezegi standart', inc:true},
        {t:'Disk jokiý saz', inc:true},
        {t:'5 sagat zal wagt', inc:true},
        {t:'Aşhana hyzmaty', inc:true},
        {t:'Garderop & howpsuzlyk', inc:true},
        {t:'Fotosuratçy girizilmedik', inc:false},
        {t:'Bezeg paketi aýratyn', inc:false},
      ],
      note:'Kiçi maşgala toýlary üçin ideal', popular:false, cta:'Bu Paketi Saýla',
    },
    {
      name:'Premium Toý', badge:'MASLAHAT BERILÝÄR',
      pp: parseInt(venue.minprice)+15, pnote: null as string|null,
      min: 100, max: parseInt(venue.guests),
      features: [
        {t:'Islän zal saýlama', inc:true},
        {t:'Premium milli & halkara menýu', inc:true},
        {t:'Doly gül & yşyk bezegi', inc:true},
        {t:'Tamada & Sazandalar', inc:true},
        {t:'7 sagat zal wagt', inc:true},
        {t:'Foto & Wideo (1 suratçy)', inc:true},
        {t:'Gelin odasy (mugt)', inc:true},
        {t:'Mugt konsultasiýa', inc:true},
      ],
      note:'Iň meşhur we doly toý paketi', popular:true, cta:'Premium Al',
    },
    {
      name:'Lýuks Toý', badge:'IŇ DOLY PAKET',
      pp: null as number|null, pnote:'Ylalaşyk',
      min: 200, max: parseInt(venue.guests),
      features: [
        {t:'Şa Zaly (ýapyk bronlama)', inc:true},
        {t:'Özboluşly menýu dizaýny', inc:true},
        {t:'Premium gül & kristal bezeg', inc:true},
        {t:'Iki tamada + milli sazandalar', inc:true},
        {t:'Doly gün (10+ sagat)', inc:true},
        {t:'2 suratçy + drone', inc:true},
        {t:'Gelinlik VIP otagy', inc:true},
        {t:'Myhmanlara transfer', inc:true},
        {t:'Ähli islegleriňize görä', inc:true},
      ],
      note:'Ömrüňizdäki iň ýatdan çykmajak toý', popular:false, cta:'Biz bilen Habarlaş',
    },
  ];

  const navLinks = [
    { href:'#halls',    Icon:IcCrown,   label:'Zallarymyz',  num:'01' },
    { href:'#services', Icon:IcSpark,   label:'Hyzmatlar',   num:'02' },
    { href:'#gallery',  Icon:IcCamera,  label:'Galereýa',    num:'03' },
    { href:'#pricing',  Icon:IcGem,     label:'Bahalar',     num:'04' },
    { href:'#contact',  Icon:IcPhone,   label:'Habarlaş',    num:'05' },
  ];

  return (
    <>
      {/* ── SUCCESS OVERLAY ── */}
      {success && (
        <div className="success-overlay show" data-testid="success-overlay">
          <div className="success-box">
            <div className="success-icon-wrap">
              <IcHeart size={36} style={{ color:'var(--gold)' }} />
            </div>
            <div className="success-eyebrow">
              <DiamondGem size={8} />
              <span>SORALYŇYZ KABUL EDILDI!</span>
              <DiamondGem size={8} />
            </div>
            <h2 className="success-title">
              {success.name} & {success.partner},<br/>
              Bagtly ýol!
            </h2>
            <div className="success-details">
              {[
                ['Toý güni:', success.date],
                ['Myhman sany:', success.guests+' adam'],
                ['Saýlan zalyňyz:', success.hall],
              ].map(([l,v],i) => (
                <div key={i} className="success-det">
                  <span className="success-det-label">{l}</span>
                  <span className="success-det-val">{v}</span>
                </div>
              ))}
            </div>
            <p className="success-note">
              Maslahatçymyz <strong style={{color:'var(--cream)'}}>{venue.phone}</strong> belgiňize<br/>
              4 sagadyň içinde jaň eder.
            </p>
            <button className="success-back" onClick={() => { setSuccess(null); window.scrollTo({top:0,behavior:'smooth'}); }} data-testid="btn-back">
              <Home className="w-4 h-4" />
              Baş Sahypaja Dolan
            </button>
          </div>
        </div>
      )}

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} data-testid="mobile-menu">
        <div className="mobile-menu-bg-art">
          <ArabesqueSVG size={700} style={{ position:'static', opacity:1 }} />
        </div>

        {/* Decorative ring */}
        <div className="mobile-menu-ring" />

        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} data-testid="btn-close-menu">
          <X size={18} />
        </button>

        {/* Logo inside menu */}
        <div className="mobile-menu-logo">
          <LogoMark size={28} />
          <span>{venue.name.toUpperCase()}</span>
        </div>

        <nav className="mobile-menu-nav" data-testid="mobile-nav">
          {navLinks.map(({ href, Icon: NavIcon, label, num }, i) => (
            <a key={i} className="mobile-menu-link" href={href}
              onClick={() => setMenuOpen(false)} data-testid={`mobile-link-${i}`}>
              <span className="mobile-menu-link-num">{num}</span>
              <div className="mobile-menu-link-content">
                <NavIcon size={16} className="mobile-menu-link-icon" />
                <span className="mobile-menu-link-text">{label}</span>
              </div>
              <ArrowRight size={14} className="mobile-menu-link-arrow" />
            </a>
          ))}
        </nav>

        <div className="mobile-menu-divider">
          <DiamondGem size={8} />
        </div>

        <div className="mobile-menu-bottom">
          <a href={`tel:${venue.phone}`} className="mobile-menu-phone" data-testid="mobile-phone">
            <IcPhone size={16} /> {venue.phone}
          </a>
          <div className="mobile-menu-socials">
            {venue.telegram && (
              <a href={`https://t.me/${venue.telegram}`} className="mobile-social-btn" target="_blank" rel="noreferrer">
                <IcSend size={14}/> Telegram
              </a>
            )}
            {venue.instagram && (
              <a href={`https://instagram.com/${venue.instagram}`} className="mobile-social-btn" target="_blank" rel="noreferrer">
                <IcInsta size={14}/> Instagram
              </a>
            )}
            <a href={`tel:${venue.phone}`} className="mobile-social-btn">
              <IcPhone size={14}/> Jaň et
            </a>
          </div>
        </div>
      </div>

      {/* ── MOBILE BOTTOM BAR ── */}
      <div className="mobile-bottom-bar" data-testid="mobile-bottom-bar">
        <a href={`tel:${venue.phone}`} className="mobile-bottom-btn outline" data-testid="btn-mobile-call">
          <IcPhone size={15}/> Jaň Et
        </a>
        <a href="#contact" className="mobile-bottom-btn gold" data-testid="btn-mobile-book">
          <IcGem size={15}/> Bron Et
        </a>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} data-testid="navbar">
        <a href="#" className="nav-logo" data-testid="nav-logo">
          {venue.logo
            ? <img src={venue.logo} alt={venue.name} style={{ height:32, objectFit:'contain' }} />
            : <>
                <div className="nav-logo-icon" style={{ color:'var(--gold)' }}>
                  <LogoMark size={36} />
                </div>
                <div>
                  <div className="nav-logo-text">{venue.name.toUpperCase()}</div>
                  <span className="nav-logo-sub">Premium Toý Mekany</span>
                </div>
              </>
          }
        </a>

        <ul className="nav-links">
          {navLinks.map(({ href, label, Icon: NavIcon }, i) => (
            <li key={i} className="nav-link-item">
              {i > 0 && (
                <span className="nav-sep" aria-hidden="true">
                  <DiamondGem size={5} />
                </span>
              )}
              <a href={href} className="nav-link-anchor">
                <span className="nav-link-icon-wrap">
                  <NavIcon size={11} className="nav-link-hover-icon" />
                </span>
                <span className="nav-link-label">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a href={`tel:${venue.phone}`} className="nav-phone-wrap" data-testid="nav-phone">
            <IcPhone size={14} className="nav-phone-icon" />
            {venue.phone}
          </a>
          <a href="#contact" className="btn-cta nav-cta-btn" data-testid="btn-nav-book">
            <DiamondGem size={9} />
            Bron Et
          </a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(true)} data-testid="btn-open-menu">
            <Menu size={22} />
          </button>
        </div>

        {scrolled && <NavBorderSVG />}
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home" data-testid="hero">
        <div className="hero-bg-blob-main" />
        <div className="hero-bg-blob-tr" />
        <div className="hero-bg-blob-bl" />
        <div className="pattern-dots" style={{ opacity:0.3 }} />

        <div className="hero-corner hero-corner-tl" style={{ color:'var(--gold)' }}>
          <CornerOrnament size={80} />
        </div>
        <div className="hero-corner hero-corner-tr" style={{ color:'var(--gold)' }}>
          <CornerOrnament size={80} />
        </div>
        <div className="hero-corner hero-corner-bl" style={{ color:'var(--gold)' }}>
          <CornerOrnament size={60} />
        </div>
        <div className="hero-corner hero-corner-br" style={{ color:'var(--gold)' }}>
          <CornerOrnament size={60} />
        </div>

        {/* Custom floating icons */}
        <div className="hero-float-item hero-float-item-1">
          <IcCrown size={34} style={{ color:'var(--gold)', filter:'drop-shadow(0 0 14px rgba(201,168,67,0.55))' }} />
        </div>
        <div className="hero-float-item hero-float-item-2">
          <IcHeart size={28} style={{ color:'var(--gold)', filter:'drop-shadow(0 0 12px rgba(201,168,67,0.45))' }} />
        </div>
        <div className="hero-float-item hero-float-item-3">
          <IcFlower size={28} style={{ color:'var(--gold)', filter:'drop-shadow(0 0 10px rgba(201,168,67,0.4))' }} />
        </div>
        <div className="hero-float-item hero-float-item-4">
          <IcGem size={26} style={{ color:'var(--gold)', filter:'drop-shadow(0 0 10px rgba(201,168,67,0.4))' }} />
        </div>

        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none', opacity:0.04 }}>
          <ArabesqueSVG size={700} style={{ position:'static', opacity:1 }} />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-gem" style={{ color:'var(--gold)' }}><DiamondGem size={8} /></span>
            <span className="hero-eyebrow-text">Toý Mekany</span>
            <span className="hero-eyebrow-gem" style={{ color:'var(--gold)' }}><DiamondGem size={8} /></span>
          </div>

          <h1 className="hero-title" data-testid="hero-title">
            <span className="line"><span className="line-inner">Arzuwyňyzdaky</span></span>
            <span className="line"><span className="line-inner">toý — biziň</span></span>
            <span className="line"><span className="line-inner">elimizde.</span></span>
          </h1>

          <div className="hero-sep" style={{ color:'var(--gold)' }}>
            <div className="hero-sep-line" />
            <span className="hero-sep-gem"><DiamondGem size={10} /></span>
            <div className="hero-sep-line rev" />
          </div>

          <p className="hero-body" data-testid="hero-body">
            <strong style={{ color:'var(--cream)' }}>{venue.name}</strong> — {venue.city} şäherinde<br/>
            {venue.events} bagtly toý guramasynyň tejribesi.<br/>
            Her jikme-jik biziň elimizde.
          </p>

          <div className="hero-btns">
            <a href="#contact" className="btn-cta" style={{ padding:'0.95rem 2.4rem', fontSize:'0.82rem' }} data-testid="btn-hero-book">
              <IcGem size={14} />
              Bron Et
            </a>
            <a href="#halls" className="btn-outline" data-testid="btn-hero-halls">
              Zallarymyzy Gör
              <ChevronDown size={16} />
            </a>
          </div>

          <div className="hero-stats-row" data-testid="hero-stats">
            <HeroStat value={venue.guests+'+'} label="Myhmana çenli" />
            <HeroStat value={venue.halls}       label="Premium Zal" />
            <HeroStat value={venue.events}       label="Toý Çäresi" />
            <HeroStat value={venue.parking+'+'}  label="Awtoulag ýeri" />
          </div>
        </div>

        <svg className="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" fill="none">
          <path d="M0 40 C360 80 1080 0 1440 40 L1440 70 L0 70 Z" fill="var(--bg)"/>
        </svg>
      </section>

      {/* ── HALLS ── */}
      <section className="section" id="halls" data-testid="section-halls" style={{ background:'var(--bg)' }}>
        <ArabesqueSVG size={380} style={{ top:'5%', right:'-3%' }} />
        <div className="section-inner">
          <Reveal>
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Zallarymyz</span>
              <div className="section-eyebrow-line" />
            </div>
            <h2 className="section-title">Sizi Garşylaýan<br/>Premium <span className="italic">Zallarymyz</span></h2>
            <p className="section-sub">Her toý özüne has zaly hak edýär. {venue.name}-da her zal bir hekaýa.</p>
          </Reveal>

          <div className="halls-grid" data-testid="halls-grid">
            {halls.map((hall, i) => (
              <Reveal key={hall.id} delay={i * 110}>
                <div className="hall-card" data-testid={`hall-card-${hall.id}`}>
                  <div className="hall-card-band" style={{ background: hall.gradient }}>
                    <div className="hall-card-band-pattern" />
                    <div className="hall-card-band-glow" />
                    <hall.Icon size={52} className="hall-card-icon" />
                    <span className="hall-card-tag">{hall.tag}</span>
                  </div>

                  <div className="hall-card-body">
                    <h3 className="hall-name">{hall.name}</h3>
                    <div className="hall-name-en">{hall.name_en}</div>

                    <div className="hall-sep">
                      <div className="hall-sep-line" />
                      <span className="hall-sep-gem" style={{ color:'var(--gold)' }}><DiamondGem size={7} /></span>
                      <div className="hall-sep-line" />
                    </div>

                    <div className="hall-meta">
                      <div className="hall-meta-item"><IcPeople size={14} className="hall-meta-icon" />{hall.cap}+ myhmana çenli</div>
                      <div className="hall-meta-item"><IcRuler size={14} className="hall-meta-icon" />{hall.area}</div>
                      <div className="hall-meta-item"><IcArrowMove size={14} className="hall-meta-icon" />{hall.ceiling}</div>
                    </div>

                    <div className="hall-features">
                      {hall.features.map((f, fi) => (
                        <div key={fi} className="hall-feature">
                          <Check size={11} className="hall-feat-icon" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="hall-price-row">
                      <div>
                        <div className="hall-price-num">{hall.priceFrom} TMT</div>
                        <div className="hall-price-sub">/ adamdan başlaýar</div>
                      </div>
                      <a href="#contact" className="hall-cta" data-testid={`btn-hall-${hall.id}`}>
                        Maglumat Al <ArrowRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" id="services" style={{ background:'var(--surface)' }} data-testid="section-services">
        <ArabesqueSVG size={340} style={{ top:'5%', left:'-3%' }} />
        <div className="section-inner">
          <Reveal>
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Hyzmatlarymyz</span>
              <div className="section-eyebrow-line" />
            </div>
            <h2 className="section-title">
              Toýuňyzyň Her Bölegini<br/><span className="italic">Biz Üstlenýäris</span>
            </h2>
          </Reveal>

          <Reveal>
            <div className="services-tabs" data-testid="services-tabs">
              {SVC_CATS.map(c => (
                <button key={c.id} className={`svc-tab ${svcat === c.id ? 'active' : ''}`}
                  onClick={() => setSvcat(c.id)} data-testid={`tab-${c.id}`}>
                  <c.Icon size={14} />
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="services-grid" data-testid="services-grid">
            {filtSvc.map((s, i) => (
              <div key={`${svcat}-${i}`} className="svc-card" data-testid={`svc-card-${i}`}>
                <div className="svc-icon-circle">
                  <s.Icon size={28} />
                </div>
                <h3 className="svc-name">{s.name}</h3>
                <p className="svc-desc">{s.desc}</p>
                <ul className="svc-list">
                  {s.list.map((item, ii) => (
                    <li key={ii}><Check size={10} className="svc-list-icon" />{item}</li>
                  ))}
                </ul>
                <div className="svc-price">{s.note}</div>
                <button className="svc-btn" data-testid={`btn-svc-${i}`}>
                  Maglumat Al <ArrowRight size={11} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section" style={{ background:'var(--bg)' }} data-testid="section-why">
        <ArabesqueSVG size={360} style={{ bottom:'5%', right:'-3%' }} />
        <div className="section-inner">
          <div className="why-grid">
            <Reveal>
              <div>
                <div className="section-eyebrow">
                  <div className="section-eyebrow-line" />
                  <span className="section-eyebrow-text">Näme Üçin Biz</span>
                  <div className="section-eyebrow-line" />
                </div>
                <p className="why-left-tagline">Siziň Arzuwyňyz —<br/>Biziň Borjumyz.</p>
                <h2 className="why-left-stat">
                  {venue.founded}-njy ýyldan bäri<br/>
                  <span className="accent">{venue.city}-yň Iň Ynamdar</span><br/>
                  Toý Mekany.
                </h2>
                <div className="gold-div" style={{ color:'var(--gold)' }}>
                  <div className="gold-div-line" />
                  <span className="gold-div-gem"><DiamondGem size={8} /></span>
                  <div className="gold-div-line" />
                </div>
                <p className="why-desc">
                  {venue.events} bagtly çäre. {venue.guests}+ myhmana çenli.<br/>
                  Her toý — özboluşly. Her an — ýatdan çykmajak.
                </p>
              </div>
            </Reveal>

            <div className="why-features">
              {[
                { Icon:IcCrown,   title:'Şahsylaşdyrylan Hyzmat',   desc:'Her toý özboluşly — siziň arzuwyňyza görä doly düzülýär.' },
                { Icon:IcClock,   title:'Wagtynda Kepillik',         desc:'Toýuňyzyň her bölümi meýilnama görä wagtynda kämil taýýar.' },
                { Icon:IcSpark,   title:'Tejribeli Hünärmenler',     desc:'Toý gurnagçylary, suratçy, tamada, aşpez — ählisi siziň bilen.' },
                { Icon:IcShield,  title:'Şertnama & Kepillik',       desc:'Ylalaşylan ähli şertler şertnamada berkidilýär.' },
                { Icon:IcFlower,  title:'Mugt Konsultasiýa',         desc:'Bronlamadan öň hünärmen maslahat mugtuna berilýär.' },
                { Icon:IcEarth,   title:'Halkara Derejedäki Hyzmat', desc:'Dürli dilden we medeniýetten myhmanlara hyzmat edip bilýäris.' },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="why-feat" data-testid={`why-feat-${i}`}>
                    <div className="why-feat-icon"><f.Icon size={18} /></div>
                    <h4 className="why-feat-title">{f.title}</h4>
                    <p className="why-feat-desc">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section" id="gallery" style={{ background:'var(--surface)' }} data-testid="section-gallery">
        <div className="section-inner">
          <Reveal>
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Galereýa</span>
              <div className="section-eyebrow-line" />
            </div>
            <h2 className="section-title">{venue.name}-dan<br/><span className="italic">Pursat Şekilleri</span></h2>
          </Reveal>

          <div className="gallery-grid" data-testid="gallery-grid">
            {GALLERY.map((g, i) => (
              <div key={i} className={`gallery-item ${g.span}`} style={{ background: g.gradient }} data-testid={`gal-${i}`}>
                <div className="gallery-inner">
                  <g.Scene className="gallery-scene-svg" />
                  <span className="gallery-label">{g.label}</span>
                </div>
                <div className="gallery-overlay">
                  <g.Scene className="gallery-overlay-scene" />
                  <span className="gallery-overlay-label">{g.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="section" style={{ background:'var(--bg)' }} data-testid="section-steps">
        <ArabesqueSVG size={300} style={{ top:'5%', left:'-2%' }} />
        <div className="section-inner">
          <Reveal className="text-center">
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Nädip Işleýäris</span>
              <div className="section-eyebrow-line" />
            </div>
            <h2 className="section-title text-center">Toýyňyz Nähili Guralýar?</h2>
          </Reveal>

          <div className="steps-grid" data-testid="steps-grid">
            <div className="steps-connector" />
            {[
              { Icon:IcPhone,    label:'01', title:'Habarlaşyň',     desc:'Telefon ýa-da saýt arkaly bize ýüz tutuň.' },
              { Icon:IcPeople,   label:'02', title:'Duşuşyk',        desc:'Hünärmen maslahatçymyz bilen duşuşuň.' },
              { Icon:IcCalendar, label:'03', title:'Meýilleşdiriň',  desc:'Doly programmany bile düzeris.' },
              { Icon:IcHeart,    label:'04', title:'Toýuňuz!',       desc:'Siz lezzet alarsyňyz — biz üstlenýäris.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="step-item" data-testid={`step-${i}`}>
                  <div className="step-num-wrap">
                    <span className="step-num">{s.label}</span>
                  </div>
                  <s.Icon size={36} className="step-icon" />
                  <h4 className="step-title">{s.title}</h4>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ background:'var(--surface)' }} data-testid="section-tst">
        <div className="section-inner">
          <Reveal className="text-center">
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Şaýatlyklar</span>
              <div className="section-eyebrow-line" />
            </div>
            <h2 className="section-title text-center" style={{ fontStyle:'italic' }}>
              Olaryň Söýgisi —<br/>Biziň Buýsanjymyz.
            </h2>
          </Reveal>

          <div className="testimonial-wrap"
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) setTstIdx(i => diff > 0 ? (i+1)%TSTS.length : (i-1+TSTS.length)%TSTS.length);
            }}
            data-testid="carousel">
            <Reveal>
              <div className="testimonial-card" data-testid="tst-card">
                <IcSpark size={80} className="testimonial-quote-icon" />
                <div className="testimonial-stars">
                  {Array(5).fill(0).map((_,si) => <IcSpark key={si} size={14} style={{ color:'var(--gold)', filter:'drop-shadow(0 0 5px rgba(201,168,67,0.5))' }} />)}
                </div>
                <p className="testimonial-text">
                  "{tstCurr.q.replace(/{name}/g, venue.name)}"
                </p>
                <div className="testimonial-footer">
                  <div>
                    <div className="testimonial-couple-name">{tstCurr.groom} & {tstCurr.bride}</div>
                    <div className="testimonial-couple-meta">
                      <IcCalendar size={12} style={{ color:'var(--gold)', opacity:0.6 }} />
                      {tstCurr.year} · {tstCurr.hall} · {tstCurr.guests} myhmany
                    </div>
                  </div>
                  <span className="testimonial-badge">{tstCurr.badge}</span>
                </div>
              </div>
            </Reveal>

            <div className="carousel-nav" data-testid="carousel-nav">
              <button className="carousel-arrow" onClick={() => setTstIdx(i => (i-1+TSTS.length)%TSTS.length)} data-testid="btn-prev">
                <ChevronLeft size={18} />
              </button>
              <div className="carousel-dots">
                {TSTS.map((_,i) => (
                  <button key={i} className={`carousel-dot ${i===tstIdx?'active':''}`}
                    onClick={() => setTstIdx(i)} data-testid={`dot-${i}`} />
                ))}
              </div>
              <button className="carousel-arrow" onClick={() => setTstIdx(i => (i+1)%TSTS.length)} data-testid="btn-next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section" id="pricing" style={{ background:'var(--bg)' }} data-testid="section-pricing">
        <ArabesqueSVG size={350} style={{ top:'5%', right:'-2%' }} />
        <div className="section-inner">
          <Reveal className="text-center">
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Bahalar</span>
              <div className="section-eyebrow-line" />
            </div>
            <h2 className="section-title text-center">Arzuwyňyza Laýyk Baha</h2>
            <p className="section-sub" style={{ textAlign:'center', margin:'0 auto' }}>
              Hemmesi şertnamada berkidilýär. Goşmaça töleg ýok.
            </p>
          </Reveal>

          <div className="pricing-grid" data-testid="pricing-grid">
            {packages.map((pkg, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`pricing-card ${pkg.popular ? 'popular' : ''}`} data-testid={`pkg-${i}`}>
                  {pkg.popular && (
                    <div className="pricing-top-badge">
                      <DiamondGem size={6} /> {pkg.badge} <DiamondGem size={6} />
                    </div>
                  )}
                  {!pkg.popular && <div className="pricing-badge-label">{pkg.badge}</div>}
                  <h3 className="pricing-name">{pkg.name}</h3>
                  {pkg.pp
                    ? <><div className="pricing-price">{pkg.pp} TMT</div><span className="pricing-price-sub">/ adamdan başlaýar</span></>
                    : <><div className="pricing-price" style={{ fontSize:'1.4rem' }}>{pkg.pnote}</div><span className="pricing-price-sub">&nbsp;</span></>
                  }
                  <ul className="pricing-features">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className={f.inc ? 'inc' : 'exc'}>
                        {f.inc
                          ? <Check size={13} className="pf-icon inc" />
                          : <X size={13} className="pf-icon exc" />
                        }
                        <span>{f.t}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.pp && <p className="pricing-min">Min. {(pkg.min*pkg.pp).toLocaleString()} TMT-dan</p>}
                  <a href="#contact" className={`pricing-cta ${pkg.popular ? 'gold' : 'outline'}`} data-testid={`btn-pkg-${i}`}>
                    <IcGem size={13} />
                    {pkg.cta}
                  </a>
                  <p className="pricing-note">{pkg.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CALC */}
          <Reveal>
            <div className="calc-box" data-testid="calc">
              <ArabesqueSVG size={220} style={{ top:'50%', right:'-5%', transform:'translateY(-50%)', position:'absolute' }} />
              <h3 className="calc-title">Takmyn Baha Hasapla</h3>
              <label className="calc-label">MYHMAN SANY: {calcG} ADAM</label>
              <input type="range" min="50" max={parseInt(venue.guests)} value={calcG}
                onChange={e => setCalcG(+e.target.value)} className="calc-slider" data-testid="calc-slider" />
              <label className="calc-label">PAKET SAÝLA</label>
              <div className="calc-pkgs">
                {[{id:'bashlangyc',l:'Başlangyç'},{id:'premium',l:'Premium'},{id:'lyuks',l:'Lýuks'}].map(pk => (
                  <button key={pk.id} className={`calc-pkg ${calcPkg===pk.id?'active':''}`}
                    onClick={() => setCalcPkg(pk.id)} data-testid={`btn-calcpkg-${pk.id}`}>
                    {pk.l}
                  </button>
                ))}
              </div>
              <div className="calc-result" data-testid="calc-result">
                <span className="calc-result-label">Takmyn Jemi Baha</span>
                <div className="calc-result-value">{calcPrice()}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" style={{ background:'var(--surface)' }} data-testid="section-faq">
        <ArabesqueSVG size={300} style={{ top:'5%', left:'-2%' }} />
        <div className="section-inner">
          <Reveal className="text-center">
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Soraglar</span>
              <div className="section-eyebrow-line" />
            </div>
            <h2 className="section-title text-center">Köpden Soralýan Soraglar</h2>
          </Reveal>

          <div className="faq-list" data-testid="faq-list">
            {FAQS.map((faq, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className={`faq-item ${openFaq===i?'open':''}`} data-testid={`faq-${i}`}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq===i ? null : i)} data-testid={`btn-faq-${i}`}>
                    <span>{faq.q}</span>
                    <div className="faq-q-icon-wrap">
                      <Plus size={14} className="faq-q-icon" />
                    </div>
                  </button>
                  <div className="faq-a">{faq.a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section" id="contact" style={{ background:'var(--bg)' }} data-testid="section-contact">
        <ArabesqueSVG size={340} style={{ bottom:'5%', right:'-2%' }} />
        <div className="section-inner">
          <Reveal>
            <div className="section-eyebrow">
              <div className="section-eyebrow-line" />
              <span className="section-eyebrow-text">Habarlaş</span>
              <div className="section-eyebrow-line" />
            </div>
            <h2 className="section-title">Toýuňyzy Meýilleşdirmäge<br/><span className="italic">Başlalyň</span></h2>
            <p className="section-sub">Formy dolduryň — 4 sagadyň içinde maslahatçymyz siz bilen habarlaşar.</p>
          </Reveal>

          <div className="contact-grid" data-testid="contact-grid">
            <Reveal>
              <div>
                <h3 className="contact-info-title">Habarlaşmak</h3>
                {[
                  { Icon:IcPhone,   content: <a href={`tel:${venue.phone}`}>{venue.phone}</a> },
                  ...(venue.phone2 ? [{ Icon:IcPhone, content: <a href={`tel:${venue.phone2}`}>{venue.phone2}</a> }] : []),
                  { Icon:IcEarth,   content: <span>{venue.address}, {venue.city}</span> },
                  { Icon:IcClock,   content: <span>Iş wagty: 09:00 – 20:00 (her gün)</span> },
                  ...(venue.telegram  ? [{ Icon:IcSend, content: <a href={`https://t.me/${venue.telegram}`} target="_blank" rel="noreferrer">@{venue.telegram}</a> }] : []),
                  ...(venue.instagram ? [{ Icon:IcInsta, content: <a href={`https://instagram.com/${venue.instagram}`} target="_blank" rel="noreferrer">@{venue.instagram}</a> }] : []),
                ].map((item, i) => (
                  <div key={i} className="contact-info-item" data-testid={`ci-${i}`}>
                    <div className="contact-info-icon"><item.Icon size={16} /></div>
                    <div className="contact-info-text">{item.content}</div>
                  </div>
                ))}

                <div className="gold-div" style={{ color:'var(--gold)', margin:'1.5rem 0' }}>
                  <div className="gold-div-line" />
                  <span className="gold-div-gem"><DiamondGem size={8} /></span>
                  <div className="gold-div-line" />
                </div>

                <div className="contact-social-btns">
                  {venue.telegram && (
                    <a href={`https://t.me/${venue.telegram}`} className="social-action-btn" target="_blank" rel="noreferrer" data-testid="btn-tg">
                      <IcSend size={18}/> Telegram arkaly ýaz
                    </a>
                  )}
                  <a href={`tel:${venue.phone}`} className="social-action-btn" data-testid="btn-call">
                    <IcPhone size={18}/> Jaň et: {venue.phone}
                  </a>
                  {venue.instagram && (
                    <a href={`https://instagram.com/${venue.instagram}`} className="social-action-btn" target="_blank" rel="noreferrer" data-testid="btn-ig">
                      <IcInsta size={18}/> Instagram-da gör
                    </a>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
                <h3 className="form-title">Bron Soragyňyz</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Adyňyz *</label>
                    <input type="text" required className="form-input" placeholder="Adyňyz"
                      value={form.name} onChange={e => setForm(d=>({...d,name:e.target.value}))} data-testid="input-name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hyzmatdaşyňyzyň ady *</label>
                    <input type="text" required className="form-input" placeholder="Adý"
                      value={form.partner} onChange={e => setForm(d=>({...d,partner:e.target.value}))} data-testid="input-partner" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Telefon *</label>
                    <input type="tel" required className="form-input" placeholder="+993 ..."
                      value={form.phone} onChange={e => setForm(d=>({...d,phone:e.target.value}))} data-testid="input-phone" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-poçta</label>
                    <input type="email" className="form-input" placeholder="email@..."
                      value={form.email} onChange={e => setForm(d=>({...d,email:e.target.value}))} data-testid="input-email" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Toý güni *</label>
                    <input type="date" required className="form-input" min={minDate}
                      value={form.date} onChange={e => setForm(d=>({...d,date:e.target.value}))} data-testid="input-date" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Myhmansaňyz *</label>
                    <input type="number" required className="form-input" min="50" max={venue.guests} placeholder="Min: 50"
                      value={form.guests} onChange={e => {
                        const g = +e.target.value;
                        setPriceHint(g>0 ? `Takmyn: ${(g*parseInt(venue.minprice)).toLocaleString()} – ${(g*(parseInt(venue.minprice)+15)).toLocaleString()} TMT` : '');
                        setForm(d=>({...d,guests:e.target.value}));
                      }} data-testid="input-guests" />
                    <div className="form-hint">{priceHint}</div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Haýsy zal? *</label>
                  <div className="form-halls-grid" data-testid="hall-opts">
                    {halls.map(h => (
                      <button type="button" key={h.id}
                        className={`form-hall-opt ${selHall===h.name?'sel':''}`}
                        onClick={() => setSelHall(h.name)} data-testid={`btn-fhall-${h.id}`}>
                        <h.Icon size={13} /> {h.name}
                      </button>
                    ))}
                    <button type="button"
                      className={`form-hall-opt ${selHall==='Heniz bilmedim'?'sel':''}`}
                      onClick={() => setSelHall('Heniz bilmedim')} data-testid="btn-fhall-unknown">
                      <CircleUnknown size={13} /> Heniz bilmedim
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Paket *</label>
                  <div className="form-halls-grid">
                    {['Başlangyç','Premium','Lýuks','Heniz bilmedim'].map(pk => (
                      <button type="button" key={pk}
                        className={`form-hall-opt ${selPkg===pk?'sel':''}`}
                        onClick={() => setSelPkg(pk)} data-testid={`btn-fpkg-${pk}`}>
                        {pk}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Aýratyn Islekleriňiz</label>
                  <textarea className="form-textarea" rows={3} placeholder="Islekleriňizi ýazyň..."
                    value={form.notes} onChange={e => setForm(d=>({...d,notes:e.target.value}))} data-testid="input-notes" />
                </div>

                <div className="form-group">
                  <label className="form-label">Sizi nähili tapdyňyz?</label>
                  <select className="form-select" value={form.source} onChange={e => setForm(d=>({...d,source:e.target.value}))} data-testid="select-src">
                    <option value="">Saýlaň...</option>
                    <option>Instagram</option>
                    <option>Telegram</option>
                    <option>Dost maslahat</option>
                    <option>Google</option>
                    <option>Başga</option>
                  </select>
                </div>

                <button type="button" className="form-extras-btn" onClick={() => setShowExtras(v=>!v)} data-testid="btn-extras">
                  {showExtras ? <Minus size={16} /> : <Plus size={16} />}
                  Goşmaça soraglar
                </button>
                <div className={`form-extras ${showExtras ? 'show' : ''}`} data-testid="form-extras">
                  <div className="form-group">
                    <label className="form-check-label">
                      <input type="checkbox" checked={form.foreign} onChange={e=>setForm(d=>({...d,foreign:e.target.checked}))} data-testid="chk-foreign" />
                      Daşary ýurtly myhmanym bar
                    </label>
                    <label className="form-check-label">
                      <input type="checkbox" checked={form.ownPhoto} onChange={e=>setForm(d=>({...d,ownPhoto:e.target.checked}))} data-testid="chk-photo" />
                      Öz suratçym bar
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Özboluşly isleg ýa-da sorag</label>
                    <textarea className="form-textarea" rows={3}
                      value={form.special} onChange={e=>setForm(d=>({...d,special:e.target.value}))} data-testid="input-special" />
                  </div>
                </div>

                <button type="submit" className="form-submit" data-testid="btn-submit">
                  <IcGem size={17} />
                  Bron Soragyny Iber
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer" data-testid="footer">
        <ArabesqueSVG size={320} style={{ top:'-5%', right:'3%' }} />
        <div className="footer-inner">
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'0.7rem', marginBottom:'0.4rem', color:'var(--gold)' }}>
              <LogoMark size={32} />
              <div className="footer-logo-text">{venue.name.toUpperCase()}</div>
            </div>
            <div className="shimmer-line" style={{ marginBottom:'1rem' }} />
            <p className="footer-tagline">{venue.tagline}</p>
            <p className="footer-copy">© {new Date().getFullYear()} {venue.name}. Ähli hukuklar goragly.</p>
          </div>

          <div>
            <div className="footer-col-title">Nawigasiýa</div>
            <ul className="footer-links">
              {[['#home','Baş Sahypa'],['#halls','Zallarymyz'],['#services','Hyzmatlar'],['#gallery','Galereýa'],['#pricing','Bahalar'],['#contact','Habarlaş']].map(([h,l]) => (
                <li key={h}><a href={h}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Habarlaş</div>
            {[
              { Icon:IcPhone,   c: <a href={`tel:${venue.phone}`}>{venue.phone}</a> },
              ...(venue.phone2 ? [{ Icon:IcPhone, c: <a href={`tel:${venue.phone2}`}>{venue.phone2}</a> }] : []),
              { Icon:IcEarth,   c: <span>{venue.address}</span> },
              { Icon:IcEarth,   c: <span>{venue.city}</span> },
              ...(venue.telegram  ? [{ Icon:IcSend,  c: <a href={`https://t.me/${venue.telegram}`} target="_blank" rel="noreferrer">Telegram</a> }] : []),
              ...(venue.instagram ? [{ Icon:IcInsta, c: <a href={`https://instagram.com/${venue.instagram}`} target="_blank" rel="noreferrer">Instagram</a> }] : []),
            ].map((item, i) => (
              <div key={i} className="footer-contact-item">
                <item.Icon size={14} />
                <div>{item.c}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-hr" />
        <div className="footer-bottom" data-testid="footer-bottom">
          <span>{venue.name} — {venue.city} · {new Date().getFullYear()}</span>
          <span className="footer-credit">
            Döredilen <IcWrench size={13} style={{ display:'inline', verticalAlign:'middle', marginRight:3 }} />
            <a href="https://yenil.ru" target="_blank" rel="noreferrer">Ýeňil Web Agentligi</a>
          </span>
        </div>
      </footer>
    </>
  );
}

function CircleUnknown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
