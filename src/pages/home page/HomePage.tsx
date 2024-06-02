// Import necessary modules and components
import { Box, Grid, GridItem, Stack, Wrap } from "@chakra-ui/react";
import SideBar from "../../components/sidebar/SideBar";
import WarehouseCard, { WarehouseCardProps } from "../../components/WarehouseCard/WarehouseCard";
import { useEffect, useState } from "react";
import axios from "axios";

// HomePage component
function HomePage() {
  // State hooks with type annotations
  const [distributors, setDistributors] = useState<WarehouseCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to get the token from local storage
  const getToken = (): string | null => {
    return localStorage.getItem('token');
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
        console.log('distributors',response.data.result)
        setDistributors(response.data.result);
       
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching distributors:', error);
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchDistributors();
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
            <WarehouseCard
              key={index}
              _id={distributor._id}
              name={distributor.name}
              Location={distributor.Location}
              Phone={distributor.Phone}
              Email={distributor.Email}
              Distance={''}
              Status={distributor.Status}
            />
          ))}
          </Wrap>
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default HomePage;
