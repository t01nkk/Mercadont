import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import shoppingCart from "../../media/shoppingCart.png";
import addFavorite from "../../media/heart-add-cart.png";
import deleteFavorite from "../../media/heart-delete-cart.png";


export default function ProductCard({
  name,
  price,
  image,
  rating,
  id,
  stock,
  handleSaveCart,
}) {
  return (
    <div>
      <button
        className="shoppingCart-btn"
        onClick={() => handleSaveCart(name, price, image, id, stock)}
      >
        <img src={shoppingCart} alt="add-cart" />
      </button>

      {/* <button
        className="shoppingCart-btn"
        onClick={() => handleSaveFavorite(name, price, image, id, stock)}
      >
        <img src={addFavorite} alt="add-favorite" />
      </button> */}
        
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
