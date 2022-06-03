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

export default function SearchedProducts() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState(initialCart);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [error, setError] = useState("");
  let person = JSON.parse(localStorage.getItem("myUser"));
  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  const handleRedirect = () => {
    if (!state.searchedProducts.length) {
      setRedirect(true);
    }
  };
  const handleSaveFavorite = async (id) => {
    try {
      await axios.post("http://localhost:3001/user/addFavorite", {
        idUser: person,
        idProduct: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state.searchedProducts);
  const handleDeleteFavorite = async (id) => {
    try {
      await axios.delete("http://localhost:3001/user/removeFavorite", {
        data: {
          idUser: person,
          idProduct: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveCart = (name, price, image, id, stock) => {
    let products = { name, price, image, id, stock };
    console.log(products);

    setCart((cart) => [...cart, products]);
  };
  useEffect(() => {
    handleRedirect();
  }, []);
  const handleOrder = (e) => {
    e.preventDefault();
    dispatch({
      type: ORDER_BY_ASCDESC_PRICE,
      payload: e.target.value,
    });
  };
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
    console.log(state);
  };

  return (
    <div>
      <div className="filter-wrapper">
        <div>
          <select
            onChange={(e) => {
              handleOrder(e);
            }}
          >
            <option value="">Order</option>
            <option value="ASCENDING">ASC</option>
            <option value="DESCENDING">DESC </option>
          </select>
        </div>

        <form className="form-filter-price" onSubmit={handleSearch}>
          <label htmlFor="">Min: </label>
          <input
            id="filter2"
            type="number"
            value={min}
            placeholder="min..."
            min={0}
            onChange={handleChangeMin}
            input
          />
        </form>
        <form className="form-filter-price" onSubmit={handleSearch}>
          <label htmlFor="">Max: </label>
          <input
            id="filter"
            type="number"
            value={max}
            placeholder="max..."
            min={0}
            onChange={handleChangeMax}
          />
        </form>
        {error && <p>{error}</p>}
      </div>
      {redirect ? <Redirect push to="/home" /> : null}
      <div className="section-products">
        {state.searchedProducts &&
          React.Children.toArray(
            state.searchedProducts.map((product) => {
              if (product.status === "active") {
                console.log(product.status);
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
