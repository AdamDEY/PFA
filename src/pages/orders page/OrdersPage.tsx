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
import SideBar from "../../components/sidebar/SideBar";

function OrdersPage() {
  return (
    <Grid
      templateAreas={`
    "nav main"
    `}
      gridTemplateColumns={"250px 1fr"}
      h="100vh"
      w="100vw"
      // Full height of the viewport
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
                        <Tr>
                          <Td>#123123</Td>
                          <Td>2 min ago</Td>
                          <Td>Day warehouse</Td>
                          <Td>500 $</Td>
                          <Td>Completed</Td>
                          <Td>{<Button>{">"}</Button>}</Td>
                        </Tr>
                        <Tr>
                          <Td>#123123</Td>
                          <Td>2 min ago</Td>
                          <Td>Day warehouse</Td>
                          <Td>500 $</Td>
                          <Td>Completed</Td>
                          <Td>
                            <Button>{">"}</Button>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>#123123</Td>
                          <Td>2 min ago</Td>
                          <Td>Day warehouse</Td>
                          <Td>500 $</Td>
                          <Td>Completed</Td>
                          <Td>
                            <Button>{">"}</Button>
                          </Td>
                        </Tr>
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
