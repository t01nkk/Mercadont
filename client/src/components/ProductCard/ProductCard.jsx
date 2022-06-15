import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Link, useHistory } from "react-router-dom";
import shoppingCart from "../../media/shoppingCart.png";
import imgAddFavorite from "../../media/heart-add-cart.png";
import imgDeleteFavorite from "../../media/heart-delete-cart.png";
import { alertInfo, alertWarning, alertSuccess } from "../../helpers/toast";
import accounting from "accounting";
import { useTranslation } from "react-i18next";
export default function ProductCard({
  name,
  price,
  image,
  rating,
  id,
  stock,
  handleSaveCart,
  handleSaveFavorite,
  handleDeleteFavorite,
  isAdd
}) {
  const { t, i18n } = useTranslation()
  const [changeButton, setChangeButton] = useState(isAdd);
  const history = useHistory();
  let myUser = JSON.parse(localStorage.getItem("myUser"));

  useEffect(() => {
    setChangeButton(isAdd);
  }, [isAdd]);

  const postFavorite = () => {
    let person = JSON.parse(localStorage.getItem("myUser"));
    if (!person) {
      alertWarning(t("home.mustBeLoggedIn"))
      setTimeout(() => {
        history.push("/logIn");
      }, 2000);
    }
    else {
      setChangeButton(true);
      handleSaveFavorite(id);
      alertSuccess(t("home.altAddToFavs"))

    }
  };

  const deleteFavorite = () => {
    setChangeButton(false);
    alertInfo(t("home.altRemoveFromFavorites"))
    handleDeleteFavorite(id);
  };

  const clickSaveCart = () => {
    if (!myUser) {
      history.push("/logIn");
      return;
    }
    let price = accounting.formatMoney(price, "U$D ", 0)
    handleSaveCart(name, price, image, id, stock);
  };

  return (
    <div className="card-clothe">
      <Link to={`/home/${id}`}>
        <div className="card-body">
          <img className="card-image" src={`${image}`} alt={`${name}`} />
          <p className="card-title">{name}</p>
          <p className="card-rating">{rating}</p>
        </div>
      </Link>
      <div className="btn-wrapper">
        <button
          className="card-btn margin-1"
          onClick={() => handleSaveCart(name, price, image, id, stock)}
        >
          <img className="cart-btn" src={shoppingCart} alt="add-cart" />
        </button>
        {/* {changeButton ? (
        <button className="shoppingCart-btn" onClick={() => deleteFavorite()}>
          <img src={imgDeleteFavorite} alt="delete-favorite" />
        </button>
      ) : (
        <button className="shoppingCart-btn" onClick={() => postFavorite()}>
          <img src={imgAddFavorite} alt="add-favorite" />
        </button>
      )} */}
        {changeButton ? (
          <button className="card-btn margin-1" onClick={() => deleteFavorite()}>
            <img
              className="fav-btn"
              src={imgDeleteFavorite}
              alt="delete-favorite"
            />
          </button>
        ) : (
          <button className="card-btn margin-1" onClick={() => postFavorite()}>
            <img className="fav-btn" src={imgAddFavorite} alt="add-favorite" />
          </button>
        )}
        <div className="price">
          <p>U$D{price}</p>
        </div>
      </div>
    </div>
  );
}
