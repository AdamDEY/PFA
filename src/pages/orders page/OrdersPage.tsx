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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";

// Fetch orders from the API
const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const fetchOrders = async () => {
  const token = getToken();
  const response = await axios.get("http://localhost:3000/order/pharmacy", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('response', response.data.data.result);
  return response.data.data.result; // Adjust this if the API response structure is different
};

function OrdersPage() {
  const { data, isLoading, isError, error } = useQuery<any[]>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

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
                        {data?.map((order: any) => (
                          <Tr key={order._id}>
                            <Td>{order._id}</Td>
                            <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                            <Td>{order.distributor.name}</Td>
                            <Td>{order.total_price} $</Td>
                            <Td>{order.status}</Td>
                            <Td>
                              <Button>{">"}</Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
              <TabPanel>
                <p>four!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default OrdersPage;
