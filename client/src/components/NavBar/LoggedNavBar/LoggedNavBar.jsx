import React from "react";
import { Link } from "react-router-dom";
import FilterCategories from "../../FilterCategories/FilterCategories";
import SearchBar from "../../SearchBar/SearchBar";
import "./LoggedNavBar.css";
export default function LoggedNavBar() {
  const logoutSesion = () => {
    localStorage.clear();
  };
  return (
    <div className="header-nav">
<<<<<<< HEAD
      <Link to="/">Home</Link>
=======
      <div className="container-actions-user">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <a className="dropbtn">Categories</a>
          <div className="dropdown-content-categories">
            <FilterCategories />
          </div>
        </div>
      </div>
>>>>>>> 812df8f0f45bd3f2b575e7b11071aa380f0b6e5f

      <SearchBar />

      <div className="container-actions-user">
        <div className="dropdown">
          <a className="dropbtn">Profile</a>
          <div className="dropdown-content">
            <Link to="/accountDetails"> Account Details </Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/sellProduct">Sell</Link>
            <Link to="/addCategories">Create Categories</Link>
            <Link onClick={logoutSesion} to="/">
              Log Out
            </Link>
          </div>
        </div>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}
