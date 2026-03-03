import { MapPin, Calendar, Users, Search, X } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchWidgetProps {
  onClose: () => void;
}

export default function SearchWidget({ onClose }: SearchWidgetProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: '-50%', x: '-50%', scale: 0.92 }}
      animate={{ opacity: 1, y: '-50%', x: '-50%', scale: 1 }}
      exit={{ 
        opacity: 0, 
        y: '-50%', 
        x: '-50%', 
        scale: 0.92,
        transition: { duration: 0.25, ease: "easeIn" }
      }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ transformOrigin: 'center center' }}
      className="fixed top-[40%] left-1/2 z-[100] w-[90%] max-w-4xl 
                 bg-white/10 backdrop-blur-xl saturate-150
                 border border-white/25 
                 shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.4)]
                 rounded-[24px] md:rounded-full 
                 p-4 md:p-2.5 md:pl-7
                 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0"
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 md:p-2 backdrop-blur-md border border-white/20 transition-colors z-40"
      >
        <X className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <div className="flex flex-col md:flex-row items-center flex-1 w-full gap-2 md:gap-0">
        {/* Destino */}
        <div className="flex items-center gap-3 p-2 md:px-4 rounded-xl bg-white/15 border-[0.5px] border-white/30 transition-all cursor-pointer flex-1 w-full hover:bg-white/25">
          <MapPin className="w-5 h-5 text-[#007AFF]" />
          <div className="flex flex-col w-full">
            <span className="text-[11px] uppercase tracking-wider text-[#007AFF] font-extrabold">Destino</span>
            <input type="text" placeholder="Para onde?" className="bg-transparent border-none outline-none text-white font-extrabold placeholder:text-white placeholder:[text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] w-full text-[15px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]" />
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-white/20 mx-1"></div>
        <div className="md:hidden w-full h-px bg-white/20 my-1"></div>

        {/* Data */}
        <div className="flex items-center gap-3 p-2 md:px-4 rounded-xl bg-white/15 border-[0.5px] border-white/30 transition-all cursor-pointer flex-1 w-full hover:bg-white/25">
          <Calendar className="w-5 h-5 text-[#007AFF]" />
          <div className="flex flex-col w-full">
            <span className="text-[11px] uppercase tracking-wider text-[#007AFF] font-extrabold">Data</span>
            <input type="text" placeholder="Quando?" className="bg-transparent border-none outline-none text-white font-extrabold placeholder:text-white placeholder:[text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] w-full text-[15px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]" />
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-white/20 mx-1"></div>
        <div className="md:hidden w-full h-px bg-white/20 my-1"></div>

        {/* Passageiros */}
        <div className="flex items-center gap-3 p-2 md:px-4 rounded-xl bg-white/15 border-[0.5px] border-white/30 transition-all cursor-pointer flex-1 w-full hover:bg-white/25">
          <Users className="w-5 h-5 text-[#007AFF]" />
          <div className="flex flex-col w-full">
            <span className="text-[11px] uppercase tracking-wider text-[#007AFF] font-extrabold">Passageiros</span>
            <input type="text" placeholder="Quantos?" className="bg-transparent border-none outline-none text-white font-extrabold placeholder:text-white placeholder:[text-shadow:1px_1px_2px_rgba(0,0,0,0.4)] w-full text-[15px] [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]" />
          </div>
        </div>
      </div>

      <button className="w-full md:w-auto bg-[#007AFF] text-white rounded-full px-7 py-3.5 font-semibold flex items-center justify-center gap-2 hover:bg-[#005bb5] hover:scale-[1.02] transition-all shrink-0 md:ml-4 shadow-md">
        <span>Buscar</span>
        <Search className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
