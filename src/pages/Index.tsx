import Header from "@/components/Header";
import MapSection from "@/components/MapSection";
import ReportSelector from "@/components/ReportSelector";
import PaymentForm from "@/components/PaymentForm";

const Index = () => {
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
          <MapSection />
          <ReportSelector />
          <PaymentForm />
        </div>
      </main>
    </div>
  );
};

export default Index;