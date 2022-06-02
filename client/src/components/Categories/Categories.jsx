import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import {SORT_BY_PRICE_CAT, FILTER2, FILTER} from "../../redux/actions/actionTypes";

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
  const handleChangeMax = (e) => {
    setError("")
    if(e.target.value < 0)setError("Only Positive Numbers are accepted in this field")
    setMax(e.target.value);
  };

  const handleChangeMin = (e) => {
    setError("")
    if (e.target.value <0 )setError("Only Positive Numbers are accepted in this field")
    setMin(e.target.value);
  };

  const handleSearch = async (e) => {

    e.preventDefault();
    console.log(state)
    let filter = state.filterr;
    if(min) {
      filter = filter.filter(product => product.price >= min)
    }
    if (max) {
      filter = filter.filter(product => product.price <= max)
    }
    if ((max && min) && parseInt(max) < parseInt(min)) {
      setError("Please select valid numbers for the min and max inputs")
      filter = []
    }
    if (error){
      alert("Please Add Valid inputs")
      filter = state.filterr
    }
    dispatch({
      type: FILTER2,
      payload: filter
    });
    console.log(state)
  };



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
              type="number"
              value={min}
              placeholder="min..."
              min={0}
              onChange={handleChangeMin}
              input/>
        </form>
        <form
            onSubmit={handleSearch}
        >
          <input
              id="filter"
              type="number"
              value={max}
              placeholder="max..."
              min={0}
              onChange={handleChangeMax}
          />
        </form>
      {error&&<p>{error}</p>}
      </div>
      {redirect ? <Redirect push to="/home" /> : null}
      <div className="cardsContainer"> {
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