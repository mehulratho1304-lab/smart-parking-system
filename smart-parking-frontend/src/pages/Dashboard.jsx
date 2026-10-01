
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const parkingLots = [
    {
      id: 1,
      name: "City Center Parking",
      location: "Main Road",
      availableSlots: 12,
      price: 50
    },
    {
      id: 2,
      name: "Mall Parking",
      location: "Central Mall",
      availableSlots: 25,
      price: 40
    },
    {
      id: 3,
      name: "Airport Parking",
      location: "Airport Road",
      availableSlots: 8,
      price: 80
    }
  ];

  // Get logged-in user's role from JWT
  const token = localStorage.getItem("token");

  let role = "";

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch (error) {
      console.error("Unable to read user role:", error);
    }
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="dashboard-nav">

        <div className="dashboard-logo">
          <div className="logo-icon">P</div>

          <div>
            <h2>SmartPark</h2>
            <span>Smart Parking System</span>
          </div>
        </div>

        <div className="dashboard-links">

          <Link
            to="/dashboard"
            className="active-nav-link"
          >
            Dashboard
          </Link>

          <Link to="/bookings">
            My Bookings
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          {role === "ADMIN" && (
            <Link to="/admin">
              Admin Panel
            </Link>
          )}

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* =========================
          HERO SECTION
      ========================= */}

      <main className="dashboard-content">

        <section className="dashboard-hero">

          <div className="hero-text">

            <span className="hero-label">
              SMART PARKING
            </span>

            <h1>
              Find Your Perfect
              <span> Parking Spot</span>
            </h1>

            <p>
              Choose a convenient parking location, check
              available spaces, and reserve your slot in seconds.
            </p>

            <div className="hero-features">

              <div>
                <span>✓</span>
                Easy Booking
              </div>

              <div>
                <span>✓</span>
                QR Entry
              </div>

              <div>
                <span>✓</span>
                Secure Parking
              </div>

            </div>

          </div>

          <div className="hero-parking-card">

            <div className="hero-parking-icon">
              P
            </div>

            <strong>Smart Parking</strong>

            <p>
              Your parking space is just a few clicks away.
            </p>

            <div className="hero-status">
              <span></span>
              Parking system online
            </div>

          </div>

        </section>


        {/* =========================
            SECTION TITLE
        ========================= */}

        <section className="parking-section">

          <div className="section-heading">

            <div>
              <span className="section-label">
                LOCATIONS
              </span>

              <h2>
                Choose a Parking Location
              </h2>

              <p>
                Select a location to view available parking slots.
              </p>
            </div>

            <Link
              to="/bookings"
              className="my-bookings-link"
            >
              View My Bookings →
            </Link>

          </div>


          {/* =========================
              PARKING CARDS
          ========================= */}

          <div className="parking-container">

            {parkingLots.map((parking) => (

              <div
                className="parking-card"
                key={parking.id}
              >

                <div className="parking-card-top">

                  <div className="parking-card-icon">
                    P
                  </div>

                  <span className="available-badge">
                    Available
                  </span>

                </div>

                <h2>
                  {parking.name}
                </h2>

                <p className="parking-location">
                  📍 {parking.location}
                </p>


                <div className="parking-info">

                  <div className="info-box">

                    <span>
                      AVAILABLE
                    </span>

                    <strong>
                      {parking.availableSlots}
                    </strong>

                    <small>
                      slots
                    </small>

                  </div>

                  <div className="info-box">

                    <span>
                      RATE
                    </span>

                    <strong>
                      ₹{parking.price}
                    </strong>

                    <small>
                      / hour
                    </small>

                  </div>

                </div>


                <Link
                  to={`/parking/${parking.id}`}
                  className="book-button"
                >
                  View Available Slots
                  <span>→</span>
                </Link>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;

