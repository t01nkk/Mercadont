import React from "react";
import axios from "axios";
import { fetchUsers } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";
import { useTranslation } from "react-i18next";
import "./AdminUser.css"

export default function AdminUser({id, name, email, isAdmin, banned }) {
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

  const handleBan = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/ban/${id}`, {
        setBan: !banned,
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
      <p className="history-labels">
        Ban: <span>{`${banned}`}</span>
      </p>

      {!banned?
        <button onClick={handleBan} className="btn-ban" disabled={isAdmin}> Ban User</button>:
        <button onClick={handleBan} className="btn-unban" disabled={isAdmin}> Unban User</button>
      }

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
