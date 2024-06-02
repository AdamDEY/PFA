import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home page/HomePage";
import CartPage from "./pages/cart page/CartPage";
import LoginPage from "./pages/login page/LoginPage";
import MedicinesPage from "./pages/medicine page/MedicinesPage";
import MedicineWarehousePage from "./pages/medicinewarehouse page/MedicineWarehousePage";
import OrdersPage from "./pages/orders page/OrdersPage";
import WarehousesPage from "./pages/warehouses page/WarehousesPage";



function App() {

  return (
    
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/warehouses" element={<WarehousesPage />} />
          <Route path="//warehouses/:warehouseId" element={<MedicineWarehousePage />} />
          <Route path="/cart" element={<CartPage />} />
    
         
        </Routes>
  
  );
}

export default App;
