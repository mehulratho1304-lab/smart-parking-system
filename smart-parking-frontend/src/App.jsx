
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import ParkingDetails from "./pages/ParkingDetails";
import Booking from "./pages/Booking";
import AdminPanel from "./pages/AdminPanel";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            HOME
        ========================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =========================
            LOGIN
        ========================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================
            REGISTER
        ========================== */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            DASHBOARD
        ========================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        

        <Route
  path="/admin"
  element={<AdminPanel />}
/>

        {/* =========================
            MY BOOKINGS
        ========================== */}

        <Route
          path="/bookings"
          element={<MyBookings />}
        />

        {/* =========================
    PROFILE
========================== */}

<Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/parking/:id"
  element={<ParkingDetails />}
/>

    <Route
  path="/booking/:id"
  element={<Booking />}
    />

      </Routes>

    </BrowserRouter>

  );

}

export default App;

