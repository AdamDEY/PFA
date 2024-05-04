import { Box, Grid, GridItem, Stack, Wrap } from "@chakra-ui/react";

import SideBar from "../../components/sidebar/SideBar";

import WarehouseCard from "../../components/WarehouseCard/WarehouseCard";

function HomePage() {
  return (
    <Grid
      templateAreas={`
    "nav main"
    `}
      gridTemplateColumns={"240px 1fr"}
      h="100vh"
      w="98vw" // Full height of the viewport
    >
      {/* Sidebar */}
      <GridItem area={"nav"}>
        <SideBar children={undefined} />
      </GridItem>

      {/* Main Content Area */}
      <GridItem area={"main"} ml="4">
        <Box bg=" gray" h="80vh" w="100vh" m="auto" mb="5">
          MAPS{" "}
        </Box>
        <Stack p={0}>
          <Wrap spacing={1}>
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
      </GridItem>
    </Grid>
  );
}

export default HomePage;
