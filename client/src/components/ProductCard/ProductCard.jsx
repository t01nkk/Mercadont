import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import shoppingCart from "../../media/shoppingCart.png";

export default function ProductCard({
  name,
  price,
  image,
  rating,
  handleSaveCart,
}) {
  return (
    // <div></div>

    <div>
      <button
        onClick={() => handleSaveCart(name, price)}
        className="shoppingCart-btn"
      >
        <img src={shoppingCart} alt="" />
      </button>
      <Link to={"/home/:id"}>
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
