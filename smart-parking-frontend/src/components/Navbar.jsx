import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo */}

      <Link to="/" className="navbar-logo">
        🅿 SmartPark
      </Link>


      {/* Navigation Links */}

      <div className="navbar-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/dashboard">
          Find Parking
        </Link>

        <Link to="/my-bookings">
          My Bookings
        </Link>

        <Link to="/login" className="navbar-login">
          Login
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;