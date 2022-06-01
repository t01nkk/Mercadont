import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import { SORT_BY_PRICE_CAT, FILTER2 } from "../../redux/actions/actionTypes";
import { fetchProducts, fetchCategories } from "../../redux/actions/actions.js";

export default function Categories() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState(initialCart);  
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [error, setError] = useState("")
  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

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
  useEffect(() => {
    handleRedirect();
  }, []);
  const handleOrder = (e) => {
    e.preventDefault();
    dispatch({
      type: SORT_BY_PRICE_CAT,
      payload: e.target.value
    });
  }
  const handleChange = (e) => {
    setMax(e.target.value);
    setError("")
  };

  const handleChange2 = (e) => {
    setMin(e.target.value);
    setError("")
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    let filter = state.products;

    if (min) {
      filter = filter.filter(product => product.price >= min)
    }
    if (max) {
      filter = filter.filter(product => product.price <= max)
    }
    if ((max && min) && Number(max) < Number(min)) {
      setError("Please select valid number for the min and max inputs")
      filter = []

    }

    dispatch({
      type:FILTER2,
      payload: filter
    });
  };
  useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  return (
    <div>
      <div className="selectF">
      <div ><select
        onChange={(e) => {
          handleOrder(e);

        }}
      >
        <option value="" selected>
          Sort !
        </option>
        <option value="ASCENDING">⬇</option>
        <option value="DESCENDING">⬆  </option>
      </select>
      </div>
     
      <form className="form-filter-price"
        onSubmit={handleSearch}
      >
        <input
          id="filter2"
          type="text"
          value={min}
          placeholder="min..."
          onChange={handleChange2}
        />
      </form>
      <form
        onSubmit={handleSearch}
      >
        <input
          id="filter"
          type="text"
          value={max}
          placeholder="max..."
          onChange={handleChange}
        />
      </form>
      {error&&<p>{error}</p>}
      </div>
      {redirect ? <Redirect push to="/home" /> : null}
      <div className="cardsContainer"> {state.products &&
        React.Children.toArray(
          state.products.map((product) => {
            return (
              <ProductCard
                id={product.id}
                name={product.name}
                stock={product.stock}
                price={product.price}
                image={product.image}
                handleSaveCart={handleSaveCart}
              />
            );
          })
        )}</div>
     
    </div>
  );
}