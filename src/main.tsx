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
import MedicineModal from "./components/medicinemodal/MedicineModal.tsx";
import LoginPage from "./pages/login page/LoginPage.tsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
      {/* <MedicineModal
        name={"doliprane"}
        image={"lien taswira"}
        description={"takhralou fih"}
      /> */}
    </ChakraProvider>
  </React.StrictMode>
);
