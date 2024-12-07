import { useState, useCallback } from "react";
import Header from "../components/Header";
import MapSection from "../components/MapSection";
import ReportSelector, { Report } from "../components/ReportSelector";
import PaymentForm from "../components/PaymentForm";
import { toast } from "../components/ui/use-toast";
import { Button } from "../components/ui/button";
import { 
  MapPinIcon, 
  DocumentTextIcon, 
  CreditCardIcon 
} from "@heroicons/react/24/outline";

interface Coordinates {
  lat: string;
  lng: string;
  id?: string;
}

const WorkflowStep = ({ 
  icon: Icon, 
  title, 
  description, 
  number 
}: { 
  icon: React.ComponentType<{ className?: string }>, 
  title: string, 
  description: string, 
  number: number 
}) => (
  <div className="flex items-center space-x-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-300 hover:scale-102 hover:shadow-lg">
    <div className="flex-shrink-0 relative">
      <div className="absolute -top-2 -left-2 bg-blue-600/30 w-10 h-10 rounded-full"></div>
      <div className="relative z-10 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-xl font-bold">{number}</span>
      </div>
    </div>
    <div className="flex items-center space-x-4 flex-grow">
      <Icon className="w-8 h-8 text-blue-300 flex-shrink-0" />
      <div className="text-left">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleCoordinatesSelect = (coords: Coordinates[]) => {
    setSelectedCoordinates(coords);
    if (coords.length > 0) {
      const lastCoord = coords[coords.length - 1];
      toast({
        title: "Ubicación seleccionada",
        description: `Coordenadas: ${lastCoord.lat}, ${lastCoord.lng}`,
      });
    }
  };

  const handleReportSelect = (report: Report) => {
    setSelectedReport(report);
    toast({
      title: "Informe seleccionado",
      description: `${report.name} - $${report.price.toLocaleString("es-CL")}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-700/50 to-teal-600/50 z-10 animate-gradient-flow"
      ></div>
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <div 
            className="hero-content space-y-4 py-12 px-8 rounded-2xl border border-white/20 shadow-lg transform transition-all duration-300 hover:scale-[1.01] relative overflow-hidden"
            style={{
              backgroundImage: 'url("/RiversCreeks.jpeg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '400px'
            }}
          >
            {/* Capa de superposición oscura para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            
            <div className="relative z-10 flex flex-col justify-center h-full">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight text-shadow-lg">
                Reportes HidroEco Chile
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 max-w-3xl mx-auto tracking-wide text-shadow">
                Informes de datos  Técnico Profesional de Ecosistemas Fluviales
              </h2>
              <div className="flex flex-row justify-center space-x-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-white/90 text-blue-900 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Explorar Informes
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  Solicitar Consultoría
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Cómo Obtener tu Informe Técnico
          </h2>
          <div className="max-w-3xl mx-auto mb-16">
            <WorkflowStep 
              icon={MapPinIcon}
              number={1}
              title="Selecciona Ubicación"
              description="Usa nuestro mapa interactivo para elegir el punto exacto del río que deseas analizar."
            />
          </div>
        </section>

        <div className="mt-8">
          <MapSection onCoordinatesSelect={handleCoordinatesSelect} />
          <div className="max-w-3xl mx-auto mt-16">
            <WorkflowStep 
              icon={DocumentTextIcon}
              number={2}
              title="Elige Tipo de Informe"
              description="Selecciona entre diferentes tipos de informes técnicos según tus necesidades específicas."
            />
          </div>
          <div className="mt-24">
            <ReportSelector onReportSelect={handleReportSelect} />
          </div>
          <div className="max-w-3xl mx-auto mt-24">
            <WorkflowStep 
              icon={CreditCardIcon}
              number={3}
              title="Realiza el Pago"
              description="Completa tu compra de manera segura y recibe tu informe técnico detallado."
            />
          </div>
          {selectedCoordinates.length > 0 && selectedReport && (
            <div className="mt-24">
              <PaymentForm />
            </div>
          )}
        </div>
      </main>
      <svg 
        className="absolute bottom-0 left-0 w-full h-48 text-white" 
        preserveAspectRatio="none" 
        viewBox="0 0 1440 320"
      >
        <path 
          fill="currentColor" 
          d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Index;
