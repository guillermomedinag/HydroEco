import { CreditCard, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PaymentForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <CreditCard className="h-6 w-6 text-river-600 mr-2" />
        <h2 className="text-xl font-semibold">Información de pago</h2>
      </div>
      <form className="space-y-6">
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
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-river-600 mr-2" />
            <span className="text-gray-600">Total a pagar:</span>
          </div>
          <span className="text-xl font-bold text-river-600">$149.990</span>
        </div>
        <Button className="w-full bg-river-600 hover:bg-river-700">
          Proceder al pago
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;