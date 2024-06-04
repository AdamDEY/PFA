import { Box, Grid, GridItem, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarDist from "../../components/sidebardis/SidebarDist";


interface StockItem {
  name: string;
  quantity: number;
}

const getToken = (): string | null => {
  return localStorage.getItem('tokenDistributor');
};

const StockPage: React.FC = () => {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMedicine, setNewMedicine] = useState<StockItem>({
    name: "",
    quantity: 0,
  });

  useEffect(() => {
    const fetchStock = async () => {
      const token = getToken();
      const url = 'http://localhost:3000/stock/distributor';

      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("responsedistr",response.data.data);

        setStock(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock kkouna:', error);
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
      const response = await axios.post(url, newMedicine, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedStock = response.data.data;
      setStock(updatedStock);
      onClose();
    } catch (error) {
      console.error('Error adding/updating medicine:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
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
                  <Th>Name</Th>
                  <Th>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stock.map((item) => (
                  <Tr >
                    <Td>{item.name}</Td>
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
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={newMedicine.name}
                    onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
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