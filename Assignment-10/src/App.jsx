import React from "react";
import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WebLayOut from "./LayOut/WebLayOut";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./route/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<ProtectedRoute />}>
          <Route path="" element={<WebLayOut />}>
            <Route path="home" element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="shop/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
