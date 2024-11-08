import { MapPin } from "lucide-react";
import { useState } from "react";

interface Coordinates {
  lat: string;
  lng: string;
}

interface MapSectionProps {
  onCoordinatesSelect: (coords: Coordinates) => void;
}

const MapSection = ({ onCoordinatesSelect }: MapSectionProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: "", lng: "" });

  // Simulación de selección de coordenadas (esto se reemplazaría con la integración real del mapa)
  const handleMapClick = () => {
    const newCoords = { lat: "33° 27' 30\" S", lng: "70° 40' 15\" W" };
    setCoordinates(newCoords);
    onCoordinatesSelect(newCoords);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-river-600 mr-2" />
        <h2 className="text-xl font-semibold">Seleccione ubicación del río</h2>
      </div>
      <div 
        className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
        onClick={handleMapClick}
      >
        <p className="text-gray-600">Haga clic para seleccionar ubicación en el mapa</p>
      </div>
      <div className="mt-4 p-4 bg-river-50 rounded-lg">
        <p className="text-sm text-river-800">
          Coordenadas seleccionadas: <span className="font-mono">{coordinates.lat}, {coordinates.lng}</span>
        </p>
      </div>
    </div>
  );
};

export default MapSection;