import { 
  Box, Grid, GridItem, Button, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, 
  useDisclosure, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Flex 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarDist from "../../components/sidebardis/SidebarDist";

interface MedicineQuantity {
  medicine: string;
  quantity: number;
  _id: string;
}

interface StockItem {
  _id: string;
  medicine_quantity: MedicineQuantity[];
  __v: number;
}

const getToken = (): string | null => {
  return localStorage.getItem('tokenDistributor');
};

const StockPage: React.FC = () => {
  const [stock, setStock] = useState<MedicineQuantity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMedicine, setNewMedicine] = useState<MedicineQuantity>({
    medicine: "",
    quantity: 0,
    _id: "",
  });

  useEffect(() => {
    const fetchStock = async () => {
      const token = getToken();
      const url = 'http://localhost:3000/stock';

      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const stockData = response.data.data.result[0].medicine_quantity;
        setStock(stockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock:', error);
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchStock();
  }, []);
  const handleAddOrUpdateMedicine = async () => {
    const token = getToken();
    const url = 'http://localhost:3000/stock/add';
  
    try {
      const response = await axios.post(url, 
        { 
          medicine_quantity: 
            {
              medicine: newMedicine.medicine,
              quantity: newMedicine.quantity
            }
          
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      const updatedStock = response.data.data.result[0].medicine_quantity;
      setStock(updatedStock);
      onClose();
    } catch (error) {
      console.error('Error adding/updating medicine:', error);
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Box>Error fetching data: {error.message}</Box>
      </Flex>
    );
  }

  return (
    <Grid
      templateAreas={`
        "nav main"
      `}
      gridTemplateColumns={"240px 1fr"}
      h="100vh"
      w="98vw"
    >
      {/* Sidebar */}
      <GridItem area={"nav"}>
        <SidebarDist children={undefined} />
      </GridItem>
      {/* Main Content */}
      <GridItem area={"main"} ml="4">
        <Box p="4">
          <Button onClick={onOpen} colorScheme="teal" mb="4">Add Medicine</Button>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Medicine ID</Th>
                  <Th>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stock.map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.medicine}</Td>
                    <Td>{item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add or Update Medicine</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb="4">
                  <FormLabel>Medicine ID</FormLabel>
                  <Input
                    value={newMedicine.medicine}
                    onChange={(e) => setNewMedicine({ ...newMedicine, medicine: e.target.value })}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    value={newMedicine.quantity}
                    onChange={(e) => setNewMedicine({ ...newMedicine, quantity: parseInt(e.target.value) })}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddOrUpdateMedicine}>
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default StockPage;
