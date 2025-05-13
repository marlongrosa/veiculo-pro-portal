
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Auto</span>
              <span className="text-2xl font-bold text-brand-orange">Admin</span>
            </Link>
            <p className="mt-4 text-gray-300">
              Sua plataforma completa para compra, venda e administração de veículos.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?type=car" className="text-gray-300 hover:text-white transition-colors">
                  Carros
                </Link>
              </li>
              <li>
                <Link to="/?type=motorcycle" className="text-gray-300 hover:text-white transition-colors">
                  Motos
                </Link>
              </li>
              <li>
                <Link to="/?type=truck" className="text-gray-300 hover:text-white transition-colors">
                  Caminhões
                </Link>
              </li>
              <li>
                <Link to="/?type=machinery" className="text-gray-300 hover:text-white transition-colors">
                  Máquinas
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-300 mb-2">contato@autoadmin.com</p>
            <p className="text-gray-300 mb-2">(11) 99999-9999</p>
            <p className="text-gray-300">São Paulo, SP</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AutoAdmin. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
