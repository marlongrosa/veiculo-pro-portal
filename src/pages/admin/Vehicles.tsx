
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { vehicles } from "@/data/mockData";
import { Vehicle } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleDeleteVehicle = (id: string) => {
    toast({
      title: "Veículo removido",
      description: "O veículo foi removido com sucesso",
    });
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const getStatusBadgeClass = (status: Vehicle["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "sold":
        return "bg-blue-100 text-blue-800";
      case "reserved":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: Vehicle["status"]) => {
    switch (status) {
      case "available":
        return "Disponível";
      case "sold":
        return "Vendido";
      case "reserved":
        return "Reservado";
      default:
        return status;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Veículos</h1>
            <p className="text-gray-500">Gerencie os veículos cadastrados na plataforma.</p>
          </div>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus size={18} className="mr-2" />
            Novo Veículo
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar veículos..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm">
              Todos
            </Button>
            <Button variant="ghost" size="sm">
              Disponíveis
            </Button>
            <Button variant="ghost" size="sm">
              Vendidos
            </Button>
            <Button variant="ghost" size="sm">
              Reservados
            </Button>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Veículo</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="hidden md:table-cell">Localização</TableHead>
                <TableHead className="hidden md:table-cell">Ano</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.title}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{vehicle.title}</p>
                        <p className="text-gray-500 text-xs">
                          {vehicle.brand} {vehicle.model}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(vehicle.price)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {vehicle.location.city}, {vehicle.location.state}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{vehicle.year}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        vehicle.status
                      )}`}
                    >
                      {getStatusLabel(vehicle.status)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Visualizar</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredVehicles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum veículo encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Vehicles;
