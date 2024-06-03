import { createBrowserRouter } from "react-router-dom";

export const distriRouter = createBrowserRouter([
    {
      path: "/distributor/login",
      element: <LoginPage />,
    },
    {
      path: "/distributor/home",
      element: <RequireAuth><HomePage /></RequireAuth>,
    },
    {
      path: "/medicines",
      element: <RequireAuth><MedicinesPage /></RequireAuth>,
    },
    {
      path: "/orders",
      element: <RequireAuth><OrdersPage /></RequireAuth>,
    },
    {
      path: "/warehouses",
      element: <RequireAuth><WarehousesPage /></RequireAuth>,
    },
    {
      path: "/warehouses/:distributorId",
      element: <RequireAuth><MedicineWarehousePage /></RequireAuth>,
    },
    {
      path: "/cart",
      element: <RequireAuth><CartPage /></RequireAuth>,
    },
  ]);