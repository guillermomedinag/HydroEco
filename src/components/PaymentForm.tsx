import { CreditCard, DollarSign, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("credit");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Procesando pago",
      description: "Tu pago está siendo procesado...",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <CreditCard className="h-6 w-6 text-river-600 mr-2" />
        <h2 className="text-xl font-semibold">Información de pago</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label>Método de pago</Label>
          <RadioGroup
            defaultValue="credit"
            onValueChange={setPaymentMethod}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "credit" ? "border-river-500 bg-river-50" : "border-gray-200"
            }`}>
              <RadioGroupItem value="credit" id="credit" className="sr-only" />
              <Label htmlFor="credit" className="cursor-pointer">
                <CreditCard className="h-5 w-5 mb-2" />
                <div className="font-semibold">Tarjeta de Crédito</div>
              </Label>
            </div>

            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "debit" ? "border-river-500 bg-river-50" : "border-gray-200"
            }`}>
              <RadioGroupItem value="debit" id="debit" className="sr-only" />
              <Label htmlFor="debit" className="cursor-pointer">
                <CreditCard className="h-5 w-5 mb-2" />
                <div className="font-semibold">Tarjeta de Débito</div>
              </Label>
            </div>

            <div className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              paymentMethod === "transfer" ? "border-river-500 bg-river-50" : "border-gray-200"
            }`}>
              <RadioGroupItem value="transfer" id="transfer" className="sr-only" />
              <Label htmlFor="transfer" className="cursor-pointer">
                <Building2 className="h-5 w-5 mb-2" />
                <div className="font-semibold">Transferencia Bancaria</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {(paymentMethod === "credit" || paymentMethod === "debit") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cardName">Nombre en la tarjeta</Label>
              <Input id="cardName" placeholder="Juan Pérez" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número de tarjeta</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Fecha de expiración</Label>
              <Input id="expiry" placeholder="MM/AA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" type="password" />
            </div>
          </div>
        )}

        {paymentMethod === "transfer" && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">Datos para transferencia:</h3>
            <div className="space-y-2">
              <p>Banco: Banco de Chile</p>
              <p>Tipo de cuenta: Corriente</p>
              <p>N° de cuenta: 123-456-789</p>
              <p>RUT: 76.XXX.XXX-X</p>
              <p>Nombre: River Reports SpA</p>
              <p>Email: pagos@riverreports.cl</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-river-600 mr-2" />
            <span className="text-gray-600">Total a pagar:</span>
          </div>
          <span className="text-xl font-bold text-river-600">$149.990</span>
        </div>

        <Button className="w-full bg-river-600 hover:bg-river-700">
          {paymentMethod === "transfer" ? "Confirmar transferencia" : "Proceder al pago"}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;