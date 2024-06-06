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
  import SideBar from "../../components/sidebar/SideBar";
  
  const notifications = [
    { id: 1, distributor: "Okba Médicament", status: "Accepted" },
    { id: 2, distributor: "Okba Médicament", status: "Inpreparing" },
    { id: 3, distributor: "Okba Médicament", status: "Rejected" },
    { id: 4, distributor: "Okba Médicament", status: "Delivered" },
    // Add more notifications as needed
  ];
  
  function NotificationPage() {
    const bgColor = useColorModeValue("white", "gray.700");
    const tableColor = useColorModeValue("gray.50", "gray.800");
  
    const getMessage = (status: string, distributor: string) => {
       if (status === "Accepted"){
        return `Your order has been accepted by ${distributor}`
       } else if (status === "Rejected"){
        return `Your order has been rejected by ${distributor}`;
       } else if (status === "Inpreparing"){
        return `Your order is in preparing by ${distributor}`;
      }else return `Your order has been delivered by ${distributor}`;
        
    };
  
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
          <SideBar children={undefined} />
        </GridItem>
        {/* Main Content Area */}
        <GridItem area={"main"}>
          <Box w="100%" h="100%" mt="8" p={6}>
            <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="lg">
              <Heading as="h2" size="lg" mb={4}>
                Order Status Notifications
              </Heading>
              <Box overflowX="auto">
                <Table variant="striped" colorScheme="teal" bg={tableColor}>
                  <TableCaption>Distributor Order Status Notifications</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Distributor</Th>
                      <Th>Message</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {notifications.map((notification) => (
                      <Tr key={notification.id}>
                        <Td>{notification.id}</Td>
                        <Td>{notification.distributor}</Td>
                        <Td>{getMessage(notification.status, notification.distributor)}</Td>
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
  
  export default NotificationPage;
  