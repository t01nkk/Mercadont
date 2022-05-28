import React from "react";

export default function LogOut() {
  const logoutSesion= ()=>{
    localStorage.clear()
  }

  return <div onClick={logoutSesion}>LogOut</div>;
}
