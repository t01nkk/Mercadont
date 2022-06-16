import React from "react";
import axios from "axios";
import { fetchUsers } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";
import { useTranslation } from "react-i18next";
import "./AdminUser.scss";

export default function AdminUser({ id, name, email, isAdmin, banned }) {
  const [state, dispatch] = useStore();
  const { t } = useTranslation();
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
      <p className="adminSwitch-labels">
        Name: <span>{name}</span>
      </p>
      <p className="adminSwitch-labels">
        Email: <span>{email}</span>
      </p>
      <p className="adminSwitch-labels">
        Admin: <span>{`${isAdmin}`}</span>
      </p>

      <p className="adminSwitch-labels">
        Ban: <span>{`${banned}`}</span>
      </p>

      {isAdmin ? null : !banned ? (
        <button
          onClick={handleBan}
          className="history-btn-ban"
          disabled={isAdmin}
        >
          Ban User
        </button>
      ) : (
        <button
          onClick={handleBan}
          className="history-btn-unban"
          disabled={isAdmin}
        >
          Unban User
        </button>
      )}

      <button onClick={handleAdmin} className="history-btn-switch">
        SWITCH ADMIN STATUS
      </button>
    </li>
  );
}
