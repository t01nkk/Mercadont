import "./App.css";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
// <<<<<<< Updated upstream
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
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <NavBar />
          <Home />
        </Route>
        <Route path="/createUser" exact>
          <NavBar />
          <CreateUser />
        </Route>
        <Route path="/sellProduct" exact>
          <NavBar />
          <SellProduct />
        </Route>
        <Route path="/favorites" exact>
          <NavBar />
          {/* Favorites */}
        </Route>
        <Route path="/cart" exact>
          <NavBar />
          <UserCart />
        </Route>        
        <Route path="/categories" exact>
          <NavBar />
         <Categories /> 
        </Route>
        <Route path="/addCategories" exact>
          <NavBar />
         <CategoriesCards/> 
        </Route>
        <Route path="/editCategories/:id" exact>
          <NavBar />
         <AddCategories/> 
        </Route>
        <Route path="/createCategory" exact>
          <NavBar />
         <CreateCategory/> 
        </Route>
        <Route path="/logIn" exact>
          <LogInForm />
        </Route>
        <Route path="/home/:id" exact>
          <NavBar />
          <ProductDetails />
        </Route>
        <Route path="/edit/:id" exact>
          <NavBar />
          <EditProduct />
        </Route>
      </Router>
    </>
  );
}

export default App;
