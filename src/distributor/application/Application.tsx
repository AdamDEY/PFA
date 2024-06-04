import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactNode } from "react";
import { useUserDistStore } from "../distristores/userDist";
import DistributorLoginPage from "../pages/distributorloginpage/DistributorLoginPage";
import StockPage from "../pages/stockpage/StockPage";
import DistributorHomePage from "../pages/distributorhomepage/DistributorHomePage";



const distriRouter = createBrowserRouter([
    {
      path: "/distributor/login",
      element: <DistributorLoginPage />,
    },
    {
      path: "/distributor/stock",
      element: <RequireAuth><StockPage /></RequireAuth>,
    },
    {
      path: "/distributor/home",
      element: <RequireAuth><DistributorHomePage /></RequireAuth>,
    },
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
      <RouterProvider router={distriRouter} />
    //  <StockPage/>
    );
  }
  
  export default Application;