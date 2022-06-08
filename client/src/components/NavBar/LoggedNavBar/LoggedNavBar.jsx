import React, { useEffect } from "react";
import { useStore } from "../../../context/store";
import { Link, useHistory } from "react-router-dom";
import FilterCategories from "../../FilterCategories/FilterCategories";
import { getFavorites } from "../../../redux/actions/actions.js";
import SearchBar from "../../SearchBar/SearchBar";
import "./LoggedNavBar.css";
import { useAuth } from "../../../context/authContext";
import logo from "../../../media/logonavbar.png";
export default function LoggedNavBar() {
  const [state, dispatch] = useStore();

  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
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
    <nav
      className="navbar navbar-expand-lg navbar-light  fixed-top"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src={logo} alt="" height="80" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>{" "}
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav  justify-content-center ">
            <li className="nav-item white-text-nav">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item dropdown  white-text-nav">
              <Link
                to=""
                className="dropdown-toggle"
                id="dropdownMenuClickableInside"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <FilterCategories />
              </ul>
            </li>

            <li className="nav-item dropdown white-text-nav">
              <Link
                to=""
                className="dropdown-toggle "
                id="dropdownMenuClickableInside"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                Profile
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li className="dropdown-item category-list-item">
                  <Link to="/accountDetails"> Account Details </Link>
                </li>
                <li className="dropdown-item category-list-item">
                  <Link to="/favorites">Favorites</Link>
                </li>
                <li className="dropdown-item category-list-item log-out">
                  <a onClick={logoutSesion}>Log Out</a>
                </li>
              </ul>
            </li>
            <li className="nav-item white-text-nav">
              <Link className="" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
}
