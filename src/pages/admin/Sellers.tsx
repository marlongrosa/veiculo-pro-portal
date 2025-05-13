
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { sellers } from "@/data/mockData";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Sellers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/55${phone.replace(/\D/g, "")}`, "_blank");
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Abrindo conversa no WhatsApp...",
    });
  };

  const filteredSellers = sellers.filter((seller) =>
    seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seller.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Vendedores</h1>
            <p className="text-gray-500">Gerencie os vendedores cadastrados na plataforma.</p>
          </div>
          <Button className="bg-brand-blue hover:bg-brand-blue/90">
            <Plus size={18} className="mr-2" />
            Novo Vendedor
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar vendedores..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSellers.map((seller) => (
            <Card key={seller.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{seller.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {seller.city}, {seller.state}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50"
                    onClick={() => handleWhatsApp(seller.phone)}
                  >
                    <Phone size={16} className="mr-2" />
                    WhatsApp
                  </Button>
                </div>
                <div className="mt-4">
                  <p className="text-sm">
                    <span className="font-medium text-gray-600">Telefone:</span>{" "}
                    {seller.phone}
                  </p>
                  {seller.email && (
                    <p className="text-sm">
                      <span className="font-medium text-gray-600">E-mail:</span>{" "}
                      {seller.email}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredSellers.length === 0 && (
            <div className="col-span-full bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-500">Nenhum vendedor encontrado.</p>
            </div>
          )}
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell className="font-medium">{seller.name}</TableCell>
                  <TableCell>
                    {seller.city}, {seller.state}
                  </TableCell>
                  <TableCell>{seller.phone}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => handleWhatsApp(seller.phone)}
                    >
                      <Phone size={16} className="mr-1" />
                      WhatsApp
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Sellers;
