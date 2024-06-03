import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./pharmacy/context/CartContext";

import App from "./App";




const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CartProvider>
          {/* <RouterProvider router={router} /> */}
          <App/>
        </CartProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
