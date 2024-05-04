import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import SideBar from "../../components/sidebar/SideBar";

function OrdersPage() {
  return (
    <Grid
      templateColumns="250px 1fr" // Sidebar width and remaining space
      h="100vh" // Full height of the viewport
    >
      {/* Sidebar */}
      <Box bg="white">
        <SideBar children={undefined} />
      </Box>

      {/* Main Content Area */}
      <Box>
        {/* <Flex mt="10" ml="10">
          <HStack spacing="10">
            <Button>All</Button>
            <Button>Pending</Button>
            <Button>Confirmed</Button>
            <Button>Processing</Button>
            <Button>Picked</Button>
            <Button>Shipped</Button>
            <Button>Delivered</Button>
            <Button>Cancelled</Button>
          </HStack>
        </Flex> */}
        <Tabs p="5">
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
}

export default OrdersPage;
