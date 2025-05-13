
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  MessageSquare, 
  LogOut, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso"
    });
  };
  
  const navItems = [
    { path: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { path: "/admin/vehicles", icon: <Car size={20} />, label: "Veículos" },
    { path: "/admin/sellers", icon: <Users size={20} />, label: "Vendedores" },
    { path: "/admin/proposals", icon: <MessageSquare size={20} />, label: "Propostas" },
  ];

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link 
        to={item.path}
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          isActive 
            ? "bg-brand-blue text-white" 
            : "hover:bg-gray-100"
        }`}
        onClick={() => isMobile && setIsSidebarOpen(false)}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  };

  const Sidebar = () => (
    <aside className={`bg-white border-r w-64 flex-shrink-0 h-screen sticky top-0 ${
      isMobile ? "fixed z-50 transform transition-transform duration-300 " + 
      (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : ""
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-blue">Auto</span>
            <span className="text-xl font-bold text-brand-orange">Admin</span>
          </Link>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={20} />
            </Button>
          )}
        </div>
        
        <Separator />
        
        <div className="p-4">
          <p className="text-sm font-medium">Logado como:</p>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
        
        <Separator />
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </nav>
        
        <div className="p-4 mt-auto">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Sair</span>
          </Button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1">
        {isMobile && (
          <div className="p-4 border-b sticky top-0 bg-white z-10 flex items-center">
            <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </Button>
            
            <div className="ml-4 flex-1">
              <h1 className="font-semibold">
                {navItems.find(item => item.path === location.pathname)?.label || "Admin"}
              </h1>
            </div>
            
            <Button 
              variant="ghost"
              size="sm" 
              className="text-red-600"
              onClick={handleLogout}
            >
              <LogOut size={16} />
            </Button>
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
