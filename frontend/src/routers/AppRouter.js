import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import FavoritesPage from "../pages/FavoritesPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ContactPage from "../pages/ContactPage";
import Header from "../components/Header";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />} exact={true} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={ContactPage()} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={NotFoundPage()} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;
