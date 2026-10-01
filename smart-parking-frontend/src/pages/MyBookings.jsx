
import { useEffect, useState } from "react";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [qrBookingId, setQrBookingId] = useState(null);

  // =========================
  // VIEW QR CODE
  // =========================
  const handleViewQR = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/bookings/${bookingId}/qr`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const blob = await response.blob();

      if (!blob.type.startsWith("image/")) {
        throw new Error("Invalid QR image received");
      }

      const qrUrl = URL.createObjectURL(blob);

      setQrCode(qrUrl);
      setQrBookingId(bookingId);
    } catch (error) {
      console.error("QR ERROR:", error);
      alert("Unable to generate QR code.");
    }
  };

  // =========================
  // CLOSE QR CODE
  // =========================
  const handleCloseQR = () => {
    if (qrCode) {
      URL.revokeObjectURL(qrCode);
    }

    setQrCode(null);
    setQrBookingId(null);
  };

  // =========================
  // CHECK IN
  // =========================
  const handleCheckIn = async (qrCodeValue) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/bookings/check-in?qrCode=${encodeURIComponent(
          qrCodeValue
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();

      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Check-in failed");
      }

      alert("Vehicle checked in successfully!");

      window.location.reload();
    } catch (error) {
      console.error("CHECK-IN ERROR:", error);
      alert(error.message);
    }
  };

  // =========================
  // CHECK OUT
  // =========================
  const handleCheckOut = async (qrCodeValue) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/bookings/check-out?qrCode=${encodeURIComponent(
          qrCodeValue
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();

      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = {};
        }
      }

      if (!response.ok) {
        throw new Error(data.message || "Check-out failed");
      }

      alert(
        `Vehicle checked out successfully! Parking Fee: ₹${data.parkingFee}`
      );

      window.location.reload();
    } catch (error) {
      console.error("CHECK-OUT ERROR:", error);
      alert(error.message);
    }
  };

  // =========================
  // FETCH MY BOOKINGS
  // =========================
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/bookings/my",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const bookingData = await response.json();

        // Get parking-slot details
        const bookingsWithSlots = await Promise.all(
          bookingData.map(async (booking) => {
            try {
              const slotResponse = await fetch(
                `http://localhost:8080/api/parking-slots/${booking.parkingSlotId}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!slotResponse.ok) {
                return {
                  ...booking,
                  parkingSlot: null,
                };
              }

              const slotData = await slotResponse.json();

              return {
                ...booking,
                parkingSlot: slotData,
              };
            } catch (error) {
              console.error(
                `SLOT ERROR FOR BOOKING ${booking.id}:`,
                error
              );

              return {
                ...booking,
                parkingSlot: null,
              };
            }
          })
        );

        setBookings(bookingsWithSlots);
      } catch (error) {
        console.error("BOOKINGS ERROR:", error);
        setError("Unable to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="bookings-page">
        <div className="bookings-header">
          <div>
            <div className="bookings-brand">SMARTPARK</div>
            <h1>My Bookings</h1>
            <p>Manage your parking reservations.</p>
          </div>
        </div>

        <div className="bookings-loading">
          <div className="loading-spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="bookings-page">
        <div className="bookings-header">
          <div>
            <div className="bookings-brand">SMARTPARK</div>
            <h1>My Bookings</h1>
            <p>Manage your parking reservations.</p>
          </div>
        </div>

        <div className="bookings-message error-box">
          <div className="message-icon">!</div>
          <h2>Unable to Load Bookings</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <div className="bookings-page">

      {/* HEADER */}
      <header className="bookings-header">
        <div>
          <div className="bookings-brand">SMARTPARK</div>

          <h1>My Bookings</h1>

          <p>
            Manage your parking reservations and vehicle access.
          </p>
        </div>

        <div className="booking-count">
          <span>Total Bookings</span>
          <strong>{bookings.length}</strong>
        </div>
      </header>

      {/* CONTENT */}
      <main className="bookings-content">

        {bookings.length === 0 ? (
          <div className="bookings-message">
            <div className="message-icon">P</div>

            <h2>No Bookings Yet</h2>

            <p>
              You haven't made any parking reservations yet.
            </p>
          </div>
        ) : (
          <div className="bookings-container">

            {bookings.map((booking) => (

              <div className="booking-card" key={booking.id}>

                {/* CARD HEADER */}
                <div className="booking-card-header">

                  <div className="booking-title-area">
                    <div className="parking-symbol">P</div>

                    <div>
                      <span className="booking-label">
                        PARKING BOOKING
                      </span>

                      <h2>
                        Booking #{booking.id}
                      </h2>
                    </div>
                  </div>

                  <span
                    className={`status-badge status-${booking.status?.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>

                </div>

                {/* SLOT INFORMATION */}
                <div className="slot-summary">

                  <div className="slot-main">
                    <span className="detail-label">
                      PARKING SLOT
                    </span>

                    <strong>
                      {booking.parkingSlot?.slotNumber || "N/A"}
                    </strong>

                    <span>
                      {booking.parkingSlot?.location || "Location unavailable"}
                    </span>
                  </div>

                  <div className="vehicle-info">
                    <span className="detail-label">
                      VEHICLE
                    </span>

                    <strong>
                      {booking.parkingSlot?.vehicleType || "N/A"}
                    </strong>
                  </div>

                </div>

                {/* BOOKING DETAILS */}
                <div className="booking-details-grid">

                  <div className="detail-item">
                    <span className="detail-icon">📅</span>

                    <div>
                      <span className="detail-label">
                        DATE
                      </span>

                      <strong>
                        {booking.bookingDate}
                      </strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">⏰</span>

                    <div>
                      <span className="detail-label">
                        TIME
                      </span>

                      <strong>
                        {booking.startTime} - {booking.endTime}
                      </strong>
                    </div>
                  </div>

                  <div className="detail-item">
                    <span className="detail-icon">₹</span>

                    <div>
                      <span className="detail-label">
                        PARKING FEE
                      </span>

                      <strong>
                        {booking.parkingFee != null
                          ? `₹${booking.parkingFee}`
                          : "Pending"}
                      </strong>
                    </div>
                  </div>

                </div>

                {/* ACTIONS */}
                <div className="booking-actions">

                  <button
                    onClick={() => handleViewQR(booking.id)}
                    className="qr-button"
                  >
                    View QR Code
                  </button>

                  {booking.status === "CONFIRMED" &&
                    booking.qrCode && (
                      <button
                        onClick={() =>
                          handleCheckIn(booking.qrCode)
                        }
                        className="checkin-button"
                      >
                        Check In
                      </button>
                    )}

                  {booking.status === "CHECKED_IN" &&
                    booking.qrCode && (
                      <button
                        onClick={() =>
                          handleCheckOut(booking.qrCode)
                        }
                        className="checkout-button"
                      >
                        Check Out
                      </button>
                    )}

                </div>

                {/* QR IMAGE */}
                {qrCode && qrBookingId === booking.id && (
                  <div className="qr-section">

                    <div className="qr-header">
                      <div>
                        <span className="booking-label">
                          DIGITAL ACCESS
                        </span>

                        <h2>Booking QR Code</h2>
                      </div>

                      <button
                        onClick={handleCloseQR}
                        className="close-qr-button"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="qr-image-wrapper">
                      <img
                        src={qrCode}
                        alt={`QR Code for Booking ${booking.id}`}
                        width="300"
                        height="300"
                      />
                    </div>

                    <p className="qr-help">
                      Present this QR code at the parking entrance
                      for vehicle check-in.
                    </p>

                  </div>
                )}

              </div>

            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default MyBookings;

