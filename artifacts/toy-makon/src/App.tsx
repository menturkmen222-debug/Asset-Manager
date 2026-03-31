import { useEffect, useRef, useState, useCallback } from "react";
import {
  Phone, MapPin, Clock, Star, Check, X, Menu,
  ChevronLeft, ChevronRight, Crown, Flower2, Leaf,
  Users, Shield, Camera, Music2, Utensils, Building2,
  Car, Instagram, Send, ArrowRight, Gem, Sparkles,
  CalendarDays, Ruler, MoveVertical, Award, Heart,
  Globe, Headphones, Plus, Minus, ChevronDown,
  Diamond, Circle, Dot, CheckCircle2, XCircle,
  Flame, Wind, Home
} from "lucide-react";

/* ─── URL PARAMS ─── */
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

/* ─── HALLS DATA ─── */
function makeHalls(count: number, v: ReturnType<typeof getVenue>) {
  const base = parseInt(v.minprice);
  const g    = parseInt(v.guests);
  const all = [
    {
      id:1, name:'Şa Zaly', name_en:'ROYAL HALL',
      Icon: Crown,
      cap: Math.floor(g*0.8), area:'800 m²', ceiling:'6 metr', style:'Klassik Lýuks',
      tag:'Iň Uly Zal', priceFrom: base+10,
      features:['Kristal çyralar','Ak mermer pol','Altyn bezeg panelleri','Sahna & sahypa','VIP otaglary','Öz giriş'],
      gradient:'radial-gradient(ellipse at 60% 30%, rgba(201,168,67,0.15) 0%, rgba(139,26,46,0.06) 60%, transparent 80%)',
    },
    {
      id:2, name:'Bahar Zaly', name_en:'SPRING HALL',
      Icon: Flower2,
      cap: Math.floor(g*0.5), area:'500 m²', ceiling:'4.5 metr', style:'Häzirki Zaman',
      tag:'Iň Meşhur', priceFrom: base,
      features:['Panorama penjireler','LED display diwary','Döwrebap yşyk','Öz aşhanasy','Foýe bölümi','Açyk howly giriş'],
      gradient:'radial-gradient(ellipse at 40% 40%, rgba(100,150,201,0.12) 0%, rgba(201,168,67,0.08) 60%, transparent 80%)',
    },
    {
      id:3, name:'Altyn Zal', name_en:'GOLDEN HALL',
      Icon: Gem,
      cap: Math.floor(g*0.3), area:'300 m²', ceiling:'4 metr', style:'Ykjam Premium',
      tag:'Ykjam & Lýuks', priceFrom: base-5,
      features:['Altyn bezeg','Çeýe düzüm','Tegelek stol mümkin','Özel yşyklandyryş','Lýuks garderop','Kiçi guruplar ideal'],
      gradient:'radial-gradient(ellipse at 50% 50%, rgba(201,168,67,0.18) 0%, rgba(139,105,20,0.08) 50%, transparent 75%)',
    },
    {
      id:4, name:'Açyk Howly', name_en:'GARDEN COURT',
      Icon: Leaf,
      cap: Math.floor(g*0.6), area:'1200 m²', ceiling:'Açyk asman', style:'Açyk Tebigat',
      tag:'Açyk Howly', priceFrom: base-8,
      features:['Ýaşyl bag gurşawy','Çadyr gurmak mümkin','Açyk sahna','Milli öwüşgin','Tomus üçin amatly','Foto üçin ajaýyp'],
      gradient:'radial-gradient(ellipse at 50% 60%, rgba(27,107,58,0.15) 0%, rgba(201,168,67,0.05) 50%, transparent 75%)',
    },
  ];
  return all.slice(0, count);
}

