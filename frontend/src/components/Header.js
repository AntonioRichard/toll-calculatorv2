import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { firebase } from "../firebase/firebase";
import { login, logout } from "../actions/auth";
import { startLogout } from "../actions/auth";
import { connect } from "react-redux";
import { store } from "..";

const Header = ({ startLogout, user }) => {
  const [navbar, setNavbar] = useState(false);

  const handleToggle = () => {
    setNavbar(!navbar);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(login(user.uid, user.displayName));
        console.log("User uid: " + user.uid);
      } else {
        store.dispatch(logout());
        console.log("logged out");
      }
    });
  }, []);

  return (
    <div>
      <section className={`navigation`}>
        <div className={`nav-container`}>
          <div className="brand">
            <NavLink id="nav-link" to="/">
              Toll Calculator
            </NavLink>
          </div>
          <nav>
            <div className={`nav-mobile`}>
              <button
                id="nav-toggle"
                onClick={handleToggle}
                className={navbar ? "active" : ""}
              >
                <span></span>
              </button>
            </div>
            <ul className={`nav-list ${navbar ? "active" : ""}`}>
              <li>
                <NavLink to="/" id="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" id="nav-link">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/favourites" id="nav-link">
                  Favorites
                </NavLink>
              </li>
              {user.displayName ? (
                <li className="dropdown">
                  <NavLink id="nav-link">{user.displayName}</NavLink>

                  <ul className="nav-dropdown">
                    <li>
                      <button className="btn-logout" onClick={startLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="dropdown">
                  <NavLink to="/login" id="nav-link">
                    Login
                  </NavLink>
                  <ul className="nav-dropdown">
                    <li>
                      <NavLink to="/register" id="nav-link">
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

const mapStateToProps = ({ auth }) => ({
  user: auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
