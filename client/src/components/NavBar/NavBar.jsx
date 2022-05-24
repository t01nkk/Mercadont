import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/store";
import SearchBar from "../SearchBar/SearchBar";
import "./navBar.css";
import logo from "../../media/header_logo.png";
export default function NavBar() {
  const [state, dispatch] = useStore();
  return (
    <div>
      <header className="header">
        <div className="header-logo">
          <img src={logo} alt="" />
        </div>
        <div className="header-nav">
          <Link to="/home">Home</Link>
          <Link to="/createUser">Create User</Link>
          <Link to="/sellProduct">Sell</Link>
          <SearchBar />
          <Link to="/favorites">Favorites</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/logIn">Login</Link>
        </div>
        {console.log(state.state1, state.state2, state.state3)}
      </header>
    </div>
  );
}
