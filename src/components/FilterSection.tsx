
import { useState, useEffect } from "react";
import { FilterOptions } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  brands, 
  models, 
  states, 
  cities 
} from "../data/mockData";
import { Search } from "lucide-react";

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterSection = ({ onFilterChange }: FilterSectionProps) => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [yearRange, setYearRange] = useState([2000, 2024]);
  const [quickSearch, setQuickSearch] = useState("");
  
  // Update available cities based on selected state
  useEffect(() => {
    if (filters.state) {
      setAvailableCities(cities[filters.state] || []);
    } else {
      setAvailableCities([]);
    }
  }, [filters.state]);

  // Update available models based on selected brand
  useEffect(() => {
    if (filters.brand) {
      setAvailableModels(models[filters.brand] || []);
    } else {
      setAvailableModels([]);
    }
  }, [filters.brand]);

  const handleFilterChange = (key: keyof FilterOptions, value: string | number | undefined) => {
    // Reset dependent filters when parent filter changes
    if (key === 'state') {
      setFilters(prev => ({ ...prev, [key]: value, city: undefined }));
    } else if (key === 'brand') {
      setFilters(prev => ({ ...prev, [key]: value, model: undefined }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleYearChange = (values: number[]) => {
    setYearRange(values);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      ...filters,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      yearMin: yearRange[0],
      yearMax: yearRange[1],
      search: quickSearch
    });
  };

  const handleResetFilters = () => {
    setFilters({});
    setPriceRange([0, 500000]);
    setYearRange([2000, 2024]);
    setQuickSearch("");
    onFilterChange({});
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, search: quickSearch });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <form onSubmit={handleQuickSearch} className="flex gap-2">
          <Input
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            placeholder="Buscar por marca ou modelo..."
            className="flex-1"
          />
          <Button type="submit" variant="default">
            <Search size={18} />
            <span className="ml-2">Buscar</span>
          </Button>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label>Marca</Label>
          <Select 
            value={filters.brand} 
            onValueChange={(value) => handleFilterChange("brand", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as marcas</SelectItem>
              {brands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Modelo</Label>
          <Select 
            value={filters.model} 
            onValueChange={(value) => handleFilterChange("model", value)}
            disabled={!filters.brand}
          >
            <SelectTrigger>
              <SelectValue placeholder={filters.brand ? "Selecione o modelo" : "Selecione a marca primeiro"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os modelos</SelectItem>
              {availableModels.map(model => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Estado</Label>
          <Select 
            value={filters.state} 
            onValueChange={(value) => handleFilterChange("state", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os estados</SelectItem>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Cidade</Label>
          <Select 
            value={filters.city} 
            onValueChange={(value) => handleFilterChange("city", value)}
            disabled={!filters.state}
          >
            <SelectTrigger>
              <SelectValue placeholder={filters.state ? "Selecione a cidade" : "Selecione o estado primeiro"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as cidades</SelectItem>
              {availableCities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Câmbio</Label>
          <Select 
            value={filters.transmission} 
            onValueChange={(value) => handleFilterChange("transmission", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o câmbio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automático">Automático</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Combustível</Label>
          <Select 
            value={filters.fuel} 
            onValueChange={(value) => handleFilterChange("fuel", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o combustível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="Gasolina">Gasolina</SelectItem>
              <SelectItem value="Etanol">Etanol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Elétrico">Elétrico</SelectItem>
              <SelectItem value="Flex">Flex</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6 mb-6">
        <div>
          <div className="flex justify-between mb-2">
            <Label>Preço</Label>
            <span className="text-sm text-gray-500">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceRange[0])} - 
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceRange[1])}
            </span>
          </div>
          <Slider
            defaultValue={[0, 500000]}
            value={priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={500000}
            step={5000}
            className="my-4"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <Label>Ano</Label>
            <span className="text-sm text-gray-500">{yearRange[0]} - {yearRange[1]}</span>
          </div>
          <Slider
            defaultValue={[2000, 2024]}
            value={yearRange}
            onValueChange={handleYearChange}
            min={1990}
            max={2024}
            step={1}
            className="my-4"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          onClick={handleApplyFilters}
          className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
        >
          Aplicar Filtros
        </Button>
        <Button 
          onClick={handleResetFilters} 
          variant="outline" 
          className="flex-1"
        >
          Resetar Filtros
        </Button>
      </div>
    </div>
  );
};

export default FilterSection;
