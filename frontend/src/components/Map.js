import React, { useMemo, useState, useEffect } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import Spinner from "./Spinner";

const libraries = ["places"];

export default function Map({ origin, destination }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (!isLoaded) {
    return <Spinner />;
  } else {
    return <RenderedMap origin={origin} destination={destination} />;
  }
}

function RenderedMap({ origin, destination }) {
  const [directions, setDirections] = useState({});
  const center = useMemo(() => ({ lat: 45.7, lng: 21.2 }), []);

  useEffect(() => {
    async function calculateRoute() {
      if (origin === "" || destination === "") {
        return;
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const route = await directionsService.route({
        origin,
        destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      });
      setDirections(route);
    }
    calculateRoute();
  }, [origin, destination]);

  return (
    <div>
      <GoogleMap
        zoom={8}
        center={center}
        mapContainerClassName="map__container"
      >
        <DirectionsRenderer
          directions={directions}
          panel={document.getElementById("directionsPanel")}
        />
      </GoogleMap>
      <div id="directionsPanel"></div>
    </div>
  );
}
