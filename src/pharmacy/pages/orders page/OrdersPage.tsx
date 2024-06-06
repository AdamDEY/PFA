import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Collapse,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";

interface Distributor {
  _id: string;
  name: string;
  address: string;
  city: string;
  clientId: string;
  telephone: string;
  horaire: string[];
  __v: number;
}

interface Medicine {
  _id: string;
  name: string;
  description: string;
  reference: string;
  price: number;
  imageUrl: string;
  __v: number;
}

interface MedicineQuantity {
  medicine: Medicine | null;
  quantity: number;
  medicineTotalPrice: number;
  _id: string;
}

interface Order {
  _id: string;
  pharmacy: string;
  distributor: Distributor | null;
  medicine_quantity: MedicineQuantity[];
  confirmation: boolean;
  status: string;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Fetch orders from the API
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const fetchOrders = async (): Promise<Order[]> => {
  const token = getToken();
  const response = await axios.get(
    "http://172.201.204.133:3000/order/pharmacy",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("response", response.data.data.result);
  return response.data.data.result;
};

function OrdersPage() {
  const { data, isLoading, isError, error } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleShowMore = (orderId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
        <Box w="100%">
          <Tabs p="5">
            <TabList>
              <Tab>All</Tab>
              <Tab>Pending</Tab>
              <Tab>Processing</Tab>
              <Tab>Done</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box>
                  <TableContainer>
                    <Table variant="striped">
                      <Thead>
                        <Tr>
                          <Th>Order ID</Th>
                          <Th>Created</Th>
                          <Th>Warehouse</Th>
                          <Th>Total Price</Th>
                          <Th>Status</Th>
                          <Th>Show more</Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {data?.map((order: Order) => (
                          <React.Fragment key={order._id}>
                            <Tr>
                              <Td>{order._id}</Td>
                              <Td>
                                {new Date(order.createdAt).toLocaleString()}
                              </Td>
                              <Td>
                                {order.distributor
                                  ? order.distributor.name
                                  : "Unknown"}
                              </Td>
                              <Td>{order.total_price} DT</Td>
                              <Td>{order.status}</Td>
                              <Td>
                                <Button
                                  onClick={() => handleShowMore(order._id)}
                                >
                                  {expandedRows[order._id] ? "▼" : "▶"}
                                </Button>
                              </Td>
                            </Tr>
                            <Tr>
                              <Td colSpan={6} p={0} m={0}>
                                <Collapse in={expandedRows[order._id]}>
                                  <Box
                                    p={4}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                  >
                                    <Table variant="simple">
                                      <Thead>
                                        <Tr>
                                          <Th>Name</Th>
                                          <Th>Total Price</Th>
                                          <Th>Quantity</Th>
                                        </Tr>
                                      </Thead>
                                      <Tbody>
                                        {order.medicine_quantity.map(
                                          (item, index) => (
                                            <Tr key={index}>
                                              <Td>
                                                {item.medicine
                                                  ? item.medicine.name
                                                  : "Unknown"}
                                              </Td>
                                              <Td>
                                                {item.medicineTotalPrice} DT
                                              </Td>
                                              <Td>{item.quantity}</Td>
                                            </Tr>
                                          )
                                        )}
                                      </Tbody>
                                    </Table>
                                  </Box>
                                </Collapse>
                              </Td>
                            </Tr>
                          </React.Fragment>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
              <TabPanel>
                <p>Pending orders!</p>
              </TabPanel>
              <TabPanel>
                <p>Processing orders!</p>
              </TabPanel>
              <TabPanel>
                <p>Done orders!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default OrdersPage;
