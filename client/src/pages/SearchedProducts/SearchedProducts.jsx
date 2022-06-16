import React, { useEffect, useState } from "react";
import "./SearchedProducts.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Link, Redirect } from "react-router-dom";
import {
  ORDER_BY_ASCDESC_PRICE,
  FILTER_BY_PRICE,
} from "../../redux/actions/actionTypes";
import { alertSuccess, alertInfo } from "../../helpers/toast";
import { getFavorites, totalCount } from "../../redux/actions/actions";
import { useTranslation } from 'react-i18next'
import {
  handleDeleteFavorite,
  handleSaveFavorite,
} from "../../components/Cart/actionsCart";
import { IoSearchSharp } from "react-icons/io5";
export default function SearchedProducts() {
  const { t } = useTranslation()
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState(initialCart);
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [error, setError] = useState("");
  const [inCart, setInCart] = useState(false);
  const [user, setUser] = useState([]);
  let person = JSON.parse(localStorage.getItem("myUser"));

  const handleRedirect = () => {
    if (!state.searchedProducts.length) {
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
    let filter = state.filter;
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
      alertInfo(t("searchedProducts.noValidInputs"));
      filter = state.filter;
    }
    dispatch({
      type: FILTER_BY_PRICE,
      payload: filter,
    });
  };
  const handleOrder = (e) => {
    e.preventDefault();
    dispatch({
      type: ORDER_BY_ASCDESC_PRICE,
      payload: e.target.value,
    });
  };

  useEffect(() => {
    if (person) {
      getFavorites(dispatch, person);
    }
    handleRedirect();
  }, []);
  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    let myCart = JSON.parse(localStorage.getItem(myUser));
    setUser(myUser);
    if (myCart) {
      setCart(myCart);
      totalCount(dispatch)
    } else {
      setCart([]);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
    totalCount(dispatch)
  }, [cart]);

  return (
    <div className="searched-container">
      <div className="SortAndReset">
        <div className="minMax-filter">
          <span className="priceRange-text">
            {t("categoriesComp.priceRange")}
          </span>
          <form className="range-form" onSubmit={handleSearch}>
            <input
              className="range-input"
              id="filter2"
              type="number"
              value={min}
              placeholder="MIN"
              onChange={handleChangeMin}
            />
          </form>
          -
          <form className="range-form" onSubmit={handleSearch}>
            <input
              className="range-input"
              id="filter"
              type="number"
              value={max}
              placeholder="MAX"
              onChange={handleChangeMax}
            />
          </form>
          <div className="searched-btn">
            <IoSearchSharp size={25} onClick={handleSearch} />
          </div>
        </div>
        <div className="order-options">
          <label className="order-label" htmlFor="">{t("categoriesComp.sortBy")}</label>
          <select
            defaultValue=""
            onChange={(e) => {
              handleOrder(e);
            }}
          >
            <option value="DESCENDING">MAX-MIN</option>
            <option value="ASCENDING">MIN-MAX</option>
          </select>
        </div>
      </div>

      {redirect ? <Redirect push to="/home" /> : null}
      <span>{error && <p>{error}</p>}</span>
      <div className="section-products">
        {state.searchedProducts &&
          React.Children.toArray(
            state.searchedProducts.map((product) => {
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
                    alertSuccess={alertSuccess}
                  />
                );
              } else {
                return null;
              }
            })
          )}
      </div>
    </div>
  );
}
