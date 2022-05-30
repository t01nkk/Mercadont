import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";

export default function GuestNavBar() {
  return (
    <div className="header-nav">
      <Link to="/">Home</Link>

      <SearchBar />
      <Link to="/logIn">Log in/Sign Up</Link>
      <Link to="/cart">Cart</Link>
    </div>
  );
}
