
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            password: password
          })
        }
      );


      if (!response.ok) {

        const message = await response.text();

        throw new Error(
          message || "Registration failed"
        );

      }


      const data = await response.json();

      console.log("REGISTER RESPONSE:", data);


      alert("Registration successful!");

      navigate("/login");


    } catch (error) {

      console.error("REGISTER ERROR:", error);

      setError(error.message);

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="register-page">


      {/* LEFT SIDE */}

      <div className="register-intro">

        <Link to="/" className="register-brand">

          <div className="register-brand-icon">
            P
          </div>

          <div>
            <strong>SmartPark</strong>
            <span>SMART PARKING SYSTEM</span>
          </div>

        </Link>


        <div className="register-intro-content">

          <span className="register-label">
            JOIN SMARTPARK
          </span>

          <h1>
            Start your
            <br />
            <span>smart parking</span>
            <br />
            journey.
          </h1>

          <p>
            Create your SmartPark account and make
            parking easier, faster and more convenient.
          </p>


          <div className="register-benefits">

            <div>

              <span>01</span>

              <div>
                <strong>Find Available Slots</strong>
                <small>Check parking availability easily.</small>
              </div>

            </div>


            <div>

              <span>02</span>

              <div>
                <strong>Reserve Your Space</strong>
                <small>Book your preferred parking slot.</small>
              </div>

            </div>


            <div>

              <span>03</span>

              <div>
                <strong>Park With QR</strong>
                <small>Use QR check-in for easy entry.</small>
              </div>

            </div>

          </div>

        </div>


        <div className="register-footer-text">
          Parking smarter starts here.
        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="register-form-section">

        <div className="register-box">


          {/* MOBILE BRAND */}

          <div className="mobile-register-brand">

            <div className="register-brand-icon">
              P
            </div>

            <strong>SmartPark</strong>

          </div>


          <div className="register-heading">

            <span>CREATE ACCOUNT</span>

            <h2>Get started</h2>

            <p>
              Create your account to start parking smarter.
            </p>

          </div>


          <form onSubmit={handleRegister}>


            <div className="register-input-group">

              <label>Full Name</label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  ◉
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

              </div>

            </div>


            <div className="register-input-group">

              <label>Email Address</label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  @
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

            </div>


            <div className="register-input-group">

              <label>Phone Number</label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  #
                </span>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

              </div>

            </div>


            <div className="register-input-group">

              <label>Password</label>

              <div className="register-input-wrapper">

                <span className="register-input-icon">
                  ••
                </span>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

            </div>


            {error && (

              <p className="register-error">
                {error}
              </p>

            )}


            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create SmartPark Account"
              }

              {!loading && <span>→</span>}

            </button>


          </form>


          <div className="register-divider">
            <span>SECURE REGISTRATION</span>
          </div>


          <p className="login-text">

            Already have an account?

            {" "}

            <Link to="/login">
              Login
            </Link>

          </p>


          <Link to="/" className="register-back-home">
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Register;

