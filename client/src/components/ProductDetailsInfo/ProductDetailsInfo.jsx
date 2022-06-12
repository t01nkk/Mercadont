import React, { useEffect, useState } from "react";
import "./ProductDetailsInfo.css";
import { useHistory } from "react-router-dom";
import accounting from "accounting";
import { FormQA } from "../FormQA/FormQA";
import { useTranslation } from "react-i18next";
import { handleDeleteFavorite, handleSaveFavorite } from "../Cart/actionsCart";
import imgAddFavorite from "../../media/heart-add-cart.png";
import imgDeleteFavorite from "../../media/heart-delete-cart.png";
import shoppingCart from "../../media/shoppingCart.png";
import { useStore } from "../../context/store.js";
import { totalCount } from "../../redux/actions/actions";
import { alertSuccess, alertInfo } from "../../helpers/toast";
export default function ProductDetailsInfo({
  id,
  image,
  name,
  description,
  stock,
  // rating,
  categories,
  // reviews,
  qas,
  status,
  price,
}) {
  const { t } = useTranslation();
  const [state, dispatch] = useStore();
  const [changeButton, setChangeButton] = useState();
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [inCart, setInCart] = useState(false);
  const [user, setUser] = useState([]);

  let person = JSON.parse(localStorage.getItem("myUser"));

  //Funcion para verificar si el elemento se encuentra en el listado de favoritos
  const inFavorite = (id) => {
    let isAdd = "";
    if (state.favorites.length) {
      isAdd = state.favorites.find((e) => e.id === id);
    }
    setChangeButton(isAdd);
  };
  //**********************************************************/
  //------------------Funciones de alertas------------------//
  //**********************************************************/

  //**********************************************************/
  //------Funciones para agregar o borrar de favoritos------//
  //**********************************************************/
  const deleteFavorite = () => {
    setChangeButton(false);
    handleDeleteFavorite(id);
  };

  const postFavorite = () => {
    let person = JSON.parse(localStorage.getItem("myUser"));
    if (!person) {
      alertInfo(t("home.mustBeLoggedIn"));
      history.push("/logIn");
      return;
    }
    setChangeButton(true);
    handleSaveFavorite(id);
    alertSuccess(t("home.altAddToFavs"));
  };

  //**********************************************************/
  //-------------Funcion para agregar a carrito-------------//
  //**********************************************************/
  const handleSaveCart = (name, price, image, id, stock) => {
    let quantity = 1;
    let totalPrice = price;

    let products = { name, price, image, id, stock, quantity, totalPrice };
    let value = cart.find((e) => e.name === name);
    if (value) {
      setInCart(false);
      alertInfo(t("home.altAlreadyInCart"));
      return;
    } else {
      setInCart(true);
      setCart((cart) => [...cart, products]);
      alertSuccess(t("home.altAddToCart"));
    }
  };

  //**********************************************************/
  //------------------------useEffect------------------------//
  //**********************************************************/
  useEffect(() => {
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
    inFavorite(id);
  }, []);

  useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
    totalCount(dispatch);
  }, [cart]);

  return (
    <div className="details-container">
      <img src={image} alt={` ${name}`} className="product-img" />

      <div className="details-info">
        <div className="product-info">
          <p className="titleDetails">
            {name}
            <div className="button-details-details">
              <button
                className="card-btn"
                onClick={() => handleSaveCart(name, price, image, id, stock)}
              >
                <img className="cart-btn" src={shoppingCart} alt="add-cart" />
              </button>
              {changeButton ? (
                <button className="card-btn" onClick={() => deleteFavorite()}>
                  <img
                    className="fav-btn"
                    src={imgDeleteFavorite}
                    alt="delete-favorite"
                  />
                </button>
              ) : (
                <button className="card-btn" onClick={() => postFavorite()}>
                  <img
                    className="fav-btn"
                    src={imgAddFavorite}
                    alt="add-favorite"
                  />
                </button>
              )}
            </div>
          </p>

          <p className="title-details-info">
            {t("productDetailsInfo.description")}
          </p>
          <p className="description">{description}</p>
          <div className="product-info-details">
            <div>
              <p className="title-details-info">
                {t("productDetailsInfo.categories")}
              </p>
              {React.Children.toArray(
                categories.map((category) => <p>{category.name}</p>)
              )}
            </div>
            <div>
              <p className="title-details-info">
                {t("productDetailsInfo.stock")}
              </p>
              <p>{stock}</p>
            </div>

            <div>
              <p className="title-details-info">
                {t("productDetailsInfo.price")}
              </p>
              <p>{`${accounting.formatMoney(price, "U$D ", 0)}`}</p>
            </div>
          </div>
          <p className="title-details-info">{t("productDetailsInfo.qa")}</p>
          {/* <p className="title-details-info">Rating: </p>
        <p>{rating}</p> */}
          {/* <p className="title-details-info">Reviews:</p>
        <p>{reviews}</p> */}

          <div className="scroll">
            <p>
              {React.Children.toArray(
                qas.map((qa) => (
                  <div className="question">
                    <p className="questionText">Q: {qa.question}</p>
                    {qa.answer ? <div className="answerText">A: {qa.answer}</div> : null}
                  </div>
                ))
              )}
            </p>
          </div>
          <div className="formQA">
            <FormQA productId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
