import React, { useRef, useState } from "react";
import axios from "axios";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import RouteOutput from "./RouteOutput";
import Spinner from "./Spinner";

const libraries = ["places"];

export default function RouteForm({ getDirections }) {
  const [res, setRes] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState("");

  const startRef = useRef("");
  const finishRef = useRef("");

  const handleSubmit = async () => {
    setLoaded(false);
    setError("");
    try {
      const { data } = await axios.post("api/tolls/getTolls", {
        origin: startRef.current.value,
        destination: finishRef.current.value,
      });
      setRes(data);
      setLoaded(true);
      getDirections(startRef.current.value, finishRef.current.value);
      console.log(data);
    } catch (error) {
      console.log(error);
      setRes([]);
      setError("Please provide valid locations");
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <div className="container__input">
      <div className="container__inputbox">
        <p className="input-label">Origin</p>
        <Autocomplete>
          <input
            type="text"
            placeholder="Starting point"
            id="start"
            ref={startRef}
          />
        </Autocomplete>
        <p className="input-label">Destination</p>
        <Autocomplete>
          <input
            type="text"
            placeholder="Destination"
            id="finish"
            ref={finishRef}
          />
        </Autocomplete>
        <button className="login-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="container__output">
        {loaded ? <RouteOutput res={res} /> : <Spinner />}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
