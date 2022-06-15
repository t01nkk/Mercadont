import React, { useState, useEffect } from "react";
import AdminUser from "../../../components/ADMIN/AdminUser/AdminUser.jsx";
import { useStore } from "../../../context/store.js";
import { fetchUsers } from "../../../redux/actions/actions.js";
import { useTranslation } from "react-i18next";
export default function AdminUsers() {
  const { t } = useTranslation()
  const [state, dispatch] = useStore();
  useEffect(() => {
    fetchUsers(dispatch);
  }, []);
  return (
    <>
      <div className="history-list-container">
        <p className="history-list-title">
          {t("adminUser.manageRoles")}<br />
        </p>
      </div>
      <div className="">
        {state.usersAdmin &&
          React.Children.toArray(
            state.usersAdmin.map((user) => {
              if (user.email !== "mercadont.libre@gmail.com") {
                return (
                  <ul className="list-group container-fluid ">
                    <AdminUser
                      id={user.id}
                      isAdmin={user.isAdmin}
                      name={user.name}
                      email={user.email}
                    />
                  </ul>
                );
              }
            })
          )}
      </div>
    </>
  );
}
