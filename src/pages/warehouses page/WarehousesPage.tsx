import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import SideBar from "../../components/sidebar/SideBar";

function WarehousesPage() {
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
    </Grid>
  );
}

export default WarehousesPage;
