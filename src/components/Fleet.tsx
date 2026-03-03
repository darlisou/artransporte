import { motion } from 'motion/react';
import { Anchor, Users, Maximize } from 'lucide-react';

const fleet = [
  {
    name: 'Apple Amazon Explorer',
    description: 'Nosso navio principal, projetado para oferecer o máximo de luxo e estabilidade nas águas do Rio Negro. Design sustentável com emissão zero.',
    capacity: '40 passageiros',
    length: '55 metros',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1000&fm=webp&auto=format&fit=crop'
  },
  {
    name: 'Apple Amazon Discovery',
    description: 'Mais intimista e ágil, perfeito para navegar em afluentes mais estreitos e proporcionar uma experiência mais próxima à natureza.',
    capacity: '24 passageiros',
    length: '38 metros',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&fm=webp&auto=format&fit=crop'
  }
];

export default function Fleet() {
  return (
    <section id="frota" className="py-16 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-apple-gray-dark mb-3">Nossa Frota</h2>
          <p className="text-base text-apple-gray-medium max-w-2xl mx-auto">Engenharia de ponta e design sustentável navegando pela Amazônia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fleet.map((ship, index) => (
            <motion.div
              key={ship.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={ship.image} 
                  alt={ship.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-apple-gray-dark mb-3">{ship.name}</h3>
                <p className="text-sm text-apple-gray-medium mb-6 leading-relaxed">{ship.description}</p>
                
                <div className="flex items-center space-x-6 border-t border-gray-100 pt-6">
                  <div className="flex items-center space-x-2 text-apple-gray-dark">
                    <Users className="w-4 h-4 text-apple-gray-medium" />
                    <span className="text-xs font-medium">{ship.capacity}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-apple-gray-dark">
                    <Maximize className="w-4 h-4 text-apple-gray-medium" />
                    <span className="text-xs font-medium">{ship.length}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
