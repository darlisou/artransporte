export default function Footer() {
  return (
    <footer className="bg-[#1d1d1f] text-white pt-12 pb-6 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">Explorar</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Cruzeiros</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Destinos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Experiências</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Galeria</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">Informações</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustentabilidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reservas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cancelamentos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">Conta</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Login</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Criar Conta</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Minhas Reservas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Perfil</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gray-300">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px]">
          <p>Copyright © 2026 Apple Inc. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
