import React, { useMemo } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Spinner from "./Spinner";

const libraries = ["places"];

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (!isLoaded) {
    return <Spinner />;
  } else {
    return <RenderedMap />;
  }
}

function RenderedMap() {
  const center = useMemo(() => ({ lat: 45.7, lng: 21.2 }), []);

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName="map__container"
    ></GoogleMap>
  );
}
