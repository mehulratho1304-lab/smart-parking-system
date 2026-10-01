
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ParkingDetails.css";

function ParkingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/api/parking-slots/available", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch parking slots");
        }

        return response.json();
      })
      .then((data) => {
        console.log("AVAILABLE SLOTS:", data);
        setSlots(data);
      })
      .catch((error) => {
        console.error("FETCH SLOTS ERROR:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="parking-page">

      {/* HEADER */}
      <header className="parking-header">
        <div>
          <div className="brand">SMARTPARK</div>
          <h1>Parking Location #{id}</h1>
          <p>Select an available parking slot for your vehicle</p>
        </div>

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Dashboard
        </button>
      </header>

      {/* CONTENT */}
      <main className="parking-content">

        <div className="location-card">
          <div className="location-icon">P</div>

          <div>
            <h2>Available Parking Slots</h2>
            <p>
              Choose a slot below to continue with your booking.
            </p>
          </div>

          <div className="slot-count">
            <strong>{slots.length}</strong>
            <span>Available</span>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="message-card">
            <div className="loader"></div>
            <p>Loading available parking slots...</p>
          </div>
        )}

        {/* NO SLOTS */}
        {!loading && slots.length === 0 && (
          <div className="message-card">
            <div className="empty-icon">!</div>
            <h2>No slots available</h2>
            <p>
              All parking slots are currently occupied.
              Please check again later.
            </p>
          </div>
        )}

        {/* SLOTS */}
        {!loading && slots.length > 0 && (
          <div className="slots-grid">
            {slots.map((slot) => (
              <div className="slot-card" key={slot.id}>

                <div className="slot-top">
                  <div className="slot-number">
                    <span>Slot</span>
                    <strong>{slot.slotNumber}</strong>
                  </div>

                  <span className="available-badge">
                    ● AVAILABLE
                  </span>
                </div>

                <div className="slot-divider"></div>

                <div className="slot-info">

                  <div className="info-item">
                    <span className="info-label">Location</span>
                    <strong>📍 {slot.location}</strong>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Vehicle Type</span>
                    <span className="vehicle-badge">
                      🚗 {slot.vehicleType}
                    </span>
                  </div>

                </div>

                <button
                  className="book-slot-button"
                  onClick={() => navigate(`/booking/${slot.id}`)}
                >
                  Book This Slot
                  <span>→</span>
                </button>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default ParkingDetails;
