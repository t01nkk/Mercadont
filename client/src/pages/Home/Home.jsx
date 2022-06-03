import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import { fetchProducts, fetchCategories, getFavorites } from "../../redux/actions/actions.js";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);
  const [state, dispatch] = useStore();
  const [inCart, setInCart] = useState(false);
  // const [error, setError] = useState();

  let person = JSON.parse(localStorage.getItem("myUser"));
  const alertAddedToCart = () => {
    toast.success("Added to cart!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const alertAlreadyInCart = () => {
    toast.success("Already in cart!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleSaveCart = (name, price, image, id, stock) => {
    let quantity = 1;
    let totalPrice = price;
    let products = { name, price, image, id, stock, quantity, totalPrice };
    let value = cart.find((e) => e.name === name);
    if (value) {
      setInCart(false);
      alertAlreadyInCart();
      return;
    } else {
      setInCart(true);
      setCart((cart) => [...cart, products]);
      alertAddedToCart();
    }
  };

  const handleSaveFavorite = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/addFavorite`, {
        idUser: person,
        idProduct: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFavorite = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_DOMAIN}/user/removeFavorite`,
        {
          data: {
            idUser: person,
            idProduct: id,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories(dispatch);
    fetchProducts(dispatch);
  
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    let myCart = JSON.parse(localStorage.getItem(myUser));
    setUser(myUser);
    if (myCart) {
      setCart(myCart);
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
  }, [cart]);


  const mostra = () => {
    let miStorage = JSON.parse(localStorage.getItem("myUser"));
    console.log(miStorage);
    console.log(state.favorites)
  };

  return (
    <section className="section-products">
      <button onClick={() => mostra()}>mostra storage</button>
      {state.products && state.favorites &&
        React.Children.toArray(
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
      <ToastContainer />
    </section>
  );
}
