import React, { useEffect, useState } from "react";
import "./ProductCardSlide.scss";
import { Link, useHistory } from "react-router-dom";
import shoppingCart from "../../media/shoppingCart.png";
import imgAddFavorite from "../../media/heart-add-cart.png";
import imgDeleteFavorite from "../../media/heart-delete-cart.png";
import { alertInfo, alertWarning } from "../../helpers/toast";
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
  isAdd,
  alertSuccess,
}) {
  const { t, i18n } = useTranslation();
  const [changeButton, setChangeButton] = useState(isAdd);
  const history = useHistory();
  let myUser = JSON.parse(localStorage.getItem("myUser"));

  useEffect(() => {
    setChangeButton(isAdd);
  }, [isAdd]);

  const postFavorite = () => {
    let person = JSON.parse(localStorage.getItem("myUser"));
    if (!person) {
      alertWarning(t("home.mustBeLoggedIn"));
      setTimeout(() => {
        history.push("/logIn");
      }, 2000);
    } else {
      setChangeButton(true);
      handleSaveFavorite(id);
      alertSuccess(t("home.altAddToFavs"));
    }
  };

  const deleteFavorite = () => {
    setChangeButton(false);
    alertInfo(t("home.altRemoveFromFavorites"));
    handleDeleteFavorite(id);
  };

  const clickSaveCart = () => {
    if (!myUser) {
      history.push("/logIn");
      return;
    }
    let price = accounting.formatMoney(price, "U$D ", 0);
    handleSaveCart(name, price, image, id, stock);
  };

  return (
    <div className="card-body1">
      <Link to={`/home/${id}`}>
        <img className="card-image1" src={`${image}`} alt={`${name}`} />
      </Link>
    </div>
  );
}
