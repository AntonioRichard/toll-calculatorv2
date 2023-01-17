import React from "react";
import { addAccount } from "../actions/accounts";
import { store } from "..";
import RegisterForm from "./RegisterForm";

export default class Register extends React.Component {
  usernameDuplicate = (accounts, username) => {
    let isDuplicate = false;

    accounts.map((account) => {
      if (account.username === username) {
        isDuplicate = true;
      }
    });
    return isDuplicate;
  };

  validateEmail = (email) => {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email) ? true : false;
  };

  emailDuplicate = (accounts, email) => {
    let isDuplicate = false;

    accounts.map((account) => {
      if (account.email === email) {
        isDuplicate = true;
      }
    });
    return isDuplicate;
  };

  handleErrorInput = (id) =>
    (document.getElementById(id).className = "wrong-input");

  handleRemoveError = (id) =>
    document.getElementById(id).classList.remove("wrong-input");

  handleRegister = (e) => {
    e.preventDefault();

    const state = store.getState();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMessage = document.getElementById("errorMessage");
    let errorCode = 0;

    //validation
    username.length < 5 ? (errorCode = 1) : this.handleRemoveError("username");

    if (state.accounts.length !== 0) {
      this.usernameDuplicate(state.accounts, username)
        ? (errorCode = 2)
        : this.handleRemoveError("username");
      this.emailDuplicate(state.accounts, email)
        ? (errorCode = 6)
        : this.handleRemoveError("email");
    }

    this.validateEmail(email)
      ? this.handleRemoveError("email")
      : (errorCode = 3);

    password.length < 5 ? (errorCode = 4) : this.handleRemoveError("password");

    if (confirmPassword !== password) {
      errorCode = 5;
    } else {
      this.handleRemoveError("password");
      this.handleRemoveError("confirmPassword");
    }

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      errorCode = 7;
    }

    switch (errorCode) {
      case 0:
        //all validations passed
        store.dispatch(addAccount({ username, email, password }));
        errorMessage.innerHTML = "Registered successfully";
        break;
      case 1:
        errorMessage.innerHTML = "Username must be at least 5 characters long";
        this.handleErrorInput("username");
        break;
      case 2:
        errorMessage.innerHTML = "Username already used";
        this.handleErrorInput("username");
        break;
      case 3:
        errorMessage.innerHTML = "Please enter a valid email address";
        this.handleErrorInput("email");
        break;
      case 4:
        errorMessage.innerHTML = "Password must be at least 5 characters long";
        this.handleErrorInput("password");
        break;
      case 5:
        errorMessage.innerHTML = "Passwords don't match";
        this.handleErrorInput("password");
        this.handleErrorInput("confirmPassword");
        break;
      case 6:
        errorMessage.innerHTML = "Email aldready used";
        this.handleErrorInput("email");
        break;
      case 7:
        errorMessage.innerHTML = "Please fill every field";
        this.handleErrorInput("username");
        this.handleErrorInput("email");
        this.handleErrorInput("password");
        this.handleErrorInput("confirmPassword");
        break;
      default:
        return;
    }

    console.log(store.getState());
  };

  render() {
    return <RegisterForm handleRegister={this.handleRegister} />;
  }
}
