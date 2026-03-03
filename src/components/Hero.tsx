import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import SearchWidget from './SearchWidget';

export default function Hero() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <section className="relative h-[40vh] md:h-[70vh] w-full flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518182170546-076616fdacfb?q=80&w=1920&fm=webp&auto=format&fit=crop")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-0">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white tracking-tight mb-2 md:mb-4 leading-tight"
          >
            Explore a Amazônia<br/>com Elegância.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 md:mb-8 font-light max-w-[280px] sm:max-w-none"
          >
            Cruzeiros de luxo que conectam você à natureza selvagem.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row items-center gap-3 md:gap-4"
          >
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="bg-apple-blue text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Buscar Cruzeiros
            </button>
            <button className="bg-transparent border border-white text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm rounded-full font-medium hover:bg-white hover:text-black transition-colors text-center">
              Assistir Filme
            </button>
          </motion.div>
        </div>
      </div>

      {/* Search Widget Overlapping */}
      <AnimatePresence>
        {isSearchOpen && <SearchWidget onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
