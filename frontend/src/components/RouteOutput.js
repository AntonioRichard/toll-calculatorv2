import React from "react";
import { BiTime, BiCoinStack, BiTimer } from "react-icons/bi";
import { RiPinDistanceLine } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { BsPiggyBank } from "react-icons/bs";

const RouteOutput = ({ res }) => {
  return (
    res.map(({ summary, tolls, costs }, index) => (
      <div key={index} className="route-output-container">
        <div className="route-summary">
          <div className="route-header">
            <span className="route-index">{index + 1}</span>
            <div className="tooltip">
              <button className="add-fav">
                <span className="tooltiptext">Add route to favorites</span>
                <GrFavorite />
              </button>
            </div>
          </div>
          <br />
          {summary.diffs.fastest === 0 && (
            <div id="route-diff">
              <BiTimer className="icon" />
              <p>Fastest route</p>
            </div>
          )}
          {summary.diffs.cheapest === 0 && (
            <div id="route-diff">
              <BsPiggyBank className="icon" />
              <p>Cheapest route</p>
            </div>
          )}
          <RiPinDistanceLine className="icon" />
          Distance: {summary.distance.metric} <br />
          <BiTime className="icon" />
          Duration: {summary.duration.text}
          {summary.hasTolls && (
            <p className="total-cost">
              <BiCoinStack className="icon" />
              Total cost: {costs.cash || costs.tag} {tolls[0].currency}
            </p>
          )}
        </div>
        {summary.hasTolls === true ? (
          tolls.map((toll, index) => (
            <p key={index} className="toll-details">
              Toll cost:{toll.cashCost} {toll.currency} <br />
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
    )) || <p>Please provide valid locations!</p>
  );
};

export default RouteOutput;
