import React, { useEffect, useMemo, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { vignetteCountries } from "../utils/vignetteCountries";
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
  const [vignetteMarkers, setVignetteMarks] = useState([]);
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
      console.log(directionsResult);
      setDirections(directionsResult);
    })();
  }, [origin, destination]);

  useEffect(() => {
    let vignettes = [];
    if (directions.routes) {
      const countriesOnRoute = getCountriesOnRoute(
        directions.routes[routeIndex]
      );
      vignetteCountries.forEach((country) => {
        if (countriesOnRoute.includes(country.countryName)) {
          vignettes.push(country);
        }
      });
      setVignetteMarks(vignettes);
    }
  }, [routeIndex, directions]);

  function getCountriesOnRoute(route) {
    let countries = [];
    route.legs[0].steps.forEach((step) => {
      if (step.instructions.includes("Entering")) {
        const country = step.instructions.split(" ").pop().slice(0, -6);
        countries.push(country);
      }
    });
    return countries;
  }

  return (
    <GoogleMap
      // * options={{ mapId: "c05739993adc7251" }} mapId for custom map style
      zoom={6}
      center={center}
      mapContainerClassName="map__container"
    >
      <DirectionsRenderer
        directions={directions}
        options={{ draggable: false, routeIndex }}
      />
      {vignetteMarkers.length > 0 &&
        vignetteMarkers.map((marker, idx) => (
          <Marker
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
                  <h4 className="bottom-margin">Vignette</h4>
                  {`${marker.duration[0]} - ${marker.costs[0]}`}
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
            className="route"
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </GoogleMap>
  );
}
