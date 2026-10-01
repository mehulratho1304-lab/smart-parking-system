
import { useEffect, useState } from "react";

function AdminPanel() {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    slotNumber: "",
    location: "",
    vehicleType: "",
    available: true,
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(true);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH PARKING SLOTS
  // =========================
  const fetchSlots = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/parking-slots",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch parking slots");
      }

      const data = await response.json();
      console.log("ADMIN SLOTS:", data);
      setSlots(data);
    } catch (error) {
      console.error("FETCH SLOTS ERROR:", error);
      alert("Unable to load parking slots.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH BOOKINGS
  // =========================
  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();

      console.log("ADMIN BOOKINGS:", data);

      setBookings(data);
    } catch (error) {
      console.error("FETCH BOOKINGS ERROR:", error);
      alert("Unable to load bookings.");
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
    fetchBookings();
  }, []);

  // =========================
  // FORM CHANGE
  // =========================
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // =========================
  // ADD / UPDATE SLOT
  // =========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:8080/api/admin/parking-slots/${editingId}`
        : "http://localhost:8080/api/admin/parking-slots";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

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
        throw new Error(data.message || "Operation failed");
      }

      alert(
        editingId
          ? "Parking slot updated successfully!"
          : "Parking slot added successfully!"
      );

      setFormData({
        slotNumber: "",
        location: "",
        vehicleType: "",
        available: true,
      });

      setEditingId(null);

      fetchSlots();
    } catch (error) {
      console.error("SAVE SLOT ERROR:", error);
      alert(error.message);
    }
  };

  // =========================
  // EDIT SLOT
  // =========================
  const handleEdit = (slot) => {
    setEditingId(slot.id);

    setFormData({
      slotNumber: slot.slotNumber,
      location: slot.location,
      vehicleType: slot.vehicleType,
      available: slot.available,
    });
  };

  // =========================
  // DELETE SLOT
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this parking slot?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/parking-slots/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || "Failed to delete parking slot");
      }

      alert("Parking slot deleted successfully!");

      fetchSlots();
    } catch (error) {
      console.error("DELETE SLOT ERROR:", error);
      alert(error.message);
    }
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      slotNumber: "",
      location: "",
      vehicleType: "",
      available: true,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "40px 20px",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* =========================
            HEADER
        ========================= */}
        <div style={{ marginBottom: "30px" }}>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: "#64748b",
            }}
          >
            SMART PARKING
          </p>

          <h1
            style={{
              margin: "6px 0",
              color: "#0f172a",
            }}
          >
            Admin Panel
          </h1>

          <p style={{ color: "#64748b" }}>
            Manage parking slots and bookings
          </p>
        </div>


         <button
        onClick={() => window.location.href = "/dashboard"}
        style={{
        padding: "10px 18px",
        border: "none",
        borderRadius: "8px",
        background: "#0f172a",
        color: "white",
        cursor: "pointer",
        marginTop: "10px",
        }}
         >
       Back to Dashboard
      </button>




        {/* =========================
            ADD / UPDATE SLOT
        ========================= */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "30px",
            boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
          }}
        >
          <h2>
            {editingId ? "Update Parking Slot" : "Add Parking Slot"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <input
                type="text"
                name="slotNumber"
                placeholder="Slot Number (Example: A-01)"
                value={formData.slotNumber}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location (Example: Basement 1)"
                value={formData.location}
                onChange={handleChange}
                required
              />

              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="CAR">CAR</option>
                <option value="BIKE">BIKE</option>
              </select>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                />

                Available
              </label>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                {editingId ? "Update Slot" : "Add Slot"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#64748b",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* =========================
            PARKING SLOTS
        ========================= */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "30px",
            boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
          }}
        >
          <h2>Parking Slots</h2>

          {loading ? (
            <p>Loading parking slots...</p>
          ) : slots.length === 0 ? (
            <p>No parking slots found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeader}>ID</th>
                    <th style={tableHeader}>Slot</th>
                    <th style={tableHeader}>Location</th>
                    <th style={tableHeader}>Vehicle</th>
                    <th style={tableHeader}>Status</th>
                    <th style={tableHeader}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {slots.map((slot) => (
                    <tr key={slot.id}>
                      <td style={tableCell}>{slot.id}</td>

                      <td style={tableCell}>
                        {slot.slotNumber}
                      </td>

                      <td style={tableCell}>
                        {slot.location}
                      </td>

                      <td style={tableCell}>
                        {slot.vehicleType}
                      </td>

                      <td style={tableCell}>
                        {slot.available ? (
                          <span style={{ color: "#059669" }}>
                            Available
                          </span>
                        ) : (
                          <span style={{ color: "#dc2626" }}>
                            Booked
                          </span>
                        )}
                      </td>

                      <td style={tableCell}>
                        <button
                          onClick={() => handleEdit(slot)}
                          style={{
                            marginRight: "8px",
                            padding: "7px 12px",
                            border: "none",
                            borderRadius: "6px",
                            background: "#2563eb",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(slot.id)}
                          style={{
                            padding: "7px 12px",
                            border: "none",
                            borderRadius: "6px",
                            background: "#dc2626",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* =========================
            BOOKING MANAGEMENT
        ========================= */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(15, 23, 42, 0.08)",
          }}
        >
          <h2>Booking Management</h2>

          {bookingLoading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeader}>Booking ID</th>
                    <th style={tableHeader}>User</th>
                    <th style={tableHeader}>Email</th>
                    <th style={tableHeader}>Slot</th>
                    <th style={tableHeader}>Location</th>
                    <th style={tableHeader}>Date</th>
                    <th style={tableHeader}>Time</th>
                    <th style={tableHeader}>Status</th>
                    <th style={tableHeader}>Fee</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td style={tableCell}>
                        {booking.id}
                      </td>

                      <td style={tableCell}>
                        {booking.user?.name || "N/A"}
                      </td>

                      <td style={tableCell}>
                        {booking.user?.email || "N/A"}
                      </td>

                      <td style={tableCell}>
                        {booking.parkingSlot?.slotNumber || "N/A"}
                      </td>

                      <td style={tableCell}>
                        {booking.parkingSlot?.location || "N/A"}
                      </td>

                      <td style={tableCell}>
                        {booking.bookingDate}
                      </td>

                      <td style={tableCell}>
                        {booking.startTime} - {booking.endTime}
                      </td>

                      <td style={tableCell}>
                        <span
                          style={{
                            fontWeight: "600",
                            color:
                              booking.status === "COMPLETED"
                                ? "#059669"
                                : booking.status === "CANCELLED"
                                ? "#dc2626"
                                : booking.status === "CHECKED_IN"
                                ? "#d97706"
                                : "#2563eb",
                          }}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td style={tableCell}>
                        {booking.parkingFee != null
                          ? `₹${booking.parkingFee}`
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const tableHeader = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "2px solid #e2e8f0",
  color: "#475569",
};

const tableCell = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
  color: "#0f172a",
};

export default AdminPanel;

