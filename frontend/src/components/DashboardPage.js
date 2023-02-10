import React, { useState } from "react";
import RouteForm from "./RouteForm";
import Map from "./Map";

function DashboardPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const getDirections = (origin, destination) => {
    setOrigin(origin);
    setDestination(destination);
  };

  return (
    <div className="wrapper">
      <RouteForm getDirections={getDirections} />
      <div className="map__container--dashboard">
        <Map origin={origin} destination={destination} />
      </div>
    </div>
  );
}

export default DashboardPage;
