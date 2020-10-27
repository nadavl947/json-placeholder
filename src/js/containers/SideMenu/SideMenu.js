import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/actions";

import cn from "classnames";

import "./SideMenu.scss";

const SideMenu = (props) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const adminConnected = useSelector(
    (state) => state.adminReducer.adminConnected
  );
  const { t, history } = props;

  const dispatch = useDispatch();

  return (
    <div className="sideMenu">
      <div className={cn("menuContent", isSideMenuOpen && "menuOpen")}>
        <div className="topLinks">
          <div className="sectionTitle">
            <h3>{t("sideMenu.data_title")}</h3>
          </div>
          <NavLink to="/">
            <div className={cn("linkItem", "generalLinkItem")}>
              <i className="fa fa-home" />
              <h3>{t("sideMenu.home_tab")}</h3>
            </div>
          </NavLink>
          <NavLink to="/UsersMain">
            <div className={cn("linkItem", "generalLinkItem")}>
              <i className="fa fa-users" />
              <h3>{t("sideMenu.users_tab")}</h3>
            </div>
          </NavLink>
          <NavLink to="/MoviesMain">
            <div className={cn("linkItem", "generalLinkItem")}>
              <i className="fa fa-film" />
              <h3>{t("sideMenu.movies_tab")}</h3>
            </div>
          </NavLink>
          <NavLink to="/PostsMain">
            <div className={cn("linkItem", "generalLinkItem")}>
              <i className="fa fa-comments" />
              <h3>{t("sideMenu.posts_tab")}</h3>
            </div>
          </NavLink>
        </div>
        <div className="bottomLinks">
          <div className="sectionTitle">
            <h3>{t("sideMenu.create_title")}</h3>
          </div>
          <NavLink to="/UsersCreate">
            <div className={cn("linkItemBottom", "generalLinkItem")}>
              <i className="fa fa-users" />
              <h3>{t("sideMenu.create_user_tab")}</h3>
            </div>
          </NavLink>
        </div>
        <div className="adminLinks">
          <div className="sectionTitle">
            <h3>{t("sideMenu.admin")}</h3>
          </div>
          <NavLink to="/AdminSectionMain">
            <div className={cn("adminLinks", "generalLinkItem")}>
              <i className="fa fa-unlock-alt" />
              <h3>{t("sideMenu.admin")}</h3>
            </div>
          </NavLink>
          <div className="logOuBtn">
            <button
              type="button"
              onClick={() =>
                dispatch(
                  actions.logOut(adminConnected._id, history.push("/login"))
                )
              }
            >
              <i className="fa fa-eject" />
              <h3>{t("sideMenu.logout")}</h3>
            </button>
          </div>
        </div>
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

export default withRouter(withTranslation()(SideMenu));
