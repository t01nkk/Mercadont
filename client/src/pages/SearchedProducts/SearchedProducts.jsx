import React, { useEffect, useState } from "react";
import "./SearchedProducts.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import {
  ORDER_BY_ASCDESC_PRICE,
  FILTER_BY_PRICE,
} from "../../redux/actions/actionTypes";
import axios from "axios";
import { getFavorites } from "../../redux/actions/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  handleDeleteFavorite,
  handleSaveFavorite,
} from "../../components/Cart/actionsCart";

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

  const alertSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleRedirect = () => {
    if (!state.searchedProducts.length) {
      setRedirect(true);
    }
  };

  const alertAddedToCart = () => {
    toast.success("Added to cart!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const alertAlreadyInCart = () => {
    toast.success("Already in cart!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleSaveCart = (name, price, image, id, stock) => {
    let quantity = 1;
    let totalPrice = price;
    let products = { name, price, image, id, stock, quantity, totalPrice };
    let value = cart.find((e) => e.name === name);
    if (value) {
      setInCart(false);
      alertAlreadyInCart();
      return;
    } else {
      setInCart(true);
      setCart((cart) => [...cart, products]);
      alertAddedToCart();
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
      setError("Only Positive Numbers are accepted in this field");
    setMax(e.target.value);
  };

  const handleChangeMin = (e) => {
    setError("");
    if (e.target.value < 0)
      setError("Only Positive Numbers are accepted in this field");
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
      setError("Please select valid numbers for the min and max inputs");
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
          <div className="priceRangeText"> Price Range:</div>
          <form className="minMaxinput" onSubmit={handleSearch}>
            <input
              id="filter2"
              type="text"
              value={min}
              placeholder="min..."
              onChange={handleChangeMin}
            />
          </form>
          -
          <form className="minMaxinput" onSubmit={handleSearch}>
            <input
              id="filter"
              type="text"
              value={max}
              placeholder="max..."
              onChange={handleChangeMax}
            />
          </form>
          {error && <p>{error}</p>}
          <button onClick={handleSearch} className="filterByPriceBtn">
            Search{" "}
          </button>
          <div>
            <select
              defaultValue=""
              onChange={(e) => {
                handleOrder(e);
              }}
              className="sortSelector"
            >
              <option value="">Sort by</option>
              <option value="ASCENDING">Highest First</option>
              <option value="DESCENDING">Lowest First </option>
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
      <ToastContainer />
    </div>
  );
}
