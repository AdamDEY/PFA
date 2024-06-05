import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Grid,
    GridItem,
    Heading,
    useColorModeValue,
  } from "@chakra-ui/react";
import SidebarDist from "../../components/sidebardis/SidebarDist";
  
  interface Notification {
    id: number;
    pharmacy: string;
  }
  
  const notifications: Notification[] = [
    { id: 1, pharmacy: "Pharmacy A" },
    { id: 2, pharmacy: "Pharmacy B" },
    { id: 3, pharmacy: "Pharmacy C" },
    // Add more notifications as needed
  ];
  
  function NotificationDistributorPage() {
    const bgColor = useColorModeValue("white", "gray.700");
    const tableColor = useColorModeValue("gray.50", "gray.800");
  
    return (
      <Grid
        templateAreas={`
          "nav main"
        `}
        gridTemplateColumns={"250px 1fr"}
        h="100vh"
        w="100vw"
        overflowX="auto"
      >
        {/* Sidebar */}
        <GridItem area={"nav"}>
          <SidebarDist children={undefined} />
        </GridItem>
        {/* Main Content Area */}
        <GridItem area={"main"}>
          <Box w="100%" h="100%" mt="8" p={6}>
            <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="lg">
              <Heading as="h2" size="lg" mb={4}>
                Notifications
              </Heading>
              <Box overflowX="auto">
                <Table variant="striped" colorScheme="teal" bg={tableColor}>
                  <TableCaption>Order Notifications</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Pharmacy</Th>
                      <Th>Message</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {notifications.map((notification) => (
                      <Tr key={notification.id}>
                        <Td>{notification.id}</Td>
                        <Td>{notification.pharmacy}</Td>
                        <Td>You have an order from {notification.pharmacy}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    );
  }
  
  export default NotificationDistributorPage;
  