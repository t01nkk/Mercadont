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
  handleDeleteFavorite
}) {
  const [changeButton, setChangeButton] = useState(true)

  const postFavorite = ()=>{
    setChangeButton(false)
    handleSaveFavorite(id)
  } 

  const deleteFavorite = ()=>{
    setChangeButton(true)
    handleDeleteFavorite(id)
  }
  return (
    <div>
      <button
        className="shoppingCart-btn"
        onClick={() => handleSaveCart(name, price, image, id, stock)}
      >
        <img src={shoppingCart} alt="add-cart" />
      </button>
      {changeButton
      ?<button
        className="shoppingCart-btn"
        onClick={() => postFavorite()}
      >
        <img src={imgAddFavorite} alt="add-favorite" />
      </button>
      :<button
        className="shoppingCart-btn"
        onClick={() => deleteFavorite()}
      >
        <img src={imgDeleteFavorite} alt="delete-favorite" />
      </button>
      }
      <Link to={`/home/${id}`}>
        <article className="card card-style">
          <div className="img-container">
            <img src={`${image}`} alt={`${name}`} />
            <span className="price">{`$${price}`}</span>
          </div>

          <div className="productCard-info">
            <span>{name}</span>
            <span>{rating}</span>
          </div>
        </article>
      </Link>
    </div>
  );
}
