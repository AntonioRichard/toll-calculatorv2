import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function FavoritesPage({ user }) {
  return (
    <div className="fav-wrapper">
      {user.uid ? (
        <span className="fav-unavailable">No saved routes</span>
      ) : (
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
