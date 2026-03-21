import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Diamond } from 'lucide-react';

interface Accommodation {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tier: string;
  icons: React.ElementType[];
}

interface InfiniteStackDeckProps {
  items: Accommodation[];
}

export default function InfiniteStackDeck({ items }: InfiniteStackDeckProps) {
  const [cards, setCards] = useState<Accommodation[]>(items);

  const swipeLeft = () => {
    // Avança (topo vai pro final)
    setCards((prev) => {
      const newCards = [...prev];
      const topCard = newCards.shift();
      if (topCard) newCards.push(topCard);
      return newCards;
    });
  };

  const swipeRight = () => {
    // Volta (final vai pro topo)
    setCards((prev) => {
      const newCards = [...prev];
      const bottomCard = newCards.pop();
      if (bottomCard) newCards.unshift(bottomCard);
      return newCards;
    });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 20;
    const velocityThreshold = 200;
    
    const isLeftSwipe = info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold;
    const isRightSwipe = info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold;

    if (isLeftSwipe) {
      swipeLeft();
    } else if (isRightSwipe) {
      swipeRight();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, isTop: boolean) => {
    if (!isTop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    // Se clicou na metade esquerda, volta. Se clicou na metade direita, avança.
    if (clickX < rect.width / 2) {
      swipeRight();
    } else {
      swipeLeft();
    }
  };

  return (
    <div 
      className="relative w-full flex justify-center items-center my-8" 
      style={{ 
        height: '70vh', 
        minHeight: '450px', 
        maxHeight: '650px',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      {cards.map((item, index) => {
        const isTop = index === 0;
        const scale = 1 - index * 0.05;
        const yOffset = -index * 16;
        const baseOpacity = 1 - index * 0.2;
        const zIndex = cards.length - index;

        let glassStyle = '';
        let iconColor = 'text-[#1C1C1E]';
        let webkitFilter = '';
        
        if (item.tier === 'bronze') {
          glassStyle = 'bg-[rgba(255,255,255,0.45)] backdrop-blur-[20px] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.3)]';
          webkitFilter = 'blur(20px)';
        } else if (item.tier === 'silver') {
          glassStyle = 'bg-[rgba(255,255,255,0.45)] backdrop-blur-[20px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]';
          webkitFilter = 'blur(20px)';
        } else if (item.tier === 'gold') {
          glassStyle = 'bg-[rgba(255,245,230,0.05)] backdrop-blur-[20px] shadow-[inset_0_0_0_1px_rgba(255,215,0,0.3),0_0_10px_rgba(255,215,0,0.2)]';
          webkitFilter = 'blur(20px)';
          iconColor = 'text-white';
        } else if (item.tier === 'diamond') {
          glassStyle = 'bg-[rgba(255,255,255,0.1)] backdrop-blur-[20px] saturate-[2.0] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8),0_0_15px_rgba(255,255,255,0.3)]';
          webkitFilter = 'blur(20px) saturate(200%)';
          iconColor = 'text-white';
        }

        return (
          <motion.div
            key={item.id}
            className="absolute w-[82vw] max-w-[380px] aspect-[3/4] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl"
            style={{
              zIndex,
              transformOrigin: 'center center',
              touchAction: isTop ? 'pan-y' : 'auto', // Allow vertical scroll, capture horizontal pan
            }}
            initial={{ scale: 0.8, opacity: 0, y: 50, x: 0 }}
            animate={{
              scale,
              y: yOffset,
              opacity: baseOpacity,
              x: 0, // Forces the card back to center smoothly after release/reorder
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              mass: 1,
            }}
            drag={isTop ? 'x' : false}
            dragConstraints={false}
            onDragEnd={isTop ? handleDragEnd : undefined}
            onClick={(e) => handleClick(e, isTop)}
            whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
            whileTap={isTop ? { scale: 0.98 } : undefined}
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col pointer-events-none">
              <h3 className="text-white font-bold text-[24px] leading-tight mb-2 drop-shadow-md flex items-center gap-1.5">
                {item.title}
                {item.tier === 'diamond' && <Diamond className="w-5 h-5 text-white drop-shadow-md" fill="currentColor" />}
              </h3>
              <p className="text-white/90 font-normal text-[15px] drop-shadow-md mb-4">{item.subtitle}</p>
              
              <div 
                className={`self-start flex items-center gap-2 px-4 py-2 rounded-full ${glassStyle}`}
                style={{ WebkitBackdropFilter: webkitFilter }}
              >
                {item.icons.map((Icon, i) => (
                  <Icon key={i} className={`w-5 h-5 ${iconColor}`} />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
