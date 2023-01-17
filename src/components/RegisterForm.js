import React from "react";
import { Link } from "react-router-dom";
import { FiLock, FiUser } from "react-icons/fi";
import { BiEnvelope } from "react-icons/bi";

const RegisterForm = (props) => (
  <form>
    <div className="container-register">
      <h1>Register</h1>
      <div className="container__label">
        <FiUser className="icon" />
        <p>Username</p>
      </div>
      <input
        type="text"
        placeholder="Enter Username"
        id="username"
        maxLength="15"
        name="test"
        required
      />
      <div className="container__label">
        <BiEnvelope className="icon" />
        <p>Email</p>
      </div>
      <input
        type="email"
        placeholder="Enter Email"
        id="email"
        maxLength="40"
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
        maxLength="15"
        required
      />
      <div className="container__label">
        <FiLock className="icon" />
        <p>Confirm password</p>
      </div>
      <input
        type="password"
        placeholder="Confirm Password"
        id="confirmPassword"
        maxLength="15"
        required
      />
      <div className="error__container">
        <p id="errorMessage"></p>
      </div>
      <button
        type="submit"
        className="login-btn"
        onClick={props.handleRegister}
      >
        Register
      </button>
      <p>
        Already have an account?
        <Link className="login__a" to="/login">
          Login
        </Link>
      </p>
    </div>
  </form>
);

export default RegisterForm;
