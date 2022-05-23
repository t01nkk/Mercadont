import "./App.css";
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CreateUser from "./pages/CreateUser/CreateUser";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <NavBar />
          {/* Home */}
        </Route>
        <Route path="/createUser" exact>
          <CreateUser />
          {/* Createuser */}
        </Route>
        <Route path="/sellProduct" exact>
          <NavBar />
          {/* SellProduct */}
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
