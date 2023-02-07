import React from "react";

const Spinner = () => (
  <div className="loader">
    <img className="loader__image" src="images/spinner.gif" alt="" />
    <p className="spinner-message">Loading...</p>
  </div>
);

export default Spinner;
