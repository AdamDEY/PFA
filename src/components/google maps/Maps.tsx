import { Box } from '@chakra-ui/react';
import { MapContainer, Popup, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from 'react';
import { LatLng, LatLngExpression } from 'leaflet';
import "./Maps.css";

interface Pharmacy {
  _id: string;
  name: string;
  address: string;
  city: string;
  clientId: string;
  __v: number;
}

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

interface LocationMarkerProps {
  pharmacy: Pharmacy;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ pharmacy }) => {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position as LatLngExpression}>
      <Popup>
        <strong>{pharmacy.name}</strong><br />
        {pharmacy.address}
      </Popup>
    </Marker>
  );
};

const Map: React.FC = () => {
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);

  useEffect(() => {
    const fetchPharmacyData = async () => {
      const token = getToken();

      try {
        const response = await fetch('http://localhost:3000/pharmacy', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPharmacy(data.data.result);
      } catch (error) {
        console.error('Error fetching pharmacy data:', error);
      }
    };

    fetchPharmacyData();
  }, []);

  return (
    <Box h={'80vh'}>
      <MapContainer center={[36.86099055735569, 10.179002293227526]} zoom={20} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pharmacy && <LocationMarker pharmacy={pharmacy} />}
      </MapContainer>
    </Box>
  );
};

export default Map;
