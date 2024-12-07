import { MapPin, HelpCircle, Search, RefreshCw, MapIcon, Trash2, PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

// Importar iconos de Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface Coordinates {
  lat: string;
  lng: string;
  id?: string;
}

interface MapSectionProps {
  onCoordinatesSelect: (coords: Coordinates[]) => void;
}

const MapSection = ({ onCoordinatesSelect }: MapSectionProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [isValidInput, setIsValidInput] = useState<boolean | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

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

  useEffect(() => {
    // Configuración de iconos de Leaflet
    const DefaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    if (!mapRef.current) {
      const map = L.map('map', {
        center: [-33.4489, -70.6693],
        zoom: 9,
        zoomControl: true,
        attributionControl: true
      });
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Configurar el evento de clic una sola vez
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        const latStr = lat.toFixed(6);
        const lngStr = lng.toFixed(6);
        
        // Verificar si ya existe una coordenada con estos valores
        const isDuplicate = coordinates.some(
          coord => coord.lat === latStr && coord.lng === lngStr
        );
        
        if (!isDuplicate) {
          const newCoord: Coordinates = {
            lat: latStr,
            lng: lngStr,
            id: `marker-${Date.now()}`
          };
          
          const marker = L.marker([lat, lng]).addTo(map);
          markersRef.current[newCoord.id] = marker;
          
          setCoordinates(prev => [...prev, newCoord]);
        }
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onCoordinatesSelect]);

  const resetMap = () => {
    if (mapRef.current) {
      // Eliminar todos los marcadores
      Object.values(markersRef.current).forEach(marker => {
        mapRef.current?.removeLayer(marker);
      });
      markersRef.current = {};

      setCoordinates([]);
      onCoordinatesSelect([]);
    }
  };

  const removeCoordinate = (coordToRemove: Coordinates) => {
    if (mapRef.current) {
      // Eliminar marcador del mapa
      if (coordToRemove.id && markersRef.current[coordToRemove.id]) {
        mapRef.current.removeLayer(markersRef.current[coordToRemove.id]);
        delete markersRef.current[coordToRemove.id];
      }
      
      // Actualizar lista de coordenadas
      const updatedCoords = coordinates.filter(coord => coord !== coordToRemove);
      setCoordinates(updatedCoords);
      onCoordinatesSelect(updatedCoords);
    }
  };

  const handleCoordinateSearch = () => {
    if (isValidInput) {
      const [lat, lng] = searchInput.split(',').map(coord => coord.trim());
      
      // Verificar si ya existe una coordenada con estos valores
      const isDuplicate = coordinates.some(
        coord => coord.lat === lat && coord.lng === lng
      );
      
      if (!isDuplicate && mapRef.current) {
        const newCoord: Coordinates = {
          lat,
          lng,
          id: `marker-${Date.now()}`
        };
        const latNum = Number(lat);
        const lngNum = Number(lng);

        // Crear nuevo marcador
        const marker = L.marker([latNum, lngNum]).addTo(mapRef.current);
        markersRef.current[newCoord.id] = marker;

        setCoordinates(prev => {
          // Verificar si las coordenadas ya existen
          const isDuplicate = prev.some(
            coord => coord.lat === newCoord.lat && coord.lng === newCoord.lng
          );
            
          if (!isDuplicate) {
            const updatedCoords = [...prev, newCoord];
            onCoordinatesSelect(updatedCoords);
            return updatedCoords;
          }
          return prev;
        });
      }
      
      setSearchInput('');
      setIsValidInput(null);
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
            <h2 className="text-xl font-semibold">Seleccione ubicaciones del río</h2>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-5 w-5 text-river-400 ml-2 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="bg-river-50 text-river-800 p-3 rounded-lg shadow-md max-w-xs">
                <p>Puede seleccionar ubicaciones de dos formas:</p>
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
            <PlusCircle 
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
          <div className="absolute bottom-4 right-4 z-[1000] flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white shadow-md"
              onClick={resetMap}
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {coordinates.length > 0 && (
          <div className="mt-4 p-4 bg-river-50 rounded-lg">
            <h3 className="text-sm font-semibold text-river-800 mb-2">Coordenadas seleccionadas:</h3>
            <ul className="space-y-2">
              {coordinates.map((coord, index) => (
                <li 
                  key={coord.id} 
                  className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
                >
                  <span className="font-mono text-sm">
                    {index + 1}. {coord.lat}, {coord.lng}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => removeCoordinate(coord)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default MapSection;
