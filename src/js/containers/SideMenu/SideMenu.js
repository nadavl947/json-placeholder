import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import "./SideMenu.scss";

const SideMenu = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);

  return (
    <div className="sideMenu">
      <div className={cn("menuContent", isSideMenuOpen && "menuOpen")}>
        <NavLink to="/">
          <div className="linkItem">
            <i className="fa fa-home" />
            <h3>Home</h3>
          </div>
        </NavLink>

        <NavLink to="/UsersMain">
          <div className="linkItem">
            <i className="fa fa-users" />
            <h3>Users JSON</h3>
          </div>
        </NavLink>

        <NavLink to="/MoviesMain">
          <div className="linkItem">
            <i className="fa fa-film" />
            <h3>Movies JSON</h3>
          </div>
        </NavLink>
      </div>
      <div
        className={cn(
          "sideMenuHandlerSection",
          isSideMenuOpen && "sideMenuOpen"
        )}
      >
        <div className={cn("btn", isSideMenuOpen && "openMenu")}>
          <button
            type="button"
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          >
            <i className="fa fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
