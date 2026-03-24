import { Search, Home, MapPin, BadgePercent, Briefcase, Smile } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SearchWidget from './SearchWidget';

const mainDestinations = [
  {
    id: 1,
    name: 'Singapura',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Tóquio',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Seul',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=800&auto=format&fit=crop',
  },
];

const hkMacau = [
  {
    id: 1,
    name: 'Hong Kong',
    image: 'https://images.unsplash.com/photo-1506974288075-813c9e9d67e6?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Macau',
    image: 'https://images.unsplash.com/photo-1584281722888-295096b7975c?q=80&w=600&auto=format&fit=crop',
  },
];

const taiwan = [
  {
    id: 1,
    name: 'Taipé',
    image: 'https://images.unsplash.com/photo-1552993873-0dd1110e025f?q=80&w=600&auto=format&fit=crop',
  }
];

export default function DesktopHome() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#003DA5] tracking-tight">TravelJoy</div>
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-[#003DA5] font-medium transition-colors">
              <Home className="w-5 h-5" /> Início
            </a>
            <a href="#" className="flex items-center gap-2 text-[#003DA5] font-medium transition-colors">
              <MapPin className="w-5 h-5" /> Destinos
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-[#003DA5] font-medium transition-colors">
              <BadgePercent className="w-5 h-5" /> Ofertas
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-[#003DA5] font-medium transition-colors">
              <Briefcase className="w-5 h-5" /> Viagens
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-700 hover:text-[#003DA5] font-medium transition-colors">
              <Smile className="w-5 h-5" /> Conta
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center mt-20">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Hero Tropical" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white"></div>
        
        <div className="relative z-10 w-full max-w-4xl px-8 text-center -mt-20">
          <h1 className="text-white text-6xl font-bold mb-10 drop-shadow-lg tracking-tight">
            Onde você encontrará alegria?
          </h1>
          
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center bg-white rounded-full px-6 py-4 shadow-xl max-w-3xl mx-auto cursor-pointer"
          >
            <Search className="w-6 h-6 text-gray-400 mr-4 shrink-0" />
            <div className="w-full text-lg text-gray-400 text-left">
              Buscar destinos, atividades ou passeios
            </div>
            <button className="bg-[#003DA5] text-white px-8 py-3 rounded-full font-semibold ml-4 hover:bg-[#005bb5] transition-colors shrink-0">
              Buscar
            </button>
          </div>
        </div>

        {/* Search Widget Overlapping */}
        <AnimatePresence>
          {isSearchOpen && <SearchWidget onClose={() => setIsSearchOpen(false)} />}
        </AnimatePresence>
      </div>

      {/* Main Destinations (Overlapping Hero) */}
      <div className="max-w-7xl mx-auto px-8 -mt-32 relative z-20">
        <div className="grid grid-cols-3 gap-8">
          {mainDestinations.map(dest => (
            <div key={dest.id} className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl group cursor-pointer">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <span className="absolute bottom-8 left-8 text-white font-bold text-3xl tracking-wide">{dest.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-8 mt-20">
        <div className="flex gap-12 border-b border-gray-200">
          <button className="py-4 text-[#003DA5] font-semibold text-lg border-b-[3px] border-[#003DA5]">
            Leste Asiático
          </button>
          <button className="py-4 text-gray-500 font-medium text-lg hover:text-gray-900 transition-colors">
            Sudeste Asiático
          </button>
          <button className="py-4 text-gray-500 font-medium text-lg hover:text-gray-900 transition-colors">
            Sul da Ásia / Oriente Médio
          </button>
        </div>
      </div>

      {/* Section: Hong Kong & Macau */}
      <div className="max-w-7xl mx-auto px-8 mt-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Hong Kong & Macau</h2>
          <a href="#" className="text-lg text-gray-800 underline font-medium hover:text-[#003DA5] transition-colors">Explorar</a>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {hkMacau.map(dest => (
            <div key={dest.id} className="relative h-[220px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <span className="absolute bottom-5 left-5 text-white font-bold text-xl">{dest.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Taiwan */}
      <div className="max-w-7xl mx-auto px-8 mt-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Taiwan</h2>
          <a href="#" className="text-lg text-gray-800 underline font-medium hover:text-[#003DA5] transition-colors">Explorar</a>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {taiwan.map(dest => (
            <div key={dest.id} className="relative h-[220px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <span className="absolute bottom-5 left-5 text-white font-bold text-xl">{dest.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
