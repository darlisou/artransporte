import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Bell, Ship, ArrowRight, ChevronRight, Clock, Calendar, DollarSign, Zap, Anchor, Wifi, Utensils, Wind, BedDouble, Bath } from 'lucide-react';

type Tab = 'minhas-viagens' | 'rotas' | 'frota';

const rotas = [
  { id: 1, origem: 'Santarém', destino: 'Belém', duracao: '36 horas', frequencia: 'Seg/Qua/Sex', preco: 'R$ 280' },
  { id: 2, origem: 'Belém', destino: 'Santarém', duracao: '36 horas', frequencia: 'Ter/Qui/Sáb', preco: 'R$ 280' },
  { id: 3, origem: 'Manaus', destino: 'Itaituba', duracao: '48 horas', frequencia: 'Dom/Qua', preco: 'R$ 350' },
  { id: 4, origem: 'Santarém', destino: 'Manaus', duracao: '52 horas', frequencia: 'Sex', preco: 'R$ 420' },
];

const frota = [
  {
    id: 1,
    nome: "N/M 'Amazon Star'",
    tag: 'Veloz',
    tagColor: 'text-[#FF9500]',
    TagIcon: Zap,
    subtitulo: 'A viagem mais rápida da região',
    imagens: [
      'https://i.postimg.cc/PxPPqhVN/Image-202602250115.jpg',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      capacidade: '500 passageiros',
      velocidade: '25 nós',
      ano: '2020',
      comprimento: '85m'
    }
  },
  {
    id: 2,
    nome: "F/B 'Catamarã Rondônia'",
    tag: 'Clássico',
    tagColor: 'text-[#007AFF]',
    TagIcon: Anchor,
    subtitulo: 'O gigante dos rios',
    imagens: [
      'http://macamazon.com.br/wp-content/uploads/2025/04/WhatsApp-Image-2024-02-15-at-16.53.41.jpeg',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
    ],
    specs: {
      capacidade: '800 passageiros',
      velocidade: '18 nós',
      ano: '2015',
      comprimento: '110m'
    }
  }
];

