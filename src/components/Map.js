import React, { useMemo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <RenderedMap />;
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
