
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { proposals } from "@/data/mockData";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Search, 
  Mail, 
  Phone, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProposal, setSelectedProposal] = useState<typeof proposals[0] | null>(null);
  const { toast } = useToast();

  const handleMarkAsContacted = (id: string) => {
    toast({
      title: "Proposta atualizada",
      description: "Status alterado para 'Contactado'",
    });
  };

  const handleDeleteProposal = (id: string) => {
    toast({
      title: "Proposta removida",
      description: "A proposta foi removida com sucesso",
    });
  };
  
  const handleViewProposal = (id: string) => {
    const proposal = proposals.find(p => p.id === id);
    if (proposal) {
      setSelectedProposal(proposal);
    }
  };

  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.vehicleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <div className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
            <Clock size={12} />
            <span>Nova</span>
          </div>
        );
      case "contacted":
        return (
          <div className="flex items-center gap-1 text-blue-700 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle2 size={12} />
            <span>Contactado</span>
          </div>
        );
      case "closed":
        return (
          <div className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle2 size={12} />
            <span>Fechado</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
            <AlertTriangle size={12} />
            <span>{status}</span>
          </div>
        );
    }
  };

  const formatDate = (date: Date) => {
    return format(date, "PP", { locale: ptBR });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Propostas</h1>
          <p className="text-gray-500">Gerencie as propostas recebidas dos clientes.</p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar propostas..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead className="hidden md:table-cell">Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{proposal.name}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Mail size={12} />
                        <span>{proposal.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Phone size={12} />
                        <span>{proposal.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{proposal.vehicleTitle}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(proposal.createdAt)}
                  </TableCell>
                  <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewProposal(proposal.id)}>
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMarkAsContacted(proposal.id)}>
                          Marcar como contactado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteProposal(proposal.id)}
                        >
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProposals.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Nenhuma proposta encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes da Proposta</DialogTitle>
            <DialogDescription>
              Enviado por {selectedProposal?.name || ""} em{" "}
              {selectedProposal && formatDate(selectedProposal.createdAt)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-medium">Veículo</h3>
              <p>{selectedProposal?.vehicleTitle}</p>
            </div>
            <div>
              <h3 className="font-medium">Contato</h3>
              <p className="flex items-center gap-2">
                <Mail size={14} /> {selectedProposal?.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> {selectedProposal?.phone}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Mensagem</h3>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-md border">
                {selectedProposal?.message}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (selectedProposal) {
                    window.location.href = `mailto:${selectedProposal.email}?subject=Resposta: Proposta para ${selectedProposal.vehicleTitle}`;
                  }
                }}
              >
                <Mail size={16} className="mr-2" />
                Responder por E-mail
              </Button>
              <Button
                onClick={() => {
                  if (selectedProposal) {
                    window.open(`https://wa.me/55${selectedProposal.phone.replace(/\D/g, "")}`, "_blank");
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Phone size={16} className="mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Proposals;
