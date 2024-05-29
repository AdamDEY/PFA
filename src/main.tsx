import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import WarehousesPage from "./pages/warehouses page/WarehousesPage.tsx";
import MedicinesPage from "./pages/medicine page/MedicinesPage.tsx";
import OrdersPage from "./pages/orders page/OrdersPage.tsx";
import HomePage from "./pages/home page/HomePage.tsx";
import LoginPage from "./pages/login page/LoginPage.tsx";
import MedicineWarehousePage from "./pages/medicinewarehouse page/MedicineWarehousePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    path: "/warehouses/:warehouseId", // Add dynamic route
    element: <MedicineWarehousePage />,
  },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
        {/* <MedicineModal
        name={"doliprane"}
        image={"lien taswira"}
        description={"takhralou fih"}
      /> */}
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
