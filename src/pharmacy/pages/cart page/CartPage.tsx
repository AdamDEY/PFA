import {
  Box,
  Stack,
  Text,
  Button,
  Grid,
  GridItem,
  Flex,
  useToast,
  Divider,
  Heading,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";
import { FaTrashAlt } from "react-icons/fa";

const getID = () => {
  const ID = localStorage.getItem("DistributorID");
  if (ID) return ID;
};

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const toast = useToast();
  const getToken = (): string | null => {
    return localStorage.getItem("token");
  };

  const confirmOrder = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please select items before confirming your order.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const distributor_id = getID();
    console.log("distri id", distributor_id);
    // Replace with the actual distributor ID
    const orderData = {
      distributor: "6661cd49b55b5fc3c38cbb45",
      medicine_quantity: cart.map((item) => ({
        medicine: item._id, // Ensure to use _id if that is required by the server
        quantity: item.quantity,
        price: item.price,
      })),
    };
    console.log(orderData);
    const token = getToken();

    try {
      const response = await axios.post(
        "http://172.201.204.133:3000/order/makeorder",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace with your actual access token
          },
        }
      );

      toast({
        title: "Order Confirmed",
        description: "Your order has been successfully placed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Order response:", response.data);

      // Clear the cart and local storage
      clearCart();
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an issue placing your order. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Order error:", error);
    }
  };

  const bgColor = useColorModeValue("white", "gray.700");
  const cardColor = useColorModeValue("gray.50", "gray.800");

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
              <Heading as="h2" size="lg">
                Shopping Cart
              </Heading>
              <Button colorScheme="teal" size="lg" onClick={confirmOrder}>
                Confirm Order
              </Button>
            </Flex>
            <Divider mb={4} />
            {cart.length === 0 ? (
              <Text fontSize="xl">Your cart is empty.</Text>
            ) : (
              <>
                <Stack spacing={4}>
                  {cart.map((item) => (
                    <Box
                      key={item._id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      bg={cardColor}
                    >
                      <Flex justifyContent="space-between" alignItems="center">
                        <VStack align="start">
                          <Text fontWeight="bold" fontSize="lg">
                            {item.name}
                          </Text>
                          <Text>{item.description}</Text>
                          <HStack>
                            <Text>Price: {item.price} DT</Text>
                            <Text>Quantity: {item.quantity}</Text>
                          </HStack>
                        </VStack>
                        <Button
                          leftIcon={<FaTrashAlt />}
                          colorScheme="red"
                          variant="outline"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </Flex>
                    </Box>
                  ))}
                </Stack>
                <Divider my={4} />
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="2xl" fontWeight="bold">
                    Total Price:
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    {totalPrice.toFixed(2)} DT
                  </Text>
                </Flex>
              </>
            )}
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default CartPage;
