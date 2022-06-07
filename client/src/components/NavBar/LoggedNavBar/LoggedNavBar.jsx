import React, { useEffect } from "react";
import { useStore } from "../../../context/store";
import { Link, useHistory } from "react-router-dom";
import FilterCategories from "../../FilterCategories/FilterCategories";
import { getFavorites } from "../../../redux/actions/actions.js";
import SearchBar from "../../SearchBar/SearchBar";
import "./LoggedNavBar.css";
import { useAuth } from "../../../context/authContext";
export default function LoggedNavBar() {
  const [state, dispatch] = useStore();
  let myUser = JSON.parse(localStorage.getItem("myUser"));
  let myCart = JSON.parse(localStorage.getItem(myUser));
  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    // console.log(myCart.length)
    if (myUser) {
      getFavorites(dispatch, myUser);
    }
  }, [state.favorites.length]);

  const { logout } = useAuth();
  const history = useHistory();

  const logoutSesion = async () => {
    // let user = JSON.parse(localStorage.getItem("myUser"))
    await logout;
    localStorage.removeItem("myUser");
    history.push("/");
  };

  return (
    <div className="header-nav">
      <div className="container-actions-user">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <a className="dropbtn">Categories</a>
          <div className="dropdown-content-categories">
            <FilterCategories />
          </div>
        </div>
      </div>
      <SearchBar />
      <div className="container-actions-user">
        <div className="dropdown">
          <a className="dropbtn">Profile</a>
          <div className="dropdown-content">
            <Link to="/accountDetails"> Account Details </Link>
            <Link to="/favorites">Favorites</Link>
            <a onClick={logoutSesion}>Log Out</a>
          </div>
        </div>
        {/* <Link to="/cart">Cart {myCart && myCart.length!==0? <span>{myCart.length}</span>: ""}</Link> */} 
        {/* No borrar linea de arriba, prueba para mostrar cantidad de productos en carrito. Saludos atte: Pablo Bonito */}
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}
