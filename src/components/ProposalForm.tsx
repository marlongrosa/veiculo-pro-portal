
import { useState } from "react";
import { Vehicle } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProposalFormProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

const ProposalForm = ({ vehicle, isOpen, onClose }: ProposalFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Proposta enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enviar proposta</DialogTitle>
          <DialogDescription>
            Sobre {vehicle.brand} {vehicle.model} {vehicle.year}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div className="grid w-full gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="grid w-full gap-1.5">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              required
            />
          </div>
          
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Descreva sua proposta ou perguntas sobre o veículo..."
              className="min-h-24"
              required
            />
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-brand-orange hover:bg-brand-orange/90"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Proposta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalForm;
