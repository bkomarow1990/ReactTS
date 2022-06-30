import React from "react";
import { Route, Routes, Outlet, Link } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/auth/login";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/home";
import HomeLayout from "./containers/homeLayout";
import RegisterPage from "./components/auth/register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout/>}>
      <Route index element={<HomePage/>}></Route>
      <Route path="login" element={<LoginPage />}></Route>
      <Route path="register" element={<RegisterPage />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
