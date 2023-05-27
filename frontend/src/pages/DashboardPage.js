import React, { useState } from "react";
import RouteForm from "../components/RouteForm";
import Map from "../components/Map";

function DashboardPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const getDirections = (origin, destination) => {
    return new Promise((resolve, reject) => {
      setOrigin(origin);
      setDestination(destination);

      resolve();
    });
  };

  return (
    <div className="wrapper">
      <RouteForm getDirections={getDirections} />
      <Map origin={origin} destination={destination} />
    </div>
  );
}

export default DashboardPage;
