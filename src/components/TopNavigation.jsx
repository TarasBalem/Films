import React from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

const TopNavigation = ({logout, isAuth}) => {
  return (
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item">
        <i className="icon home" />
        Home
      </NavLink>
      <NavLink exact to="/films" className="item">
        <i className="icon film" />
        Films
      </NavLink>
      <NavLink exact to="/films/new" className="item">
        <i className="icon plus" />
        Add new film
      </NavLink>

      <div className="right menu">
        {isAuth ? (
          <span onClick={logout} className="item">
            <i className="icon sign-out" />
            Logout
          </span>
        ) : (
          <>
            <NavLink to="/signup">
              <i className="icon sign-in"></i> Signup
            </NavLink>
            <NavLink to="/login">
              <i className="icon user"></i> Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default TopNavigation;
