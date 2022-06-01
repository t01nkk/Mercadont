import React, { useEffect, useState } from "react";
import "./SearchedProducts.css"
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import { SORT_BY_PRICE, FILTER, FILTER2 } from "../../redux/actions/actionTypes";

export default function SearchedProducts() {
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
    if (!state.searchedProducts.length) {
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
      type: SORT_BY_PRICE,
      payload: e.target.value
    });
  }
  const handleChange = (e) => {
    setError("")
    let value = e.target.value
    if(value === "") return setMax(value)
    if (!/^\d+\S/.test(value) || Number(value) <=0  )setError("Only Positive Numbers are accepted in this field")
    setMax(value);
  };

  const handleChange2 = (e) => {
    setError("")
    let value = e.target.value
    if (value === "") return setMin(value)
    if (!/^\d+\S/.test(value) || Number(value) <=0 )setError("Only Positive Numbers are accepted in this field")
    setMin(value);

  };

  const handleSearch = async (e) => {

    e.preventDefault();
    let filter = state.filter;
    if(min) {
      filter = filter.filter(product => product.price >= min)
    }
    if (max) {
      filter = filter.filter(product => product.price <= max)
    }
    if ((max && min) && Number(max) < Number(min)) {
      setError("Please select valid numbers for the min and max inputs")
      filter = []
    }
    if (error){
      alert("Please Add Valid inputs")
      filter = state.filter
    }
    dispatch({
      type: FILTER,
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
      <div className="cardsContainer"> {state.searchedProducts &&
        React.Children.toArray(
          state.searchedProducts.map((product) => {
            return (
              <ProductCard
                id={product.id}
                name={product.name}
                stock={product.stock}
                // key={product.id}
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
