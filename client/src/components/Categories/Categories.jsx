import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import {
  SORT_BY_PRICE_CAT,
  FILTER_BY_PRICE_CATEGORY
} from "../../redux/actions/actionTypes";
import axios from "axios";
import { getFavorites } from "../../redux/actions/actions.js"

export default function Categories() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState(initialCart);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [error, setError] = useState("");
  let person = JSON.parse(localStorage.getItem("myUser"));


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
  const handleRedirect = () => {
    if (!state.products.length) {
      setRedirect(true);
    }
  };
  const handleSaveCart = (name, price, image, id, stock) => {
    let products = { name, price, image, id, stock };
    console.log(products);

    setCart((cart) => [...cart, products]);
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
    console.log(state)
    let filter = state.filterCategory;
    if(min) {
      filter = filter.filter(product => product.price >= min)
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
      filter = state.filterCategory;
    }
    dispatch({
      type: FILTER_BY_PRICE_CATEGORY,
      payload: filter,
    });
    console.log(state);
  };


  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);


  useEffect(() => {
    if(person){
      getFavorites(dispatch,person)
    }
    handleRedirect();
  }, []);
  return (
    <div>
      <div className="selectF">
        <div>
          <select
            onChange={(e) => {
              handleOrder(e);
            }}
          >
            <option value="" selected>
              Sort !
            </option>
            <option value="ASCENDING">⬇</option>
            <option value="DESCENDING">⬆ </option>
          </select>
        </div>

        <form className="form-filter-price" onSubmit={handleSearch}>
          <input
            id="filter2"
            type="text"
            value={min}
            placeholder="min..."
            required
            onChange={handleChangeMin}
          />
        </form>
        <form onSubmit={handleSearch}>
          <input
            id="filter"
            type="text"
            value={max}
            placeholder="max..."
            required
            onChange={handleChangeMax}
          />
        </form>
        {error && <p>{error}</p>}
      </div>
      {redirect ? <Redirect push to="/home" /> : null}
      <div className="cardsContainer">
        {React.Children.toArray(
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
                  isAdd={state.favorites.find(e => e.id === product.id)}
                />
              );
            }
            return null;
          })
        )}
      </div>
    </div>
  );
}
