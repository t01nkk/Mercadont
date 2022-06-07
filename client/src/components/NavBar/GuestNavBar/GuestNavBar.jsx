import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";
import "./GuestNavBar.css";
import FilterCategoies from "../../FilterCategories/FilterCategories";
import { useTranslation } from "react-i18next";

export default function GuestNavBar() {

  const { t } = useTranslation()

  return (
    <div className="header-nav">
      <div className="container-actions-user">
        <Link to="/">{t("guestNavBar.home") }</Link>
        <div className="dropdown">
          <a className="dropbtn">{ t("guestNavBar.categories")}</a>
          <div className="dropdown-content">
            <FilterCategoies />
          </div>
        </div>
      </div>

      <SearchBar />
      <div className="container-actions-user">
        <Link to="/logIn">{ t("guestNavBar.logIn")}</Link>
        <Link to="/logIn">{ t("guestNavBar.cart")}</Link>
      </div>
    </div>
  );
}
