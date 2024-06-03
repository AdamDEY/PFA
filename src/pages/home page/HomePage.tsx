import { Box, Grid, GridItem, Stack, Wrap } from "@chakra-ui/react";
import SideBar from "../../components/sidebar/SideBar";
import WarehouseCard, { DistanceProps, WarehouseCardProps } from "../../components/WarehouseCard/WarehouseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "../../components/google maps/Maps";

export interface FetchProps {
  distance: DistanceProps;
  distributor: WarehouseCardProps;
  coordinates:number[];
  
}


// HomePage component
function HomePage() {
  const [distributors, setDistributors] = useState<FetchProps[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const getToken = (): string | null => {
    return localStorage.getItem('token');
  };

  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromLocalStorage = (key: string): any[] => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  };

  useEffect(() => {
    const fetchDistributors = async () => {
      const token = getToken();
      const url = 'http://localhost:3000/pharmacy/distributor';

      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('API response', response.data);

        const distributorsData = response.data.data.result.map((item: any) => ({
          distributor: item.distributor,
          distance: item.distance,
          coordinates: item.coordinates
        }));


        saveToLocalStorage('distributors', distributorsData);

        setDistributors(distributorsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching distributors:', error);
        setError(error as Error);
        setLoading(false);
      }
    };

    const storedDistributors = getFromLocalStorage('distributors');
    if (storedDistributors.length > 0) {
      setDistributors(storedDistributors);
      setLoading(false);
    } else {
      fetchDistributors();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <Grid
      templateAreas={`
    "nav main"
    `}
      gridTemplateColumns={"240px 1fr"}
      h="100vh"
      w="98vw"
    >
      <GridItem area={"nav"}>
        <SideBar children={undefined} />
      </GridItem>

      <GridItem area={"main"} ml="4">
        <Box h="80vh" w="90%" m="auto" mb="5">
          <Map  />
        </Box>
        <Stack p={0}>
          <Wrap spacing={1}>
            {distributors.map((distributor, index) => (
              <WarehouseCard key={index} _id={distributor.distributor._id} name={distributor.distributor.name} city={distributor.distributor.city} address={distributor.distributor.address} distance={distributor.distance.distance} duration={distributor.distance.duration} />
            ))}
          </Wrap>
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default HomePage;
