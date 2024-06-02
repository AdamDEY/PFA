import { Flex, Grid, GridItem, Wrap } from "@chakra-ui/react";
import SideBar from "../../components/sidebar/SideBar";
import WarehouseCard from "../../components/WarehouseCard/WarehouseCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { FetchProps } from "../home page/HomePage";



function WarehousesPage() {
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
      gridTemplateColumns={"250px 1fr"}
      h="100%"
      w="100%" // Full height of the viewport
    >
      {/* Sidebar */}
      <GridItem area={"nav"}>
        <SideBar children={undefined} />
      </GridItem>

      {/* Main Content Area */}

      <GridItem area={"main"}>
        <Flex>
          <Wrap spacing={4}>
            {distributors.map((distributor, index) => (
              <WarehouseCard key={index} _id={distributor.distributor._id} name={distributor.distributor.name} city={distributor.distributor.city} address={distributor.distributor.address} distance={distributor.distance.distance} duration={distributor.distance.duration}              />
            ))}
          </Wrap>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default WarehousesPage;
