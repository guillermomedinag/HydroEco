import { MapPin } from "lucide-react";

const MapSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-river-600 mr-2" />
        <h2 className="text-xl font-semibold">Seleccione ubicación del río</h2>
      </div>
      <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
        <p className="text-gray-600">Mapa será integrado aquí</p>
      </div>
      <div className="mt-4 p-4 bg-river-50 rounded-lg">
        <p className="text-sm text-river-800">
          Coordenadas seleccionadas: <span className="font-mono">--° --' --" S, --° --' --" W</span>
        </p>
      </div>
    </div>
  );
};

export default MapSection;