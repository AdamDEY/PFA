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
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
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
  return response.data.data.result;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "NotConfirmed":
      return "orange";
    case "InPreparing":
      return "blue";
    case "Confirmed":
      return "green";
    case "Refused":
      return "red";
    case "Delivery":
      return "blue";
    default:
      return "gray";
  }
};

const OrdersPage = () => {
  const { data: orders, isLoading, isError, error } = useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filterOrdersByStatus = (status: string) => {
    if (!orders) return [];
    if (status === "All") {
      return orders;
    }
    return orders.filter((order) => {
      if (status === "Pending") {
        return order.status === "NotConfirmed";
      } else if (status === "Processing") {
        return order.status === "Delivery" || order.status === "InPreparing";
      } else if (status === "Done") {
        return order.status === "Confirmed";
      }
      return order.status === status;
    });
  };

  const sortedOrders = (status: string) => {
    const filteredOrders = filterOrdersByStatus(status);
    return filteredOrders.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
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
        <SideBar children={undefined} />
      </GridItem>
      {/* Main Content */}
      <GridItem area={"main"} ml="4">
        <Box p="4">
          <Tabs onChange={(index) => setCurrentTab(index)}>
            <TabList>
              <Tab>All</Tab>
              <Tab>Pending</Tab>
              <Tab>Processing</Tab>
              <Tab>Done</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <OrderTable
                  orders={sortedOrders("All")}
                  expandedOrder={expandedOrder}
                  toggleExpand={toggleExpand}
                />
              </TabPanel>
              <TabPanel>
                <OrderTable
                  orders={sortedOrders("Pending")}
                  expandedOrder={expandedOrder}
                  toggleExpand={toggleExpand}
                />
              </TabPanel>
              <TabPanel>
                <OrderTable
                  orders={sortedOrders("Processing")}
                  expandedOrder={expandedOrder}
                  toggleExpand={toggleExpand}
                />
              </TabPanel>
              <TabPanel>
                <OrderTable
                  orders={sortedOrders("Done")}
                  expandedOrder={expandedOrder}
                  toggleExpand={toggleExpand}
                />
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
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  expandedOrder,
  toggleExpand,
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Created</Th>
            <Th>Warehouse</Th>
            <Th>Total Price</Th>
            <Th>Status</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <Tr>
                <Td>{order._id}</Td>
                <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                <Td>{order.distributor ? order.distributor.name : "Unknown"}</Td>
                <Td>{order.total_price} DT</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </Td>
                <Td>
                  <IconButton
                    aria-label="Expand order details"
                    icon={
                      expandedOrder === order._id ? (
                        <ChevronUpIcon />
                      ) : (
                        <ChevronDownIcon />
                      )
                    }
                    onClick={() => toggleExpand(order._id)}
                    size="sm"
                    variant="ghost"
                  />
                </Td>
              </Tr>
              <Tr>
                <Td colSpan={6} p={0}>
                  <Collapse in={expandedOrder === order._id}>
                    <Box p="4" bg="gray.50" rounded="md">
                      <Table size="sm" variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Total Price</Th>
                            <Th>Quantity</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {order.medicine_quantity.map((item, index) => (
                            <Tr key={index}>
                              <Td>
                                {item.medicine ? item.medicine.name : "Unknown"}
                              </Td>
                              <Td>{item.medicineTotalPrice} DT</Td>
                              <Td>{item.quantity}</Td>
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

export default OrdersPage;
