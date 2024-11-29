import { MapPin, HelpCircle, Search } from "lucide-react";
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
  const [lat, lng] = input.split(',').map(coord => coord.trim());
  
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

  const handleCoordinateSearch = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    setIsValidInput(input ? isValidCoordinate(input) : null);
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
                  <li>Haga clic directamente en el mapa</li>
                  <li>Ingrese coordenadas manualmente</li>
                </ol>
                <div className="mt-2 border-t pt-2">
                  <p className="text-sm font-semibold">Ejemplo:</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Coordenadas: <code>-33.4489, -70.7893</code></li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isValidInput) {
                  handleCoordinateSearch();
                }
              }}
              placeholder="Latitud, Longitud"
              className={`border rounded px-2 py-1 text-sm w-full pr-8 ${
                isValidInput === false ? 'border-red-500' : ''
              }`}
            />
            {isValidInput === false && (
              <div className="absolute inset-x-0 top-0 z-10 flex justify-center">
                <div className="text-red-600 text-xs text-center absolute top-full mt-1">
                  Ingrese coordenadas en formato correcto (ej: -33.4489, -70.7893)
                </div>
              </div>
            )}
            <Search 
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                isValidInput 
                  ? 'text-river-600 cursor-pointer' 
                  : 'text-gray-400'
              }`}
              onClick={isValidInput ? handleCoordinateSearch : undefined}
            />
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
