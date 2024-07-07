import "./App.css";
import Login from "./components/login";
import Nav from "./components/nav";
import Register from "./components/register";
import Menu from "./components/menu";
import HomePage from "./components/homepage";
import Restaurant from "./components/restaurant";
import ordersCart from "./components/ordersCart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersCart from "./components/ordersCart";
import PlacedOrders from "./components/getOrders";
import { useState } from "react";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <Router>
        {<Nav />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restraunts" element={<Restaurant />} />
          <Route path="/menu/:restaurant_id" element={<Menu />} />
          <Route path="/menu" element={<Menu />} />j
          <Route path="/order_cart" element={<OrdersCart />} />
          <Route path="/getOrders" element={<PlacedOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
