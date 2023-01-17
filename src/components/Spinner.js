import React from "react";

const Spinner = () => (
  <div className="loader">
    <img className="loader__image" src="images/spinner.gif" alt="spinner" />
    <p className="spinner-message">Calculating routes...</p>
  </div>
);

export default Spinner;
