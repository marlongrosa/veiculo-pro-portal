
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/use-auth';

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-blue">Auto</span>
            <span className="text-2xl font-bold text-brand-orange">Venda</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand-blue">Início</Link>
            <Link to="/#sobre" className="text-gray-700 hover:text-brand-blue">Sobre</Link>
            <Link to="/#contato" className="text-gray-700 hover:text-brand-blue">Contato</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                {user.email && (
                  <span className="hidden md:inline text-sm text-gray-600">
                    {user.email}
                  </span>
                )}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => signOut()}
                  >
                    Sair
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    asChild
                  >
                    <Link to="/admin">Admin</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                asChild
              >
                <Link to="/auth">Entrar</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
