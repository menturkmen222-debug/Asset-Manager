import { useEffect, useRef, useState } from "react";

// URL parametrlerini okamak
function getVenue() {
  const params = new URLSearchParams(window.location.search);
  const color = params.get('color') || 'C9A843';
  const color2 = params.get('color2') || 'E8C96B';
  const colorDark = params.get('colord') || '8B6914';

  function hexToRgb(hex: string) {
    return [
      parseInt(hex.slice(0,2),16),
      parseInt(hex.slice(2,4),16),
      parseInt(hex.slice(4,6),16)
    ].join(', ');
  }

  document.documentElement.style.setProperty('--gold', '#' + color);
  document.documentElement.style.setProperty('--gold2', '#' + color2);
  document.documentElement.style.setProperty('--gold-dark', '#' + colorDark);
  document.documentElement.style.setProperty('--gold-rgb', hexToRgb(color));

  return {
    name:        params.get('name')     || 'Bagtly Köşk',
    tagline:     params.get('tag')      || 'Arzuwyňyzdaky toý — biziň elimizde.',
    city:        params.get('city')     || 'Aşgabat',
    phone:       params.get('phone')    || '+993 12 34-56-78',
    phone2:      params.get('phone2')   || '',
    address:     params.get('addr')     || 'Arçabil şaýoly 110',
    color,
    color2,
    colorDark,
    guests:      params.get('guests')   || '500',
    halls:       params.get('halls')    || '3',
    founded:     params.get('est')      || '2015',
    events:      params.get('events')   || '1200+',
    parking:     params.get('parking')  || '200',
    instagram:   params.get('ig')       || '',
    telegram:    params.get('tg')       || '',
    logo:        params.get('logo')     || null,
    minprice:    params.get('price')    || '25',
  };
}

function generateHalls(count: number, venue: ReturnType<typeof getVenue>) {
  const allHalls = [
    {
      id: 1, name: 'Şa Zaly', name_en: 'Royal Hall', emoji: '👑',
      capacity: Math.floor(parseInt(venue.guests) * 0.8),
      area: '800 m²', style: 'Klassik Lýuks', ceiling: '6 metr belentlik',
      features: ['Kristal çyralar','Ak mermer pol','Altyn bezeg panelleri','Sahna we sahypa','VIP otaglary','Öz giriş bilen'],
      tag: 'Iň Uly Zal', priceFrom: parseInt(venue.minprice) + 10,
      bg: 'linear-gradient(160deg, #0d0a00 0%, #1a1500 50%, #0a0800 100%)'
    },
    {
      id: 2, name: 'Bahar Zaly', name_en: 'Spring Hall', emoji: '🌸',
      capacity: Math.floor(parseInt(venue.guests) * 0.5),
      area: '500 m²', style: 'Häzirki Zaman', ceiling: '4.5 metr',
      features: ['Döwrebap yşyklandyryş','Panorama penjireler','LED display diwary','Öz aşhanasy','Foýe bölümi','Açyk howly giriş'],
      tag: 'Iň Meşhur', priceFrom: parseInt(venue.minprice),
      bg: 'linear-gradient(160deg, #0a0510 0%, #150a18 50%, #080510 100%)'
    },
    {
      id: 3, name: 'Altyn Zal', name_en: 'Golden Hall', emoji: '✨',
      capacity: Math.floor(parseInt(venue.guests) * 0.3),
      area: '300 m²', style: 'Ykjam Premium', ceiling: '4 metr',
      features: ['Altyn bezeg','Stol düzümi çeýe','Tegelek stol mümkin','Özel ýagtylandyryş','Lýuks garderop','Kiçi guruplar üçin ideal'],
      tag: 'Ykjam & Lýuks', priceFrom: parseInt(venue.minprice) - 5,
      bg: 'linear-gradient(160deg, #0a0800 0%, #140f00 50%, #0a0800 100%)'
    },
    {
      id: 4, name: 'Açyk Howly', name_en: 'Open Garden', emoji: '🌿',
      capacity: Math.floor(parseInt(venue.guests) * 0.6),
      area: '1200 m²', style: 'Açyk Tebigat', ceiling: 'Açyk asman',
      features: ['Ýaşyl bag gurşawy','Çadyr gurmak mümkin','Açyk sahna','Milli öwüşgin','Tomus wagtlary amatly','Fotosurat üçin ajaýyp'],
      tag: 'Açyk Howly', priceFrom: parseInt(venue.minprice) - 8,
      bg: 'linear-gradient(160deg, #020a04 0%, #051408 50%, #020a04 100%)'
    },
  ];
  return allHalls.slice(0, count);
}

const allServices = [
  { cat: 'food',      icon: '🍽️', name: 'Premium Milli Tagam',       desc: 'Türkmen milli tagamlary — palaw, çorba, kebap, şaşlyk — iň ökde aşpezlerimiz tarapyndan taýýarlanýar. Her stol üçin aýratyn hyzmat.',                includes: ['3 menýu saýlawy','Gazly & gazsyz içgiler','Tort we süýjülikler','Gije naharlygy'], priceNote: 'Adama görä ylalaşyk' },
  { cat: 'food',      icon: '🥂', name: 'Halkara Menýu',              desc: 'Ýewropa, Aziýa we Gündogar tagamlaryndan düzülen dürli menýu. Myhmanlaryňyz her ýerden gelse — ählisi öz tagamyny tapar.',                                  includes: ['5 naharlygy tapgyry','Kokteýl sagady','Açyk bar (alkogolsyz)','Premium süýjülikler'], priceNote: 'Adama görä ylalaşyk' },
  { cat: 'decor',     icon: '🌹', name: 'Gül we Zal Bezeği',           desc: 'Professional floristlerimiz siziň reňk palettiňize we stiline görä doly zaly bezäp berýär. Stol gülleri, giriş bezegi, gelniň ýoluna çenli.',              includes: ['Zal bezegi','Stol gülleri','Giriş arkasy','Gelin-ýigit stolynyň bezegi'], priceNote: 'Pakete görä' },
  { cat: 'decor',     icon: '💡', name: 'Yşyk Dizaýny',               desc: 'LED, kristal, şem yşyklary. Romantik ýa-da şäwweli — islän atmosferany döredýäris. Sahypany düzýän yşyk — ähli suratlary mähremleşdirýär.',                  includes: ['LED perde yşyklar','Stol şemleri','Sahna yşyklandyrma','Reňk üýtgedip bilýän ulgam'], priceNote: 'Pakete görä' },
  { cat: 'music',     icon: '🎵', name: 'Milli Toý Sazandalary',       desc: 'Türkmen milli sazy bilen toýuňyzy ruhy göteriji ediň. Dutar, gyjak, deprek ansamblymyz — her toý üçin.',                                                      includes: ['3-5 sazanda','Milli we häzirki zaman repertuar','Ses ulgamy','4-6 sagat'], priceNote: 'Ylalaşyk' },
  { cat: 'music',     icon: '🎤', name: 'Toý Alyp Baryjy (Tamada)',    desc: 'Toýuňyzyň ähli bölümini bir yzygiderlilikde alyp barjak hünärmen tamada. Oýunlar, çykyşlar, sürprizler — ählisi meýilleşdirilen.',                           includes: ['Doly gün hyzmat','2 dil (TM / RU)','Oýun we bäsleşik','Programma meýilnamasy'], priceNote: 'Ylalaşyk' },
  { cat: 'photo',     icon: '📸', name: 'Foto we Wideo Hyzmat',        desc: 'Hünärmen suratçy we wideograf toýuňyzyň her pursadyny ýokary hilli abzallarda ýazga alýar. Alty aý içinde düzedilen wideo.',                                  includes: ['2 suratçy + 1 wideograf','Howa suraty (Drone)','Albom + DVD','Sosial media klip'], priceNote: 'Ylalaşyk' },
  { cat: 'hotel',     icon: '🛎️', name: 'Myhmanhana Otaglary',        desc: 'Daşary şäherden gelen myhmanlar üçin hyzmatdaş myhmanhana bilen ýeňilleşdirilen baha. Gelinlik öýi ýörite taýýarlanýar.',                                    includes: ['Gelinlik öý (1 gije mugt)','Myhmanlara ýeňilleşdirilen baha','Aeroporta transfer','VIP salam çemeni'], priceNote: 'Myhman sanyna görä' },
  { cat: 'transport', icon: '🚗', name: 'Toý Transport Hyzmat',        desc: 'Bezeg bilen taýýarlanan awtoulaglar — gelin-ýigit üçin özboluşly ýa-da myhmanlary getirmek-eltmek üçin.',                                                      includes: ['Gelin awtoulagy (bezeg bilen)','Myhmanlary getirmek','Aeroporta transfer','Gün boý hyzmat'], priceNote: 'Awtoulag sanyna görä' },
];

