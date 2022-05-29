import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "../../SearchBar/SearchBar";
import "./LoggedNavBar.css";
export default function LoggedNavBar() {
  const logoutSesion = () => {
    localStorage.clear();
  };
  return (
    <div className="header-nav">
      <Link to="/home">Home</Link>

      <SearchBar />
      <div className="dropdown">
        <a className="dropbtn">Profile</a>

        <div className="dropdown-content">
          <Link to="/accountDetails"> Account Details </Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/sellProduct">Sell</Link>
          <Link onClick={logoutSesion} to="/">
            Log Out
          </Link>
        
        </div>
      </div>
      <Link to="/cart">Cart</Link>
    </div>
  );
}
