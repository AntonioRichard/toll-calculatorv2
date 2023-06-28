import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import database, { firebase } from "../firebase/firebase";
import { login, logout } from "../actions/auth";
import { startLogout } from "../actions/auth";
import { connect } from "react-redux";
import { store } from "..";

const Header = ({ startLogout, user }) => {
  const [navbar, setNavbar] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleToggle = () => {
    setNavbar(!navbar);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        store.dispatch(login(user.uid, user.displayName, user.photoURL));
        database
          .ref(`users/${user.uid}`)
          .update({ username: user.displayName });
      } else {
        setAuthenticated(false);
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
                <NavLink to="/favorites" id="nav-link">
                  Favorites
                </NavLink>
              </li>
              {authenticated ? (
                <li className="dropdown">
                  <NavLink id="nav-link">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        className="profile-picture"
                        alt=""
                      />
                    )}
                    {user.displayName}
                  </NavLink>

                  <ul className="nav-dropdown">
                    <li>
                      <button className="btn-logout" onClick={startLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="unauthenticated-button">
                  <NavLink to="/login" id="login-button" className="active">
                    Login
                  </NavLink>
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