const testimonials = [
  { groom: 'Merdan', bride: 'Aýgül', year: '2024', hall: 'Şa Zaly', guests: 350, rating: 5, quote: '{name}-da toý etmek biziň iň dogry kararymyzdy. Ähli zat — nahary, bezegi, sazy — hemmesi kämil derejede gurnaldy. Myhmanlarmyz henizem gürleşýärler!', highlight: 'Iň kämil toý' },
  { groom: 'Döwlet', bride: 'Ogulgerek', year: '2024', hall: 'Bahar Zaly', guests: 220, rating: 5, quote: 'Daşary ýurtdan gelen garyndaşlarymyz {name}-yň hyzmatyna geň galdylar. "Bu biziň gören iň gowy toý mekanymyz" diýdiler.', highlight: 'Halkara derejede' },
  { groom: 'Serdar', bride: 'Läle', year: '2023', hall: 'Altyn Zaly', guests: 120, rating: 5, quote: 'Kiçiräk, ýöne örän lýuks toý etmek isledik. Altyn Zaly biziň islegimize doly laýyk geldi. Gelin-ýigit üçin ähli zat özi bilen üpjün edildi.', highlight: 'Ykjam lýuks' },
  { groom: 'Rejep', bride: 'Maýa', year: '2023', hall: 'Şa Zaly', guests: 480, rating: 5, quote: '500 adama golaý myhmany kabul etdik. Her stola gözegçilik, her myhmanyň öz ýeri — {name} topary muny kämil derejede ýerine ýetirdi.', highlight: 'Uly toý, kämil gurnama' },
  { groom: 'Yhlas', bride: 'Gülälek', year: '2024', hall: 'Açyk Howly', guests: 300, rating: 5, quote: 'Açyk howluda gün batymynda toý etdik. Owadan yşyklar, güller, saz — şol pursat bizi bütin ömrümize ýatda galar. {name} muny mümkin etdi!', highlight: 'Açyk howly, ak gün' },
  { groom: 'Batyr', bride: 'Nargözel', year: '2023', hall: 'Bahar Zaly', guests: 200, rating: 5, quote: 'Maslahatçy hanym bize ilkinji gün bilen iň soňky pursata çenli ýol görkezdi. Toý gününde biz diňe begendik — galan ähli zat olarda.', highlight: 'Alada bilen hyzmat' },
];

const galleryItems = [
  { emoji: '👰', label: 'Gelin & Ýigit Pursaty', gradient: 'linear-gradient(135deg, #1a0010, #0d000a)', span: 'row-2' },
  { emoji: '🌹', label: 'Zal Bezegi', gradient: 'linear-gradient(135deg, #100a00, #1a1000)', span: '' },
  { emoji: '🕯️', label: 'Şem Agşamy', gradient: 'linear-gradient(135deg, #0a0508, #120a10)', span: '' },
  { emoji: '🥂', label: 'Toý Tostu', gradient: 'linear-gradient(135deg, #080a10, #100d18)', span: '' },
  { emoji: '💃', label: 'Ilkinji Tans', gradient: 'linear-gradient(135deg, #100005, #1a000a)', span: 'row-2' },
  { emoji: '🎂', label: 'Toý Torti', gradient: 'linear-gradient(135deg, #0a0800, #141000)', span: '' },
  { emoji: '💐', label: 'Gül Bezegi', gradient: 'linear-gradient(135deg, #05080a, #0a1015)', span: '' },
  { emoji: '✨', label: 'Yşyk Sehiri', gradient: 'linear-gradient(135deg, #080810, #101018)', span: '' },
  { emoji: '👨‍👩‍👧‍👦', label: 'Maşgala Pursady', gradient: 'linear-gradient(135deg, #060a06, #0d140d)', span: 'col-2' },
  { emoji: '🎵', label: 'Saz Güni', gradient: 'linear-gradient(135deg, #0a0500, #140900)', span: '' },
  { emoji: '🌙', label: 'Agşam Atmosfera', gradient: 'linear-gradient(135deg, #050510, #0a0a18)', span: '' },
  { emoji: '🏆', label: 'Ýatdan çykmajak an', gradient: 'linear-gradient(135deg, #0d0a00, #1a1500)', span: '' },
];

