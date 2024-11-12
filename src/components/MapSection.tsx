import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Coordinates {
  lat: string;
  lng: string;
}

interface MapSectionProps {
  onCoordinatesSelect: (coords: Coordinates) => void;
}

const MapSection = ({ onCoordinatesSelect }: MapSectionProps) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ lat: "", lng: "" });
  const [searchInput, setSearchInput] = useState("");
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

  const handleSearch = () => {
    const [lat, lng] = searchInput.split(',').map(coord => coord.trim());
    if (lat && lng && mapRef.current) {
      const newCoords = { lat, lng };
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setView([Number(lat), Number(lng)], currentZoom);
      setCoordinates(newCoords);
      onCoordinatesSelect(newCoords);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <MapPin className="h-6 w-6 text-river-600 mr-2" />
        <h2 className="text-xl font-semibold">Seleccione ubicación del río</h2>
      </div>
      
      <div className="relative">
        <div id="map" className="h-[400px] w-full rounded-lg mb-4" />
        
        <div className="absolute top-4 right-4 flex gap-2 bg-white p-2 rounded shadow-md z-10">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Latitud, Longitud"
            className="border rounded px-2 py-1 text-sm w-48"
          />
          <button
            onClick={handleSearch}
            className="bg-river-600 text-white px-3 py-1 rounded text-sm hover:bg-river-700 transition-colors"
          >
            Buscar
          </button>
        </div>
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