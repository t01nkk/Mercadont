import React, { useState,useEffect } from "react";
import { useStore } from "../../../context/store";
import { Link, useHistory } from "react-router-dom";
import FilterCategories from "../../FilterCategories/FilterCategories";
import { getFavorites } from "../../../redux/actions/actions.js";
import SearchBar from "../../SearchBar/SearchBar";
import "./LoggedNavBar.css";
import { useAuth } from "../../../context/authContext";
import { totalCount } from "../../../redux/actions/actions.js";
import imgCart from "../../../media/shoppingCart1.png"

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
  
  useEffect(()=>{
    if(myCart){
      totalCount(dispatch)
    }
  }, [dispatch, state.countCart])

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
            <Link to="/history">History</Link>
            <a onClick={logoutSesion}>Log Out</a>
          </div>
        </div>
        {/* <Link to="/cart">Cart {state.countCart?<span>{state.countCart}</span>:""}</Link>  */}
        <Link to="/cart"><img src={imgCart} alt="shoppingCart-img" />{state.countCart?<span>{state.countCart}</span>:""}</Link>
      </div>
    </div>
  );
}
