
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthContextType } from '../types';
import { users, MOCK_PASSWORD } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isLoading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (password !== MOCK_PASSWORD) {
      toast({
        title: "Falha na autenticação",
        description: "Senha incorreta",
        variant: "destructive"
      });
      return false;
    }
    
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      localStorage.setItem('authUser', JSON.stringify(foundUser));
      setUser(foundUser);
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${foundUser.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Falha na autenticação",
        description: "Usuário não encontrado",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authUser');
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
