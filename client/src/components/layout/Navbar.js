import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../components/auth/Authcontext";

export const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);

  const {
    isAuthenticated,
    isTelecaller,
    isExecutive,
    isManager,
    logout,
    user
  } = authContext;

  const onLogout = () => {
    logout();
  };
  const Links = (
    <Fragment>
      <li>
        <Link onClick={onLogout} to="/login">
          <span className="text-primary">Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  const ManagerLinks = (
    <Fragment>
      <li>
        <Link to="/Register">Register Employee</Link>
      </li>
      <li>
        <Link onClick={onLogout} to="/login">
          <span className="text-primary">Logout</span>
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/About">About</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-dark">
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <ul>
        {isAuthenticated ? (isManager ? ManagerLinks : Links) : guestLinks}
      </ul>
    </div>
  );
};

Navbar.prototype = {
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: "WELCOME!!"
};
export default Navbar;
