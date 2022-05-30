import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./navBar.css";
import logo from "../../media/header_logo.png";


export default function NavBar() {
  

  return (
    <div>
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="" />
        </div>
        <div className="header-nav">
          <Link to="/home">Home</Link>
           <Link to="/createUser">Create User</Link>
                  <Link to="/addCategories">Create Categories</Link>
                  <Link to="/sellProduct">Sell</Link>
                  <SearchBar />
                  <Link to="/favorites">Favorites</Link>
                  <Link to="/cart">Cart</Link>
                  <Link to="/logIn">Login</Link>
                </div>
              </header>
            </div>
            );
}
