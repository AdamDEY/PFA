import { Box, Grid, Stack, Wrap } from "@chakra-ui/react";

import SideBar from "../../components/sidebar/SideBar";

import WarehouseCard from "../../components/WarehouseCard/WarehouseCard";

function HomePage() {
  return (
    <Grid
      templateColumns="250px 1fr" // Sidebar width and remaining space
      h="100vh" // Full height of the viewport
    >
      {/* Sidebar */}
      <Box bg="white">
        <SideBar children={undefined} />
      </Box>

      {/* Main Content Area */}
      <Box bg="white" pt="12" alignContent="space-between">
        <Box bg=" gray" h="80vh" w="100vh" m="auto" mb="5">
          MAPS{" "}
        </Box>
        <Stack p={0}>
          <Wrap spacing={5}>
            {[...Array(20)].map((_, index) => (
              <WarehouseCard
                Warehouse="Debou Chaari"
                Location="ariana"
                Phone="5881714"
                Email="khorma =.com"
                Distance="5 km away"
                Status="Open"
                key={index}
              />
            ))}
          </Wrap>
        </Stack>
      </Box>
    </Grid>
  );
}

export default HomePage;
