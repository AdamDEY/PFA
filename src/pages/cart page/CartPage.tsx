// pages/CartPage.tsx
import React from "react";
import { Box, Stack, Text, Button, Grid, GridItem } from "@chakra-ui/react";
import { useCart } from "../../context/CartContext";

import SideBar from "../../components/sidebar/SideBar";

function CartPage() {
  const { cart, removeFromCart } = useCart();
  console.log("Cart contents:", cart);

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
            <Text fontSize="2xl" mb={4}>
              Shopping Cart
            </Text>
            {cart.length === 0 ? (
              <Text>Your cart is empty.</Text>
            ) : (
              <Stack spacing={4}>
                {cart.map((item) => (
                  <Box key={item._id} p={4} borderWidth="1px" borderRadius="lg">
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>Price: ${item.price}</Text>
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