const faqs = [
  { q: 'Zaly nähili wagtlykda bron etmek gerek?', a: 'Meşhur sene we zallary (esasan tomus we güýz) 6-12 aý öňünden bron etmek maslahat berilýär. Başga seneler üçin 2-3 aý öňünden hem ýeterli.' },
  { q: 'Myhmanlaryň iň az we iň köp sany nämeler?', a: 'Iň az myhmany 50 adam. Bizdäki iň köp myhman sany görkezilen. Sanyňyza görä dogry zal maslahat berler.' },
  { q: 'Öz aşpezimizi ýa-da tamadamyzy getirip bilerismi?', a: 'Bu barada aýratyn ylalaşmak gerek. Käbir halatlarda öz hünärmenlerinizi getirip bilýärsiňiz, ýöne salgylanma töleg bar bolup biler.' },
  { q: 'Bron etmek üçin näçe öňünden töleg gerek?', a: 'Bron tassyklamak üçin umumy bahanyň 30%-i öňünden tölenýär. Galan bölek toýdan 7-30 gün öňünden tamamlanýar.' },
  { q: 'Öz bezegiňizi getirmek mümkinmi?', a: 'Hawa. Öz bezeg materiallaryňyzy getirip bilersiňiz. Olary ýerleşdirmek üçin toýdan 2-3 sagat öňünden zala girip bolýar.' },
  { q: 'Fotosuratçy öz ýanymyzdan getirsek bolýarmy?', a: 'Hawa, öz suratçyňyzy getirip bilersiňiz. Olara amatly iş şertlerini döredeýäris.' },
  { q: 'Toý güni ýagmyr ýagsa näme bolýar? (Açyk howly üçin)', a: 'Açyk howly üçin howanyň erbetleşmegi halynda howa çadyry ýa-da ýapyk bölüme geçiriş mümkinçiligimiz bar. Bu öňünden ylalaşylýar.' },
  { q: 'Çagalar üçin aýratyn menýu ýa-da oturgyç barmy?', a: 'Hawa. Çagalar üçin aýratyn menýu we ýokary oturgyç hyzmatymyz bar. Munuň üçin öňünden aýtmak ýeterli.' },
  { q: 'Daşary ýurtly myhmanlar üçin nähili hyzmatlar bar?', a: 'Rus, iňlis dilinde hyzmat edip bilýäris. Aeroportdan transfer, myhmanhana otag bronlamak we terjimeçi hyzmatlarymyz bar.' },
  { q: 'Toýdan soňra zaly boşatmak üçin näçe wagt berilýär?', a: 'Standart pakete görä toýdan soňra 1-2 sagat boşatmak wagty berilýär.' },
];

const serviceCats = [
  { id: 'all', label: 'Hemmesi' },
  { id: 'food', label: 'Aşhana' },
  { id: 'decor', label: 'Bezeg' },
  { id: 'music', label: 'Saz & Güýmenje' },
  { id: 'photo', label: 'Suratçy' },
  { id: 'hotel', label: 'Myhmanhana' },
  { id: 'transport', label: 'Transport' },
];

function ArbesqueSvg({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className}>
      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
      <g transform="translate(100,100)">
        <ellipse rx="8" ry="35" fill="currentColor" opacity="0.3"/>
        <ellipse rx="8" ry="35" transform="rotate(45)" fill="currentColor" opacity="0.3"/>
        <ellipse rx="8" ry="35" transform="rotate(90)" fill="currentColor" opacity="0.3"/>
        <ellipse rx="8" ry="35" transform="rotate(135)" fill="currentColor" opacity="0.3"/>
      </g>
      <circle cx="100" cy="100" r="12" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

function useCountUp(target: number, started: boolean, suffix = '') {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCurrent(target); clearInterval(timer); }
      else setCurrent(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [started, target]);
  return current === 0 && !started ? '0' : current.toLocaleString() + suffix;
}

