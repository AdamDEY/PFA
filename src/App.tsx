import React from "react";
import WarehouseCard from "./components/WarehouseCard/WarehouseCard";
import Home from "./pages/home page/HomePage";
import Layout from "./pages/medicine page/MedicinesPage";

function App() {
  return (
    <div className="app-container">
      {/* <WarehouseCard
        Warehouse="Maison Chaari"
        Location="ariana"
        Phone="5881714"
        Email="khorma =.com"
        Distance="5 km away"
        Status="Open"
      /> */}
      <Home />
      {/* <Layout /> */}
    </div>
  );
}

export default App;