export default function ViagensScreen({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('minhas-viagens');
  const [hasViagens, setHasViagens] = useState(false); // Toggle this to see empty state vs list
  const [scrolled, setScrolled] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<number, number>>({ 1: 0, 2: 0 });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 20);
  };

  const handleImageScroll = (e: React.UIEvent<HTMLDivElement>, navioId: number) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveImageIndex(prev => ({ ...prev, [navioId]: index }));
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="fixed inset-0 z-[1000] overflow-y-auto"
      style={{ backgroundColor: 'var(--bg-primary)' }}
      onScroll={handleScroll}
    >
      {/* NavBar */}
      <div 
        className={`sticky top-0 z-50 px-4 pt-[env(safe-area-inset-top)] pb-2 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'bg-[rgba(240,238,233,0.8)] backdrop-blur-[20px] shadow-sm' : 'bg-transparent'
        }`}
      >
        <button onClick={onClose} className="w-11 h-11 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors active:scale-95">
          <ChevronLeft className="w-7 h-7 text-[#1C1C1E]" />
        </button>
        <h1 className="text-[34px] font-bold text-[#1C1C1E] tracking-tight">Viagens</h1>
        <button className="w-11 h-11 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors active:scale-95">
          <Bell className="w-6 h-6 text-[#1C1C1E]" />
        </button>
      </div>

      {/* Segmented Control */}
      <div className="sticky top-[calc(60px+env(safe-area-inset-top))] z-40 px-4 py-4 bg-[#FAFAF5]">
        <div 
          className="relative flex items-center p-1 rounded-[12px] h-[36px] bg-[rgba(255,255,255,0.25)] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.5)] md:max-w-[400px] md:mx-auto"
          style={{ backdropFilter: 'blur(24px) saturate(170%)', WebkitBackdropFilter: 'blur(24px) saturate(170%)' }}
        >
          {/* Animated Background Indicator */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-[10px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            initial={false}
            animate={{
              left: activeTab === 'minhas-viagens' ? '4px' : activeTab === 'rotas' ? '33.33%' : '66.66%',
              width: 'calc(33.33% - 5px)'
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />

          <button 
            onClick={() => setActiveTab('minhas-viagens')}
            className={`relative z-10 flex-1 flex items-center justify-center text-[15px] transition-colors duration-300 ${activeTab === 'minhas-viagens' ? 'text-[#007AFF] font-semibold' : 'text-[#3C3C43] font-normal'}`}
          >
            Minhas Viagens
          </button>
          <button 
            onClick={() => setActiveTab('rotas')}
            className={`relative z-10 flex-1 flex items-center justify-center text-[15px] transition-colors duration-300 ${activeTab === 'rotas' ? 'text-[#007AFF] font-semibold' : 'text-[#3C3C43] font-normal'}`}
          >
            Rotas
          </button>
          <button 
            onClick={() => setActiveTab('frota')}
            className={`relative z-10 flex-1 flex items-center justify-center text-[15px] transition-colors duration-300 ${activeTab === 'frota' ? 'text-[#007AFF] font-semibold' : 'text-[#3C3C43] font-normal'}`}
          >
            Nossa Frota
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-12 md:max-w-7xl md:mx-auto">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: MINHAS VIAGENS */}
          {activeTab === 'minhas-viagens' && (
            <motion.div
              key="minhas-viagens"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {!hasViagens ? (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center px-6">
                  <Ship className="w-20 h-20 text-[#C7C7CC] mb-6" />
                  <h2 className="text-[20px] font-medium text-[#1C1C1E] mb-2">Nenhuma viagem agendada</h2>
                  <p className="text-[15px] text-[#3C3C43] opacity-70 mb-8 max-w-[280px]">Explore nossos destinos e agende sua próxima aventura</p>
                  <button 
                    onClick={() => setActiveTab('rotas')}
                    className="bg-[#007AFF] text-white font-semibold text-[17px] px-8 py-3 rounded-full hover:bg-[#0066CC] active:scale-95 transition-all"
                  >
                    Agendar Viagem
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Example Card */}
                  <div className="rounded-[20px] p-4 shadow-[0_4px_16px_rgba(0,122,255,0.08)] active:scale-[0.98] transition-transform cursor-pointer" style={{ background: 'var(--bg-card)' }}>
                    <div className="flex items-center gap-4 mb-4">
                      <img src="https://i.postimg.cc/PxPPqhVN/Image-202602250115.jpg" className="w-[60px] h-[60px] rounded-xl object-cover" alt="Navio" />
                      <div>
                        <h3 className="text-[17px] font-bold" style={{ color: 'var(--text-primary)' }}>NM Amazon Star</h3>
                        <p className="text-[15px] opacity-70" style={{ color: 'var(--text-secondary)' }}>Rede Bronze</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[15px] font-bold" style={{ color: 'var(--text-primary)' }}>Santarém</span>
                      <ArrowRight className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-[15px] font-bold" style={{ color: 'var(--text-primary)' }}>Belém</span>
                    </div>
                    <p className="text-[13px] mb-4" style={{ color: 'var(--text-secondary)' }}>23 Dez - 6 Jan • 36h</p>
                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="bg-[#34C759] text-white text-[12px] font-semibold px-3 py-1 rounded-full">Confirmada</span>
                      <div className="flex items-center gap-1 text-[#007AFF]">
                        <span className="text-[15px] font-medium">Ver Detalhes</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: ROTAS */}
          {activeTab === 'rotas' && (
            <motion.div
              key="rotas"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {rotas.map((rota) => (
                <div key={rota.id} className="rounded-[20px] p-5 shadow-[0_4px_16px_rgba(0,122,255,0.08)]" style={{ background: 'var(--bg-card)' }}>
                  {/* Mini Map Visual */}
                  <div className="h-[100px] rounded-xl mb-4 flex items-center justify-between px-6 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                    <div className="absolute top-1/2 left-6 right-6 h-[2px] bg-blue-200 -translate-y-1/2 border-t-2 border-dashed border-blue-400"></div>
                    <div className="w-3 h-3 rounded-full bg-[#007AFF] z-10 shadow-[0_0_0_4px_rgba(0,122,255,0.2)]"></div>
                    <Ship className="w-6 h-6 text-[#007AFF] z-10 px-1" style={{ background: 'var(--bg-primary)' }} />
                    <div className="w-3 h-3 rounded-full bg-[#FF9500] z-10 shadow-[0_0_0_4px_rgba(255,149,0,0.2)]"></div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[20px] font-bold" style={{ color: 'var(--text-primary)' }}>{rota.origem}</span>
                    <ArrowRight className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                    <span className="text-[20px] font-bold" style={{ color: 'var(--text-primary)' }}>{rota.destino}</span>
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>Duração: {rota.duracao}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>Frequência: {rota.frequencia}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                      <span className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>A partir de {rota.preco}</span>
                    </div>
                  </div>

                  <button className="w-full py-3 rounded-xl border border-[#007AFF] text-[#007AFF] font-semibold text-[15px] hover:bg-[#007AFF] hover:text-white transition-colors active:scale-[0.98]">
                    Ver Horários →
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 3: NOSSA FROTA */}
          {activeTab === 'frota' && (
            <motion.div
              key="frota"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col gap-6"
            >
              {frota.map((navio) => (
                <div key={navio.id} className="rounded-[24px] overflow-hidden shadow-[0_8px_24px_rgba(0,122,255,0.12)] md:flex md:h-[400px]" style={{ background: 'var(--bg-card)' }}>
                  
                  {/* Galeria */}
                  <div className="relative h-[280px] md:h-full md:w-1/2">
                    <div 
                      className="flex overflow-x-auto snap-x snap-mandatory h-full scrollbar-hide"
                      onScroll={(e) => handleImageScroll(e, navio.id)}
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {navio.imagens.map((img, idx) => (
                        <img key={idx} src={img} className="w-full h-full object-cover shrink-0 snap-center" alt={`${navio.nome} foto ${idx + 1}`} />
                      ))}
                    </div>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {navio.imagens.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1.5 rounded-full transition-all duration-300 ${activeImageIndex[navio.id] === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 md:w-1/2 md:flex md:flex-col md:justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: 'var(--bg-primary)' }}>
                        <navio.TagIcon className={`w-3.5 h-3.5 ${navio.tagColor}`} />
                        <span className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>{navio.tag}</span>
                      </div>
                      <h3 className="text-[24px] font-bold" style={{ color: 'var(--text-primary)' }}>{navio.nome}</h3>
                    </div>
                    <p className="text-[15px] italic mb-6" style={{ color: 'var(--text-secondary)' }}>{navio.subtitulo}</p>

                    <h4 className="text-[13px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>Especificações</h4>
                    <ul className="flex flex-col gap-2 mb-6">
                      <li className="flex items-center gap-2 text-[15px]" style={{ color: 'var(--text-secondary)' }}><div className="w-1.5 h-1.5 rounded-full bg-[#C7C7CC]" /> Capacidade: {navio.specs.capacidade}</li>
                      <li className="flex items-center gap-2 text-[15px]" style={{ color: 'var(--text-secondary)' }}><div className="w-1.5 h-1.5 rounded-full bg-[#C7C7CC]" /> Velocidade: {navio.specs.velocidade}</li>
                      <li className="flex items-center gap-2 text-[15px]" style={{ color: 'var(--text-secondary)' }}><div className="w-1.5 h-1.5 rounded-full bg-[#C7C7CC]" /> Ano: {navio.specs.ano}</li>
                      <li className="flex items-center gap-2 text-[15px]" style={{ color: 'var(--text-secondary)' }}><div className="w-1.5 h-1.5 rounded-full bg-[#C7C7CC]" /> Comprimento: {navio.specs.comprimento}</li>
                    </ul>

                    <h4 className="text-[13px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>Comodidades</h4>
                    <div className="grid grid-cols-5 gap-2 mb-8">
                      <div className="aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}><Wifi className="w-5 h-5 text-[#007AFF]" /></div>
                      <div className="aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}><Utensils className="w-5 h-5 text-[#007AFF]" /></div>
                      <div className="aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}><Wind className="w-5 h-5 text-[#007AFF]" /></div>
                      <div className="aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}><BedDouble className="w-5 h-5 text-[#007AFF]" /></div>
                      <div className="aspect-square rounded-xl flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}><Bath className="w-5 h-5 text-[#007AFF]" /></div>
                    </div>

                    <button className="w-full bg-[#007AFF] text-white font-semibold text-[17px] py-3.5 rounded-full hover:bg-[#0066CC] active:scale-[0.98] transition-all md:mt-auto">
                      Agendar neste Navio →
                    </button>
                  </div>

                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
