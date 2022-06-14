import React, { useEffect, useState } from "react"
import SlideMostSold from "../../components/SlideMostSold/SlideMostSold.jsx"
import SlideRating from "../../components/SlideRating/SlideRating.jsx"
import Slide from "../../components/Slide/Slide.jsx"
import "./Home.scss"
import { fetchCategories, fetchProducts, getFavorites, totalCount } from "../../redux/actions/actions.js"
import { useStore } from "../../context/store.js"
import { useHistory } from "react-router-dom"
import { alertInfo, alertSuccess, alertWarning } from "../../helpers/toast.js"
import { t } from "i18next"
export default function Home() {
  const [user, setUser] = useState([]);
  const [state, dispatch] = useStore();
  const [cart, setCart] = useState([]);
  const [inCart, setInCart] = useState(false);
  const history = useHistory();
  let person = JSON.parse(localStorage.getItem("myUser"));
 
  const handleSaveCart = (name, price, image, id, stock) => {
    let quantity = 1;
    let totalPrice = price;
    // let price = accounting.formatMoney(price, "U$D ", 0)
    let products = { name, price, image, id, stock, quantity, totalPrice };
    let value = cart.find((e) => e.name === name);

    let person = JSON.parse(localStorage.getItem("myUser"));
    if (!person) {
      alertWarning(t("home.logInProducts"))
      setTimeout(() => {
        history.push("/logIn");
      }, 2000);
    }
    else if (value) {
      setInCart(false);
      alertInfo(t("home.altAlreadyInCart"));
    } else {
      setInCart(true);
      setCart((cart) => [...cart, products]);
      alertSuccess(t("home.altAddToCart"));
    }
  };

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

  return (

    <div className="home">
      <div className="color">
        <Slide />
        <SlideRating />
        <SlideMostSold />
      </div>


    </div>
  )
}