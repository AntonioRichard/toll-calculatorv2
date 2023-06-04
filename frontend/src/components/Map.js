import React, { useEffect, useMemo, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import Spinner from "./Spinner";

export default function Map({ origin, destination }) {
  const [libraries] = useState(["places"]);
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
  const [routeIndex, setRouteIndex] = useState(0);
  const [vignetteMarkers, setVignetteMarkers] = useState([]);
  const [infoVisible, setInfoVisible] = useState(false);
  const center = useMemo(() => ({ lat: 48.624194, lng: 13.529816 }), []);

  useEffect(() => {
    (async () => {
      if (origin === "" || destination === "") {
        return;
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const directionsResult = await directionsService.route({
        origin,
        destination,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      });

      setDirections(directionsResult);
      setRouteIndex(0);
    })();
  }, [origin, destination]);

  useEffect(() => {
    (async () => {
      if (directions.routes) {
        const { data } = await axios.post("api/tolls/searchVignettes", {
          routes: directions.routes,
        });

        setVignetteMarkers(data);
      }
    })();
  }, [directions]);

  return (
    <GoogleMap
      zoom={6}
      center={center}
      mapContainerClassName="map__container"
      options={{ minZoom: 4 }}
    >
      <DirectionsRenderer directions={directions} options={{ routeIndex }} />
      {vignetteMarkers.length > 0 &&
        vignetteMarkers[routeIndex].map((marker, idx) => (
          <Marker
            title="Vignette tax"
            key={idx}
            position={marker.markerCoordinates}
            clickable={true}
            label={{
              text: "V",
              fontWeight: "600",
              fontSize: "16px",
              color: "yellow",
            }}
            onClick={() => setInfoVisible(!infoVisible)}
          >
            {infoVisible && (
              <InfoWindow
                position={marker.markerCoordinates}
                onCloseClick={() => setInfoVisible(!infoVisible)}
              >
                <div>
                  <h4 className="bottom-margin">
                    {marker.countryName} Vignette
                  </h4>
                  {`${marker.duration} - ${marker.costs}€`}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      <div className="alternative-routes">
        {directions.routes?.map((route, idx) => (
          <button
            key={idx}
            onClick={() => setRouteIndex(idx)}
            className={`route ${idx === routeIndex && "active-route"}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </GoogleMap>
  );
}
