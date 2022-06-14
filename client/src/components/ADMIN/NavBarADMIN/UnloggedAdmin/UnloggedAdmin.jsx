import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../../../media/logonavbar.png";
import { useEffect } from "react";
import { useStore } from "../../../../context/store";
export default function UnloggedAdmin() {
  const { t } = useTranslation();
  
  const logOutSession = () => {
    localStorage.clear();
  };

  return (
    <div className="navbar-space">
      <nav
        className="navbar navbar-expand-lg navbar-light  fixed-top"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <img src={logo} alt="" height="80" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ">
              <li className="nav-item white-text-nav">
                <Link onClick={logOutSession} to="/home">
                  {t("adminLoggedNavBar.switch")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