/* ─── SERVICES DATA ─── */
const ALL_SVCS = [
  { cat:'food',  Icon:Utensils,     name:'Premium Milli Tagam',      desc:'Türkmen milli tagamlary — palaw, çorba, kebap, şaşlyk iň ökde aşpezler tarapyndan. Her stol üçin aýratyn hyzmat.',       list:['3 menýu saýlawy','Gazly & gazsyz içgiler','Tort we süýjülikler','Gije naharlygy'], note:'Adama görä ylalaşyk' },
  { cat:'food',  Icon:Sparkles,     name:'Halkara Menýu',            desc:'Ýewropa, Aziýa we Gündogar tagamlary. Daşary ýurtly myhmanlaryňyz hem öz tagamyny tapar.',                               list:['5 tapgyr naharlygy','Kokteýl sagady','Açyk bar (alkogolsyz)','Premium süýjülikler'], note:'Adama görä ylalaşyk' },
  { cat:'decor', Icon:Flower2,      name:'Gül we Zal Bezeği',        desc:'Professional floristler siziň reňk palettiňize görä doly zaly bezäp berýär.',                                            list:['Zal bezegi','Stol gülleri','Giriş arkasy','Gelin stolynyň bezegi'], note:'Pakete görä' },
  { cat:'decor', Icon:Sparkles,     name:'Yşyk Dizaýny',             desc:'LED, kristal, şem yşyklary. Romantik ýa-da şäwweli — islän atmosferany döredýäris.',                                     list:['LED perde yşyklar','Stol şemleri','Sahna yşyklandyrma','Reňk üýtgedip bilýän ulgam'], note:'Pakete görä' },
  { cat:'music', Icon:Music2,       name:'Milli Toý Sazandalary',    desc:'Türkmen milli sazy — dutar, gyjak, deprek ansamblymyz her toý üçin.',                                                    list:['3-5 sazanda','Milli & häzirki repertuar','Ses ulgamy','4-6 sagat'], note:'Ylalaşyk' },
  { cat:'music', Icon:Headphones,   name:'Toý Tamadasy',             desc:'Toýuňyzyň ähli bölümini bir yzygiderlilikde alyp barjak hünärmen tamada.',                                               list:['Doly gün hyzmat','2 dil (TM/RU)','Oýun & bäsleşik','Programma meýilnamasy'], note:'Ylalaşyk' },
  { cat:'photo', Icon:Camera,       name:'Foto & Wideo Hyzmat',      desc:'2 suratçy + wideograf. Drone, studio çykyş, sosial media klip.',                                                        list:['2 suratçy + 1 wideograf','Howa suraty (Drone)','Albom + USB','Sosial media klip'], note:'Ylalaşyk' },
  { cat:'hotel', Icon:Building2,    name:'Myhmanhana Otaglary',      desc:'Daşary şäherden gelen myhmanlar üçin hyzmatdaş myhmanhana bilen ýeňilleşdirilen baha.',                                  list:['Gelinlik öý (1 gije mugt)','Ýeňilleşdirilen baha','Aeroporta transfer','VIP salam çemeni'], note:'Myhman sanyna görä' },
  { cat:'trans', Icon:Car,          name:'Toý Transport',            desc:'Bezeg bilen taýýarlanan awtoulaglar gelin-ýigit we myhmanlar üçin.',                                                     list:['Gelin awtoulagy','Myhmanlary getirmek','Aeroporta transfer','Gün boý hyzmat'], note:'Awtoulag sanyna görä' },
];

const SVC_CATS = [
  { id:'all',   Icon:Sparkles,  label:'Hemmesi' },
  { id:'food',  Icon:Utensils,  label:'Aşhana' },
  { id:'decor', Icon:Flower2,   label:'Bezeg' },
  { id:'music', Icon:Music2,    label:'Saz' },
  { id:'photo', Icon:Camera,    label:'Suratçy' },
  { id:'hotel', Icon:Building2, label:'Myhmanhana' },
  { id:'trans', Icon:Car,       label:'Transport' },
];

