import React, { useState } from "react";
import { fetchData } from "../api/fetchData";
import Map from "./Map";
import RouteOutput from "./RouteOutput";
import Spinner from "./Spinner";

export default function RouteForm() {
  const [start, setStart] = useState("");
  const [finish, setFinish] = useState("");
  const [res, setRes] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState("");

  const onStartChange = (e) => {
    setStart(e.target.value);
  };

  const onFinishChange = (e) => {
    setFinish(e.target.value);
  };

  return (
    <div className="wrapper">
      <div className="container__input">
        <div className="container__inputbox">
          <p className="input-label">Origin</p>
          <input
            type="text"
            placeholder="Starting point"
            id="start"
            value={start}
            onChange={onStartChange}
          />
          <p className="input-label">Destination</p>
          <input
            type="text"
            placeholder="Destination"
            id="finish"
            value={finish}
            onChange={onFinishChange}
          />
          <button
            className="login-btn"
            onClick={() => {
              setLoaded(false);
              setError("");
              return fetchData(start, finish).then(function (result) {
                if (result) {
                  setRes(result);
                } else {
                  setRes([]);
                  setError("Please provide valid locations");
                }
                setLoaded(true);
                console.log(result);
              });
            }}
          >
            Submit
          </button>
        </div>
        <div className="container__output">
          {loaded ? <RouteOutput res={res} /> : <Spinner />}
          {error && <p>{error}</p>}
        </div>
      </div>
      <div className="map__container map__container--dashboard">
        <Map />
      </div>
    </div>
  );
}
