import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";
import "./GuestNavBar.css";
import FilterCategoies from "../../FilterCategories/FilterCategories";
export default function GuestNavBar() {


  return (
    <div className="header-nav">
      <div className="container-actions-user">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <a className="dropbtn">Categories</a>
          <div className="dropdown-content-categories">
            <FilterCategoies />
          </div>
        </div>
      </div>

      <SearchBar />
      <div className="container-actions-user">
        <Link to="/logIn">Login/SignUp</Link>
        <Link to="/logIn">Cart</Link>
      </div>
    </div>
  );
}
