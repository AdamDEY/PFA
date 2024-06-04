import {
    Box, Grid, GridItem, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Collapse, IconButton
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
  import SidebarDist from "../../components/sidebardis/SidebarDist";
import React from "react";
  
  interface Medicine {
    name: string;
    quantity: number;
  }
  
  interface Order {
    id: string;
    pharmacyName: string;
    medicines: Medicine[];
    status: 'Pending' | 'Accepted' | 'Rejected';
    receivedAt: string; // ISO date string
  }
  
  const initialOrders: Order[] = [
    {
      id: '1',
      pharmacyName: 'Pharmacie La Marsa',
      medicines: [
        { name: 'Paracetamol', quantity: 100 },
        { name: 'Ibuprofen', quantity: 50 },
      ],
      status: 'Pending',
      receivedAt: '2024-06-01T10:00:00Z'
    },
    {
      id: '2',
      pharmacyName: 'Pharmacie Ben Saad Souad',
      medicines: [
        { name: 'Ibuprofen', quantity: 50 },
      ],
      status: 'Pending',
      receivedAt: '2024-06-02T11:30:00Z'
    },
    {
      id: '3',
      pharmacyName: 'Pharmacie Driss Hamdane Raja',
      medicines: [
        { name: 'Amoxicillin', quantity: 200 },
        { name: 'Paracetamol', quantity: 75 },
      ],
      status: 'Pending',
      receivedAt: '2024-06-03T09:15:00Z'
    }
  ];
  
  const DistributorOrderPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
    // Sort orders from old to new based on receivedAt time
    const sortedOrders = [...orders].sort((a, b) => new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime());
  
    const handleAccept = (orderId: string) => {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'Accepted' } : order
      ));
    };
  
    const handleReject = (orderId: string) => {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'Rejected' } : order
      ));
    };
  
    const toggleExpand = (orderId: string) => {
      setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };
  
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
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Pharmacy Name</Th>
                    <Th>Received At</Th>
                    <Th>Details</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {sortedOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <Tr>
                        <Td>{order.pharmacyName}</Td>
                        <Td>{new Date(order.receivedAt).toLocaleString()}</Td>
                        <Td>
                          <IconButton
                            aria-label="Expand order details"
                            icon={expandedOrder === order.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                            onClick={() => toggleExpand(order.id)}
                            size="sm"
                            variant="ghost"
                          />
                        </Td>
                        <Td>{order.status}</Td>
                        <Td>
                          <Flex>
                            <Button
                              colorScheme="green"
                              size="sm"
                              mr="2"
                              onClick={() => handleAccept(order.id)}
                              disabled={order.status !== 'Pending'}
                            >
                              Accept
                            </Button>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleReject(order.id)}
                              disabled={order.status !== 'Pending'}
                            >
                              Reject
                            </Button>
                          </Flex>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td colSpan={5} p={0}>
                          <Collapse in={expandedOrder === order.id}>
                            <Box p="4" bg="gray.50" rounded="md">
                              <Table size="sm" variant="simple">
                                <Thead>
                                  <Tr>
                                    <Th>Medicine Name</Th>
                                    <Th>Quantity</Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {order.medicines.map((medicine, index) => (
                                    <Tr key={index}>
                                      <Td>{medicine.name}</Td>
                                      <Td>{medicine.quantity}</Td>
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
          </Box>
        </GridItem>
      </Grid>
    );
  };
  
  export default DistributorOrderPage;
  