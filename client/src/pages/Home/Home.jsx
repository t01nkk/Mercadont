import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
/* import axios from "axios"; */
import { useStore } from "../../context/store.js";
import { fetchProducts, fetchCategories } from "../../redux/actions/actions.js";
import "./Home.css";
/* import { CATEGORIES_PRODUCT } from "../../redux/actions/actionTypes"; */

export default function Home() {
  const [user, setUser] = useState([])
  // let initialCart = JSON.parse(localStorage.getItem(user)) || [];
  const [cart, setCart] = useState([]);
  const [state, dispatch] = useStore();
  const [inCart, setInCart] = useState(false);
  const [error, setError] = useState();

  const handleSaveCart = (name, price, image, id, stock) => {
    let quantity = 1;
    let totalPrice = price;
    let products = { name, price, image, id, stock, quantity, totalPrice };
    let value = cart.find((e) => e.name === name);
    if (value) {
      setInCart(false);
      return;
    } else {
      setInCart(true);
    setCart((cart) => [...cart, products]);
    }
  };

  //USEEFFECT CARGA DE PRODUCTOS
  // useEffect(() => {
  //   fetchProducts(dispatch);
  // }, []);
  useEffect(() => {
    fetchCategories(dispatch);
    fetchProducts(dispatch);
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    let myCart = JSON.parse(localStorage.getItem(myUser))
    setUser(myUser)
    if(myCart){
      setCart(myCart)
    }
    else{
      setCart([])
    }
    // if(typeof myUser === "string"){
    //   setCart([])
    // }
    // else{
    //   setUser(myUser)
    //   setCart(myCart)
    // }
    // let miCart = JSON.parse(localStorage.getItem(miUser));
    // setCart(miCart)
  }, []);

  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
  }, [cart]);


  const mostra = () => {
    let miStorage = JSON.parse(localStorage.getItem("myUser"));
    console.log(miStorage);
    // console.log(cart);
    // console.log(cart)

    // console.log(initialCart)
    // let miCart = JSON.parse(localStorage.getItem(user));
    // console.log(miCart);
    console.log(cart);
  };

  return (
    <section className="section-products">
    {/* <button onClick={() => mostra()}>mostra storage</button> */}
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
