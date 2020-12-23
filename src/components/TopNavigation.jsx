import React from "react";
import {NavLink} from "react-router-dom";

const TopNavigation = ({showForm}) => {
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
    </div>
  );
};

export default TopNavigation;
