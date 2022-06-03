import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useHistory } from "react-router-dom";
import { useStore } from "../../context/store.js";
import { fetchProducts, fetchCategories, getFavorites } from "../../redux/actions/actions.js";
import "./Home.css";


export default function Home() {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [state, dispatch] = useStore();
  const [inCart, setInCart] = useState(false);
  const [error, setError] = useState();
  const history = useHistory()

  let person = JSON.parse(localStorage.getItem("myUser"));

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
      console.log(error);
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

  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    let myCart = JSON.parse(localStorage.getItem(myUser))
    fetchCategories(dispatch);
    if(myUser){
      getFavorites(dispatch,myUser)
    }
    fetchProducts(dispatch);
    setUser(myUser)
    if (myCart) {
      setCart(myCart)
    }
    else {
      setCart([])
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
  }, [cart]);

  // useEffect(()=>{
  //   let myUser = JSON.parse(localStorage.getItem("myUser"));
  //   if(myUser){
  //     getFavorites(dispatch,myUser)
  //   }
  // }, [state.favorites.length])

  const mostra = () => {
    let miStorage = JSON.parse(localStorage.getItem("myUser"));
    console.log(miStorage);
    console.log(state.favorites)
  };

  return (
    <section className="section-products">
      <button onClick={() => mostra()}>mostra storage</button>
      {state.products &&
        React.Children.toArray(
          state.products.map((product) => {
            if(product.status === "active"){
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
              )}
            // return null
          })
        )}
    </section>
  );
}