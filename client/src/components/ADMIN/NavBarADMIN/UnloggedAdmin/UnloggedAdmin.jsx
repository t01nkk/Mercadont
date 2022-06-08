import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function UnloggedAdmin() {
  const { t } = useTranslation()
  const logOutSession = () => {
    localStorage.clear();
  };
  return (
    <div className="header-nav">
      <Link onClick={logOutSession} to="/home">
      {t("adminUnloggedNavBar.switch")}
      </Link>
    </div>
  );
}
