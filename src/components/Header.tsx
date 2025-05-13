
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-brand-blue">Auto</span>
          <span className="text-2xl font-bold text-brand-orange">Admin</span>
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-white z-50 p-4">
                <nav className="flex flex-col space-y-4">
                  <Link 
                    to="/" 
                    className="text-lg font-medium hover:text-brand-blue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Início
                  </Link>
                  <Link 
                    to="/sobre" 
                    className="text-lg font-medium hover:text-brand-blue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sobre
                  </Link>
                  <Link 
                    to="/contato" 
                    className="text-lg font-medium hover:text-brand-blue transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contato
                  </Link>
                  {isAuthenticated ? (
                    <Link 
                      to="/admin" 
                      className="text-lg font-medium text-brand-orange"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Painel Admin
                    </Link>
                  ) : (
                    <Link 
                      to="/admin/login" 
                      className="text-lg font-medium text-brand-orange"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login Admin
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-base font-medium hover:text-brand-blue transition-colors">
              Início
            </Link>
            <Link to="/sobre" className="text-base font-medium hover:text-brand-blue transition-colors">
              Sobre
            </Link>
            <Link to="/contato" className="text-base font-medium hover:text-brand-blue transition-colors">
              Contato
            </Link>
            {isAuthenticated ? (
              <Link to="/admin" className="font-medium text-brand-orange">
                Painel Admin
              </Link>
            ) : (
              <Link to="/admin/login">
                <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange/10">
                  Login Admin
                </Button>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
