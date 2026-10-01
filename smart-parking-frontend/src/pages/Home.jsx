import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="home-nav">
        <div className="home-brand">
          <div className="brand-icon">P</div>
          <div>
            <h2>SmartPark</h2>
            <span>SMART PARKING SYSTEM</span>
          </div>
        </div>

        <div className="home-nav-links">
          <Link to="/" className="home-active">Home</Link>
          <Link to="/login">Find Parking</Link>
          <Link to="/login">My Bookings</Link>
          <Link to="/login" className="nav-login">Login</Link>
        </div>
      </nav>


      {/* HERO */}
      <section className="home-hero">

        <div className="hero-content">

          <div className="hero-tag">
            <span className="live-dot"></span>
            SMART PARKING • SIMPLE & FAST
          </div>

          <h1>
            Parking Made
            <br />
            <span>Simple & Smart.</span>
          </h1>

          <p>
            Find available parking spaces, reserve your slot,
            and enjoy a seamless parking experience from your
            first click to your final exit.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-button">
              Find Parking
              <span>→</span>
            </Link>

            <Link to="/register" className="secondary-button">
              Get Started
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <strong>Easy</strong>
              <span>Booking</span>
            </div>

            <div className="trust-line"></div>

            <div className="trust-item">
              <strong>QR</strong>
              <span>Entry</span>
            </div>

            <div className="trust-line"></div>

            <div className="trust-item">
              <strong>24/7</strong>
              <span>Access</span>
            </div>
          </div>

        </div>


        {/* PARKING VISUAL */}
        <div className="hero-visual">

          <div className="floating-card card-one">
            <div className="mini-icon">✓</div>
            <div>
              <strong>Slot Reserved</strong>
              <small>A-02 • Basement 1</small>
            </div>
          </div>

          <div className="parking-display">

            <div className="display-top">
              <div>
                <span>SMARTPARK</span>
                <h3>Parking Area</h3>
              </div>

              <div className="online-status">
                <span></span>
                Online
              </div>
            </div>

            <div className="parking-road">

              <div className="parking-row">
                <div className="slot available">
                  <span>A-01</span>
                  <small>AVAILABLE</small>
                </div>

                <div className="slot occupied">
                  <span>A-02</span>
                  <small>BOOKED</small>
                </div>

                <div className="slot available">
                  <span>A-03</span>
                  <small>AVAILABLE</small>
                </div>
              </div>

              <div className="road-line"></div>

              <div className="parking-row">
                <div className="slot occupied">
                  <span>B-01</span>
                  <small>BOOKED</small>
                </div>

                <div className="slot available">
                  <span>B-02</span>
                  <small>AVAILABLE</small>
                </div>

                <div className="slot available">
                  <span>B-03</span>
                  <small>AVAILABLE</small>
                </div>
              </div>

            </div>

            <div className="display-bottom">
              <div>
                <strong>06</strong>
                <span>Available Slots</span>
              </div>

              <div>
                <strong>₹50</strong>
                <span>Starting / Hour</span>
              </div>
            </div>

          </div>

          <div className="floating-card card-two">
            <div className="qr-mini">▦</div>
            <div>
              <strong>QR Check-In</strong>
              <small>Fast & Contactless</small>
            </div>
          </div>

        </div>

      </section>


      {/* STATS */}
      <section className="home-stats">

        <div className="stat">
          <strong>Smart</strong>
          <span>Parking Experience</span>
        </div>

        <div className="stat">
          <strong>Real-Time</strong>
          <span>Slot Availability</span>
        </div>

        <div className="stat">
          <strong>Secure</strong>
          <span>Booking System</span>
        </div>

        <div className="stat">
          <strong>QR</strong>
          <span>Contactless Entry</span>
        </div>

      </section>


      {/* FEATURES */}
      <section className="home-features">

        <div className="section-intro">
          <span>HOW IT WORKS</span>

          <h2>
            Everything you need for
            <br />
            <b>stress-free parking.</b>
          </h2>

          <p>
            From finding a parking space to checking out,
            SmartPark keeps the entire experience simple.
          </p>
        </div>


        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-number">01</div>
            <div className="feature-icon">⌖</div>
            <h3>Find Parking</h3>
            <p>
              Discover available parking spaces and
              choose a convenient location.
            </p>
            <Link to="/login">Explore slots →</Link>
          </div>


          <div className="feature-card feature-highlight">
            <div className="feature-number">02</div>
            <div className="feature-icon">▣</div>
            <h3>Book Your Slot</h3>
            <p>
              Select your preferred time and reserve
              your parking slot in seconds.
            </p>
            <Link to="/login">Book now →</Link>
          </div>


          <div className="feature-card">
            <div className="feature-number">03</div>
            <div className="feature-icon">⌗</div>
            <h3>QR Check-In</h3>
            <p>
              Use your generated QR code for a quick
              and convenient parking entry.
            </p>
            <Link to="/login">Learn more →</Link>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="home-cta">

        <div>
          <span>READY TO PARK SMARTER?</span>

          <h2>
            Your parking space
            <br />
            is just a click away.
          </h2>
        </div>

        <Link to="/register" className="cta-button">
          Create Account →
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="home-footer">

        <div className="footer-brand">
          <div className="brand-icon">P</div>
          <div>
            <strong>SmartPark</strong>
            <span>Smart Parking System</span>
          </div>
        </div>

        <p>
          Making parking simpler, smarter and more convenient.
        </p>

        <span className="footer-copy">
          © 2026 SmartPark
        </span>

      </footer>

    </div>
  );
}

export default Home;