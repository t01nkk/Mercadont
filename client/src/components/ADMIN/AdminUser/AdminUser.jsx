import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function AdminUser({ name, email }) {
  const { t }= useTranslation()
  const handleAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/setAdmin`, {
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <article>
        <div>
          <span>{t("adminUser.username")}{name} {t("adminUser.email")}{email}</span>

          <button onClick={handleAdmin} className="button">
            {t("adminUser.setAdmin")}
          </button>
          {/* <button onClick={handleAdmin} className="button">
            BAN USER
          </button> */}
        </div>
      </article>
    </div>
  );
}
