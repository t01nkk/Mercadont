import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import CreateUser from './pages/CreateUser/CreateUser.jsx';
import Home from './pages/Home/Home.jsx';
import SellProduct from './pages/ADMIN/SellProduct/SellProduct';
import UserCart from './pages/UserCart/UserCart.jsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import LogInForm from './components/LogInForm/LogInForm.jsx';
import Categories from './components/Categories/Categories.jsx';
import AddCategories from './pages/ADMIN/AddCategories/AddCategories';
import EditProduct from './pages/ADMIN/EditProduct/EditProduct';
import AdminUsers from './pages/ADMIN/AdminUsers/AdminUsers';
import SearchedProducts from './pages/SearchedProducts/SearchedProducts';
import AccountDetails from './pages/AccountDetails/AccountDetails';
import AccountDetailsForm from './components/AccountDetailsForm/AccountDetailsForm';
import { FormBuys } from './components/FormBuys/FormBuys';
import CategoriesCards from './pages/ADMIN/AddCategories/CategoriesCards';
import CreateCategory from './pages/ADMIN/AddCategories/CreateCategory.jsx';
import LoginADMIN from './pages/ADMIN/LoginADMIN/LoginADMIN';
import HomeAdmin from './pages/ADMIN/HomeADMIN/HomeAdmin';
import NavBarADMIN from './components/ADMIN/NavBarADMIN/NavBarADMIN';
import { Favorites } from './components/Favorites/Favorites';
import ProductDetailsAdmin from './pages/ADMIN/ProductDetailsADMIN/ProductDetailsAdmin';
import { History } from './components/History/History.jsx';
import { QaS } from './pages/ADMIN/QaS/QaS.jsx';
import { ToastContainer } from 'react-toastify';
import { Buys } from './pages/ADMIN/Buys/Buys.jsx';

//Cualquier ruta que tiene que solo estar disponible a usuario logueado, se le puede envolver en ProtectedRoutes
// import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
function App() {
    return (
        <BrowserRouter>
            <ToastContainer limit={3} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <NavBar />,<Home />
                        </>
                    }
                />
                {/* REDIRECT ROUTE (CAN USE TO FORCE UPDATE OF COMPONENTS) 
                {/* <Navigate to="/home" /> */}
                <Route
                    path="/home"
                    element={
                        <>
                            <NavBar />,<Home />
                        </>
                    }
                />
                {/* USER HOME  */}
                <Route
                    path="/categories"
                    element={
                        <>
                            <NavBar />,<Categories />
                        </>
                    }
                />
                <Route
                    path="/home/:id"
                    element={
                        <>
                            <NavBar />,<ProductDetails />
                        </>
                    }
                />
                {/* ADMIN/USER DETAILS PRODUCT */}
                <Route
                    path="/search"
                    element={
                        <>
                            <NavBar />,<SearchedProducts />
                        </>
                    }
                />
                {/* ADMIN/USER SEARCHED PRODUCTS */}
                <Route
                    path="/favorites"
                    element={
                        <>
                            <NavBar />,<Favorites />
                        </>
                    }
                />
                {/* USER FAVORITE PRODUCTS */}
                <Route
                    path="/cart"
                    element={
                        <>
                            <NavBar />,<UserCart />
                        </>
                    }
                />
                {/* USER CART */}
                <Route
                    path="/history"
                    element={
                        <>
                            <NavBar />,<History />
                        </>
                    }
                />
                {/* USER CART */}
                <Route
                    path="/logIn"
                    element={
                        <>
                            <NavBar />,<LogInForm />
                        </>
                    }
                />
                {/* USER LOGIN  */}
                <Route
                    path="/createUser"
                    element={
                        <>
                            <NavBar />,<CreateUser />
                        </>
                    }
                />
                {/* USER CREATE USER FORM */}
                <Route
                    path="/accountDetails"
                    element={
                        <>
                            <NavBar />,<AccountDetails />
                        </>
                    }
                />
                {/* USER ACCOUNT DETAIL FORM */}
                <Route
                    path="/accountDetails/editProfile"
                    element={
                        <>
                            <NavBar />
                            <AccountDetailsForm />
                        </>
                    }
                />
                {/* USER ACCOUNT DETAIL FORM */}
                <Route
                    path="/buysProducts"
                    element={
                        <>
                            <NavBar />,<FormBuys />
                        </>
                    }
                />
                {/* USER ACCOUNT DETAIL FORM */}
                {/* AAAAAAAAAAAAAAAAADDDDDDDDDMMMMMMMIIIIIIIIIINNNNNNNN */}
                <Route
                    path="/admin"
                    element={
                        <>
                            <NavBarADMIN />,
                            <LoginADMIN />
                        </>
                    }
                />

                <Route
                    path="/admin/login"
                    element={
                        <>
                            <NavBarADMIN />,<LoginADMIN />
                        </>
                    }
                />
                <Route
                    path="/admin/home"
                    element={
                        <>
                            <NavBarADMIN />,<HomeAdmin />
                        </>
                    }
                />
                <Route
                    path="/admin/sellProduct"
                    element={
                        <>
                            <NavBarADMIN />,<SellProduct />
                        </>
                    }
                />
                {/* ADMIN SELL PRODUCT FORM  */}
                <Route
                    path="/admin/edit/:id"
                    element={
                        <>
                            <NavBarADMIN />,<EditProduct />
                        </>
                    }
                />
                {/* ADMIN EDIT PRODUCT */}
                <Route
                    path="/admin/home/:id"
                    element={
                        <>
                            <NavBarADMIN />,<ProductDetailsAdmin />
                        </>
                    }
                />
                {/* ADMIN DETAILS PRODUCT */}
                <Route
                    path="/admin/categories"
                    element={
                        <>
                            <NavBarADMIN />,<Categories />
                        </>
                    }
                />
                <Route
                    path="/admin/addCategories"
                    element={
                        <>
                            <NavBarADMIN />,<CategoriesCards />
                        </>
                    }
                />
                <Route
                    path="/admin/user"
                    element={
                        <>
                            <NavBarADMIN />,<AdminUsers />
                        </>
                    }
                />
                {/* ADMIN QaS */}
                <Route
                    path="/admin/QaS"
                    element={
                        <>
                            <NavBarADMIN />,<QaS />
                        </>
                    }
                />
                {/* ADMIN LIST BUYS*/}
                <Route
                    path="/admin/buys"
                    element={
                        <>
                            <NavBarADMIN />,<Buys />
                        </>
                    }
                />
                <Route
                    path="/admin/editCategories/:id"
                    element={
                        <>
                            <NavBarADMIN />,<AddCategories />
                        </>
                    }
                />
                <Route
                    path="/admin/createCategory"
                    element={
                        <>
                            {' '}
                            <NavBarADMIN />,<CreateCategory />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
