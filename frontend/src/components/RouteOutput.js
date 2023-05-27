import React, { useEffect, useRef, useState } from "react";
import { BiTime, BiCoinStack, BiTimer } from "react-icons/bi";
import { RiPinDistanceLine, RiHeartLine } from "react-icons/ri";
import { BsPiggyBank } from "react-icons/bs";
import { RxInfoCircled } from "react-icons/rx";
import { connect } from "react-redux";
import axios from "axios";

const RouteOutput = ({ res, error, user, origin, destination }) => {
  const [authenticated, setAuthenticated] = useState(true);
  const [tooltipMessage, setTooltipMessage] = useState(
    "Add route to favorites"
  );
  const route = useRef();

  useEffect(() => {
    route.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [res]);

  const addToFavorite = async (route, costs, uid) => {
    if (!uid) {
      setAuthenticated(false);
      setTooltipMessage("Please log in to save the route");
      return;
    }

    console.log(route);
    route.origin = origin;
    route.destination = destination;
    route.hasTolls
      ? (route.totalCost = costs.cash || costs.tag)
      : (route.totalCost = route.tollCosts);

    await axios
      .post("api/tolls/favorites", {
        route,
        uid,
      })
      .then(setTooltipMessage("Route added to favorites"));
  };

  return (
    <div ref={route}>
      {res.length > 0 ? (
        res.map(({ summary, tolls, costs }, index) => (
          <div key={index} className="route-output-container">
            <div className="route-summary">
              <div className="route-header">
                <span className="route-index">Route {index + 1}</span>
                <div className="tooltip">
                  <button
                    className="add-fav"
                    onClick={() => addToFavorite(summary, costs, user.uid)}
                  >
                    <span
                      className="tooltiptext"
                      id={!authenticated && "authenticationError"}
                    >
                      {tooltipMessage}
                    </span>
                    <RiHeartLine className="icon" />
                  </button>
                </div>
              </div>
              <br />
              {summary.diffs.fastest === 0 && (
                <div id="route-diff">
                  <BiTimer className="icon" />
                  <p>Fastest</p>
                </div>
              )}
              {summary.cheapestRoute === index && (
                <div id="route-diff">
                  <BsPiggyBank className="icon" />
                  <p>Cheapest</p>
                </div>
              )}
              <RiPinDistanceLine className="icon" />
              Distance: {summary.distance.metric} <br />
              <BiTime className="icon" />
              Duration: {summary.duration.text}
              {summary.nrOfVignettesPerRoute !== 0 && (
                <p className="total-cost">
                  <RxInfoCircled className="icon" />
                  {summary.nrOfVignettesPerRoute} vignette taxes on route{" "}
                  <br></br>
                  <span className="small-text">
                    click the markers for additional information
                  </span>
                </p>
              )}
              {summary.hasTolls ? (
                <p className="total-cost">
                  <BiCoinStack className="icon" />
                  Total cost: {(costs.cash || costs.tag).toFixed(2)}{" "}
                  {tolls[0].currency}
                </p>
              ) : (
                summary.nrOfVignettesPerRoute !== 0 && (
                  <p className="total-cost">
                    <BiCoinStack className="icon" />
                    Total cost: {summary.tollCosts.toFixed(2)} EUR
                  </p>
                )
              )}
            </div>
            {summary.hasTolls === true ? (
              tolls.map((toll, index) => (
                <p key={index} className="toll-details">
                  Toll cost: {toll.cashCost.toFixed(2)} {toll.currency} <br />
                  At: {toll.name || toll.start.name},{" "}
                  {toll.state || toll.start.state} <br />
                  Road: {toll.road || toll.start.road} <br />
                  Type: {toll.type} <br />
                </p>
              ))
            ) : (
              <p>No tolls</p>
            )}
          </div>
        ))
      ) : (
        <p id="errorMessage">{error}</p>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth,
});

export default connect(mapStateToProps)(RouteOutput);
