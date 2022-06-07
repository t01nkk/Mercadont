import React, { useEffect } from "react";
import { useStore } from "../../../context/store";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FilterCategories from "../../FilterCategories/FilterCategories";
import { getFavorites } from "../../../redux/actions/actions.js";
import SearchBar from "../../SearchBar/SearchBar";
import "./LoggedNavBar.css";
import { useAuth } from "../../../context/authContext";
export default function LoggedNavBar() {
  const { t } = useTranslation()
  const [state, dispatch] = useStore();

  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    if (myUser) {
      getFavorites(dispatch, myUser);
    }
  }, [state.favorites.length]);

  const { logout } = useAuth();
  const history = useHistory();

  const logoutSesion = async () => {
    // let user = JSON.parse(localStorage.getItem("myUser"))
    await logout;
    localStorage.removeItem("myUser");
    history.push("/");
  };

  return (
    <div className="header-nav">
      <div className="container-actions-user">
        <Link to="/">{t("loggedNavBar.home") }</Link>
        <div className="dropdown">
          <a className="dropbtn">{t("loggedNavBar.categories") }</a>
          <div className="dropdown-content-categories">
            <FilterCategories />
          </div>
        </div>
      </div>
      <SearchBar />
      <div className="container-actions-user">
        <div className="dropdown">
          <a className="dropbtn">{t("loggedNavBar.profile") }</a>
          <div className="dropdown-content">
            <Link to="/accountDetails">{t("loggedNavBar.accountDetails") }</Link>
            <Link to="/favorites">{t("loggedNavBar.favorites") }</Link>
            <a onClick={logoutSesion}>{t("loggedNavBar.logOut") }</a>
          </div>
        </div>
        <Link to="/cart">{t("loggedNavBar.cart") }</Link>
      </div>
    </div>
  );
}
