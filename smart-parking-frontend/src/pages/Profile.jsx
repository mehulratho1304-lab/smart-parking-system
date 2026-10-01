
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        return response.json();
      })
      .then((data) => {
        console.log("PROFILE DATA:", data);
        setProfile(data);
      })
      .catch((error) => {
        console.error("PROFILE ERROR:", error);
        setError("Unable to load profile");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  /* ERROR */

  if (error) {
    return (
      <div className="profile-page">

        <div className="profile-message-card">

          <div className="profile-error-icon">
            !
          </div>

          <h2>Unable to Load Profile</h2>

          <p>{error}</p>

          <Link to="/dashboard" className="profile-message-button">
            Back to Dashboard
          </Link>

        </div>

      </div>
    );
  }


  /* LOADING */

  if (!profile) {
    return (
      <div className="profile-page">

        <div className="profile-message-card">

          <div className="profile-spinner"></div>

          <h3>Loading Profile</h3>

          <p>Please wait while we load your account information.</p>

        </div>

      </div>
    );
  }


  return (
    <div className="profile-page">


      {/* NAVBAR */}

      <nav className="profile-nav">

        <Link to="/dashboard" className="profile-brand">

          <div className="profile-brand-icon">
            P
          </div>

          <div>
            <strong>SmartPark</strong>
            <span>SMART PARKING SYSTEM</span>
          </div>

        </Link>


        <div className="profile-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/bookings">
            My Bookings
          </Link>

          <Link to="/profile" className="profile-active-link">
            Profile
          </Link>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </nav>


      {/* MAIN CONTENT */}

      <main className="profile-content">


        {/* PAGE HEADER */}

        <section className="profile-page-header">

          <div>

            <span className="profile-label">
              ACCOUNT
            </span>

            <h1>
              My Profile
            </h1>

            <p>
              View your personal and account information.
            </p>

          </div>


          <div className="profile-top-avatar">

            {profile.name
              ? profile.name.charAt(0).toUpperCase()
              : "U"}

          </div>

        </section>


        {/* PROFILE CARD */}

        <section className="profile-card">


          {/* PROFILE SUMMARY */}

          <div className="profile-summary">

            <div className="profile-large-avatar">

              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "U"}

            </div>


            <div className="profile-summary-info">

              <h2>
                {profile.name}
              </h2>

              <p>
                {profile.email}
              </p>

              <span className="profile-status">
                <span></span>
                Active Account
              </span>

            </div>

          </div>


          {/* DIVIDER */}

          <div className="profile-divider"></div>


          {/* INFORMATION */}

          <div className="profile-section-heading">

            <div>

              <span>
                PERSONAL DETAILS
              </span>

              <h3>
                Account Information
              </h3>

            </div>

          </div>


          <div className="profile-info-grid">


            {/* NAME */}

            <div className="profile-info-box">

              <div className="profile-info-icon">
                👤
              </div>

              <div>

                <span>
                  FULL NAME
                </span>

                <strong>
                  {profile.name}
                </strong>

              </div>

            </div>


            {/* EMAIL */}

            <div className="profile-info-box">

              <div className="profile-info-icon">
                @
              </div>

              <div>

                <span>
                  EMAIL ADDRESS
                </span>

                <strong>
                  {profile.email}
                </strong>

              </div>

            </div>


            {/* PHONE */}

            <div className="profile-info-box">

              <div className="profile-info-icon">
                ☎
              </div>

              <div>

                <span>
                  PHONE NUMBER
                </span>

                <strong>
                  {profile.phone || "Not provided"}
                </strong>

              </div>

            </div>


            {/* USER ID */}

            <div className="profile-info-box">

              <div className="profile-info-icon">
                #
              </div>

              <div>

                <span>
                  USER ID
                </span>

                <strong>
                  #{profile.id}
                </strong>

              </div>

            </div>

          </div>


          {/* SECURITY MESSAGE */}

          <div className="profile-security">

            <div className="security-icon">
              🔐
            </div>

            <div>

              <strong>
                Secure Account
              </strong>

              <p>
                Your profile information is protected using
                secure authentication.
              </p>

            </div>

          </div>

        </section>


        {/* QUICK ACTIONS */}

        <section className="profile-actions">

          <Link to="/bookings" className="profile-action-card">

            <div className="action-icon">
              ▣
            </div>

            <div>
              <strong>My Bookings</strong>
              <span>View your parking reservations</span>
            </div>

            <b>→</b>

          </Link>


          <Link to="/dashboard" className="profile-action-card">

            <div className="action-icon">
              P
            </div>

            <div>
              <strong>Find Parking</strong>
              <span>Explore available parking slots</span>
            </div>

            <b>→</b>

          </Link>

        </section>


      </main>

    </div>
  );
}

export default Profile;
