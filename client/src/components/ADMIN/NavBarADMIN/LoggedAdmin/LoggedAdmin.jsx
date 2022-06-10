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
            <Link to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/home">
              {t("adminLoggedNavBar.inventory")}
            </Link>
            <Link to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/user">
              User
            </Link>
            <Link to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/sellProduct">
              {t("adminLoggedNavBar.sell")}
            </Link>
            <Link to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/addCategories">
              {t("adminLoggedNavBar.adminCategories")}
            </Link>
            <Link
              onClick={logOutSession}
              to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/login"
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
