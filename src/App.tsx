// Import necessary modules
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useUserStore } from './pharmacy/stores/user';
import CartPage from './pharmacy/pages/cart page/CartPage';
import HomePage from './pharmacy/pages/home page/HomePage';
import LoginPage from './pharmacy/pages/login page/LoginPage';
import MedicinesPage from './pharmacy/pages/medicine page/MedicinesPage';
import MedicineWarehousePage from './pharmacy/pages/medicinewarehouse page/MedicineWarehousePage';
import OrdersPage from './pharmacy/pages/orders page/OrdersPage';
import WarehousesPage from './pharmacy/pages/warehouses page/WarehousesPage';

// Define the router
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
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

// RequireAuth component for protecting routes
function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useUserStore();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
