import React, { useEffect, useState } from "react";
import "./SearchedProducts.css"
import ProductCard from "../../components/ProductCard/ProductCard";
import { useStore } from "../../context/store";
import { Redirect } from "react-router-dom";
import { SORT_BY_PRICE, FILTER } from "../../redux/actions/actionTypes";

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
    setMax(e.target.value);
    setError("")
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let Filter;  
    
    if (min && !max) {
      Filter = state.filter.filter(product => product.price >= min)
     
    } else if (max && !min) {
      Filter = state.filter.filter(product => product.price <= max)
     
    } else if(min>max && max<min){
      Filter = state.filter.filter(product => product.price >= min && product.price <= max )
      
    } else{   
      setError("Please select valid number for the min and max inputs")
     console.log(error)
    }
    dispatch({
      type: FILTER,
      payload: Filter
    });
    
  };
  const handleChange2 = (e) => {
    setMin(e.target.value);
    setError("")
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
          required
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
          required
          onChange={handleChange}
        />
      </form>
      {error&&<p>{error}</p>}
      </div>


      {console.log(state.searchedProducts, "soy el state global", redirect)}
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
