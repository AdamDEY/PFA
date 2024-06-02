import { Box, Grid, GridItem, Stack, Wrap } from "@chakra-ui/react";
import SideBar from "../../components/sidebar/SideBar";
import WarehouseCard, { DistanceProps, WarehouseCardProps } from "../../components/WarehouseCard/WarehouseCard";
import { useEffect, useState } from "react";
import axios from "axios";





export interface FetchProps {
  distance: DistanceProps;
  distributor:WarehouseCardProps;
}


// HomePage component
function HomePage() {
  // State hooks with type annotations
  const [distributors, setDistributors] = useState<FetchProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to get the token from local storage
  const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  // Function to save array to local storage
  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Function to get array from local storage
  const getFromLocalStorage = (key: string): any[] => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  };

  // Fetch distributors when the component mounts
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
        
        // Check the structure of the response
        console.log('API response', response.data);

        // Make sure you access the correct path to the data
        const distributorsData = response.data.data.result;

        // Save to local storage
        saveToLocalStorage('distributors', distributorsData);

        // Update state
        setDistributors(distributorsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching distributors:', error);
        setError(error as Error);
        setLoading(false);
      }
    };

    // Check if data is already in local storage
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
      {/* Sidebar */}
      <GridItem area={"nav"}>
        <SideBar children={undefined} />
      </GridItem>

      {/* Main Content Area */}
      <GridItem area={"main"} ml="4">
        <Box bg="gray" h="80vh" w="100vh" m="auto" mb="5">
          MAPS
        </Box>
        <Stack p={0}>
          <Wrap spacing={1}>
            {distributors.map((distributor, index) => (
              <WarehouseCard key={index} _id={distributor.distributor._id} name={distributor.distributor.name} city={distributor.distributor.city} adress={distributor.distributor.adress}                
              />
            ))}
          </Wrap>
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default HomePage;
