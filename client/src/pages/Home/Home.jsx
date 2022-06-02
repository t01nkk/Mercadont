import axios from "axios";
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

  let person = JSON.parse(localStorage.getItem("myUser"))

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

  const handleSaveFavorite = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/addFavorite`, {
        idUser: person,
        idProduct: id
      })
    } catch (error) {
      console.log(error)
    }

  }

  const handleDeleteFavorite = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_DOMAIN}/user/removeFavorite`, {
        data: {
          idUser: person,
          idProduct: id
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

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
    if (myCart) {
      setCart(myCart)
    }
    else {
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
                handleSaveFavorite={handleSaveFavorite}
                handleDeleteFavorite={handleDeleteFavorite}
              />
            );
          })
        )}
    </section>
  );
}
