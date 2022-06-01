import React from "react";
import { Link } from "react-router-dom";

export default function UnloggedAdmin() {
  const logOutSession = () => {
    localStorage.clear();
  };
  return (
    <div className="header-nav">
      <Link onClick={logOutSession} to="/home">
        Switch to Customer
      </Link>
    </div>
  );
}
