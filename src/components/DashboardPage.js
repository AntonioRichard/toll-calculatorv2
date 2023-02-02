import React from "react";
import RouteForm from "./RouteForm";
import Map from "./Map";

export default class DashboardPage extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <RouteForm />
        <div className="map__container--dashboard">
          <Map />
        </div>
      </div>
    );
  }
}
