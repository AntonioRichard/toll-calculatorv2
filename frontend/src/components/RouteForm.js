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
  const output = useRef();

  const handleSubmit = async () => {
    output.current.scrollIntoView({ behavior: "smooth" });
    setLoaded(false);
    setError("");

    if (startRef.current.value === "" || finishRef.current.value === "") {
      setRes([]);
      setError("Please fill every field");
      setLoaded(true);
      return;
    }

    getDirections(startRef.current.value, finishRef.current.value).then(
      async () => {
        const { data } = await axios.post("api/tolls/route", {
          origin: startRef.current.value,
          destination: finishRef.current.value,
        });

        if (data) {
          switch (data.status) {
            case 400:
              setRes([]);
              setError("Please provide valid locations");
              break;
            case 403:
              setRes([]);
              setError("A server error occured");
              break;
            default:
              setRes(data);
              break;
          }
        }
        setLoaded(true);
      }
    );

    console.log(res);
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
      <div className="container__output" ref={output}>
        {loaded ? (
          <RouteOutput
            res={res}
            error={error}
            origin={startRef.current.value}
            destination={finishRef.current.value}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
