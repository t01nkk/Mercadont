import React from "react";
import axios from "axios";
import { fetchUsers } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";
import { useTranslation } from "react-i18next";

export default function AdminUser({ name, email, isAdmin }) {
  const [state, dispatch] = useStore();
  const { t } = useTranslation()
  const handleAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/setAdmin`, {
        email,
      });
      fetchUsers(dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className="list-group-item flex-fill history-list-direction">
      <p className="history-labels">
        Name: <span>{name}</span>
      </p>
      <p className="history-labels">
        Email: <span>{email}</span>
      </p>
      <p className="history-labels">
        Admin: <span>{`${isAdmin}`}</span>
      </p>

      <button onClick={handleAdmin} className="history-btn-leaveReview">
        SWITCH ADMIN STATUS
      </button>
      {/* <button onClick={handleAdmin} className="button">
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
    </li>
  );
}
