import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./auth/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./components/home";
import HomeLayout from "./containers/homeLayout";

const App = () => {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomeLayout/>}></Route>
          <Route index element={<HomePage/>}></Route>
          <Route path="login" element={<LoginPage/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
