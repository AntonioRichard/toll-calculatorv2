import React from "react";
import { store } from "..";
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  handleLogin = (e) => {
    e.preventDefault();

    const state = store.getState();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const status = document.getElementById("errorMessage");
    let isUserRegistered = false;

    state.accounts.map((account) => {
      if (account.username === username && account.password === password) {
        isUserRegistered = true;
      }
    });
    isUserRegistered
      ? (status.innerHTML = "Login successfull")
      : (status.innerHTML = "Wrong username or password");
  };

  render() {
    return <LoginForm handleLogin={this.handleLogin} />;
  }
}
