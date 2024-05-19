import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BaberPage from "./pages/BaberPage";
import BaberShopPage from "./pages/BaberShopPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/baber" element={<BaberPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/createShop" element={<BaberShopPage/>}/>
      </Routes>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </>
  );
}

export default App;
