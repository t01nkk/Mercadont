import "./App.css";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import CreateUser from "./pages/CreateUser/CreateUser.jsx";
import Home from "./pages/Home/Home.jsx";
import SellProduct from "./pages/ADMIN/SellProduct/SellProduct";
import UserCart from "./pages/UserCart/UserCart.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import LogInForm from "./components/LogInForm/LogInForm.jsx";
import Categories from "./components/Categories/Categories.jsx";
import AddCategories from "./pages/ADMIN/AddCategories/AddCategories";
import EditProduct from "./pages/ADMIN/EditProduct/EditProduct";
import AdminUsers from "./pages/ADMIN/AdminUsers/AdminUsers";
import SearchedProducts from "./pages/SearchedProducts/SearchedProducts";
import AccountDetails from "./pages/AccountDetails/AccountDetails";
import AccountDetailsForm from "./components/AccountDetailsForm/AccountDetailsForm";
import { FormBuys } from "./components/FormBuys/FormBuys";
import CategoriesCards from "./pages/ADMIN/AddCategories/CategoriesCards";
import CreateCategory from "./pages/ADMIN/AddCategories/CreateCategory.jsx";
import LoginADMIN from "./pages/ADMIN/LoginADMIN/LoginADMIN";
import HomeAdmin from "./pages/ADMIN/HomeADMIN/HomeAdmin";
import NavBarADMIN from "./components/ADMIN/NavBarADMIN/NavBarADMIN";
import { Favorites } from "./components/Favorites/Favorites";
import ProductDetailsAdmin from "./pages/ADMIN/ProductDetailsADMIN/ProductDetailsAdmin";
import { History } from "./components/History/History.jsx"
import { QaS } from "./pages/ADMIN/QaS/QaS.jsx"

//Cualquier ruta que tiene que solo estar disponible a usuario logueado, se le puede envolver en ProtectedRoutes
// import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          {/* REDIRECT ROUTE (CAN USE TO FORCE UPDATE OF COMPONENTS) */}
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          {/* USER HOME  */}
          <NavBar />
          <Home />
        </Route>
        <Route path="/categories" exact>
          <NavBar />
          <Categories />
        </Route>
        <Route path="/home/:id" exact>
          {/* ADMIN/USER DETAILS PRODUCT */}
          <NavBar />
          <ProductDetails />
        </Route>
        <Route path="/search" exact>
          {/* ADMIN/USER SEARCHED PRODUCTS */}
          <NavBar />
          <SearchedProducts />
        </Route>
        <Route path="/favorites" exact>
          <NavBar />
          <Favorites />
          {/* USER FAVORITE PRODUCTS */}
        </Route>
        <Route path="/cart" exact>
          {/* USER CART */}
          <NavBar />
          <UserCart />
        </Route>
        <Route path="/history" exact>
          {/* USER CART */}
          <NavBar />
          <History />
        </Route>
        <Route path="/logIn" exact>
          {/* USER LOGIN  */}
          <NavBar />
          <LogInForm />
        </Route>
        <Route path="/createUser" exact>
          {/* USER CREATE USER FORM */}
          <NavBar />
          <CreateUser />
        </Route>
        <Route path="/accountDetails" exact>
          {/* USER ACCOUNT DETAIL FORM */}
          <NavBar />
          <AccountDetails />
        </Route>

        <Route path="/accountDetails/editProfile" exact>
          {/* USER ACCOUNT DETAIL FORM */}
          <NavBar />
          <AccountDetailsForm />
        </Route>
        <Route path="/buysProducts" exact>
          {/* USER ACCOUNT DETAIL FORM */}
          <NavBar />
          <FormBuys />
        </Route>
        {/* AAAAAAAAAAAAAAAAADDDDDDDDDMMMMMMMIIIIIIIIIINNNNNNNN */}
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F"
          exact
        >
          <Redirect to="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/login" />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/login"
          exact
        >
          <NavBarADMIN />
          <LoginADMIN />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/home"
          exact
        >
          <NavBarADMIN />
          <HomeAdmin />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/sellProduct"
          exact
        >
          {/* ADMIN SELL PRODUCT FORM  */}
          <NavBarADMIN />
          <SellProduct />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/admin/edit/:id"
          exact
        >
          {/* ADMIN EDIT PRODUCT */}
          <NavBarADMIN />
          <EditProduct />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/home/:id"
          exact
        >
          {/* ADMIN DETAILS PRODUCT */}
          <NavBarADMIN />
          <ProductDetailsAdmin />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/categories"
          exact
        >
          <NavBarADMIN />
          <Categories />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/addCategories"
          exact
        >
          <NavBarADMIN />
          <CategoriesCards />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/user"
          exact
        >
          <NavBarADMIN />
          <AdminUsers />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/QaS"
          exact
        >
          <NavBarADMIN />
          <QaS />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/editCategories/:id"
          exact
        >
          <NavBarADMIN />
          <AddCategories />
        </Route>
        <Route
          path="/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/createCategory"
          exact
        >
          <NavBarADMIN />
          <CreateCategory />
        </Route>
      </Router>
    </>
  );
}

export default App;
