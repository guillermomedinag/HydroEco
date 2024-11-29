import { MapPin, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Coordinates {
  lat: string;
  lng: string;
}

interface MapSectionProps {
  onCoordinatesSelect: (coords: Coordinates) => void;
}

const isValidCoordinate = (input: string): boolean => {
  // Validar formato y rango de coordenadas
  const [lat, lng] = input.split(',').map(coord => coord.trim());
  
  // Verificar que sean números y estén en el rango correcto
  const latNum = parseFloat(lat);
  const lngNum = parseFloat(lng);
  
  return (
    !isNaN(latNum) && 
    !isNaN(lngNum) && 
    latNum >= -90 && 
    latNum <= 90 && 
    lngNum >= -180 && 
    lngNum <= 180
  );
};

const MapSection = ({ onCoordinatesSelect }: MapSectionProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: "", lng: "" });
  const [searchInput, setSearchInput] = useState("");
  const [isValidInput, setIsValidInput] = useState<boolean | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([-33.4489, -70.7893], 8);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.emoingenieros.cl/">EMOingenieros</a>'
      }).addTo(mapRef.current);

      mapRef.current.on('click', function(e) {
        const { lat, lng } = e.latlng;
        const currentZoom = mapRef.current?.getZoom();
        const newCoords = {
          lat: lat.toFixed(6),
          lng: lng.toFixed(6)
        };
        setCoordinates(newCoords);
        onCoordinatesSelect(newCoords);
        if (mapRef.current && currentZoom) {
          mapRef.current.setView([lat, lng], currentZoom);
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onCoordinatesSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    
    // Validar coordenadas solo si hay algo escrito
    setIsValidInput(input ? isValidCoordinate(input) : null);
  };

  const handleSearch = () => {
    if (isValidInput) {
      const [lat, lng] = searchInput.split(',').map(coord => coord.trim());
      if (mapRef.current) {
        const newCoords = { lat, lng };
        const currentZoom = mapRef.current.getZoom();
        mapRef.current.setView([Number(lat), Number(lng)], currentZoom);
        setCoordinates(newCoords);
        onCoordinatesSelect(newCoords);
      }
    }
  };

  return (
    <TooltipProvider>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-river-600 mr-2" />
            <h2 className="text-xl font-semibold">Seleccione ubicación del río</h2>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-river-400 ml-2 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="bg-river-50 text-river-800 p-3 rounded-lg shadow-md max-w-xs">
                <p>Puede seleccionar la ubicación de dos formas:</p>
                <ol className="list-decimal list-inside mt-2">
                  <li>Haga clic directamente en el mapa para seleccionar coordenadas</li>
                  <li>Ingrese manualmente las coordenadas en formato Latitud, Longitud (ej: -33.4489, -70.7893)</li>
                </ol>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="flex items-center gap-2 relative">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                placeholder="Latitud, Longitud"
                className={`border rounded px-2 py-1 text-sm w-48 pr-8 ${
                  isValidInput === true 
                    ? 'border-green-500 focus:ring-green-500' 
                    : isValidInput === false 
                    ? 'border-red-500 focus:ring-red-500' 
                    : ''
                }`}
              />
              {isValidInput !== null && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  {isValidInput ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={!isValidInput}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                isValidInput 
                  ? 'bg-river-600 text-white hover:bg-river-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Buscar
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div id="map" className="h-[400px] w-full rounded-lg mb-4" />
        </div>

        <div className="mt-4 p-4 bg-river-50 rounded-lg">
          <p className="text-sm text-river-800">
            Coordenadas seleccionadas: <span className="font-mono">{coordinates.lat}, {coordinates.lng}</span>
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MapSection;
