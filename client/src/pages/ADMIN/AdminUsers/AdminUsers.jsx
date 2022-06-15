import React, { useState, useEffect } from "react";
import AdminUser from "../../../components/ADMIN/AdminUser/AdminUser.jsx";
import { useStore } from "../../../context/store.js";
import { fetchUsers } from "../../../redux/actions/actions.js";

export default function AdminUsers() {
  const [state, dispatch] = useStore();
  useEffect(() => {
    fetchUsers(dispatch);
  }, []);
  return (
    <>
      <div className="history-list-container">
        <p className="history-list-title">
          Administrar Roles: <br />
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
