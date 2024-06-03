import {
  Box,
  Stack,
  Text,
  Button,
  Grid,
  GridItem,
  Flex,
  useToast
} from "@chakra-ui/react";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import SideBar from "../../components/sidebar/SideBar";

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

    const distributorId = "6625a720f00b7e0916efaf00"; // Replace with the actual distributor ID
    const orderData = {
      distributor: distributorId,
      medicine_quantity: cart.map(item => ({
        medicine: item._id, // Ensure to use _id if that is required by the server
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const token = getToken();

    try {
      const response = await axios.post("http://localhost:3000/order/makeorder", orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Replace with your actual access token
        }
      });

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
        <Box w="100%" h="100%" mt="8">
          <Box p={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="2xl" mb={4}>
                Shopping Cart
              </Text>
              <Button colorScheme="teal" onClick={confirmOrder}>
                Confirm Order
              </Button>
            </Flex>
            {cart.length === 0 ? (
              <Text>Your cart is empty.</Text>
            ) : (
              <Stack spacing={4}>
                {cart.map((item) => (
                  <Box key={item._id} p={4} borderWidth="1px" borderRadius="lg">
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>Price: {item.price} DT</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    <Button
                      colorScheme="red"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default CartPage;
