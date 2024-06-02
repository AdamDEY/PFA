// Import necessary modules
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useUserStore } from './stores/user';
import CartPage from './pages/cart page/CartPage';
import HomePage from './pages/home page/HomePage';
import LoginPage from './pages/login page/LoginPage';
import MedicinesPage from './pages/medicine page/MedicinesPage';
import MedicineWarehousePage from './pages/medicinewarehouse page/MedicineWarehousePage';
import OrdersPage from './pages/orders page/OrdersPage';
import WarehousesPage from './pages/warehouses page/WarehousesPage';

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
