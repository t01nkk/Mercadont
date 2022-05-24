import "./App.css";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
// <<<<<<< Updated upstream
import NavBar from "./components/NavBar/NavBar";
import CreateUser from "./pages/CreateUser/CreateUser";
import Home from "./pages/Home/Home";
import SellProduct from "./pages/SellProduct/SellProduct";
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
          <CreateUser />
          {/* Createuser */}
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
          {/* Cart */}
        </Route>
        <Route path="/logIn" exact>
          <NavBar />
          {/* LogIn */}
        </Route>
        <Route path="/home/:id" exact>
          <NavBar />
          {/* ProductDetails */}
        </Route>
      </Router>
    </>
  );
}

export default App;
