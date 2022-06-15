import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import {
  SORT_BY_PRICE_CAT,
  FILTER_BY_PRICE_CATEGORY,
} from "../../redux/actions/actionTypes";
import { getFavorites, totalCount } from "../../redux/actions/actions.js";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../Loader/Loader";
import "./categories.scss";
import { handleDeleteFavorite, handleSaveFavorite } from "../Cart/actionsCart";
import { useTranslation } from "react-i18next";
import { alertInfo, alertSuccess, alertWarning } from "../../helpers/toast";
import { IoSearchSharp } from "react-icons/io5";

export default function Categories() {
  // let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const { t } = useTranslation();
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState([]);
  const [inCart, setInCart] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  let person = JSON.parse(localStorage.getItem("myUser"));

  const handleRedirect = () => {
    if (!state.products.length) {
      setRedirect(true);
    }
  };

  const handleSaveCart = (name, price, image, id, stock) => {
    let quantity = 1;
    let totalPrice = price;
    let products = { name, price, image, id, stock, quantity, totalPrice };
    let value = cart.find((e) => e.name === name);
    if (value) {
      setInCart(false);
      alertInfo(t("home.altAlreadyInCart"));
      return;
    } else {
      setInCart(true);
      setCart((cart) => [...cart, products]);
      alertSuccess(t("home.altAddToCart"));
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch({
      type: SORT_BY_PRICE_CAT,
      payload: e.target.value,
    });
  };
  const handleChangeMax = (e) => {
    setError("");
    if (e.target.value < 0) setError(t("categoriesComp.error_pos_numbers"));
    setMax(e.target.value);
  };

  const handleChangeMin = (e) => {
    setError("");
    if (e.target.value < 0) setError(t("categoriesComp.error_pos_numbers"));
    setMin(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let filter = state.filterCategory;
    if (min) {
      filter = filter.filter((product) => product.price >= min);
    }
    if (max) {
      filter = filter.filter((product) => product.price <= max);
    }
    if (max && min && parseInt(max) < parseInt(min)) {
      setError(t("categoriesComp.error_valid_numbers"));
      filter = [];
    }
    if (error) {
      alertWarning(t("categoriesComp.error_valid_cats"));
      filter = state.filterCategory;
    }
    dispatch({
      type: FILTER_BY_PRICE_CATEGORY,
      payload: filter,
    });
  };

  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    let myCart = JSON.parse(localStorage.getItem(myUser));
    setUser(myUser);
    if (myCart) {
      setCart(myCart);
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
    totalCount(dispatch)
  }, [cart]);

  useEffect(() => {
    if (person) {
      getFavorites(dispatch, person);
    }
    handleRedirect();
  }, []);
  return (
    <div className="searched-container">
      <div className="SortAndReset">
        <div className="minMax-filter">
          <span className="priceRangeText">
            {t("categoriesComp.priceRange")}
          </span>
          <form className="range-form" onSubmit={handleSearch}>
            <input
              className="range-input"
              id="filter2"
              type="text"
              value={min}
              placeholder={t("categoriesComp.minPrice")}
              onChange={handleChangeMin}
            />
          </form>
          -
          <form className="range-form" onSubmit={handleSearch}>
            <input
              className="range-input"
              id="filter"
              type="text"
              value={max}
              placeholder={t("categoriesComp.maxPrice")}
              onChange={handleChangeMax}
            />
          </form>
          {error && <p>{error}</p>}
          <div className="searched-btn">
            <IoSearchSharp size={25} onClick={handleSearch} />
          </div>
        </div>
        <div className="order-options">
          <label className="order-label" htmlFor="">
            {t("categoriesComp.sortBy")}
          </label>
          <select
            defaultValue=""
            onChange={(e) => {
              handleOrder(e);
            }}
            className="sortSelector"
          >
            <option value="DESCENDING">MAX-MIN</option>
            <option value="ASCENDING">MIN-MAX</option>
          </select>
        </div>
      </div>

      {redirect ? <Redirect push to="/home" /> : null}
      <div className="section-products">
        {state.products && state.favorites ? (
          React.Children.toArray(
            state.products.map((product) => {
              if (product.status === "active") {
                return (
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    stock={product.stock}
                    price={product.price}
                    image={product.image}
                    handleSaveCart={handleSaveCart}
                    handleSaveFavorite={handleSaveFavorite}
                    handleDeleteFavorite={handleDeleteFavorite}
                    isAdd={state.favorites.find((e) => e.id === product.id)}
                  />
                );
              }
              return null;
            })
          )
        ) : (
          <div className="container-loader">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
