import React, { useEffect, useState } from "react";
import "./ProductDetailsInfo.scss";
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
  rating,
  categories,
  reviews,
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
      <div className="details-info">
        <div className="details-image">
          <img src={image} alt={` ${name}`} className="product-img" />
        </div>
        <div className="product-info">
          <div className="details-actions">
            <button
              className="card-btn m-2 b-w "
              onClick={() => handleSaveCart(name, price, image, id, stock)}
            >
              <img className="cart-btn" src={shoppingCart} alt="add-cart" />
            </button>
            {changeButton ? (
              <button
                className="card-btn m-2 b-w"
                onClick={() => deleteFavorite()}
              >
                <img
                  className="fav-btn"
                  src={imgDeleteFavorite}
                  alt="delete-favorite"
                />
              </button>
            ) : (
              <button
                className="card-btn m-2 b-w"
                onClick={() => postFavorite()}
              >
                <img
                  className="fav-btn"
                  src={imgAddFavorite}
                  alt="add-favorite"
                />
              </button>
            )}
          </div>
          <p className="titleDetails">{name}</p>
          <p className="title-details-info-description">
            {t("productDetailsInfo.description")}
          </p>
          <p className="details-description">{description}</p>

          <div className="details-categories-stock">
            <div className="details-categories">
              <p className="title-details-info-categories">
                {t("productDetailsInfo.categories")}
              </p>
              {React.Children.toArray(
                categories.map((category) => (
                  <p className="details-category-name">{category.name}</p>
                ))
              )}
            </div>
            <div className="details-stock">
              <p className="title-details-info-stock">
                {t("productDetailsInfo.stock")}
              </p>
              <p>{stock}</p>
            </div>
          </div>

          <div className="details-price">
            <div className="details-categories">
            <p className="title-details-info-price">
              {t("productDetailsInfo.price")}
            </p>
            <p className="details-price-number">
              <span className="details-currency">U$D</span>
              {`${accounting.formatMoney(price, "", 2, ".")}`}
            </p>
           </div>
           <div className="details-stock">
            <p className="title-details-info-price">Rating:</p>
              <p>
                <span className="details-currency">{rating}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="details-qua">
      <p className="title-details-info-qua">Product Reviews</p>
           {reviews && (
            <div className="details-questions-list">
              {React.Children.toArray(
               reviews.map((e) => {
                if(e.text){
                  return (
                  <div className="container-reviews">
                    <p className="questionText">{e.text}</p>
                    <p>{e.rating}</p>
                  </div>
                  )
                }
                return null
              })
            )}
            </div>
           )}         
      </div>

      <div className="details-qua">
        <p className="title-details-info-qua">{t("productDetailsInfo.qa")}</p>
        {qas && (
          <div className="details-questions-list">
            {React.Children.toArray(
              qas.map((qa) => (
                <div className="question">
                  <p className="questionText">Q: {qa.question}</p>
                  {qa.answer ? (
                    <p className="answerText">A: {qa.answer}</p>
                  ) : null}
                </div>
              ))
            )}
          </div>
        )}
        <FormQA productId={id} />
      </div>

     
    </div>
  );
}
