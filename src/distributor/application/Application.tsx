import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import { useUserDistStore } from "../distristores/userDist";
import LoginPage from "../pages/loginpage/LoginPage";
import StockPage from "../pages/stockpage/StockPage";



const distriRouter = createBrowserRouter([
    {
      path: "/distributor/login",
      element: <LoginPage />,
    },
    {
      path: "/distributor/stock",
      element: <RequireAuth><StockPage /></RequireAuth>,
    },
    // {
    //   path: "/medicines",
    //   element: <RequireAuth><MedicinesPage /></RequireAuth>,
    // },
    // {
    //   path: "/orders",
    //   element: <RequireAuth><OrdersPage /></RequireAuth>,
    // },
    // {
    //   path: "/warehouses",
    //   element: <RequireAuth><WarehousesPage /></RequireAuth>,
    // },
    // {
    //   path: "/warehouses/:distributorId",
    //   element: <RequireAuth><MedicineWarehousePage /></RequireAuth>,
    // },
    // {
    //   path: "/cart",
    //   element: <RequireAuth><CartPage /></RequireAuth>,
    // },
  ]);
function RequireAuth({ children }: { children: ReactNode }) {
    const { userDist } = useUserDistStore();
    return userDist ? children : <Navigate to="/distributor/login" />
  }
  
  function Application() {
    return (
      // <RouterProvider router={distriRouter} />
     <StockPage/>
    );
  }
  
  export default Application;