/* ─── TESTIMONIALS ─── */
const TSTS = [
  { groom:'Merdan',  bride:'Aýgül',     year:'2024', hall:'Şa Zaly',    guests:350, q:'Ähli zat — nahary, bezegi, sazy — hemmesi kämil derejede gurnaldy. Myhmanlarmyz henizem gürrüň edýärler!',                  badge:'Iň kämil toý' },
  { groom:'Döwlet',  bride:'Ogulgerek', year:'2024', hall:'Bahar Zaly', guests:220, q:'Daşary ýurtly garyndaşlarymyz "Bu biziň gören iň gowy toý mekanymyz" diýdiler. Bize garşylyk üçin köp sag boluň!',          badge:'Halkara derejede' },
  { groom:'Serdar',  bride:'Läle',      year:'2023', hall:'Altyn Zal',  guests:120, q:'Kiçiräk, ýöne örän lýuks toý etmek isledik. Altyn Zal biziň islegimize doly laýyk geldi. Maslahatçymyz ajaýypdy!',           badge:'Ykjam lýuks' },
  { groom:'Rejep',   bride:'Maýa',      year:'2023', hall:'Şa Zaly',    guests:480, q:'480 adamy kabul etdik. Her stola gözegçilik, her myhmanyň ýeri — topar muny kämil derejede ýerine ýetirdi.',                  badge:'Uly toý, kämil gurnama' },
  { groom:'Yhlas',   bride:'Gülälek',   year:'2024', hall:'Açyk Howly', guests:300, q:'Açyk howluda gün batymynda toý etdik. Yşyklar, güller, saz — ol pursat biziň bütin ömrümize ýatda galar!',                   badge:'Açyk howly, ak gün' },
  { groom:'Batyr',   bride:'Nargözel',  year:'2023', hall:'Bahar Zaly', guests:200, q:'Maslahatçy hanym bize ilki güniň özünden toý gününe çenli ýol görkezdi. Biz diňe begendik — galan ähli zat olarda.',          badge:'Alada bilen hyzmat' },
];

/* ─── GALLERY DATA ─── */
const GALLERY = [
  { Icon:Heart,       label:'Gelin & Ýigit', gradient:'linear-gradient(145deg,#0e0008,#1a001a)',  span:'row-2' },
  { Icon:Flower2,     label:'Zal Bezegi',    gradient:'linear-gradient(145deg,#0d0900,#1a1200)',  span:'' },
  { Icon:Sparkles,    label:'Şem Agşamy',    gradient:'linear-gradient(145deg,#08060f,#120a18)',  span:'' },
  { Icon:Gem,         label:'Toý Tostu',     gradient:'linear-gradient(145deg,#060810,#0d1020)',  span:'' },
  { Icon:Music2,      label:'Ilkinji Tans',  gradient:'linear-gradient(145deg,#0e0002,#1a0010)',  span:'row-2' },
  { Icon:Utensils,    label:'Toý Torti',     gradient:'linear-gradient(145deg,#0a0700,#140e00)',  span:'' },
  { Icon:Flower2,     label:'Gül Bezegi',    gradient:'linear-gradient(145deg,#030609,#070e12)',  span:'' },
  { Icon:Sparkles,    label:'Yşyk Sehiri',   gradient:'linear-gradient(145deg,#050510,#0e0e1e)',  span:'' },
  { Icon:Users,       label:'Maşgala Pursady',gradient:'linear-gradient(145deg,#050905,#0c130c)', span:'col-2' },
  { Icon:Camera,      label:'Surat Pursady', gradient:'linear-gradient(145deg,#0d0800,#1a1200)',  span:'' },
  { Icon:Crown,       label:'Şaý-seherde',   gradient:'linear-gradient(145deg,#08080f,#12121a)',  span:'' },
  { Icon:Award,       label:'Ýatdan çykmajak an', gradient:'linear-gradient(145deg,#0c0900,#1a1400)', span:'' },
];

/* ─── FAQ ─── */
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

/* ─── ORNAMENT SVGs ─── */
function CornerOrnament({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2 L2 30" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      <path d="M2 2 L30 2" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      <path d="M2 2 L12 12" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      <circle cx="2" cy="2" r="2.5" fill="currentColor" opacity="0.7"/>
      <circle cx="2" cy="16" r="1" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="2" r="1" fill="currentColor" opacity="0.3"/>
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

function ArabesqueSVG({ size = 300, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ position:'absolute', pointerEvents:'none', color:'var(--gold)', opacity:0.045 }}>
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
    </svg>
  );
}

