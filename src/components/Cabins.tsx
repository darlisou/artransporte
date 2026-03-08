import { motion } from 'motion/react';

const cabins = [
  {
    name: 'Suite Presidencial',
    specs: '65m² • Varanda Panorâmica • Serviço de Mordomo',
    price: 'R$ 3.500 / noite',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&fm=webp&auto=format&fit=crop'
  },
  {
    name: 'Cabine Deluxe',
    specs: '40m² • Janelas do Chão ao Teto • Área de Estar',
    price: 'R$ 2.200 / noite',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&fm=webp&auto=format&fit=crop'
  },
  {
    name: 'Cabine Standard',
    specs: '25m² • Vista para o Rio • Conforto Apple',
    price: 'R$ 1.500 / noite',
    image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=800&fm=webp&auto=format&fit=crop'
  },
  {
    name: 'Cabine Compacta',
    specs: '18m² • Design Inteligente • Essencial',
    price: 'R$ 950 / noite',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&fm=webp&auto=format&fit=crop'
  }
];

export default function Cabins() {
  return (
    <section id="cabines" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-apple-gray-dark mb-3">Acomodações</h2>
          <p className="text-base text-apple-gray-medium max-w-2xl mx-auto">O conforto e o design que você espera, no meio da floresta.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cabins.map((cabin, index) => (
            <motion.div
              key={cabin.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/3] relative">
                <img 
                  src={cabin.image} 
                  alt={cabin.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold text-apple-gray-dark mb-1.5">{cabin.name}</h3>
              <p className="text-xs text-apple-gray-medium mb-3">{cabin.specs}</p>
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-apple-gray-dark">{cabin.price}</span>
                <button className="text-apple-blue font-medium text-xs hover:underline">
                  Visualizar Detalhes
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
