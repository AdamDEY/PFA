
import { Box } from '@chakra-ui/react';
import { MapContainer,TileLayer } from 'react-leaflet';


const getToken = (): string | null => {
    return localStorage.getItem('tokenDistributor');
  };
function DistributorMaps() {
  return (
    <Box h={'80vh'}>
      <MapContainer center={[36.86099055735569, 10.179002293227526]} zoom={20} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box> );
}

export default DistributorMaps;