import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

export default function LogOut() {
  const [redirect, setRedirect] = useState(false);

  const logoutSesion = () => {
    setRedirect(true);
    localStorage.clear();
  };

  return (
    <>
      {redirect ? <Redirect push to="/" /> : null}
      <button onClick={logoutSesion}>LogOut</button>
    </>
  );
}
