
import { useState } from "react";
import { Vehicle } from "../types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProposalForm from "./ProposalForm";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const { 
    title, 
    brand, 
    model, 
    price, 
    year, 
    mileage, 
    transmission, 
    fuel, 
    location, 
    images
  } = vehicle;

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);

  const formattedMileage = new Intl.NumberFormat('pt-BR').format(mileage);

  return (
    <>
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-gray-200">
        <div className="relative h-48">
          <img
            src={images[0]} 
            alt={title}
            className="w-full h-full object-cover"
          />
          {vehicle.status === 'sold' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="text-white font-bold text-xl uppercase tracking-wider">Vendido</span>
            </div>
          )}
        </div>
        <CardContent className="flex-grow p-4">
          <div className="mb-2">
            <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-500">{brand} {model}</p>
          </div>
          
          <p className="text-xl font-bold text-brand-blue mb-3">{formattedPrice}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <span className="text-gray-600">Ano:</span>
              <span className="ml-1 font-medium">{year}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Câmbio:</span>
              <span className="ml-1 font-medium">{transmission}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">KM:</span>
              <span className="ml-1 font-medium">{formattedMileage}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Combustível:</span>
              <span className="ml-1 font-medium">{fuel}</span>
            </div>
          </div>
          
          <p className="text-xs mt-2 text-gray-500">
            {location.city}, {location.state}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {vehicle.status !== 'sold' && (
            <Button 
              onClick={() => setIsProposalModalOpen(true)}
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              Enviar Proposta
            </Button>
          )}
        </CardFooter>
      </Card>

      {isProposalModalOpen && (
        <ProposalForm 
          vehicle={vehicle} 
          isOpen={isProposalModalOpen}
          onClose={() => setIsProposalModalOpen(false)}
        />
      )}
    </>
  );
};

export default VehicleCard;
