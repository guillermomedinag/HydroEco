import { useState } from "react";
import Header from "@/components/Header";
import MapSection from "@/components/MapSection";
import ReportSelector, { Report } from "@/components/ReportSelector";
import PaymentForm from "@/components/PaymentForm";
import { toast } from "@/components/ui/use-toast";

interface Coordinates {
  lat: string;
  lng: string;
}

const Index = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleCoordinatesSelect = (coords: Coordinates) => {
    setSelectedCoordinates(coords);
    toast({
      title: "Ubicación seleccionada",
      description: `Coordenadas: ${coords.lat}, ${coords.lng}`,
    });
  };

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
    toast({
      title: "Informe seleccionado",
      description: `${report.name} - $${report.price.toLocaleString("es-CL")}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Informes Técnicos de Ríos Chilenos
            </h1>
            <p className="text-xl text-gray-600">
              Obtenga información detallada y profesional sobre cualquier sección de río en Chile
            </p>
          </div>
          <MapSection onCoordinatesSelect={handleCoordinatesSelect} />
          <ReportSelector onReportSelect={handleReportSelect} />
          {selectedCoordinates && selectedReport && (
            <PaymentForm />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;