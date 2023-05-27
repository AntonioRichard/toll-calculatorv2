import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "./firebase/firebase";

export const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

const root = createRoot(document.getElementById("root"));
root.render(jsx);
