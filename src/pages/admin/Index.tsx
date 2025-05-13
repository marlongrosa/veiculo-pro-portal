
import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import StatCard from "@/components/Dashboard/StatCard";
import SalesChart from "@/components/Dashboard/SalesChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardData } from "@/data/mockData";
import { Car, DollarSign, Users, MessageSquare } from "lucide-react";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Visão geral da plataforma.</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-32" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total de Veículos"
              value={dashboardData.cards.totalVehicles}
              icon={<Car size={16} />}
            />
            
            <StatCard
              title="Veículos Vendidos"
              value={dashboardData.cards.totalSold}
              icon={<DollarSign size={16} />}
              description={`${Math.round((dashboardData.cards.totalSold / dashboardData.cards.totalVehicles) * 100)}% do total`}
            />
            
            <StatCard
              title="Marca Mais Vendida"
              value={dashboardData.cards.topBrand}
              description="32 vendas no último mês"
            />
            
            <StatCard
              title="Propostas Recebidas"
              value={dashboardData.cards.totalProposals}
              icon={<MessageSquare size={16} />}
              description="3 novas propostas hoje"
            />
          </div>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 animate-pulse rounded-lg h-80" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <SalesChart />
          </div>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 animate-pulse rounded-lg h-64" />
            <div className="bg-gray-100 animate-pulse rounded-lg h-64" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Vendedores</CardTitle>
                <CardDescription>
                  Vendedores com mais veículos vendidos no mês
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-brand-blue">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Roberto Oliveira</p>
                        <p className="text-xs text-gray-500">São Paulo, SP</p>
                      </div>
                    </div>
                    <p className="font-medium">23 vendas</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-brand-blue">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Carlos Mendes</p>
                        <p className="text-xs text-gray-500">Rio de Janeiro, RJ</p>
                      </div>
                    </div>
                    <p className="font-medium">17 vendas</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-brand-blue">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Amanda Silva</p>
                        <p className="text-xs text-gray-500">Belo Horizonte, MG</p>
                      </div>
                    </div>
                    <p className="font-medium">12 vendas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Propostas Recentes</CardTitle>
                <CardDescription>
                  Últimas propostas recebidas na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <p className="font-medium">Toyota Corolla XEi</p>
                    <p className="text-xs text-gray-500">João Silva - Hoje, 14:32</p>
                    <p className="text-sm mt-1">
                      Tenho interesse no veículo. Aceita troca com um Civic 2020?
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-amber-500 pl-3 py-1">
                    <p className="font-medium">Jeep Compass Limited</p>
                    <p className="text-xs text-gray-500">Maria Souza - Ontem, 10:15</p>
                    <p className="text-sm mt-1">
                      Qual o menor valor à vista?
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <p className="font-medium">Volkswagen Golf GTI</p>
                    <p className="text-xs text-gray-500">Pedro Santos - 2 dias atrás</p>
                    <p className="text-sm mt-1">
                      Posso fazer uma visita amanhã para ver o carro?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
