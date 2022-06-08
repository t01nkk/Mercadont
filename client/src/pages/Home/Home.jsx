import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/store.js";
import {
  fetchProducts,
  fetchCategories,
  getFavorites,
  totalCount,
} from "../../redux/actions/actions.js";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../components/Loader/Loader.jsx"
import { handleDeleteFavorite } from "../../components/Cart/actionsCart.js";


export default function Home() {
  const [user, setUser] = useState([]);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState([]);
  const [inCart, setInCart] = useState(false);
  let person = JSON.parse(localStorage.getItem("myUser"));
  const alertAddedToCart = () => {
    toast.success("Added to cart!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const [input, setInput] = useState({
    name: "",
    tuMama: "",
    address: {
      country: "",
      province: "",
      city: "",
      street: "",
      postalCode: "",
    },
  });
  const alertAlreadyInCart = () => {
    toast.warn("Already in cart!", {
      position: "bottom-left",
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
    // let price = accounting.formatMoney(price, "U$D ", 0)
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
    if (!person)
      return alert("You must be Logged In to add items to your favorites list");
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/user/addFavorite`, {
        idUser: person,
        idProduct: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // const handleDeleteFavorite = async (id) => {
  //   try {
  //     await axios.delete(
  //       `${process.env.REACT_APP_DOMAIN}/user/removeFavorite`,
  //       {
  //         data: {
  //           idUser: person,
  //           idProduct: id,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    let myCart = JSON.parse(localStorage.getItem(myUser));
    fetchCategories(dispatch);
    getFavorites(dispatch, person);
    fetchProducts(dispatch);
    setUser(myUser);
    if (myCart) {
      setCart(myCart);
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
    totalCount(dispatch)
  }, [cart]);

  // const mostra = () => {
  //   let miStorage = JSON.parse(localStorage.getItem("myUser"));
  //   console.log(miStorage);
  // };

  return (
    <section className="section-products">
      {/* <button onClick={() => mostra()}>mostra storage</button> */}
      {state.products && state.favorites
        ? React.Children.toArray(
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
                  isAdd={state.favorites.find((e) => e.id === product.id)}
                />
              );
            }
            return null;
          })
        )
        : <div className="container-loader"><Loader /></div>}
      <ToastContainer />
    </section>
  );
}