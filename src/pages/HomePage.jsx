import React from "react";
import "../css/flaticon.min.css";
import "../css/style.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomePage(props) {
  return (
    <div>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <ul className="header-top-list">
              <li className="header-top-item">
                <ion-icon name="call-outline" aria-hidden="true" />
                <p className="item-title">Call Us :</p>
                <a href="tel:01234567895" className="item-link">
                  012 (345) 67 895
                </a>
              </li>
              <li className="header-top-item">
                <ion-icon name="time-outline" aria-hidden="true" />
                <p className="item-title">Opening Hour :</p>
                <p className="item-text">Sunday - Friday, 08 am - 09 pm</p>
              </li>
              <li>
                <ul className="social-list">
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="logo-youtube" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="social-link">
                      <ion-icon name="chatbubble-ellipses-outline" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-bottom" data-header>
          <div className="container">
            <a href="#" className="logo">
              Barber
              <span className="span">Hair Salon</span>
            </a>
            <nav className="navbar container" data-navbar>
              <ul className="navbar-list">
                <li className="navbar-item">
                  <a href="#home" className="navbar-link" data-nav-link>
                    Home
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#services" className="navbar-link" data-nav-link>
                    Services
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#pricing" className="navbar-link" data-nav-link>
                    Pricing
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#gallery" className="navbar-link" data-nav-link>
                    Gallery
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#appointment" className="navbar-link" data-nav-link>
                    Appointment
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="#" className="navbar-link" data-nav-link>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
            <button
              className="nav-toggle-btn"
              aria-label="toggle menu"
              data-nav-toggler
            >
              <ion-icon name="menu-outline" aria-hidden="true" />
            </button>
            <a href="#" className="btn has-before">
              <Link to={"/login"}>
                <span className="span">Login</span>
              </Link>

              <ion-icon name="arrow-forward" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>
      <main>
        <article>
          {/* HERO */}
          <section
            className="section hero has-before has-bg-image"
            id="home"
            aria-label="home"
            style={{
              backgroundImage: 'url("./assets/images/hero-banner.jpg")',
            }}
          >
            <motion.div
              variants={{
                hidden: { y: "-100vh", opacity: 0 },
                visible: {
                  y: "-1px",
                  opacity: 1,
                  transition: {
                    delay: 0.5,
                    type: "spring",
                    stiffness: 30,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className="container"
            >
              <h1 className="h1 hero-title">Barbers &amp; Hair Cutting</h1>
              <p className="hero-text">
                Sit amet consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua suspendisse ultrices
                gravida
              </p>
              <a href="#" className="btn has-before">
                <span className="span">Explore Our Services</span>
                <ion-icon name="arrow-forward" aria-hidden="true" />
              </a>
            </motion.div>
          </section>
          {/* SERVICE */}
          <section
            className="section service"
            id="services"
            aria-label="services"
          >
            <div className="container">
              <h2 className="h2 section-title text-center">
                Service We Provide
              </h2>
              <p className="section-text text-center">
                Sit amet consectetur adipiscing elit sed do eiusmod tempor
                incididunt labore dolore magna aliqua suspendisse
              </p>
              <ul className="grid-list">
                <li>
                  <div className="service-card">
                    <div className="card-icon">
                      <i className="flaticon-salon" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">
                        Hair Cutting Style
                      </a>
                    </h3>
                    <p className="card-text">
                      Sit amet consectetur adipisci elit sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a href="#" className="card-btn" aria-label="more">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="service-card">
                    <div className="card-icon">
                      <i className="flaticon-shampoo" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">
                        Hair Washing
                      </a>
                    </h3>
                    <p className="card-text">
                      Sit amet consectetur adipisci elit sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a href="#" className="card-btn" aria-label="more">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="service-card">
                    <div className="card-icon">
                      <i className="flaticon-hot-stone" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">
                        Body Treatments
                      </a>
                    </h3>
                    <p className="card-text">
                      Sit amet consectetur adipisci elit sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a href="#" className="card-btn" aria-label="more">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="service-card">
                    <div className="card-icon">
                      <i className="flaticon-treatment" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">
                        Beauty &amp; Spa
                      </a>
                    </h3>
                    <p className="card-text">
                      Sit amet consectetur adipisci elit sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a href="#" className="card-btn" aria-label="more">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="service-card">
                    <div className="card-icon">
                      <i className="flaticon-shaving-razor" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">
                        Stylist Shaving
                      </a>
                    </h3>
                    <p className="card-text">
                      Sit amet consectetur adipisci elit sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a href="#" className="card-btn" aria-label="more">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="service-card">
                    <div className="card-icon">
                      <i className="flaticon-hair-dye" />
                    </div>
                    <h3 className="h3">
                      <a href="#" className="card-title">
                        Multi Hair Colors
                      </a>
                    </h3>
                    <p className="card-text">
                      Sit amet consectetur adipisci elit sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a href="#" className="card-btn" aria-label="more">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          {/* PRICING */}
          <section
            className="section pricing has-bg-image has-before"
            id="pricing"
            aria-label="pricing"
            style={{ backgroundImage: 'url("./assets/images/pricing-bg.jpg")' }}
          >
            <div className="container">
              <h2 className="h2 section-title text-center">Pricing Plan</h2>
              <p className="section-text text-center">
                Sit amet consectetur adipiscing elit sed do eiusmod tempor
                incididunt labore dolore magna aliqua suspendisse
              </p>
              <ul className="grid-list">
                <li>
                  <div className="pricing-card">
                    <div className="card-banner">
                      <img
                        src="./assets/images/pricing-1.jpg"
                        width="400"
                        height="400"
                        loading="lazy"
                        alt="Haircuts"
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <div className="pricing-wrapper">
                        <p className="pricing">$35.00</p>
                        <p className="pricing-text">Haircuts</p>
                      </div>
                      <ul className="card-list">
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Lorem ipsum dolor sit</span>
                        </li>
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Amet consectetur adip</span>
                        </li>
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Elit eiusmod tempor</span>
                        </li>
                      </ul>
                      <a href="#" className="btn has-before">
                        <span className="span">Book Now</span>
                        <ion-icon name="arrow-forward" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pricing-card">
                    <div className="card-banner">
                      <img
                        src="./assets/images/pricing-2.jpg"
                        width="400"
                        height="400"
                        loading="lazy"
                        alt="Beards"
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <div className="pricing-wrapper">
                        <p className="pricing">$45.00</p>
                        <p className="pricing-text">Beards</p>
                      </div>
                      <ul className="card-list">
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Lorem ipsum dolor sit</span>
                        </li>
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Amet consectetur adip</span>
                        </li>
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Elit eiusmod tempor</span>
                        </li>
                      </ul>
                      <a href="#" className="btn has-before">
                        <span className="span">Book Now</span>
                        <ion-icon name="arrow-forward" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pricing-card">
                    <div className="card-banner">
                      <img
                        src="./assets/images/pricing-3.jpg"
                        width="400"
                        height="400"
                        loading="lazy"
                        alt="Colors"
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <div className="pricing-wrapper">
                        <p className="pricing">$85.00</p>
                        <p className="pricing-text">Colors</p>
                      </div>
                      <ul className="card-list">
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Lorem ipsum dolor sit</span>
                        </li>
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Amet consectetur adip</span>
                        </li>
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Elit eiusmod tempor</span>
                        </li>
                      </ul>
                      <a href="#" className="btn has-before">
                        <span className="span">Book Now</span>
                        <ion-icon name="arrow-forward" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="pricing-card">
                    <div className="card-banner">
                      <img
                        src="./assets/images/pricing-4.jpg"
                        width="400"
                        height="400"
                        loading="lazy"
                        alt="Massages"
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <div className="pricing-wrapper">
                        <p className="pricing">$45.00</p>
                        <p className="pricing-text">Massages</p>
                      </div>
                      <ul className="card-list">
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Lorem ipsum dolor sit</span>
                        </li>
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Amet consectetur adip</span>
                        </li>
                        <li className="card-item">
                          <ion-icon
                            name="checkmark-outline"
                            aria-hidden="true"
                          />
                          <span className="span">Elit eiusmod tempor</span>
                        </li>
                      </ul>
                      <a href="#" className="btn has-before">
                        <span className="span">Book Now</span>
                        <ion-icon name="arrow-forward" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          {/* GALLERY */}
          <section
            className="section gallery"
            id="gallery"
            aria-label="gallery"
          >
            <div className="container">
              <h2 className="h2 section-title text-center">Our Gallery</h2>
              <p className="section-text text-center">
                Sit amet consectetur adipiscing elit sed do eiusmod tempor
                incididunt labore dolore magna aliqua suspendisse
              </p>
              <ul className="grid-list">
                <li>
                  <div className="gallery-card">
                    <div className="card-banner">
                      <img
                        src="./assets/images/gallery-1.jpg"
                        width="600"
                        height="660"
                        loading="lazy"
                        alt="Hair Cutting"
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <h3 className="h3 card-title">Hair Cutting</h3>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="gallery-card">
                    <div className="card-banner">
                      <img
                        src="./assets/images/gallery-2.jpg"
                        width="600"
                        height="660"
                        loading="lazy"
                        alt="Beard Style"
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <h3 className="h3 card-title">Beard Style</h3>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="gallery-card">
                    <div className="card-banner">
                      <img
                        src="./assets/images/gallery-3.jpg"
                        width="600"
                        height="660"
                        loading="lazy"
                        alt="Face Masking"
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <h3 className="h3 card-title">Face Masking</h3>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="gallery-card">
                    <div className="card-banner">
                      <img
                        src="./assets/images/gallery-4.jpg"
                        width="600"
                        height="660"
                        loading="lazy"
                        alt="Body Message"
                        className="img-cover"
                      />
                    </div>
                    <div className="card-content">
                      <h3 className="h3 card-title">Body Message</h3>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          {/* 
  - #APPOINTMENT
*/}
          <section
            className="section appoin"
            id="appointment"
            aria-label="appointment"
          >
            <div className="container">
              <div className="appoin-card">
                <figure
                  className="card-banner img-holder"
                  style={{ width: 250, height: 774 }}
                >
                  <img
                    src="./assets/images/appoin-banner-1.jpg"
                    width={250}
                    height={774}
                    loading="lazy"
                    alt=""
                    className="img-cover"
                  />
                </figure>
                <div className="card-content">
                  <h2 className="h2 section-title">Make Appointment</h2>
                  <p className="section-text">
                    Sit amet consectetur adipiscing elit sed do eiusmod tempor
                    incididunt labore dolore magna aliqua suspendisse
                  </p>
                  <form action="" className="appoin-form">
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name"
                        required
                        className="input-field"
                      />
                      <input
                        type="email"
                        name="email_address"
                        placeholder="Email Address"
                        required
                        className="input-field"
                      />
                    </div>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        className="input-field"
                      />
                      <select name="category" className="input-field">
                        <option value="Select category">Select category</option>
                        <option value="Beauty & spa">Beauty &amp; spa</option>
                        <option value="Body massage">Body massage</option>
                        <option value="Shaving & Facial">
                          Shaving &amp; Facial
                        </option>
                        <option value="Hair Color">Hair Color</option>
                      </select>
                    </div>
                    <input
                      type="date"
                      name="date"
                      required
                      className="input-field date"
                    />
                    <textarea
                      name="message"
                      placeholder="Write Message"
                      required
                      className="input-field"
                      defaultValue={""}
                    />
                    <button type="submit" className="form-btn">
                      <span className="span">Appointment Now</span>
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </button>
                  </form>
                </div>
                <figure
                  className="card-banner img-holder"
                  style={{ width: 250, height: 774 }}
                >
                  <img
                    src="./assets/images/appoin-banner-2.jpg"
                    width={250}
                    height={774}
                    loading="lazy"
                    alt=""
                    className="img-cover"
                  />
                </figure>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

export default HomePage;
