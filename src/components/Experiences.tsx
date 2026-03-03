import { motion } from 'motion/react';
import { Binoculars, Tent, Fish, Map, Utensils, Star } from 'lucide-react';

const experiences = [
  { icon: Binoculars, name: 'Vida Selvagem', desc: 'Observação guiada de fauna local.' },
  { icon: Tent, name: 'Comunidades', desc: 'Visitas a tribos indígenas.' },
  { icon: Fish, name: 'Pesca', desc: 'Pesca tradicional de piranhas.' },
  { icon: Map, name: 'Trilhas', desc: 'Caminhadas na floresta densa.' },
  { icon: Utensils, name: 'Culinária', desc: 'Aulas de gastronomia amazônica.' },
  { icon: Star, name: 'Astronomia', desc: 'Observação de estrelas no rio.' },
];

export default function Experiences() {
  return (
    <section id="experiencias" className="py-16 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-apple-gray-dark mb-3">Experiências Autênticas</h2>
          <p className="text-base text-apple-gray-medium max-w-2xl mx-auto">Conecte-se com a natureza de forma profunda e inesquecível.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4"
            >
              <div className="bg-[#F5F5F7] p-2.5 rounded-xl text-apple-gray-dark">
                <exp.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-apple-gray-dark mb-1">{exp.name}</h3>
                <p className="text-xs text-apple-gray-medium">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
