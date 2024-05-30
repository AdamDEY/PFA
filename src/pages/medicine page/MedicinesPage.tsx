import { Box, Grid, GridItem, Stack, Wrap } from "@chakra-ui/react";
import SideBar from "../../components/sidebar/SideBar";
import MedicineCard from "../../components/medicinecard/MedicineCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// Assume Sidebar component is defined elsewhere
export type Medicine = {
  _id: string;
  name: string;
  description: string;
  image: string;
  reference: string;
  price: number;
  __v: number;
};
function MedicinesPage() {
  const fetchMedicines = async () => {
    const response = await axios.get("http://localhost:3000/medicine");
    return response.data.data.result;
  };

  const { isLoading, isError, data, error } = useQuery<Medicine[]>({
    queryKey: ["medicines"],
    queryFn: fetchMedicines,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Grid
      templateAreas={`
    "nav main"
    `}
      gridTemplateColumns={"250px 1fr"}
      h="100vh"
      w="100vw" // Full height of the viewport
      overflowX="auto"
    >
      {/* Sidebar */}
      <GridItem area={"nav"}>
        <SideBar children={undefined} />
      </GridItem>
      {/* Main Content Area */}
      <GridItem area={"main"}>
        <Box w="100%" h="100%" mt="8">
          <Stack p={0} justifyContent="center" alignItems="center">
            <Wrap spacing={4}>
              {data?.map((med) => (
                <MedicineCard
                  key={med._id}
                  name={med.name}
                  image={med.name}
                  description={med.description}
                  price={med.price}
                  reference={med.reference}
                  _id={med._id}
                  __v={med.__v}
                />
              ))}
            </Wrap>
          </Stack>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default MedicinesPage;
