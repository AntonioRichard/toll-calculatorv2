import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { useState } from "react";
import FavoriteRoutes from "../components/FavoriteRoutes";

function FavoritesPage({ user }) {
  // const [routes, setRoutes] = useState(null);

  // useEffect(() => {
  //   const uid = user.uid;
  //   (async () => {
  //     const { data } = await axios.get("api/tolls/favorites", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         uid,
  //       },
  //     });
  //     if (data) {
  //       setRoutes(data);
  //     }
  //   })();
  // }, [user]);

  return (
    <div className="fav-wrapper remove-header-overlay">
      {user.uid ? (
        // <div>
        //   {routes === null ? (
        //     <span className="fav-unavailable">No saved routes</span>
        //   ) : (
        // <FavoriteRoutes routes={routes} id={user.uid} />
        <FavoriteRoutes uid={user.uid} />
      ) : (
        // )}
        // </div>
        <span className="fav-unavailable">
          <Link className="login__a" to="/login">
            Login
          </Link>{" "}
          to view favourite routes
        </span>
      )}
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  user: auth,
});

export default connect(mapStateToProps)(FavoritesPage);
