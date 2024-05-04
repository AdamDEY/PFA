import { Box, Flex, Grid, GridItem, Stack, Wrap } from "@chakra-ui/react";

import SideBar from "../../components/sidebar/SideBar";
import MedicineCard from "../../components/medicinecard/MedicineCard";

// Assume Sidebar component is defined elsewhere

function MedicinesPage() {
  return (
    <Grid
      templateAreas={`
    "nav main"
    `}
      gridTemplateColumns={"250px 1fr"}
      h="100vh"
      w="100vw" // Full height of the viewport
    >
      {/* Sidebar */}
      <GridItem area={"nav"}>
        <SideBar children={undefined} />
      </GridItem>
      {/* Main Content Area */}
      <GridItem area={"main"} bg="red">
        <Box w="100%" h="100%">
          <Stack p={0} justifyContent="center" alignItems="center">
            <Wrap spacing={4}>
              {[...Array(18)].map((_, index) => (
                <MedicineCard key={index} />
              ))}
            </Wrap>
          </Stack>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default MedicinesPage;
