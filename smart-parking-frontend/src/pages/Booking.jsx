import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleBooking = async (event) => {
    event.preventDefault();

    if (!bookingDate || !startTime || !endTime) {
      alert("Please fill all booking details.");
      return;
    }

    if (endTime <= startTime) {
      alert("End time must be after start time.");
      return;
    }

    if (!token) {
      alert("Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      // Get logged-in user's information
      const profileResponse = await fetch(
        "http://localhost:8080/api/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!profileResponse.ok) {
        throw new Error("Unable to get user information. Please login again.");
      }

      const user = await profileResponse.json();

      console.log("LOGGED IN USER:", user);

      const userId = user.id;

      if (!userId) {
        throw new Error("User ID not found. Please login again.");
      }

      // Create booking
      const response = await fetch(
        `http://localhost:8080/api/bookings?userId=${userId}&parkingSlotId=${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingDate,
            startTime,
            endTime,
          }),
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
        throw new Error(
          data.message || text || "Booking failed. Please try again."
        );
      }

      console.log("BOOKING RESPONSE:", data);

      alert("Booking created successfully!");

      navigate("/bookings");

    } catch (error) {
      console.error("BOOKING ERROR:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">

      {/* HEADER */}
      <header className="booking-header">

        <div>

          <div className="booking-brand">
            SMARTPARK
          </div>

          <h1>
            Book Your Parking Slot
          </h1>

          <p>
            Reserve your parking space quickly and securely.
          </p>

        </div>

        <button
          className="booking-back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </header>


      {/* MAIN CONTENT */}

      <main className="booking-content">

        <div className="booking-layout">


          {/* LEFT INFORMATION CARD */}

          <div className="booking-info-card">

            <div className="booking-icon">
              P
            </div>

            <h2>
              Parking Slot
            </h2>

            <div className="slot-id-box">

              <span>
                Selected Slot
              </span>

              <strong>
                A-{id}
              </strong>

            </div>


            <div className="booking-feature">

              <span className="feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  Easy Booking
                </strong>

                <p>
                  Select your preferred date and time.
                </p>
              </div>

            </div>


            <div className="booking-feature">

              <span className="feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  QR Based Entry
                </strong>

                <p>
                  Use your booking QR code for check-in.
                </p>
              </div>

            </div>


            <div className="booking-feature">

              <span className="feature-icon">
                ✓
              </span>

              <div>
                <strong>
                  Flexible Checkout
                </strong>

                <p>
                  Parking fee is calculated at checkout.
                </p>
              </div>

            </div>

          </div>


          {/* BOOKING FORM */}

          <div className="booking-form-card">

            <div className="form-heading">

              <h2>
                Booking Details
              </h2>

              <p>
                Enter your parking reservation details.
              </p>

            </div>


            <form onSubmit={handleBooking}>


              {/* DATE */}

              <div className="form-group">

                <label htmlFor="bookingDate">
                  Booking Date
                </label>

                <input
                  id="bookingDate"
                  type="date"
                  value={bookingDate}
                  onChange={(event) =>
                    setBookingDate(event.target.value)
                  }
                  required
                />

              </div>


              {/* TIME */}

              <div className="time-row">

                <div className="form-group">

                  <label htmlFor="startTime">
                    Start Time
                  </label>

                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(event) =>
                      setStartTime(event.target.value)
                    }
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="endTime">
                    End Time
                  </label>

                  <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(event) =>
                      setEndTime(event.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* NOTICE */}

              <div className="booking-notice">

                <span>
                  ℹ
                </span>

                <p>
                  Please make sure the end time is later than
                  the start time.
                </p>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="confirm-booking-button"
                disabled={loading}
              >

                {loading
                  ? "Creating Booking..."
                  : "Confirm Booking"}

                {!loading && (
                  <span>
                    →
                  </span>
                )}

              </button>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Booking;