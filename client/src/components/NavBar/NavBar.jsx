import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/store";
import SearchBar from "../SearchBar/SearchBar";
import "./navBar.css";
import logo from "../../media/header_logo.png";
import { checkSession } from "../../redux/actions/actions";
import LogOut from "../LogOut/LogOut";
export default function NavBar() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    checkSession(dispatch);
  }, [state.session]);
  return (
    <div>
      {console.log(state.user, state.session, "SOY LOS ESTADOS DE USUARIO")}
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
          <Link to="/accountDetails">Account Details</Link>

          {state.session ? <LogOut /> : <Link to="/logIn">Login</Link>}
        </div>
      </header>
    </div>
  );
}
