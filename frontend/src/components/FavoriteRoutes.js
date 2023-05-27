import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const FavoriteRoutes = ({ uid }) => {
  const [routes, setRoutes] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteRoute, setDeleteRoute] = useState(null);
  const [reloadRoutes, setReloadRoutes] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("api/tolls/favorites", {
        headers: {
          "Content-Type": "application/json",
          uid,
        },
      });
      if (data) {
        setRoutes(data);
      }
    })();
  }, [reloadRoutes]);

  const handleDeleteButton = (route) => {
    setDeleteRoute(route);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    await axios
      .delete("api/tolls/favorites", {
        data: {
          route: deleteRoute,
          uid,
        },
      })
      .then(setReloadRoutes(true));
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="routes-container">
      {routes &&
        Object.keys(routes).map((routeKey) => {
          const route = routes[routeKey];
          return (
            <div className="cell" key={routeKey}>
              <div className="cell-header">{routeKey}</div>
              <p>
                Distance: <span>{route.route.distance.metric}</span>
              </p>
              <p>
                Duration: <span>{route.route.duration.text}</span>
              </p>
              <p>
                Cost: <span>{route.route.totalCost.toFixed(2)} EUR</span>
              </p>
              <p className="cell-footer">
                Route:
                <a
                  className="route-link"
                  href={route.route.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click to view route
                </a>
              </p>
              <MdDelete
                className="delete-button"
                onClick={() => handleDeleteButton(routeKey)}
              ></MdDelete>
              {showModal && (
                <div className="modal">
                  <div onClick={handleCancelDelete} className="overlay"></div>
                  <div className="modal-content">
                    <h2>Are you sure you want to delete route</h2>
                    <div className="selected-route">{deleteRoute}</div>
                    <div className="buttons-wrapper">
                      <button
                        className="modal-button"
                        onClick={handleConfirmDelete}
                      >
                        Yes
                      </button>
                      <button
                        className="modal-button"
                        onClick={handleCancelDelete}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default FavoriteRoutes;
