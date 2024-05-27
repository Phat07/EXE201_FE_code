import React from "react";
import "../css/flaticon.min.css";
import "../css/style.css";
import { Link, Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
function Header(props) {
  return (
    <>
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
                  {/* <a href="#" className="navbar-link" data-nav-link>
                  Contact
                </a> */}
                  <Link className="navbar-link" to={"/create_shop"}>
                    CreateShop
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link className="navbar-link" to={"/baber"}>
                    Barber
                  </Link>
                </li>
              </ul>
            </nav>
            <button
              className="nav-toggle-btn"
              aria-label="toggle menu"
              data-nav-toggler
            >
              <IoMenu />
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
      <Outlet />
    </>
  );
}

export default Header;