function AnimatedStat({ value, label, suffix }: { value: string; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const num = parseInt(value.replace(/\D/g, '')) || 0;
  const hasSuffix = value.includes('+') ? '+' : (suffix || '');
  const display = useCountUp(num, started, hasSuffix);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="stat-item" ref={ref} data-testid="stat-item">
      <span className="stat-number" data-value={num}>{display}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function RevealEl({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className || ''}`}>
      {children}
    </div>
  );
}

export default function App() {
  const venue = getVenue();
  const halls = generateHalls(parseInt(venue.halls), venue);

  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeServiceCat, setActiveServiceCat] = useState('all');
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [calcGuests, setCalcGuests] = useState(150);
  const [calcPkg, setCalcPkg] = useState('premium');
  const [successData, setSuccessData] = useState<null | { name: string; partner: string; date: string; guests: string; hall: string }>(null);
  const [showExtras, setShowExtras] = useState(false);
  const [selectedHall, setSelectedHall] = useState('');
  const [formPriceHint, setFormPriceHint] = useState('');

  // Form state
  const [formData, setFormData] = useState({ name: '', partner: '', phone: '', email: '', date: '', guests: '', package: '', source: '', notes: '', foreignGuests: false, ownPhoto: false, specialNote: '' });

  // Nav scroll
  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Testimonial auto-rotate
  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // Document title
  useEffect(() => {
    document.title = `${venue.name} — ${venue.city} | Premium Toý Mekany`;
    // Favicon
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#' + venue.color;
      ctx.font = 'bold 20px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💍', 16, 16);
      const link = document.querySelector("link[rel='icon']") as HTMLLinkElement || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = canvas.toDataURL();
      document.head.appendChild(link);
    }
  }, []);

  // Calc
  const calcResult = (() => {
    const priceMap: Record<string, number | null> = {
      'bashlangyc': parseInt(venue.minprice),
      'premium': parseInt(venue.minprice) + 15,
      'lyuks': null,
    };
    const price = priceMap[calcPkg];
    if (!price) return 'Ylalaşyk esasynda';
    return (calcGuests * price).toLocaleString() + ' TMT-dan başlaýar';
  })();

  // Form guests price hint
  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const g = parseInt(e.target.value) || 0;
    const priceMin = g * parseInt(venue.minprice);
    const pricePrem = g * (parseInt(venue.minprice) + 15);
    setFormPriceHint(g > 0 ? `Takmyn baha: ${priceMin.toLocaleString()} – ${pricePrem.toLocaleString()} TMT` : '');
    setFormData(d => ({ ...d, guests: e.target.value }));
  };

  // Confetti
  function launchConfetti() {
    const colors = ['#C9A843','#E8C96B','#FDF8EE','#F5EDD8','#fff'];
    for (let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-10px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.width = (Math.random() * 8 + 4) + 'px';
      el.style.height = (Math.random() * 8 + 4) + 'px';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      el.style.animationDuration = (Math.random() * 3 + 2) + 's';
      el.style.animationDelay = (Math.random() * 1) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }
  }

  // Form submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    launchConfetti();
    setSuccessData({
      name: formData.name,
      partner: formData.partner,
      date: formData.date,
      guests: formData.guests,
      hall: selectedHall || halls[0]?.name,
    });
  }

  const filteredServices = activeServiceCat === 'all'
    ? allServices
    : allServices.filter(s => s.cat === activeServiceCat);

  const t = testimonials[testimonialIdx];

  const minDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const packages = [
    {
      name: 'Başlangyç Toý',
      badge: 'Ykjam Toý',
      pricePerPerson: parseInt(venue.minprice),
      priceNote: null as string | null,
      minGuests: 50,
      maxGuests: 150,
      features: [
        { t: 'Altyn Zal (saýlan wagtyňyz)', inc: true },
        { t: 'Standart milli menýu', inc: true },
        { t: 'Stol bezegi (standart)', inc: true },
        { t: 'Saz (disk jokiý)', inc: true },
        { t: '5 sagat zal wagt', inc: true },
        { t: 'Aşhana hyzmaty', inc: true },
        { t: 'Garderop & howpsuzlyk', inc: true },
        { t: 'Fotograf girizilmedik', inc: false },
        { t: 'Bezeg paketi aýratyn', inc: false },
      ],
      note: 'Kiçi maşgala toýlary üçin ideal',
      popular: false, cta: 'Bu Paketi Saýla',
    },
    {
      name: 'Premium Toý',
      badge: 'Maslahat Berilýär',
      pricePerPerson: parseInt(venue.minprice) + 15,
      priceNote: null as string | null,
      minGuests: 100,
      maxGuests: parseInt(venue.guests),
      features: [
        { t: 'Islän zal saýlama', inc: true },
        { t: 'Premium milli & halkara menýu', inc: true },
        { t: 'Doly gül we yşyk bezegi', inc: true },
        { t: 'Tamada & Sazandalar', inc: true },
        { t: '7 sagat zal wagt', inc: true },
        { t: 'Foto & Wideo (1 suratçy)', inc: true },
        { t: 'Gelin odasy (mugt)', inc: true },
        { t: 'Mugt konsultasiýa', inc: true },
      ],
      note: 'Iň meşhur we doly toý paketi',
      popular: true, cta: 'Premium Al',
    },
    {
      name: 'Lýuks Toý',
      badge: 'Iň Doly Paket',
      pricePerPerson: null as number | null,
      priceNote: 'Ylalaşyk esasynda',
      minGuests: 200,
      maxGuests: parseInt(venue.guests),
      features: [
        { t: 'Şa Zaly (ýapyk bronlama)', inc: true },
        { t: 'Özboluşly menýu dizaýny', inc: true },
        { t: 'Premium gül, kristal bezeg', inc: true },
        { t: 'Iki tamada + milli sazandalar', inc: true },
        { t: 'Doly gün (10+ sagat)', inc: true },
        { t: '2 suratçy + drone', inc: true },
        { t: 'Gelinlik VIP otagy', inc: true },
        { t: 'Myhmanlara transfer', inc: true },
        { t: 'Ähli islegleriňize görä', inc: true },
      ],
      note: 'Ömrüňizdäki iň ýatdan çykmajak toý',
      popular: false, cta: 'Biz bilen Habarlaş',
    },
  ];

  return (
    <>
      {/* ÜSTÜNLIK EKRANY */}
      {successData && (
        <div className="success-overlay visible" data-testid="success-overlay">
          <div className="success-content">
            <div className="success-icon">💍</div>
            <div className="success-title">✦ SORALYŇYZ KABUL EDILDI! ✦</div>
            <div className="success-h2">
              Salam, {successData.name} & {successData.partner}!<br/>
              Geljek bagtly günüňiz üçin indi planlaşdyrmaga başlamak wagty!
            </div>
            <div className="success-details">
              {[
                { label: 'Toý güniňiz:', value: successData.date },
                { label: 'Takmyn myhmansaňyz:', value: successData.guests + ' adam' },
                { label: 'Saýlan zalyňyz:', value: successData.hall },
              ].map((item, i) => (
                <div key={i} className="success-detail-item">
                  <span className="success-detail-label">{item.label}</span>
                  <span className="success-detail-value">{item.value}</span>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Maslahatçymyz <strong style={{ color: 'var(--cream)' }}>{venue.phone}</strong> belgiňize<br/>
              4 sagadyň içinde jaň eder.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              {venue.name} bu möhüm güni bilen birlikde garşy alyp biler!
            </p>
            <button className="success-back" onClick={() => { setSuccessData(null); window.scrollTo({top: 0, behavior: 'smooth'}); }} data-testid="btn-back-home">
              Baş Sahypaja Dolan
            </button>
          </div>
        </div>
      )}

      {/* MOBİL MENÝU */}
      <div className={`mobile-overlay ${mobileOpen ? 'open' : ''}`} data-testid="mobile-menu">
        <button className="mobile-close" onClick={() => setMobileOpen(false)} data-testid="btn-mobile-close">✕</button>
        {['#halls','#services','#gallery','#pricing','#contact'].map((href, i) => {
          const labels = ['Zallarymyz','Hyzmatlar','Galereýa','Bahalar','Habarlaş'];
          return (
            <a key={i} href={href} onClick={() => setMobileOpen(false)} data-testid={`mobile-link-${i}`}>
              {labels[i]}
            </a>
          );
        })}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {venue.telegram && <a href={`https://t.me/${venue.telegram}`} style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>Telegram</a>}
          {venue.instagram && <a href={`https://instagram.com/${venue.instagram}`} style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>Instagram</a>}
        </div>
        <a href={`tel:${venue.phone}`} style={{ color: 'var(--gold2)', fontSize: '1.1rem', marginTop: '0.5rem' }}>{venue.phone}</a>
      </div>

      {/* NAWIGASIÝA */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`} data-testid="navbar">
        <a href="#" className="nav-logo" data-testid="nav-logo">
          {venue.logo ? <img src={venue.logo} alt={venue.name} style={{ height: '2rem', objectFit: 'contain' }} /> : venue.name}
        </a>

        <ul className="nav-links">
          <li><a href="#halls">Zallarymyz</a></li>
          <li><a href="#services">Hyzmatlar</a></li>
          <li><a href="#gallery">Galereýa</a></li>
          <li><a href="#pricing">Bahalar</a></li>
          <li><a href="#contact">Habarlaş</a></li>
        </ul>

        <div className="nav-right">
          <a href={`tel:${venue.phone}`} className="nav-phone" data-testid="nav-phone">📞 {venue.phone}</a>
          <a href="#contact" className="btn-gold" data-testid="btn-nav-book">✦ Bron Et</a>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} data-testid="btn-mobile-open">☰</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home" data-testid="hero">
        <div className="hero-blob-main"></div>
        <div className="hero-blob-right"></div>
        <div className="hero-dots"></div>

        {/* Arabeski bezeg */}
        <ArbesqueSvg className="arabesque-bg" style={{ position: 'absolute', top: '10%', left: '-5%', width: '400px', height: '400px', opacity: 0.05, color: 'var(--gold)' } as React.CSSProperties} />
        <ArbesqueSvg className="arabesque-bg" style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '350px', height: '350px', opacity: 0.05, color: 'var(--gold)' } as React.CSSProperties} />

        {/* Ýüzýän elementler */}
        <div className="hero-float hero-float-1">💍</div>
        <div className="hero-float hero-float-2">🌹</div>

        {/* Geometrik çarçuwalar */}
        <div className="hero-frame" style={{ top: '15%', left: '8%', width: 120, height: 120 }}></div>
        <div className="hero-frame" style={{ bottom: '20%', right: '8%', width: 80, height: 80 }}></div>

        <div className="hero-content">
          <div className="hero-line-top" data-testid="hero-line"></div>

          <div className="hero-badge" style={{ opacity: 1 }} data-testid="hero-badge">
            <span>✦</span> TOÝ MEKANY <span>✦</span>
          </div>

          <h1 className="hero-h1" data-testid="hero-title">
            <span className="line"><span>Arzuwyňyzdaky</span></span>
            <span className="line"><span>toý — biziň</span></span>
            <span className="line"><span>elimizde.</span></span>
          </h1>

          <div className="hero-divider">
            <div className="hero-divider-line"></div>
            <span className="hero-divider-gem">✦</span>
            <div className="hero-divider-line right"></div>
          </div>

          <p className="hero-body" data-testid="hero-body">
            <strong style={{ color: 'var(--cream)' }}>{venue.name}</strong> — {venue.city} şäherinde<br/>
            {venue.events} bagtly toý guramasy.<br/>
            Her jikme-jik biziň elimizde.
          </p>

          <div className="hero-btns">
            <a href="#contact" className="hero-btn primary" data-testid="btn-hero-book">✦ Bron Et</a>
            <a href="#halls" className="hero-btn secondary" data-testid="btn-hero-halls">Zallarymyzy Gör ↓</a>
          </div>

          <div className="hero-stats" data-testid="hero-stats">
            {[
              { value: venue.guests, label: 'Myhmana çenli' },
              { value: venue.halls, label: 'Premium Zal' },
              { value: venue.events, label: 'Toý Çäresi' },
              { value: venue.parking, label: 'Awtoulag Ýeri' },
            ].map((s, i) => (
              <div key={i} className="hero-stats-item" data-testid={`hero-stat-${i}`}>
                <span className="hero-stat-num">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tolkun */}
        <svg className="hero-wave" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="var(--bg)"/>
        </svg>
      </section>

      {/* MAGLUMAT ZOLAGY */}
      <div className="stats-bar" data-testid="stats-bar">
        <div className="stats-grid">
          {[
            { value: venue.guests + '+', label: 'Iň köp myhmany kabul edip bilýäris' },
            { value: venue.halls, label: 'Premium Zal Dürli stilde' },
            { value: venue.events, label: 'Gurulan Toý Geçirdik' },
            { value: venue.parking + '+', label: 'Awtoulag Ýeri Mugt' },
          ].map((s, i) => (
            <AnimatedStat key={i} value={s.value} label={s.label} />
          ))}
        </div>
      </div>

      {/* ZALLAR */}
      <section className="section" id="halls" data-testid="section-halls">
        <ArbesqueSvg style={{ position: 'absolute', top: '5%', right: '2%', width: '300px', height: '300px', color: 'var(--gold)', opacity: 0.04 } as React.CSSProperties} />
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <RevealEl>
            <span className="section-badge">✦ ZALLARYMYZ ✦</span>
            <h2 className="section-title">
              Sizi Garşylaýan<br/>Zallarymyz
            </h2>
            <p className="section-subtitle">
              Her toý özüne has zaly hak edýär.<br/>
              {venue.name}-da her zal bir hekaýa.
            </p>
          </RevealEl>

          <div className="halls-grid cards-row" data-testid="halls-grid">
            {halls.map((hall, i) => (
              <RevealEl key={hall.id} delay={i * 100}>
                <div className="hall-card" style={{ background: hall.bg }} data-testid={`hall-card-${hall.id}`}>
                  <span className="hall-tag">{hall.tag}</span>
                  <span className="hall-emoji">{hall.emoji}</span>
                  <h3 className="hall-name">{hall.name}</h3>
                  <p className="hall-style">{hall.style} · {hall.area}</p>

                  <div className="hall-divider">
                    <div className="hall-divider-line"></div>
                    <span className="hall-divider-gem">✦</span>
                    <div className="hall-divider-line"></div>
                  </div>

                  <div className="hall-info">
                    <div className="hall-info-item">👥 <span>{hall.capacity}+ myhmana çenli</span></div>
                    <div className="hall-info-item">📐 <span>{hall.area}</span></div>
                    <div className="hall-info-item">🏛️ <span>{hall.ceiling}</span></div>
                  </div>

                  <div className="hall-features">
                    {hall.features.map((f, fi) => (
                      <div key={fi} className="hall-feature">
                        <span className="hall-feature-icon">✦</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <span className="hall-price">{hall.priceFrom} TMT</span>
                    <span className="hall-price-label">/ adamdan</span>
                  </div>

                  <a href="#contact" className="hall-cta" data-testid={`btn-hall-${hall.id}`}>
                    Zaly Gör →
                  </a>
                </div>
              </RevealEl>
            ))}
          </div>
        </div>
      </section>

      {/* HYZMATLAR */}
      <section className="section" id="services" style={{ background: 'var(--bg2)' }} data-testid="section-services">
        <ArbesqueSvg style={{ position: 'absolute', top: '5%', left: '2%', width: '280px', height: '280px', color: 'var(--gold)', opacity: 0.04 } as React.CSSProperties} />
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <RevealEl>
            <span className="section-badge">✦ HYZMATLARYMYZ ✦</span>
            <h2 className="section-title">
              Hyzmatlarymyz<br/>
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--gold)' }}>Toýuňyzyň Her Jikme-Jigini Biz Üstlenýäris</span>
            </h2>
          </RevealEl>

          <RevealEl>
            <div className="services-tabs" data-testid="services-tabs">
              {serviceCats.map(cat => (
                <button key={cat.id} className={`service-tab ${activeServiceCat === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveServiceCat(cat.id)} data-testid={`tab-${cat.id}`}>
                  {cat.label}
                </button>
              ))}
            </div>
          </RevealEl>

          <div className="services-grid cards-row" data-testid="services-grid">
            {filteredServices.map((svc, i) => (
              <div key={i} className="service-card" data-testid={`service-card-${i}`}>
                <div className="service-icon-wrap">{svc.icon}</div>
                <h3 className="service-name">{svc.name}</h3>
                <p className="service-desc">{svc.desc}</p>
                <ul className="service-includes">
                  {svc.includes.map((item, ii) => <li key={ii}>{item}</li>)}
                </ul>
                <div className="service-price-note">{svc.priceNote}</div>
                <button className="hall-cta" style={{ marginTop: '1rem' }} data-testid={`btn-service-info-${i}`}>Maglumat Al</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NÄME ÜÇIN BIZ */}
      <section className="section why-section" data-testid="section-why">
        <div className="why-grid">
          <RevealEl>
            <div>
              <span className="section-badge">✦ NÄME ÜÇIN BIZ ✦</span>
              <p className="why-left-tagline">
                Siziň Arzuwyňyz —<br/>Biziň Borjumyz.
              </p>
              <h2 className="why-left-big">
                {venue.founded}-njy ýyldan bäri<br/>
                <span className="gold">{venue.city}-yň Iň Ynamdar</span><br/>
                Toý Mekany.
              </h2>
              <div className="gold-divider">
                <div className="gold-divider-line"></div>
                <span className="gold-divider-gem">✦</span>
                <div className="gold-divider-line"></div>
              </div>
              <p className="why-left-desc">
                {venue.events} bagtly çäre.<br/>
                {venue.guests}+ myhmana çenli.<br/>
                Her toý — özboluşly.<br/>
                Her an — ýatdan çykmajak.
              </p>
            </div>
          </RevealEl>

          <div className="why-features-grid cards-row">
            {[
              { icon: '👑', title: 'Şahsylaşdyrylan Hyzmat', desc: 'Her toý özboluşly — siziň arzuwyňyza görä doly düzülýär.' },
              { icon: '🕐', title: 'Wagtynda Gurnama Kepilligi', desc: 'Toýuňyzyň her bölümi meýilnama görä, wagtynda, kämil derejede taýýar bolýar.' },
              { icon: '🌟', title: 'Tejribeli Hünärmenler Topary', desc: 'Toý gurnagçylary, suratçy, tamada, aşpez — ähli hünärmenler siziň bilen.' },
              { icon: '🔒', title: 'Şertnama we Kepillik', desc: 'Ylalaşylan ähli şertler şertnamada berkidilýär. Üýtgeşmä rugsat ýok.' },
              { icon: '🌹', title: 'Mugt Konsultasiýa', desc: 'Bronlamaňyzdan öň hünärmenimiz bilen mugt maslahat alyp bilersiňiz.' },
              { icon: '🌍', title: 'Dürli Milletden Myhmanlar Üçin', desc: 'Dürli dillerde we medeniýetlerde myhmanlara hyzmat edip bilýäris.' },
            ].map((f, i) => (
              <RevealEl key={i} delay={i * 80}>
                <div className="why-feature" data-testid={`why-feature-${i}`}>
                  <span className="why-feature-icon">{f.icon}</span>
                  <h4 className="why-feature-title">{f.title}</h4>
                  <p className="why-feature-desc">{f.desc}</p>
                </div>
              </RevealEl>
            ))}
          </div>
        </div>
      </section>

      {/* GALEREÝA */}
      <section className="section" id="gallery" style={{ background: 'var(--bg)' }} data-testid="section-gallery">
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <RevealEl>
            <span className="section-badge">✦ GALEREÝA ✦</span>
            <h2 className="section-title">{venue.name}-dan Pursat Şekilleri</h2>
          </RevealEl>

          <div className="gallery-grid" data-testid="gallery-grid">
            {galleryItems.map((item, i) => (
              <div key={i} className={`gallery-item ${item.span}`}
                style={{ background: item.gradient }} data-testid={`gallery-item-${i}`}>
                <div className="gallery-item-inner">
                  <span className="gallery-emoji">{item.emoji}</span>
                  <span className="gallery-label">{item.label}</span>
                </div>
                <div className="gallery-overlay">
                  <span style={{ fontSize: '3.5rem' }}>{item.emoji}</span>
                  <span className="gallery-overlay-text">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÄDIMLER */}
      <section className="section steps-section" data-testid="section-steps">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <RevealEl style={{ textAlign: 'center' } as React.CSSProperties}>
            <span className="section-badge">✦ NÄDIP IŞLEÝÄRIS ✦</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Toýyňyz Nähili Guralýar?<br/>
              <span style={{ fontSize: '0.7em', color: 'var(--text-muted)', fontWeight: 400 }}>4 Sany Ýönekeý Ädim</span>
            </h2>
          </RevealEl>

          <div className="steps-timeline cards-row" data-testid="steps-timeline">
            {[
              { num: '01', emoji: '📞', title: 'Habarlaşyň', desc: 'Biziň bilen telefon ýa-da saýt arkaly habarlaşyň.' },
              { num: '02', emoji: '🤝', title: 'Duşuşyk', desc: 'Hünärmen maslahatçymyz bilen ýüzbe-ýüz duşuşyň.' },
              { num: '03', emoji: '📋', title: 'Meýilleşdiriň', desc: 'Doly programmany bile düzeris. Hiç zat gaçmaz.' },
              { num: '04', emoji: '💍', title: 'Toýuňuz!', desc: 'Siz diňe lezzet alarsyňyz — biz üstlenýäris.' },
            ].map((step, i) => (
              <RevealEl key={i} delay={i * 150}>
                <div className="step-item" data-testid={`step-${i}`}>
                  <span className="step-num">{step.num}</span>
                  <div className="step-dot"></div>
                  <span className="step-emoji">{step.emoji}</span>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </RevealEl>
            ))}
          </div>
        </div>
      </section>

      {/* ŞAÝATLYKLAR */}
      <section className="section testimonials-section" style={{ background: 'var(--bg2)' }} data-testid="section-testimonials">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <RevealEl style={{ textAlign: 'center' } as React.CSSProperties}>
            <span className="section-badge">✦ ŞAÝATLYKLAR ✦</span>
            <h2 className="section-title" style={{ textAlign: 'center', fontStyle: 'italic' }}>
              Olaryň Söýgisi —<br/>Biziň Buýsanjymyz.
            </h2>
          </RevealEl>

          <div className="carousel-wrap" data-testid="carousel">
            <div className="carousel-track">
              <div className="testimonial-card active" data-testid="testimonial-card">
                <div className="testimonial-quote-bg">"</div>
                <div className="testimonial-stars">
                  {Array(t.rating).fill(0).map((_, i) => <span key={i} className="testimonial-star">★</span>)}
                </div>
                <p className="testimonial-text">
                  "{t.quote.replace(/{name}/g, venue.name)}"
                </p>
                <div className="testimonial-info">
                  <div className="testimonial-couple">
                    {t.groom} & {t.bride}
                    <span>{t.year} · {t.hall} · {t.guests} myhmany</span>
                  </div>
                  <span className="testimonial-badge">{t.highlight}</span>
                </div>
              </div>
            </div>

            <div className="carousel-nav" data-testid="carousel-nav">
              <button className="carousel-btn" onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)} data-testid="btn-carousel-prev">←</button>
              <div className="carousel-dots">
                {testimonials.map((_, i) => (
                  <button key={i} className={`carousel-dot ${i === testimonialIdx ? 'active' : ''}`}
                    onClick={() => setTestimonialIdx(i)} data-testid={`carousel-dot-${i}`} />
                ))}
              </div>
              <button className="carousel-btn" onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)} data-testid="btn-carousel-next">→</button>
            </div>
          </div>
        </div>
      </section>

      {/* BAHALAR */}
      <section className="section" id="pricing" style={{ background: 'var(--bg)' }} data-testid="section-pricing">
        <ArbesqueSvg style={{ position: 'absolute', top: '5%', right: '2%', width: '300px', height: '300px', color: 'var(--gold)', opacity: 0.04 } as React.CSSProperties} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <RevealEl style={{ textAlign: 'center' } as React.CSSProperties}>
            <span className="section-badge">✦ BAHALAR ✦</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Arzuwyňyza Laýyk Baha
            </h2>
            <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
              Hemmesi şertnamada berkidilýär. Goşmaça töleg ýok.
            </p>
          </RevealEl>

          <div className="pricing-grid cards-row" data-testid="pricing-grid">
            {packages.map((pkg, i) => (
              <RevealEl key={i} delay={i * 100}>
                <div className={`pricing-card ${pkg.popular ? 'popular' : ''}`} data-testid={`pricing-card-${i}`}>
                  {pkg.popular && <div className="pricing-badge">{pkg.badge}</div>}
                  {!pkg.popular && (
                    <div style={{ fontSize: '0.65rem', fontFamily: 'Cinzel, serif', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      {pkg.badge}
                    </div>
                  )}
                  <h3 className="pricing-name">{pkg.name}</h3>
                  {pkg.pricePerPerson ? (
                    <>
                      <div className="pricing-price">{pkg.pricePerPerson} TMT</div>
                      <span className="pricing-price-sub">/ adamdan başlaýar</span>
                    </>
                  ) : (
                    <>
                      <div className="pricing-price" style={{ fontSize: '1.4rem' }}>{pkg.priceNote}</div>
                      <span className="pricing-price-sub">&nbsp;</span>
                    </>
                  )}
                  <ul className="pricing-features">
                    {pkg.features.map((f, fi) => (
                      <li key={fi} className={f.inc ? 'included' : 'excluded'}>
                        <span className="pf-icon">{f.inc ? '✦' : '✗'}</span>
                        <span>{f.t}</span>
                      </li>
                    ))}
                  </ul>
                  {pkg.pricePerPerson && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Min. {pkg.minGuests * pkg.pricePerPerson} TMT-dan başlaýar
                    </p>
                  )}
                  <a href="#contact" className={`pricing-cta ${pkg.popular ? 'gold' : 'outline'}`} data-testid={`btn-pricing-${i}`}>
                    {pkg.cta}
                  </a>
                  <p className="pricing-note">{pkg.note}</p>
                </div>
              </RevealEl>
            ))}
          </div>

          {/* KALKULÝATOR */}
          <RevealEl>
            <div className="calc-section" data-testid="calc-section">
              <h3 className="calc-title">Takmyn Baha Hasapla</h3>

              <label className="calc-label">MYHMAN SANY: {calcGuests} Adam</label>
              <input type="range" min="50" max={parseInt(venue.guests)} value={calcGuests}
                onChange={e => setCalcGuests(parseInt(e.target.value))}
                className="calc-slider" data-testid="calc-slider" />

              <label className="calc-label">PAKET SAÝLA</label>
              <div className="calc-packages">
                {[
                  { id: 'bashlangyc', label: 'Başlangyç' },
                  { id: 'premium', label: 'Premium' },
                  { id: 'lyuks', label: 'Lýuks' },
                ].map(p => (
                  <button key={p.id} className={`calc-pkg ${calcPkg === p.id ? 'active' : ''}`}
                    onClick={() => setCalcPkg(p.id)} data-testid={`btn-calc-pkg-${p.id}`}>
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="calc-result" data-testid="calc-result">
                <span className="calc-result-label">Takmyn Jemi Baha</span>
                <div className="calc-result-value">{calcResult}</div>
              </div>
            </div>
          </RevealEl>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg2)' }} data-testid="section-faq">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <RevealEl style={{ textAlign: 'center' } as React.CSSProperties}>
            <span className="section-badge">✦ SORAGLAR ✦</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Köpden Soralýan Soraglar</h2>
          </RevealEl>

          <div className="faq-list" data-testid="faq-list">
            {faqs.map((faq, i) => (
              <RevealEl key={i} delay={i * 50}>
                <div className={`faq-item ${openFaq === i ? 'open' : ''}`} data-testid={`faq-item-${i}`}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)} data-testid={`btn-faq-${i}`}>
                    <span>{faq.q.replace(/\[VENUE\.\w+\]/g, (m) => {
                      if (m === '[VENUE.name]') return venue.name;
                      if (m === '[VENUE.guests]') return venue.guests;
                      return m;
                    })}</span>
                    <span className="faq-icon">+</span>
                  </button>
                  <div className="faq-answer">{faq.a}</div>
                </div>
              </RevealEl>
            ))}
          </div>
        </div>
      </section>

      {/* HABARLAŞMAK */}
      <section className="section contact-section" id="contact" data-testid="section-contact">
        <ArbesqueSvg style={{ position: 'absolute', bottom: '5%', left: '2%', width: '280px', height: '280px', color: 'var(--gold)', opacity: 0.04 } as React.CSSProperties} />
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <RevealEl>
            <span className="section-badge">✦ HABARLAŞ ✦</span>
            <h2 className="section-title">
              Toýuňyzy Meýilleşdirmäge<br/>Başlalyň
            </h2>
            <p className="section-subtitle">
              Formy dolduryň — 4 sagadyň içinde<br/>maslahatçymyz siz bilen habarlaşar.
            </p>
          </RevealEl>

          <div className="contact-grid" data-testid="contact-grid">
            <RevealEl>
              <div>
                <h3 className="contact-info-title">Biziň Bilen Habarlaşyň</h3>

                {[
                  { icon: '📞', content: <a href={`tel:${venue.phone}`}>{venue.phone}</a> },
                  ...(venue.phone2 ? [{ icon: '📞', content: <a href={`tel:${venue.phone2}`}>{venue.phone2}</a> }] : []),
                  { icon: '📍', content: <span>{venue.address}, {venue.city}</span> },
                  { icon: '⏰', content: <span>Iş wagty: 09:00 – 20:00 (her gün)</span> },
                  ...(venue.telegram ? [{ icon: '📱', content: <a href={`https://t.me/${venue.telegram}`} target="_blank" rel="noreferrer">@{venue.telegram}</a> }] : []),
                  ...(venue.instagram ? [{ icon: '📸', content: <a href={`https://instagram.com/${venue.instagram}`} target="_blank" rel="noreferrer">@{venue.instagram}</a> }] : []),
                ].map((item, i) => (
                  <div key={i} className="contact-info-item" data-testid={`contact-info-${i}`}>
                    <span className="contact-info-icon">{item.icon}</span>
                    <div className="contact-info-text">{item.content}</div>
                  </div>
                ))}

                <div className="gold-divider">
                  <div className="gold-divider-line"></div>
                  <span className="gold-divider-gem">✦</span>
                  <div className="gold-divider-line"></div>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Biziň bilen habarlaşmagyň iň çalt usuly:
                </p>

                <div className="contact-social-btns">
                  {venue.telegram && (
                    <a href={`https://t.me/${venue.telegram}`} className="social-btn" target="_blank" rel="noreferrer" data-testid="btn-telegram">
                      📱 Telegram arkaly ýaz
                    </a>
                  )}
                  <a href={`tel:${venue.phone}`} className="social-btn" data-testid="btn-call">
                    📞 Jaň et: {venue.phone}
                  </a>
                </div>
              </div>
            </RevealEl>

            <RevealEl delay={200}>
              <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
                <h3 className="form-title">Bron Soragyňyz</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Adyňyz *</label>
                    <input type="text" required className="form-input" placeholder="Adyňyz"
                      value={formData.name} onChange={e => setFormData(d => ({...d, name: e.target.value}))}
                      data-testid="input-name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hyzmatdaşyňyzyň ady *</label>
                    <input type="text" required className="form-input" placeholder="Hyzmatdaşyňyzyň ady"
                      value={formData.partner} onChange={e => setFormData(d => ({...d, partner: e.target.value}))}
                      data-testid="input-partner" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Telefon belgiňiz *</label>
                    <input type="tel" required className="form-input" placeholder="+993 ..."
                      value={formData.phone} onChange={e => setFormData(d => ({...d, phone: e.target.value}))}
                      data-testid="input-phone" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-poçtaňyz</label>
                    <input type="email" className="form-input" placeholder="email@example.com"
                      value={formData.email} onChange={e => setFormData(d => ({...d, email: e.target.value}))}
                      data-testid="input-email" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Toýuň takmynan güni *</label>
                    <input type="date" required className="form-input" min={minDate}
                      value={formData.date} onChange={e => setFormData(d => ({...d, date: e.target.value}))}
                      data-testid="input-date" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Myhmanlaryň sany *</label>
                    <input type="number" required className="form-input" min="50" max={venue.guests}
                      placeholder="Min: 50" value={formData.guests} onChange={handleGuestsChange}
                      data-testid="input-guests" />
                    {formPriceHint && <div className="form-price-hint">{formPriceHint}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Haýsy zal gyzyklandyrýar? *</label>
                  <div className="form-halls-grid" data-testid="halls-select-grid">
                    {halls.map(hall => (
                      <button type="button" key={hall.id}
                        className={`form-hall-option ${selectedHall === hall.name ? 'selected' : ''}`}
                        onClick={() => setSelectedHall(hall.name)}
                        data-testid={`btn-select-hall-${hall.id}`}>
                        {hall.emoji} {hall.name}
                      </button>
                    ))}
                    <button type="button"
                      className={`form-hall-option ${selectedHall === 'Heniz bilmedim' ? 'selected' : ''}`}
                      onClick={() => setSelectedHall('Heniz bilmedim')}
                      data-testid="btn-select-hall-unknown">
                      ❓ Heniz bilmedim
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Haýsy paket? *</label>
                  <div className="form-halls-grid">
                    {['Başlangyç','Premium','Lýuks','Heniz bilmedim'].map(pkg => (
                      <button type="button" key={pkg}
                        className={`form-hall-option ${formData.package === pkg ? 'selected' : ''}`}
                        onClick={() => setFormData(d => ({...d, package: pkg}))}
                        data-testid={`btn-select-pkg-${pkg}`}>
                        {pkg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Bize Aýratyn Islekleriňiz</label>
                  <textarea className="form-textarea" rows={4} placeholder="Islekleriňizi ýazyň..."
                    value={formData.notes} onChange={e => setFormData(d => ({...d, notes: e.target.value}))}
                    data-testid="input-notes" />
                </div>

                <div className="form-group">
                  <label className="form-label">Sizi nähili tapdyňyz?</label>
                  <select className="form-select" value={formData.source}
                    onChange={e => setFormData(d => ({...d, source: e.target.value}))}
                    data-testid="select-source">
                    <option value="">Saýlaň...</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Telegram">Telegram</option>
                    <option value="Dost maslahat">Dost maslahat</option>
                    <option value="Google">Google</option>
                    <option value="Başga">Başga</option>
                  </select>
                </div>

                <button type="button" className="form-extras-toggle" onClick={() => setShowExtras(v => !v)} data-testid="btn-toggle-extras">
                  {showExtras ? '−' : '+'} Goşmaça soraglar
                </button>

                <div className={`form-extras ${showExtras ? 'visible' : ''}`} data-testid="form-extras">
                  <div className="form-group">
                    <label className="form-checkbox-label">
                      <input type="checkbox" checked={formData.foreignGuests}
                        onChange={e => setFormData(d => ({...d, foreignGuests: e.target.checked}))}
                        data-testid="check-foreign-guests" />
                      Daşary ýurtly myhmanym bar
                    </label>
                    <label className="form-checkbox-label">
                      <input type="checkbox" checked={formData.ownPhoto}
                        onChange={e => setFormData(d => ({...d, ownPhoto: e.target.checked}))}
                        data-testid="check-own-photo" />
                      Öz suratçym bar
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Özboluşly isleg ýa-da sorag</label>
                    <textarea className="form-textarea" rows={3}
                      value={formData.specialNote}
                      onChange={e => setFormData(d => ({...d, specialNote: e.target.value}))}
                      data-testid="input-special-note" />
                  </div>
                </div>

                <button type="submit" className="form-submit" data-testid="btn-submit-form">
                  ✦&nbsp;&nbsp;Bron Soragyny Iber&nbsp;&nbsp;✦
                </button>
              </form>
            </RevealEl>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" data-testid="footer">
        <ArbesqueSvg style={{ position: 'absolute', top: '-20px', right: '5%', width: '300px', height: '300px', color: 'var(--gold)', opacity: 0.04 } as React.CSSProperties} />

        <div className="footer-grid">
          <div>
            <div className="footer-brand">{venue.name}</div>
            <p className="footer-tagline">{venue.tagline}</p>
            <div className="gold-divider" style={{ marginBottom: '1rem' }}>
              <div className="gold-divider-line"></div>
              <span className="gold-divider-gem">✦</span>
              <div className="gold-divider-line"></div>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} {venue.name}. Ähli hukuklar goragly.</p>
          </div>

          <div>
            <h4 className="footer-heading">Nawigasiýa</h4>
            <ul className="footer-links">
              {[['#home','Baş Sahypa'],['#halls','Zallarymyz'],['#services','Hyzmatlar'],['#gallery','Galereýa'],['#pricing','Bahalar'],['#contact','Habarlaş']].map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Habarlaş</h4>
            <div className="footer-contact-item">
              <span>📞</span>
              <div><a href={`tel:${venue.phone}`}>{venue.phone}</a></div>
            </div>
            {venue.phone2 && (
              <div className="footer-contact-item">
                <span>📞</span>
                <div><a href={`tel:${venue.phone2}`}>{venue.phone2}</a></div>
              </div>
            )}
            <div className="footer-contact-item">
              <span>📍</span>
              <div>{venue.address}</div>
            </div>
            <div className="footer-contact-item">
              <span>🏙️</span>
              <div>{venue.city}</div>
            </div>
            {venue.telegram && (
              <div className="footer-contact-item">
                <span>📱</span>
                <div><a href={`https://t.me/${venue.telegram}`} target="_blank" rel="noreferrer">Telegram</a></div>
              </div>
            )}
            {venue.instagram && (
              <div className="footer-contact-item">
                <span>📸</span>
                <div><a href={`https://instagram.com/${venue.instagram}`} target="_blank" rel="noreferrer">Instagram</a></div>
              </div>
            )}
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom" data-testid="footer-bottom">
          <span>{venue.name} — {venue.city} · {new Date().getFullYear()}</span>
          <span className="footer-credit">
            Bu saýt 🛠️ <a href="https://yenil.ru" target="_blank" rel="noreferrer">Ýeňil Web Agentligi</a> tarapyndan döredildi
          </span>
        </div>
      </footer>
    </>
  );
}
