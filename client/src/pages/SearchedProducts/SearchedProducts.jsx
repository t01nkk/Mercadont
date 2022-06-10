import React, { useEffect, useState } from "react";
import "./SearchedProducts.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import {
  ORDER_BY_ASCDESC_PRICE,
  FILTER_BY_PRICE,
} from "../../redux/actions/actionTypes";
import { alertSuccess, alertInfo } from "../../helpers/toast";
import { getFavorites } from "../../redux/actions/actions";
import "react-toastify/dist/ReactToastify.css";
import {
  handleDeleteFavorite,
  handleSaveFavorite,
} from "../../components/Cart/actionsCart";
import { t } from "i18next";

export default function SearchedProducts() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState(initialCart);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
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

  // const handleSaveFavorite = async (id) => {
  //   try {
  //     await axios.post(`${process.env.REACT_APP_DOMAIN}/user/addFavorite`, {
  //       idUser: person,
  //       idProduct: id,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleDeleteFavorite = async (id) => {
  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_DOMAIN}/user/removeFavorite`,
  //       {
  //         data: {
  //           idUser: person,
  //           idProduct: id,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleChangeMax = (e) => {
    setError("");
    if (e.target.value < 0)
      setError(t("categoriesComp.error_pos_numbers"));
    setMax(e.target.value);
  };

  const handleChangeMin = (e) => {
    setError("");
    if (e.target.value < 0)
      setError(t("categoriesComp.error_pos_numbers"));
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
      alert("Please Add Valid inputs");
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
    } else {
      setCart([]);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <div>
        <div className="SortAndReset">
          <div className="priceRangeText">{t("categoriesComp.priceRange")}</div>
          <form className="minMaxinput" onSubmit={handleSearch}>
            <input
              id="filter2"
              type="text"
              value={min}
              placeholder={t("categoriesComp.minPrice")}
              onChange={handleChangeMin}
            />
          </form>
          -
          <form className="minMaxinput" onSubmit={handleSearch}>
            <input
              id="filter"
              type="text"
              value={max}
              placeholder={t("categoriesComp.maxPrice")}
              onChange={handleChangeMax}
            />
          </form>
          {error && <p>{error}</p>}
          <button onClick={handleSearch} className="filterByPriceBtn">
            {t("categoriesComp.search")}{" "}
          </button>
          <div>
            <select
              defaultValue=""
              onChange={(e) => {
                handleOrder(e);
              }}
              className="sortSelector"
            >
              <option disabled>{t("categoriesComp.sortBy")}</option>
              <option value="DESCENDING">{t("categoriesComp.des")}</option>
              <option value="ASCENDING">{t("categoriesComp.asc")}</option>
            </select>
          </div>
        </div>
        {error && <p>{error}</p>}
      </div>
      {redirect ? <Redirect push to="/home" /> : null}
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
