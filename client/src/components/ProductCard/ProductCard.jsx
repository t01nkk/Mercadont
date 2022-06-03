import React, { useState } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import shoppingCart from "../../media/shoppingCart.png";
import imgAddFavorite from "../../media/heart-add-cart.png";
import imgDeleteFavorite from "../../media/heart-delete-cart.png";

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
}) {
  const [changeButton, setChangeButton] = useState(true);

  const postFavorite = () => {
    setChangeButton(false);
    handleSaveFavorite(id);
  };

  const deleteFavorite = () => {
    setChangeButton(true);
    handleDeleteFavorite(id);
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
          className="card-btn"
          onClick={() => handleSaveCart(name, price, image, id, stock)}
        >
          <img className="cart-btn" src={shoppingCart} alt="add-cart" />
        </button>
        {changeButton ? (
          <button className="card-btn" onClick={() => postFavorite()}>
            <img className="fav-btn" src={imgAddFavorite} alt="add-favorite" />
          </button>
        ) : (
          <button className="card-btn" onClick={() => deleteFavorite()}>
            <img
              className="fav-btn"
              src={imgDeleteFavorite}
              alt="delete-favorite"
            />
          </button>
        )}
        <div className="price">
          <p>U$D{price}</p>
        </div>
      </div>
    </div>
  );
}