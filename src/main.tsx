import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WarehousesPage from "./pages/warehouses page/WarehousesPage";
import MedicinesPage from "./pages/medicine page/MedicinesPage";
import OrdersPage from "./pages/orders page/OrdersPage";
import HomePage from "./pages/home page/HomePage";
import LoginPage from "./pages/login page/LoginPage";
import MedicineWarehousePage from "./pages/medicinewarehouse page/MedicineWarehousePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/cart page/CartPage";




const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/medicines",
    element: <MedicinesPage />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/warehouses",
    element: <WarehousesPage />,
  },
  {
    path: "/warehouses/:distributorId",
    element: <MedicineWarehousePage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },

]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
