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
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white text-lg">{description}</p>
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
                Informes de datos técnicos y profesionales de ecosistemas fluviales de Chile
              </h2>
              <div className="flex flex-row justify-center space-x-4">
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-white/90 text-blue-900 hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Comienza ¡Ahora!
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  Parámetros dispoibles
                </Button>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20 max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-10">
            Obtén tu informe en 3 simples pasos
          </h2>
          <div className="max-w-3xl mx-auto mb-10">
            <WorkflowStep 
              icon={MapPinIcon}
              number={1}
              title="Selecciona las ubicaciones de interés"
              description="Usa nuestro mapa interactivo para elegir una o más secciones exactas del río que deseas obtener tu reporte."
            />
          </div>
        </section>

        <div className="mt-10">
          <MapSection onCoordinatesSelect={handleCoordinatesSelect} />
          <div className="max-w-3xl mx-auto mt-10">
            <WorkflowStep 
              icon={DocumentTextIcon}
              number={2}
              title="Elige el tipo de informe que necesitas"
              description="Selecciona entre diferentes tipos de informes técnicos según tus necesidades específicas."
            />
          </div>
          <div className="mt-10">
            <ReportSelector onReportSelect={handleReportSelect} />
          </div>
          <div className="max-w-3xl mx-auto mt-10">
            <WorkflowStep 
              icon={CreditCardIcon}
              number={3}
              title="Realiza el Pago"
              description="Completa tu compra de manera segura y recibe tu informe técnico detallado."
            />
          </div>
          
          <div className="max-w-3xl mx-auto mt-8 p-6 bg-blue-600/30 backdrop-blur-md rounded-xl border-2 border-blue-400/50 shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 p-3 rounded-full shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-2">Entrega Inmediata</h3>
                <p className="text-white text-lg">
                  Una vez completado el pago, recibirás automáticamente en tu correo electrónico el informe técnico junto con todos los enlaces de descarga correspondientes.
                </p>
              </div>
            </div>
          </div>

          {selectedCoordinates.length > 0 && selectedReport && (
            <div className="mt-8">
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
