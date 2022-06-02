import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../../../context/store";
import FilterCategories from "../../../FilterCategories/FilterCategories";
export default function LoggedAdmin() {
  const [state, dispatch] = useStore();
  const logOutSession = () => {
    localStorage.clear();
  };
  const adminName = state.admin.data.name;
  console.log(state.admin.data);
  return (
    <div className="header-nav">
      <div className="container-actions-user">
        {/* <Link to="/">Home</Link> */}
        <div className="dropdown">
          <a className="dropbtn">Categories</a>
          <div className="dropdown-content-categories">
            <FilterCategories />
          </div>
        </div>
      </div>
      <div className="container-actions-user">
        <div className="dropdown">
          <a className="dropbtn">{adminName}</a>
          <div className="dropdown-content">
            <Link to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/home">
              Product List
            </Link>
            <Link to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/sellProduct">
              Sell
            </Link>
            <Link to="/addCategories">Create Categories</Link>
            <Link
              onClick={logOutSession}
              to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/login"
            >
              Log Out
            </Link>
          </div>
        </div>
        <Link onClick={logOutSession} to="/home">
          Switch to Customer
        </Link>
      </div>
    </div>
  );
}
