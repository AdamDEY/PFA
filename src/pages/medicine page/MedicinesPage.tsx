import { Box, Grid, Stack, Wrap } from "@chakra-ui/react";
import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import MedicineCard from "../../components/medicinecard/MedicineCard";

// Assume Sidebar component is defined elsewhere

function MedicinesPage() {
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
      <Box bg="white" pt="12">
        <Stack p={0}>
          <Wrap spacing={5}>
            {[...Array(18)].map((_, index) => (
              <MedicineCard key={index} />
            ))}
          </Wrap>
        </Stack>
      </Box>
    </Grid>
  );
}

export default MedicinesPage;
