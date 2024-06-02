// src/routes.ts

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import CartPage from "../pages/cart page/CartPage";
import HomePage from "../pages/home page/HomePage";
import MedicinesPage from "../pages/medicine page/MedicinesPage";
import MedicineWarehousePage from "../pages/medicinewarehouse page/MedicineWarehousePage";
import OrdersPage from "../pages/orders page/OrdersPage";
import WarehousesPage from "../pages/warehouses page/WarehousesPage";
import LoginPage from "../pages/login page/LoginPage";  // Ensure LoginPage is imported

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/medicines",
    element: (
      <PrivateRoute>
        <MedicinesPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <PrivateRoute>
        <OrdersPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/warehouses",
    element: (
      <PrivateRoute>
        <WarehousesPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/warehouses/:warehouseId",
    element: (
      <PrivateRoute>
        <MedicineWarehousePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <PrivateRoute>
        <CartPage />
      </PrivateRoute>
    ),
  },
]);

export default router;
