import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
/* import axios from "axios"; */
import { useStore } from "../../context/store.js";
import { fetchProducts, fetchCategories } from "../../redux/actions/actions.js";
import "./Home.css";
/* import { CATEGORIES_PRODUCT } from "../../redux/actions/actionTypes"; */
import FilterCategoies from "../../components/FilterCategories/FilterCategories"

export default function Home() {
  let initialCart = JSON.parse(localStorage.getItem("myCart")) || [];
  const [cart, setCart] = useState(initialCart);
  const [state, dispatch] = useStore();
  const [inCart, setInCart] = useState(false);

  const handleSaveCart = (name, price, image, id, stock) => {
    let amount = 1;
    let totalPrice = price;
    let products = { name, price, image, id, stock, amount, totalPrice };
    let value = cart.find((e) => e.name === name);
    if (value) {
      setInCart(false);
      return;
    } else {
      setInCart(true);
      setCart((cart) => [...cart, products]);
    }
  };

  useEffect(() => {
    fetchProducts(dispatch);
  }, []);
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  const mostra = () => {
    let miStorage = JSON.parse(localStorage.getItem("myUser"));
    console.log(miStorage);
  };

/*   const [filter, setFilter] = useState({
    category: [],
  });
 */
  /* const handleSearch = async (e) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/product/filter`
      );
      dispatch({
        type: CATEGORIES_PRODUCT,
        payload: res.data,
      });

    } catch (err) {
      alert(err);
    }
  }; */


  /* function handleSelect(e) {
    setFilter({
      ...filter,
      type: deleted(filter.category, e.target.value),
    });
  }

  function deleted(array, sel) {
    if (array.includes(sel)) {
      const array1 = array.filter((num) => num !== sel);
      return array1;
    } else {
      const array2 = array.concat(sel);
      return array2;
    }
  } */

  return (
    <section className="section-products">
     {/*  <form
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <div className="form-checkbox-container">

          <div className="from-checkbox-grid">
            {state.categories.map((categories) => (
              <div className="from-checkbox">
                <div className="from-checkbox-input">
                  <input
                    value={categories.id}
                    type="checkbox"
                    onChange={(e) => {
                      handleSelect(e);
                    }}
                  />
                  {categories.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit" >
          buscar
        </button>
      </form> */}
<FilterCategoies/>
      <button onClick={() => mostra()}>mostra storage</button>
      {/* {inCart && <p>Ya esta en carro pa</p>} */}
      {/* BOTTON PARA VER EL STORAGE NO BORRAR */}
      {state.products &&
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
        )}
    </section>
  );
}
