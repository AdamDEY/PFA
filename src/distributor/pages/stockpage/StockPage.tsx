import {  Grid, GridItem } from "@chakra-ui/react";
import SidebarDist from "../../components/sidebardis/SidebarDist";


const StockPage = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [newMedicine, setNewMedicine] = useState<Partial<StockItem>>({
  //   name: "",
  //   quantity: 0,
  // });

  // const handleAddOrUpdateMedicine = () => {
  //   // This function is just a placeholder in the static version
  //   console.log("Add or update medicine", newMedicine);
  //   onClose();
  // };

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
      <SidebarDist children={undefined} />
    </GridItem>
    {/* Main Content Area */}
    <GridItem area={"main"}>
      
    </GridItem>
  </Grid>
  );
};

export default StockPage;
