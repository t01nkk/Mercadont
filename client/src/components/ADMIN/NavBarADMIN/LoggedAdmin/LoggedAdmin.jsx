import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../../context/store";
import FilterCategories from "../../../FilterCategories/FilterCategories";
import { useTranslation } from "react-i18next";
export default function LoggedAdmin() {
  const { t } = useTranslation();
  const [state] = useStore();
  const logOutSession = () => {
    localStorage.clear();
  };
  const adminName = state.admin.data.name;
  return (
    <div className="header-nav">
      <div className="container-actions-user">
        {/* <Link to="/">Home</Link> */}
      </div>
      <div className="container-actions-user">
        <div className="dropdown">
          <a className="dropbtn">ADMIN</a>
          <div className="dropdown-content">
            <Link to="/admin/home">
              {t("adminLoggedNavBar.inventory")}
            </Link>
            <Link to="/admin/user" >User</Link>
            <Link to="/admin/QaS" >QaS</Link>
            <Link to="/admin/sellProduct">
              {t("adminLoggedNavBar.sell")}
            </Link>
            <Link to="/admin/addCategories">
              {t("adminLoggedNavBar.adminCategories")}
            </Link>
            <Link
              onClick={logOutSession}
              to="/admin/login"
            >
              {t("adminLoggedNavBar.logOut")}
            </Link>
          </div>
        </div>
        <Link onClick={logOutSession} to="/home">
          {t("adminLoggedNavBar.switch")}
        </Link>
      </div>
    </div>
  );
}
