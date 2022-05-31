import "./App.css";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import CreateUser from "./pages/CreateUser/CreateUser.jsx";
import Home from "./pages/Home/Home.jsx";
import SellProduct from "./pages/SellProduct/SellProduct.jsx";
import UserCart from "./pages/UserCart/UserCart.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import LogInForm from "./components/LogInForm/LogInForm.jsx";
import Categories from "./components/Categories/Categories.jsx";
import AddCategories from "./components/AddCategories/AddCategories.jsx";
import EditProduct from "./pages/EditProduct/EditProduct.jsx";
import SearchedProducts from "./pages/SearchedProducts/SearchedProducts";
import AccountDetails from "./pages/AccountDetails/AccountDetails";
import AccountDetailsForm from "./components/AccountDetailsForm/AccountDetailsForm";
import { FormBuys } from "./components/FormBuys/FormBuys";

//
//
// APP ROUTING  //
import CategoriesCards from "./components/AddCategories/CategoriesCards";
import CreateCategory from "./components/AddCategories/CreateCategory.jsx";
// =======
// import NavBar from "./components/NavBar/NavBar.jsx";
// import CreateUser from "./pages/CreateUser/CreateUser.jsx";
// import Home from "./pages/Home/Home.jsx";
// >>>>>>> Stashed changes

function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          {/* REDIRECT ROUTE (CAN USE TO FORCE UPDATE OF COMPONENTS) */}
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          {/* ADMIN/USER HOME  */}
          <NavBar />
          <Home />
        </Route>
        <Route path="/home/:id" exact>
          {/* ADMIN/USER DETAILS PRODUCT */}
          <NavBar />
          <ProductDetails />
        </Route>
        <Route path="/edit/:id" exact>
          {/* ADMIN/USER NAV BAR */}
          <NavBar />
          <EditProduct />
        </Route>
        <Route path="/search" exact>
          {/* ADMIN/USER SEARCHED PRODUCTS */}
          <NavBar />
          <SearchedProducts />
        </Route>
        <Route path="/sellProduct" exact>
          {/* ADMIN SELL PRODUCT FORM  */}
          <NavBar />
          <SellProduct />
        </Route>
        <Route path="/favorites" exact>
          <NavBar />
          {/* USER FAVORITE PRODUCTS */}
        </Route>
        <Route path="/cart" exact>
          {/* USER CART */}
          <NavBar />
          <UserCart />
        </Route>
        <Route path="/categories" exact>
          <NavBar />
          <Categories />
        </Route>
        <Route path="/addCategories" exact>
          <NavBar />
          <CategoriesCards />
        </Route>
        <Route path="/editCategories/:id" exact>
          <NavBar />
          <AddCategories />
        </Route>
        <Route path="/createCategory" exact>
          <NavBar />
          <CreateCategory />
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
      </Router>
    </>
  );
}

export default App;
