import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { LatLng, LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { DistributorData, PharmacyData } from '../../pages/distributorhomepage/DistributorHomePage';

interface LocationMarkerProps {
  distributor: DistributorData;
}

interface LocationPharmaciesProps {
  pharmacies: PharmacyData[];
}

const getPharmacies = (): PharmacyData[] => {
  const pharmacies = localStorage.getItem('Pharmacies');
  return pharmacies ? JSON.parse(pharmacies) : [];
};

const getDistributor = (): DistributorData | null => {
  const distributor = localStorage.getItem('Distributor');
  return distributor ? JSON.parse(distributor) : null;
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
      {pharmacies.map((pharmacyData, index) => {
        const { coordinates } = pharmacyData;
        const position = new LatLng(coordinates[1], coordinates[0]);

        return (
          <Marker key={index} position={position as LatLngExpression}>
            <Popup>
              <strong>{pharmacyData.pharmacy.name}</strong><br />
              {pharmacyData.pharmacy.address}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

const DistributorMaps: React.FC = () => {
  const distributor = getDistributor();
  const pharmacies = getPharmacies();

  return (
    <Box h={'80vh'}>
      <MapContainer center={[36.86099055735569, 10.179002293227526]} zoom={20} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {distributor && <LocationMarker distributor={distributor} />}
        {pharmacies.length > 0 && <LocationPharmacyMarker pharmacies={pharmacies} />}
      </MapContainer>
    </Box>
  );
};

export default DistributorMaps;
