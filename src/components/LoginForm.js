import React from "react";
import { Link } from "react-router-dom";
import { startLoginWithGoogle } from "../actions/auth";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FiLock } from "react-icons/fi";

const LoginForm = ({ handleLogin, startLoginWithGoogle }) => (
  <div>
    <form>
      <div className="container">
        <h1>Login</h1>
        <div className="container__label">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <p>Username</p>
        </div>
        <input
          type="text"
          placeholder="Enter Username"
          id="username"
          required
        />
        <div className="container__label">
          <FiLock className="icon" />
          <p>Password</p>
        </div>
        <input
          type="password"
          placeholder="Enter Password"
          id="password"
          required
        />
        <p id="errorMessage"></p>
        <button className="login-btn" type="submit" onClick={handleLogin}>
          Login
        </button>
        <button
          onClick={startLoginWithGoogle}
          className="login-btn login-btn--google"
        >
          <FontAwesomeIcon
            icon={faGoogle}
            size="sm"
            className="icon icon--google"
          />
          Login with Google
        </button>
        <Link className="login__a" href="#">
          Forgot password?
        </Link>
        <p>
          Not registered yet?
          <Link className="login__a" to="/register">
            {" "}
            Sign up now
          </Link>
        </p>
      </div>
    </form>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
});

export default connect(undefined, mapDispatchToProps)(LoginForm);
