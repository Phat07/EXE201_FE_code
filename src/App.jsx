// import { useState } from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BarberPage from "./pages/BarberPage";
import BarberShopPage from "./pages/BarberShopPage";
import SystemBarberPage from "./pages/SystemBarberPage";
import ListShopBarber from "./pages/ListShopBarber";
import ListBarberEmployees from "./pages/ListBarberEmployees";
import Header from "./components/Header";
import AccountPage from "./pages/AccountPage";
import SalonDetail from "./pages/SalonDetail";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Header />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/baber" element={<BarberPage />} />
          <Route path="/create_shop" element={<BarberShopPage />} />
          <Route path="/create_shop/:id" element={<BarberShopPage />} />
          <Route
            path="/list_barber_employees"
            element={<ListBarberEmployees />}
          />
          <Route path="/account_details/:id" element={<AccountPage />} />
          <Route path="/system_shop" element={<SystemBarberPage />} />
          <Route path="/list_shop" element={<ListShopBarber />} />
          <Route path="salon_detail" element={<SalonDetail/>}/>
        </Route>
      </Routes>
      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
    </>
  );
}

export default App;
