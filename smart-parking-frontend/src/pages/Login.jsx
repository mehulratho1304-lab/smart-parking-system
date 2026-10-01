
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      // Save JWT token
      localStorage.setItem("token", data.token);

      console.log("JWT TOKEN SAVED");

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-intro">

        <Link to="/" className="login-brand">
          <div className="login-brand-icon">P</div>

          <div>
            <strong>SmartPark</strong>
            <span>SMART PARKING SYSTEM</span>
          </div>
        </Link>

        <div className="login-intro-content">

          <span className="login-label">
            WELCOME BACK
          </span>

          <h1>
            Your parking
            <br />
            <span>starts here.</span>
          </h1>

          <p>
            Access your SmartPark account to find parking,
            manage your bookings and enjoy a seamless
            parking experience.
          </p>

          <div className="login-benefits">

            <div>
              <span>✓</span>
              <div>
                <strong>Easy Booking</strong>
                <small>Reserve your parking slot quickly.</small>
              </div>
            </div>

            <div>
              <span>✓</span>
              <div>
                <strong>QR Check-In</strong>
                <small>Enter with your digital QR code.</small>
              </div>
            </div>

            <div>
              <span>✓</span>
              <div>
                <strong>Simple Management</strong>
                <small>Manage all your bookings in one place.</small>
              </div>
            </div>

          </div>

        </div>

        <div className="login-footer-text">
          Smart parking made simple.
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="login-form-section">

        <div className="login-box">

          <div className="mobile-login-brand">
            <div className="login-brand-icon">P</div>
            <strong>SmartPark</strong>
          </div>

          <div className="login-heading">

            <span>ACCOUNT LOGIN</span>

            <h2>Welcome back</h2>

            <p>
              Enter your details to continue.
            </p>

          </div>


          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">
                <span className="input-icon">@</span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

            </div>


            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">••</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

            </div>


            {error && (
              <p className="error-message">
                {error}
              </p>
            )}


            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to SmartPark"}

              {!loading && <span>→</span>}
            </button>

          </form>


          <div className="login-divider">
            <span>SECURE ACCESS</span>
          </div>


          <p className="register-text">
            Don't have an account?
            <Link to="/register"> Create one</Link>
          </p>


          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;

