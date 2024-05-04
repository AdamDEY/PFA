import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import SideBar from "../../components/sidebar/SideBar";

function WarehousesPage() {
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
    </Grid>
  );
}

export default WarehousesPage;
