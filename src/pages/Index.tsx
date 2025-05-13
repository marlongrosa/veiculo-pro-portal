
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import FilterSection from "@/components/FilterSection";
import { Vehicle, FilterOptions } from "../types";
import { vehicles } from "../data/mockData";

const Index = () => {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filters: FilterOptions) => {
    setIsLoading(true);
    
    // Simulate API request delay
    setTimeout(() => {
      const filtered = vehicles.filter(vehicle => {
        // Brand filter
        if (filters.brand && vehicle.brand !== filters.brand) {
          return false;
        }
        
        // Model filter
        if (filters.model && vehicle.model !== filters.model) {
          return false;
        }
        
        // State filter
        if (filters.state && vehicle.location.state !== filters.state) {
          return false;
        }
        
        // City filter
        if (filters.city && vehicle.location.city !== filters.city) {
          return false;
        }
        
        // Region filter
        if (filters.region && vehicle.location.region !== filters.region) {
          return false;
        }
        
        // Price range filter
        if (
          (filters.priceMin !== undefined && vehicle.price < filters.priceMin) ||
          (filters.priceMax !== undefined && vehicle.price > filters.priceMax)
        ) {
          return false;
        }
        
        // Year range filter
        if (
          (filters.yearMin !== undefined && vehicle.year < filters.yearMin) ||
          (filters.yearMax !== undefined && vehicle.year > filters.yearMax)
        ) {
          return false;
        }
        
        // Transmission filter
        if (filters.transmission && vehicle.transmission !== filters.transmission) {
          return false;
        }
        
        // Fuel filter
        if (filters.fuel && vehicle.fuel !== filters.fuel) {
          return false;
        }
        
        // Search filter (search by brand or model)
        if (
          filters.search && 
          !vehicle.brand.toLowerCase().includes(filters.search.toLowerCase()) &&
          !vehicle.model.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }
        
        return true;
      });
      
      setFilteredVehicles(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-brand-blue to-blue-900 text-white py-16">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
              Encontre o veículo perfeito para você
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Compra, venda e administração de veículos em um só lugar.
              Milhares de opções para você escolher.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-20">
                <FilterSection onFilterChange={handleFilterChange} />
              </div>
            </div>
            
            <div className="lg:w-2/3 order-1 lg:order-2">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Veículos Disponíveis</h2>
                <span className="text-gray-600">
                  {filteredVehicles.length} veículos encontrados
                </span>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-80" />
                  ))}
                </div>
              ) : (
                filteredVehicles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredVehicles.map(vehicle => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-xl font-medium text-gray-600">
                      Nenhum veículo encontrado com os filtros atuais.
                    </p>
                    <p className="text-gray-500 mt-2">
                      Tente ajustar seus filtros para ver mais resultados.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
