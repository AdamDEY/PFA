import {
  Box,
  Grid,
  GridItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import SidebarDist from "../../components/sidebardis/SidebarDist";

interface Medicine {
  _id: string;
  name: string;
  price: number;
  description: string;
  reference: string;
  imageUrl: string;
  __v: number;
}

interface MedicineQuantity {
  medicine: Medicine;
  quantity: number;
  _id: string;
}

interface StockItem {
  _id: string;
  medicine_quantity: MedicineQuantity[];
  __v: number;
}

const getToken = (): string | null => {
  return localStorage.getItem("tokenDistributor");
};

const StockPage: React.FC = () => {
  const [stock, setStock] = useState<MedicineQuantity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMedicineId, setSelectedMedicineId] = useState<string>("");
  const [quantityToUpdate, setQuantityToUpdate] = useState<number>(0);

  const fetchStock = async () => {
    const token = getToken();
    const url = "http://172.201.204.133:3000/stock/distributor";

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const stockData = response.data.data.result.medicine_quantity;
      setStock(stockData || []); // Ensure stockData is an array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock:", error);
      setError(error as Error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleUpdateQuantity = async () => {
    const token = getToken();
    const url = "http://172.201.204.133:3000/stock/addmedicine";

    try {
      await axios.put(
        url,
        {
          medicine: selectedMedicineId,
          quantity: quantityToUpdate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Re-fetch stock data after update
      fetchStock();
      onClose();
    } catch (error) {
      console.error("Error updating medicine quantity:", error);
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
          <Button onClick={onOpen} colorScheme="teal" mb="4">
            Update Medicine
          </Button>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Medicine Name</Th>
                  <Th>Medicine ID</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.isArray(stock) &&
                  stock.map((item) => (
                    <Tr key={item._id}>
                      <Td>{item.medicine?.name}</Td>
                      <Td>{item.medicine?._id}</Td>
                      <Td>{item.medicine?.price?.toFixed(2)} DT</Td>
                      <Td>{item.quantity}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Medicine Quantity</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl mb="4">
                  <FormLabel>Medicine Name</FormLabel>
                  <Select
                    placeholder="Select Medicine"
                    value={selectedMedicineId}
                    onChange={(e) => setSelectedMedicineId(e.target.value)}
                  >
                    {Array.isArray(stock) &&
                      stock.map((item) => (
                        <option
                          key={item.medicine?._id}
                          value={item.medicine?._id}
                        >
                          {item.medicine?.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="number"
                    value={quantityToUpdate}
                    onChange={(e) =>
                      setQuantityToUpdate(parseInt(e.target.value))
                    }
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleUpdateQuantity}
                >
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default StockPage;
