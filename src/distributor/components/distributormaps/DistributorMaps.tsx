
import { Box } from '@chakra-ui/react';
import { LatLng, LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { MapContainer,Marker,Popup,TileLayer, useMapEvents } from 'react-leaflet';
import { DistributorData, PharmacyData } from '../../pages/distributorhomepage/DistributorHomePage';

interface LocationMarkerProps {
  distributor: DistributorData;
}
interface LocationPharmaciesProps {
  pharmacies: PharmacyData[];
}
const getPharmacies = () => {
  const pharmacies = localStorage.getItem('Pharmacies')
  if (pharmacies){return JSON.parse(pharmacies);}
  };
  const getDistributor = () => {
    const distributor = localStorage.getItem('Distributor');
    if (distributor){return JSON.parse(distributor);}
    
  };
  const LocationMarker: React.FC<LocationMarkerProps> = ({ distributor }) => {
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
          <strong>{distributor.distributor.name}</strong><br />
          {distributor.distributor.address}
        </Popup>
      </Marker>
    );
  };
  const LocationPharmacyMarker: React.FC<LocationPharmaciesProps> = ({ pharmacies }) => {
    return (
      <>
        {pharmacies.map((pharmacie, index: number) => {
          const { coordinates } = pharmacie;
          const position = new LatLng(coordinates[1], coordinates[0]); // Adjust coordinates as necessary
  
          return (
            <Marker key={index} position={position as LatLngExpression}>
              <Popup>
                <strong>{pharmacie.pharmacy.name}</strong><br />
                {pharmacie.pharmacy.address}
              </Popup>
            </Marker>
          );
        })}
      </>
    );
  };
function DistributorMaps() {
  const distributor= getDistributor();
  console.log(distributor);
  const pharmacies = getPharmacies();
  pharmacies.map((pha:any)=>{
    console.log("kaaba barl",pha);
  })
  console.log('pharmacies kol',pharmacies );
  return (  
    <Box h={'80vh'}>
      <MapContainer center={[36.86099055735569, 10.179002293227526]} zoom={20} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker distributor={distributor}/>
        {pharmacies.length > 0 && <LocationPharmacyMarker pharmacies={pharmacies} />}
      </MapContainer>
    </Box> );
}

export default DistributorMaps;