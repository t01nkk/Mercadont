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
    <div >
      <div >

      </div>
      {state.usersAdmin &&
        React.Children.toArray(
          state.usersAdmin.map((user) => {
            if (user.email === "mercadont.libre@gmail.com") return null;
            return <AdminUser id={user.id} name={user.name} email={user.email} />;
          })

        )}
    </div>
  );
}
