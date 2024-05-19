import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BarberPage from "./pages/BarberPage";
import BarberShopPage from "./pages/BarberShopPage";
import SystemBarberPage from "./pages/SystemBarberPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/baber" element={<BarberPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create_shop" element={<BarberShopPage />} />
        <Route path="/system_shop" element={<SystemBarberPage />} />
      </Routes>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </>
  );
}

export default App;
