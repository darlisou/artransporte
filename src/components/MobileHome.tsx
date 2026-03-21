import { Search, ChevronLeft, Bell, Flame, Calendar, SlidersHorizontal, MapPin, Home, Heart, User, Calendar as CalendarIcon, Compass, Ship, Truck, MessageCircle, Wifi, Utensils, PawPrint, Wind, Refrigerator, BedDouble, Bed, Bath, Diamond, Zap, Anchor, Menu, HelpCircle, Info, Settings, Globe, Palette, ChevronRight, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SearchWidget from './SearchWidget';
import ViagensScreen from './ViagensScreen';
import Navbar from './Navbar';
import NossasParadas from './NossasParadas';
import FreteNaval from './FreteNaval';

const heroSlides = [
  {
    id: 1,
    title: 'Amazônia',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop',
    date: '23 Dez - 6 Jan',
    type: 'Aventura + Natureza'
  },
  {
    id: 2,
    title: 'Rio de Janeiro',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=800&auto=format&fit=crop',
    date: '10 Fev - 20 Fev',
    type: 'Praia + Diversão'
  },
  {
    id: 3,
    title: 'Fernando de Noronha',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800&auto=format&fit=crop',
    date: '15 Jul - 30 Jul',
    type: 'Férias + Relax'
  },
  {
    id: 4,
    title: 'Lençóis Maranhenses',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=800&auto=format&fit=crop',
    date: '05 Ago - 12 Ago',
    type: 'Viagens + Paisagens'
  }
];

const accommodations = [
  {
    id: 1,
    title: 'Rede',
    subtitle: 'Traga sua própria rede e aproveite a brisa',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
    tier: 'bronze',
    icons: [Wind]
  },
  {
    id: 2,
    title: 'Camarote',
    subtitle: '2 Beliches, Ar-condicionado e Frigobar (Banheiro compartilhado)',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop',
    tier: 'silver',
    icons: [Bed, Wind, Refrigerator]
  },
  {
    id: 3,
    title: 'Suíte Simples',
    subtitle: 'Privacidade total com banheiro privativo, Ar e frigobar',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
    tier: 'gold',
    icons: [Bath, Wind, Refrigerator]
  },
  {
    id: 4,
    title: 'Suíte Master',
    subtitle: 'O ápice do conforto: Cama de casal, Ar e exclusividade',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    tier: 'diamond',
    icons: [BedDouble, Wind]
  }
];

const frotaItems = [
  {
    id: 1,
    title: "N/M 'Amazon Star'",
    subtitle: "A viagem mais rápida da região. Ganhe tempo com velocidade e tecnologia.",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop",
    tag: "Veloz",
    Icon: Zap,
    iconColor: "text-[#FF9500]"
  },
  {
    id: 2,
    title: "F/B 'Catamarã Rondônia'",
    subtitle: "O gigante dos rios. Espaço, estabilidade e a tradição de uma viagem clássica.",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?q=80&w=800&auto=format&fit=crop",
    tag: "Clássico",
    Icon: Anchor,
    iconColor: "text-[#007AFF]"
  }
];

import InfiniteStackDeck from './InfiniteStackDeck';

export default function MobileHome() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isViagensOpen, setIsViagensOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen font-sans relative overflow-x-hidden w-full max-w-full"
      style={{ paddingBottom: 'calc(120px + env(safe-area-inset-bottom))', backgroundColor: 'var(--bg-primary)' }}
    >
      <Navbar onOpenViagens={() => setIsViagensOpen(true)} />
      {/* Hero Section */}
      <div id="hero" className="relative h-[calc(35vh-10px)] md:h-[50vh] min-h-[320px] rounded-b-[40px] md:rounded-b-[60px] overflow-hidden shadow-sm bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -50) {
                setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
              } else if (offset.x > 50) {
                setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
              }
            }}
          >
            {/* Background Image */}
            <img 
              src={heroSlides[currentSlide].image} 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
              alt={heroSlides[currentSlide].title} 
            />
            {/* Protective Gradient for Navbar */}
            <div className="absolute top-0 left-0 right-0 h-[140px] bg-gradient-to-b from-[rgba(0,0,0,0.55)] to-transparent pointer-events-none z-10"></div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>

            {/* Bottom Content (Title only) */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-12 z-10 flex flex-col gap-1 md:gap-3 max-w-7xl mx-auto pointer-events-none">
              {/* Top Destinations */}
              <div className="flex items-center gap-1.5 md:gap-2 text-white/90">
                <Flame className="w-3.5 h-3.5 md:w-5 md:h-5 text-white fill-white" />
                <span className="text-[11px] md:text-[14px] font-medium tracking-wide">Principais Destinos</span>
              </div>

              {/* Title */}
              <h1 className="text-white text-[32px] md:text-[64px] font-semibold leading-none tracking-tight">
                {heroSlides[currentSlide].title}
              </h1>

              {/* Details Row */}
              <div className="flex items-center gap-2 md:gap-4 text-white/80 text-[11px] md:text-[16px] font-medium mb-2 md:mb-4">
                <Calendar className="w-3.5 h-3.5 md:w-5 md:h-5" />
                <span>{heroSlides[currentSlide].date}</span>
                <span className="text-[10px] md:text-[14px]">•</span>
                <span>{heroSlides[currentSlide].type}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Search Bar (Moved out of hero, taking the 10% space) */}
      <div id="reservar" className="hero-search px-[34px] md:px-12 relative z-20 max-w-3xl mx-auto">
        <div 
          id="booking-form"
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center justify-between backdrop-blur-[24px] rounded-[100px] px-[15px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] cursor-pointer h-[59px] transition-all duration-100 ease-in-out active:scale-[0.98]"
          style={{ 
            WebkitBackdropFilter: 'blur(24px)',
            background: 'var(--bg-search)',
            border: '1px solid var(--border-color)'
          }}
        >
          <div className="flex flex-col gap-[2px]">
            <span className="text-[15px] font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>Para onde?</span>
            <span className="text-[12px] leading-tight" style={{ color: 'var(--text-secondary)' }}>Qualquer lugar • Qualquer data</span>
          </div>
          <Compass className="w-[20px] h-[20px]" style={{ color: 'var(--text-primary)' }} />
        </div>
      </div>

      <NossasParadas />

      {/* Accommodations */}
      <div id="acomodacoes" className="mt-0 md:mt-16 max-w-7xl mx-auto px-8 md:px-12 xl:px-0">
        <div className="flex justify-between items-end mb-[32px] md:mb-[40px]">
          <h2 className="text-[28px] font-[800] md:font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }} data-animate>Acomodações</h2>
          <button className="text-[13px] md:text-[16px] text-[#007AFF] font-medium hover:underline m-0 p-0 text-right">Ver Tudo</button>
        </div>
        
        <InfiniteStackDeck items={accommodations} />
      </div>

      {/* Services */}
      <div id="frete" className="mt-8 md:mt-12 max-w-7xl mx-auto px-6 md:px-12 xl:px-0">
        <h2 className="text-[28px] font-[800] md:font-semibold tracking-tight mb-5 md:mb-8" style={{ color: 'var(--text-primary)' }} data-animate>Serviços</h2>
        <div className="grid grid-cols-4 md:grid-cols-3 gap-[10px] md:gap-3 justify-center md:justify-start mx-auto md:mx-0 w-fit md:w-full">
          <div className="aspect-square w-[68px] md:w-full rounded-[16px] md:rounded-[22px] md:p-[32px_24px] md:gap-[12px] flex flex-col items-center justify-center shadow-md border-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ background: 'var(--bg-secondary)' }} data-animate>
            <Wifi className="w-7 h-7 md:w-[36px] md:h-[36px] opacity-75" strokeWidth={2} style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="aspect-square w-[68px] md:w-full rounded-[16px] md:rounded-[22px] md:p-[32px_24px] md:gap-[12px] flex flex-col items-center justify-center shadow-md border-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ background: 'var(--bg-secondary)' }} data-animate>
            <Utensils className="w-7 h-7 md:w-[36px] md:h-[36px] opacity-75" strokeWidth={2} style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="aspect-square w-[68px] md:w-full rounded-[16px] md:rounded-[22px] md:p-[32px_24px] md:gap-[12px] flex flex-col items-center justify-center shadow-md border-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ background: 'var(--bg-secondary)' }} data-animate>
            <PawPrint className="w-7 h-7 md:w-[36px] md:h-[36px] opacity-75" strokeWidth={2} style={{ color: 'var(--text-primary)' }} />
          </div>
          <div className="aspect-square w-[68px] md:hidden rounded-[16px] flex flex-col items-center justify-center shadow-md border-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ background: 'var(--bg-secondary)' }} data-animate>
            <Anchor className="w-7 h-7 opacity-75" strokeWidth={2} style={{ color: 'var(--text-primary)' }} />
          </div>
        </div>
      </div>

      {/* Nossa Frota */}
      <div className="mt-8 md:mt-12 max-w-7xl mx-auto px-[15px] md:px-12 xl:px-0">
        <h2 className="text-[28px] font-[800] md:font-semibold tracking-tight mb-5 md:mb-8" style={{ color: 'var(--text-primary)' }} data-animate>Nossa Frota</h2>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-[12px]">
          {frotaItems.map((item) => (
            <div key={item.id} className="fleet-card relative rounded-[20px] overflow-hidden h-[260px] cursor-pointer shadow-[0_4px_20px_rgba(0,122,255,0.15)] active:scale-[0.97] group" data-animate>
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute top-[14px] left-[14px] flex items-center gap-1.5 px-[12px] py-[5px] rounded-[100px] bg-[rgba(255,255,255,0.25)] border border-[rgba(255,255,255,0.4)]" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                <item.Icon className={`w-3.5 h-3.5 ${item.iconColor}`} fill="currentColor" />
                <span className="text-[#1C1C1E] text-[12px] font-semibold">{item.tag}</span>
              </div>
              <div className="absolute bottom-[16px] left-[16px] right-[16px] flex flex-col">
                <h3 className="text-white font-bold text-[15px] leading-tight">{item.title}</h3>
                <p className="text-[rgba(255,255,255,0.78)] font-normal text-[12px] mt-[3px] leading-snug">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden w-full pb-[24px]">
          <div className="grid grid-cols-2 gap-[15px]">
            {frotaItems.map((item) => (
              <div 
                key={item.id} 
                className="fleet-card relative rounded-[16px] overflow-hidden h-[200px] cursor-pointer shadow-[0_4px_20px_rgba(0,122,255,0.15)]"
                data-animate
              >
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute top-[12px] left-[12px] flex items-center gap-1 px-[10px] py-[4px] rounded-[100px] bg-[rgba(255,255,255,0.25)] border border-[rgba(255,255,255,0.4)]" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
                  <item.Icon className={`w-3 h-3 ${item.iconColor}`} fill="currentColor" />
                  <span className="text-[#1C1C1E] text-[10px] font-semibold">{item.tag}</span>
                </div>
                <div className="absolute bottom-[12px] left-[12px] right-[12px] flex flex-col">
                  <h3 className="text-white font-bold text-[14px] leading-tight">{item.title}</h3>
                  <p className="text-[rgba(255,255,255,0.78)] font-normal text-[11px] mt-[2px] leading-snug line-clamp-2">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FreteNaval />

      {/* Search Widget Overlapping */}
      <AnimatePresence>
        {isSearchOpen && <SearchWidget onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>

      {/* Viagens Screen */}
      <AnimatePresence>
        {isViagensOpen && <ViagensScreen onClose={() => setIsViagensOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
