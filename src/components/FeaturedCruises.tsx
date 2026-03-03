import { motion } from 'motion/react';

const cruises = [
  {
    id: 1,
    name: 'Expedição Rio Negro',
    duration: '7 dias / 6 noites',
    description: 'Navegue pelas águas escuras do Rio Negro e descubra arquipélagos intocados.',
    price: 'R$ 8.500',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&fm=webp&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Jornada das Águas',
    duration: '5 dias / 4 noites',
    description: 'Testemunhe o espetáculo natural onde os rios Negro e Solimões se encontram.',
    price: 'R$ 6.200',
    image: 'https://images.unsplash.com/photo-1600011689032-8b628b8a8747?q=80&w=800&fm=webp&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Santuário Ecológico',
    duration: '10 dias / 9 noites',
    description: 'Uma imersão profunda na biodiversidade da maior floresta tropical do mundo.',
    price: 'R$ 12.800',
    image: 'https://images.unsplash.com/photo-1518182170546-076616fdacfb?q=80&w=800&fm=webp&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Mistérios da Floresta',
    duration: '4 dias / 3 noites',
    description: 'Uma jornada rápida e intensa pelas lendas e belezas da Amazônia.',
    price: 'R$ 4.900',
    image: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?q=80&w=800&fm=webp&auto=format&fit=crop'
  }
];

export default function FeaturedCruises() {
  return (
    <section id="cruzeiros" className="pt-32 pb-16 bg-apple-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-apple-gray-dark mb-3">Cruzeiros em Destaque</h2>
          <p className="text-base text-apple-gray-medium max-w-2xl mx-auto">Escolha sua jornada perfeita através do coração da Amazônia.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cruises.map((cruise, index) => (
            <motion.div 
              key={cruise.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="h-36 overflow-hidden relative">
                <img 
                  src={cruise.image} 
                  alt={cruise.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-[10px] font-semibold text-apple-gray-medium uppercase tracking-wider mb-1.5">{cruise.duration}</div>
                <h3 className="text-lg font-semibold text-apple-gray-dark mb-1.5">{cruise.name}</h3>
                <p className="text-xs text-apple-gray-medium mb-4 flex-grow">{cruise.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-[10px]">
                    <span className="text-apple-gray-medium block">A partir de</span>
                    <span className="font-semibold text-sm text-apple-gray-dark">{cruise.price}</span>
                  </div>
                  <button className="text-apple-blue text-xs font-medium hover:underline">
                    Saiba Mais
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
