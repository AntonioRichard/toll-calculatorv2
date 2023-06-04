import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FavoriteRoutes from "../components/FavoriteRoutes";

function FavoritesPage({ user }) {
  return (
    <div className="fav-wrapper remove-header-overlay">
      {user.uid ? (
        <FavoriteRoutes uid={user.uid} />
      ) : (
        <span className="fav-unavailable login">
          <Link className="login__a" to="/login">
            Login &nbsp;
          </Link>
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