function HeroLineSVG() {
  return (
    <svg viewBox="0 0 400 20" fill="none" width="100%" style={{ maxWidth:400, display:'block', margin:'0 auto' }}>
      <path d="M0 10 L160 10" stroke="url(#lg1)" strokeWidth="0.8"/>
      <path d="M240 10 L400 10" stroke="url(#lg2)" strokeWidth="0.8"/>
      <path d="M180 4 L200 16 L220 4" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <circle cx="200" cy="10" r="2.5" fill="currentColor"/>
      <circle cx="190" cy="10" r="1.2" fill="currentColor" opacity="0.5"/>
      <circle cx="210" cy="10" r="1.2" fill="currentColor" opacity="0.5"/>
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="transparent"/>
          <stop offset="1" stopColor="currentColor" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="lg2" x1="400" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="transparent"/>
          <stop offset="1" stopColor="currentColor" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── HOOKS ─── */
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

function AnimStat({ value, label, Icon, suffix = '' }: { value: string; label: string; Icon: React.FC<{ className?: string }>; suffix?: string }) {
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
      <div className="stat-cell-icon"><Icon className="w-full h-full" /></div>
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

/* ─── MAIN APP ─── */
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
    { href:'#halls',        Icon:Crown,      label:'Zallarymyz' },
    { href:'#services',     Icon:Sparkles,   label:'Hyzmatlar' },
    { href:'#gallery',      Icon:Camera,     label:'Galereýa' },
    { href:'#pricing',      Icon:Gem,        label:'Bahalar' },
    { href:'#contact',      Icon:Phone,      label:'Habarlaş' },
  ];

  return (
    <>
      {/* SUCCESS OVERLAY */}
      {success && (
        <div className="success-overlay show" data-testid="success-overlay">
          <div className="success-box">
            <div className="success-icon-wrap">
              <Heart className="w-full h-full" style={{ color:'var(--gold)' }} />
            </div>
            <div className="success-eyebrow">✦ SORALYŇYZ KABUL EDILDI! ✦</div>
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

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} data-testid="mobile-menu">
        {/* Background arabesque */}
        <div className="mobile-menu-bg-pattern">
          <ArabesqueSVG size={600} />
        </div>

        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} data-testid="btn-close-menu">
          <X />
        </button>

        <nav className="mobile-menu-nav" data-testid="mobile-nav">
          {navLinks.map(({ href, Icon: NavIcon, label }, i) => (
            <a key={i} className="mobile-menu-link" href={href} onClick={() => setMenuOpen(false)} data-testid={`mobile-link-${i}`}>
              <NavIcon className="mobile-menu-link-icon" />
              {label}
            </a>
          ))}
        </nav>

        <div className="mobile-menu-divider" />

        <div className="mobile-menu-bottom">
          <a href={`tel:${venue.phone}`} className="mobile-menu-phone" data-testid="mobile-phone">
            <Phone /> {venue.phone}
          </a>
          <div className="mobile-menu-socials">
            {venue.telegram && (
              <a href={`https://t.me/${venue.telegram}`} className="mobile-social-btn" target="_blank" rel="noreferrer">
                <Send size={14}/> Telegram
              </a>
            )}
            {venue.instagram && (
              <a href={`https://instagram.com/${venue.instagram}`} className="mobile-social-btn" target="_blank" rel="noreferrer">
                <Instagram size={14}/> Instagram
              </a>
            )}
            <a href={`tel:${venue.phone}`} className="mobile-social-btn">
              <Phone size={14}/> Jaň et
            </a>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="mobile-bottom-bar" data-testid="mobile-bottom-bar">
        <a href={`tel:${venue.phone}`} className="mobile-bottom-btn outline" data-testid="btn-mobile-call">
          <Phone /> Jaň Et
        </a>
        <a href="#contact" className="mobile-bottom-btn gold" data-testid="btn-mobile-book">
          <Gem /> Bron Et
        </a>
      </div>

      {/* NAVBAR */}
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
          {navLinks.map(({ href, label }, i) => (
            <li key={i}><a href={href}>{label}</a></li>
          ))}
        </ul>

        <div className="nav-right">
          <a href={`tel:${venue.phone}`} className="nav-phone-wrap" data-testid="nav-phone">
            <Phone className="nav-phone-icon" />
            {venue.phone}
          </a>
          <a href="#contact" className="btn-cta nav-cta-btn" data-testid="btn-nav-book">
            <DiamondGem size={10} />
            Bron Et
          </a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(true)} data-testid="btn-open-menu">
            <Menu />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home" data-testid="hero">
        <div className="hero-bg-blob-main" />
        <div className="hero-bg-blob-tr" />
        <div className="hero-bg-blob-bl" />
        <div className="pattern-dots" style={{ opacity:0.3 }} />

        {/* Corner ornaments */}
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

        {/* Floating icons */}
        <div className="hero-float-item hero-float-item-1">
          <div style={{ color:'var(--gold)' }}>
            <Crown style={{ width:32, height:32, filter:'drop-shadow(0 0 12px rgba(201,168,67,0.5))' }} />
          </div>
        </div>
        <div className="hero-float-item hero-float-item-2">
          <div style={{ color:'var(--gold)' }}>
            <Heart style={{ width:28, height:28, filter:'drop-shadow(0 0 10px rgba(201,168,67,0.4))' }} />
          </div>
        </div>
        <div className="hero-float-item hero-float-item-3">
          <div style={{ color:'var(--gold)' }}>
            <Flower2 style={{ width:26, height:26, filter:'drop-shadow(0 0 10px rgba(201,168,67,0.4))' }} />
          </div>
        </div>
        <div className="hero-float-item hero-float-item-4">
          <div style={{ color:'var(--gold)' }}>
            <Gem style={{ width:24, height:24, filter:'drop-shadow(0 0 10px rgba(201,168,67,0.4))' }} />
          </div>
        </div>

        {/* Large bg arabesque */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', pointerEvents:'none', opacity:0.04 }}>
          <ArabesqueSVG size={700} />
        </div>

        <div className="hero-content">
          {/* Eyebrow */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-gem" style={{ color:'var(--gold)' }}><DiamondGem size={8} /></span>
            <span className="hero-eyebrow-text">Toý Mekany</span>
            <span className="hero-eyebrow-gem" style={{ color:'var(--gold)' }}><DiamondGem size={8} /></span>
          </div>

          {/* Title */}
          <h1 className="hero-title" data-testid="hero-title">
            <span className="line"><span className="line-inner">Arzuwyňyzdaky</span></span>
            <span className="line"><span className="line-inner">toý — biziň</span></span>
            <span className="line"><span className="line-inner">elimizde.</span></span>
          </h1>

          {/* Separator */}
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
              <Gem size={14} />
              Bron Et
            </a>
            <a href="#halls" className="btn-outline" data-testid="btn-hero-halls">
              Zallarymyzy Gör
              <ChevronDown size={16} />
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats-row" data-testid="hero-stats">
            <HeroStat value={venue.guests+'+'} label="Myhmana çenli" />
            <HeroStat value={venue.halls}       label="Premium Zal" />
            <HeroStat value={venue.events}       label="Toý Çäresi" />
            <HeroStat value={venue.parking+'+'}  label="Awtoulag ýeri" />
          </div>
        </div>

        {/* Wave */}
        <svg className="hero-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" fill="none">
          <path d="M0 40 C360 80 1080 0 1440 40 L1440 70 L0 70 Z" fill="var(--bg)"/>
        </svg>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar" data-testid="stats-bar">
        <div className="pattern-lines" />
        <div className="stats-bar-inner">
          <AnimStat value={venue.guests+'+'} label="Iň köp myhman kabul edip bilýäris" Icon={Users} suffix="+" />
          <AnimStat value={venue.halls}       label="Premium Zal, dürli stilde"          Icon={Crown} />
          <AnimStat value={venue.events}      label="Gurulan Toý Çäresi"                 Icon={Award} suffix="+" />
          <AnimStat value={venue.parking+'+'} label="Awtoulag Ýeri, mugt"                Icon={Car} suffix="+" />
        </div>
      </div>

      {/* HALLS */}
      <section className="section" id="halls" data-testid="section-halls" style={{ background:'var(--bg)' }}>
        <ArabesqueSVG size={380} style={{ top:'5%', right:'-3%' } as React.CSSProperties} />
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
                  {/* Band */}
                  <div className="hall-card-band" style={{ background: hall.gradient }}>
                    <div className="hall-card-band-pattern" />
                    <div className="hall-card-band-glow" />
                    <hall.Icon className="hall-card-icon" />
                    <span className="hall-card-tag">{hall.tag}</span>
                  </div>

                  {/* Body */}
                  <div className="hall-card-body">
                    <h3 className="hall-name">{hall.name}</h3>
                    <div className="hall-name-en">{hall.name_en}</div>

                    <div className="hall-sep">
                      <div className="hall-sep-line" />
                      <span className="hall-sep-gem" style={{ color:'var(--gold)' }}><DiamondGem size={7} /></span>
                      <div className="hall-sep-line" />
                    </div>

                    <div className="hall-meta">
                      <div className="hall-meta-item"><Users className="hall-meta-icon" />{hall.cap}+ myhmana çenli</div>
                      <div className="hall-meta-item"><Ruler className="hall-meta-icon" />{hall.area}</div>
                      <div className="hall-meta-item"><MoveVertical className="hall-meta-icon" />{hall.ceiling}</div>
                    </div>

                    <div className="hall-features">
                      {hall.features.map((f, fi) => (
                        <div key={fi} className="hall-feature">
                          <Check className="hall-feat-icon" />
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
                        Maglumat Al <ArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services" style={{ background:'var(--surface)' }} data-testid="section-services">
        <ArabesqueSVG size={340} style={{ top:'5%', left:'-3%' } as React.CSSProperties} />
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
                  <s.Icon className="w-full h-full" />
                </div>
                <h3 className="svc-name">{s.name}</h3>
                <p className="svc-desc">{s.desc}</p>
                <ul className="svc-list">
                  {s.list.map((item, ii) => (
                    <li key={ii}><Check className="svc-list-icon" />{item}</li>
                  ))}
                </ul>
                <div className="svc-price">{s.note}</div>
                <button className="svc-btn" data-testid={`btn-svc-${i}`}>
                  Maglumat Al <ArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section" style={{ background:'var(--bg)' }} data-testid="section-why">
        <ArabesqueSVG size={360} style={{ bottom:'5%', right:'-3%' } as React.CSSProperties} />
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
                { Icon:Crown,        title:'Şahsylaşdyrylan Hyzmat',   desc:'Her toý özboluşly — siziň arzuwyňyza görä doly düzülýär.' },
                { Icon:Clock,        title:'Wagtynda Kepillik',         desc:'Toýuňyzyň her bölümi meýilnama görä wagtynda kämil taýýar.' },
                { Icon:Star,         title:'Tejribeli Hünärmenler',     desc:'Toý gurnagçylary, suratçy, tamada, aşpez — ählisi siziň bilen.' },
                { Icon:Shield,       title:'Şertnama & Kepillik',       desc:'Ylalaşylan ähli şertler şertnamada berkidilýär.' },
                { Icon:Sparkles,     title:'Mugt Konsultasiýa',         desc:'Bronlamadan öň hünärmen maslahat mugtuna berilýär.' },
                { Icon:Globe,        title:'Halkara Derejedäki Hyzmat', desc:'Dürli dilden we medeniýetten myhmanlara hyzmat edip bilýäris.' },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="why-feat" data-testid={`why-feat-${i}`}>
                    <div className="why-feat-icon"><f.Icon /></div>
                    <h4 className="why-feat-title">{f.title}</h4>
                    <p className="why-feat-desc">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
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
                  <g.Icon className="gallery-icon" />
                  <span className="gallery-label">{g.label}</span>
                </div>
                <div className="gallery-overlay">
                  <g.Icon className="gallery-overlay-icon" />
                  <span className="gallery-overlay-label">{g.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section" style={{ background:'var(--bg)' }} data-testid="section-steps">
        <ArabesqueSVG size={300} style={{ top:'5%', left:'-2%' } as React.CSSProperties} />
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
              { Icon:Phone,         label:'01', title:'Habarlaşyň',     desc:'Telefon ýa-da saýt arkaly bize ýüz tutuň.' },
              { Icon:Users,         label:'02', title:'Duşuşyk',        desc:'Hünärmen maslahatçymyz bilen duşuşuň.' },
              { Icon:CalendarDays,  label:'03', title:'Meýilleşdiriň',  desc:'Doly programmany bile düzeris.' },
              { Icon:Heart,         label:'04', title:'Toýuňuz!',       desc:'Siz lezzet alarsyňyz — biz üstlenýäris.' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="step-item" data-testid={`step-${i}`}>
                  <div className="step-num-wrap">
                    <span className="step-num">{s.label}</span>
                  </div>
                  <s.Icon className="step-icon" />
                  <h4 className="step-title">{s.title}</h4>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
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
                <Sparkles className="testimonial-quote-icon" />
                <div className="testimonial-stars">
                  {Array(tstCurr.rating ?? 5).fill(0).map((_,i) => <Star key={i} />)}
                </div>
                <p className="testimonial-text">
                  "{tstCurr.q.replace(/{name}/g, venue.name)}"
                </p>
                <div className="testimonial-footer">
                  <div>
                    <div className="testimonial-couple-name">{tstCurr.groom} & {tstCurr.bride}</div>
                    <div className="testimonial-couple-meta">
                      <CalendarDays size={12} />
                      {tstCurr.year} · {tstCurr.hall} · {tstCurr.guests} myhmany
                    </div>
                  </div>
                  <span className="testimonial-badge">{tstCurr.badge}</span>
                </div>
              </div>
            </Reveal>

            <div className="carousel-nav" data-testid="carousel-nav">
              <button className="carousel-arrow" onClick={() => setTstIdx(i => (i-1+TSTS.length)%TSTS.length)} data-testid="btn-prev">
                <ChevronLeft />
              </button>
              <div className="carousel-dots">
                {TSTS.map((_,i) => (
                  <button key={i} className={`carousel-dot ${i===tstIdx?'active':''}`}
                    onClick={() => setTstIdx(i)} data-testid={`dot-${i}`} />
                ))}
              </div>
              <button className="carousel-arrow" onClick={() => setTstIdx(i => (i+1)%TSTS.length)} data-testid="btn-next">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing" style={{ background:'var(--bg)' }} data-testid="section-pricing">
        <ArabesqueSVG size={350} style={{ top:'5%', right:'-2%' } as React.CSSProperties} />
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
                  {pkg.popular && <div className="pricing-top-badge">✦ {pkg.badge} ✦</div>}
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
                          ? <Check className="pf-icon inc" />
                          : <X className="pf-icon exc" />
                        }
                        <span>{f.t}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.pp && <p className="pricing-min">Min. {(pkg.min*pkg.pp).toLocaleString()} TMT-dan</p>}
                  <a href="#contact" className={`pricing-cta ${pkg.popular ? 'gold' : 'outline'}`} data-testid={`btn-pkg-${i}`}>
                    <Gem size={14} />
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
              <ArabesqueSVG size={220} style={{ top:'50%', right:'-5%', transform:'translateY(-50%)' } as React.CSSProperties} />
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

      {/* FAQ */}
      <section className="section" style={{ background:'var(--surface)' }} data-testid="section-faq">
        <ArabesqueSVG size={300} style={{ top:'5%', left:'-2%' } as React.CSSProperties} />
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
                      <Plus className="faq-q-icon" />
                    </div>
                  </button>
                  <div className="faq-a">{faq.a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact" style={{ background:'var(--bg)' }} data-testid="section-contact">
        <ArabesqueSVG size={340} style={{ bottom:'5%', right:'-2%' } as React.CSSProperties} />
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
                  { Icon:Phone,    content: <a href={`tel:${venue.phone}`}>{venue.phone}</a> },
                  ...(venue.phone2 ? [{ Icon:Phone, content: <a href={`tel:${venue.phone2}`}>{venue.phone2}</a> }] : []),
                  { Icon:MapPin,   content: <span>{venue.address}, {venue.city}</span> },
                  { Icon:Clock,    content: <span>Iş wagty: 09:00 – 20:00 (her gün)</span> },
                  ...(venue.telegram  ? [{ Icon:Send,      content: <a href={`https://t.me/${venue.telegram}`} target="_blank" rel="noreferrer">@{venue.telegram}</a> }] : []),
                  ...(venue.instagram ? [{ Icon:Instagram, content: <a href={`https://instagram.com/${venue.instagram}`} target="_blank" rel="noreferrer">@{venue.instagram}</a> }] : []),
                ].map((item, i) => (
                  <div key={i} className="contact-info-item" data-testid={`ci-${i}`}>
                    <div className="contact-info-icon"><item.Icon /></div>
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
                      <Send /> Telegram arkaly ýaz
                    </a>
                  )}
                  <a href={`tel:${venue.phone}`} className="social-action-btn" data-testid="btn-call">
                    <Phone /> Jaň et: {venue.phone}
                  </a>
                  {venue.instagram && (
                    <a href={`https://instagram.com/${venue.instagram}`} className="social-action-btn" target="_blank" rel="noreferrer" data-testid="btn-ig">
                      <Instagram /> Instagram-da gör
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
                        <h.Icon size={14} /> {h.name}
                      </button>
                    ))}
                    <button type="button"
                      className={`form-hall-opt ${selHall==='Heniz bilmedim'?'sel':''}`}
                      onClick={() => setSelHall('Heniz bilmedim')} data-testid="btn-fhall-unknown">
                      <CircleUnknown size={14} /> Heniz bilmedim
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
                  <Gem size={18} />
                  Bron Soragyny Iber
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" data-testid="footer">
        <ArabesqueSVG size={320} style={{ top:'-5%', right:'3%' } as React.CSSProperties} />
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
              { Icon:Phone,   c: <a href={`tel:${venue.phone}`}>{venue.phone}</a> },
              ...(venue.phone2 ? [{ Icon:Phone, c: <a href={`tel:${venue.phone2}`}>{venue.phone2}</a> }] : []),
              { Icon:MapPin,  c: <span>{venue.address}</span> },
              { Icon:Globe,   c: <span>{venue.city}</span> },
              ...(venue.telegram  ? [{ Icon:Send,      c: <a href={`https://t.me/${venue.telegram}`} target="_blank" rel="noreferrer">Telegram</a> }] : []),
              ...(venue.instagram ? [{ Icon:Instagram, c: <a href={`https://instagram.com/${venue.instagram}`} target="_blank" rel="noreferrer">Instagram</a> }] : []),
            ].map((item, i) => (
              <div key={i} className="footer-contact-item">
                <item.Icon />
                <div>{item.c}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-hr" />
        <div className="footer-bottom" data-testid="footer-bottom">
          <span>{venue.name} — {venue.city} · {new Date().getFullYear()}</span>
          <span className="footer-credit">Döredilen 🛠️ <a href="https://yenil.ru" target="_blank" rel="noreferrer">Ýeňil Web Agentligi</a></span>
        </div>
      </footer>
    </>
  );
}

/* tiny inline component to avoid import error */
function CircleUnknown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}
