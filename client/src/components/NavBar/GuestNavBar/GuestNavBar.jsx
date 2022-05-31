import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";
import "./GuestNavBar.css";
import FilterCategoies from "../../FilterCategories/FilterCategories";
export default function GuestNavBar() {
  return (
    <div className="header-nav">
<<<<<<< HEAD
      <Link to="/">Home</Link>
=======
      <div className="container-actions-user">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <a className="dropbtn">Categories</a>
          <div className="dropdown-content">
            <FilterCategoies />
          </div>
        </div>
      </div>
>>>>>>> 812df8f0f45bd3f2b575e7b11071aa380f0b6e5f

      <SearchBar />
      <div className="container-actions-user">
        <Link to="/logIn">Login/SignUp</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}
