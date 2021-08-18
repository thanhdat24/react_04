import "./Header.css";

import { NavLink } from "react-router-dom";
import React from "react";

export default function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Cyberlearn
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink
                activeStyle={{ fontWeight: "bold" }}
                activeClassName="activeNavItem"
                className="nav-link"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeStyle={{ fontWeight: "bold" }}
                activeClassName="activeNavItem"
                className="nav-link"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                activeStyle={{ fontWeight: "bold" }}
                activeClassName="activeNavItem"
                className="nav-link"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeStyle={{ fontWeight: "bold" }}
                activeClassName="activeNavItem"
                className="nav-link"
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeStyle={{ fontWeight: "bold" }}
                activeClassName="activeNavItem"
                className="nav-link"
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}