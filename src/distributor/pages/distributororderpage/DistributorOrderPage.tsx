import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Collapse,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import SidebarDist from "../../components/sidebardis/SidebarDist";

interface Pharmacy {
  _id: string;
  name: string;
  address: string;
  city: string;
  clientId: string;
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
  pharmacy: Pharmacy;
  distributor: string;
  medicine_quantity: MedicineQuantity[];
  confirmation: boolean;
  status: string;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const getToken = (): string | null => {
  return localStorage.getItem("tokenDistributor");
};

const fetchOrders = async (): Promise<Order[]> => {
  const token = getToken();
  const response = await axios.get("http://localhost:3000/order/distributor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data.result;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'NotConfirmed':
      return 'yellow';
    case 'InPreparing':
      return 'blue';
    case 'Confirmed':
      return 'green';
    case 'Canceled':
      return 'red';
    default:
      return 'gray';
  }
};

const DistributorOrderPage: React.FC = () => {
  const { data: orders, isLoading, isError, error } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const handleAccept = (orderId: string) => {
    // Implement accept functionality
  };

  const handleReject = (orderId: string) => {
    // Implement reject functionality
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filterOrdersByStatus = (status: string) => {
    if (!orders) return [];
    if (status === 'All') {
      return orders;
    }
    return orders.filter(order => order.status === status);
  };

  const sortedOrders = (status: string) => {
    const filteredOrders = filterOrdersByStatus(status);
    return filteredOrders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  };

  if (isLoading) {
    return <Flex justify="center" align="center" height="100vh"><Spinner size="xl" /></Flex>;
  }

  if (isError) {
    return <Box>Error: {error.message}</Box>;
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
          <Tabs onChange={(index) => setCurrentTab(index)}>
            <TabList>
              <Tab>All</Tab>
              <Tab>NotConfirmed</Tab>
              <Tab>InPreparing</Tab>
              <Tab>Confirmed</Tab>
              <Tab>Canceled</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <OrderTable orders={sortedOrders('All')} expandedOrder={expandedOrder} toggleExpand={toggleExpand} handleAccept={handleAccept} handleReject={handleReject} />
              </TabPanel>
              <TabPanel>
                <OrderTable orders={sortedOrders('NotConfirmed')} expandedOrder={expandedOrder} toggleExpand={toggleExpand} handleAccept={handleAccept} handleReject={handleReject} />
              </TabPanel>
              <TabPanel>
                <OrderTable orders={sortedOrders('InPreparing')} expandedOrder={expandedOrder} toggleExpand={toggleExpand} handleAccept={handleAccept} handleReject={handleReject} />
              </TabPanel>
              <TabPanel>
                <OrderTable orders={sortedOrders('Confirmed')} expandedOrder={expandedOrder} toggleExpand={toggleExpand} handleAccept={handleAccept} handleReject={handleReject} />
              </TabPanel>
              <TabPanel>
                <OrderTable orders={sortedOrders('Canceled')} expandedOrder={expandedOrder} toggleExpand={toggleExpand} handleAccept={handleAccept} handleReject={handleReject} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  );
};

interface OrderTableProps {
  orders: Order[];
  expandedOrder: string | null;
  toggleExpand: (orderId: string) => void;
  handleAccept: (orderId: string) => void;
  handleReject: (orderId: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, expandedOrder, toggleExpand, handleAccept, handleReject }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Pharmacy</Th>
            <Th>Total Price</Th>
            <Th>Status</Th>
            <Th>Created At</Th>
            <Th>Details</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <Tr>
                <Td>{order._id}</Td>
                <Td>{order.pharmacy.name}</Td>
                <Td>{order.total_price} DT</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(order.status)}>{order.status}</Badge>
                </Td>
                <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                <Td>
                  <IconButton
                    aria-label="Expand order details"
                    icon={expandedOrder === order._id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={() => toggleExpand(order._id)}
                    size="sm"
                    variant="ghost"
                  />
                </Td>
                <Td>
                  <Flex>
                    <Button
                      colorScheme="green"
                      size="sm"
                      mr="2"
                      onClick={() => handleAccept(order._id)}
                      disabled={order.status !== 'NotConfirmed'}
                    >
                      Accept
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleReject(order._id)}
                      disabled={order.status !== 'NotConfirmed'}
                    >
                      Reject
                    </Button>
                  </Flex>
                </Td>
              </Tr>
              <Tr>
                <Td colSpan={7} p={0}>
                  <Collapse in={expandedOrder === order._id}>
                    <Box p="4" bg="gray.50" rounded="md">
                      <Table size="sm" variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Medicine Name</Th>
                            <Th>Quantity</Th>
                            <Th>Total Price</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {order.medicine_quantity.map((medicine, index) => (
                            <Tr key={index}>
                              <Td>{medicine.medicine ? medicine.medicine.name : 'Unknown'}</Td>
                              <Td>{medicine.quantity}</Td>
                              <Td>{medicine.medicineTotalPrice} DT</Td>
                            </Tr>
                          ))}
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
  );
};

export default DistributorOrderPage;
