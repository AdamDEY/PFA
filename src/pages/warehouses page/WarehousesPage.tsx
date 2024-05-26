import { Flex, Grid, GridItem, Wrap } from "@chakra-ui/react";
import SideBar from "../../components/sidebar/SideBar";
import WarehouseCard, {
  WarehouseCardProps,
} from "../../components/WarehouseCard/WarehouseCard";

const warehouse: WarehouseCardProps = {
  Warehouse: "Debou Chaari",
  Location: "ariana",
  Phone: "5881714",
  Email: "khorma =.com",
  Distance: "10 km away",
  Status: "Open",
};

function WarehousesPage() {
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
            {[...Array(20)].map((_, index) => (
              <WarehouseCard {...warehouse} key={index} />
            ))}
          </Wrap>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default WarehousesPage;
