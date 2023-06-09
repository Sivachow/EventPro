import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  const authLinks = (
    <ul>
        <li>
          <Link onClick={logout} to="/">
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">Logout</span>
          </Link>
        {/* </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link> */}
        </li>
      </ul>
  );
  const guestLinks = (
    <ul>
        <li>
          <Link to="events.html">Events</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <Link to="/" className="logo-link">
        <img className="logo" src="/logo.png" />
        <h1 className="club-name">Edmonton Chess Club</h1>
      </Link>
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
