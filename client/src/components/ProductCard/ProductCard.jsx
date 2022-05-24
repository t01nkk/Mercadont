import React from "react";
import "./ProductCard.css";
export default function ProductCard({ name, price, image, rating, handleSaveCart }) {
  return (
    <article className="productCard-container">
      <button onClick={handleSaveCart}>agregar carrito de gatitos</button>
      <img src={`${image}`} />
      <div className="productCard-info">
        <p>{name}</p>
        <p>{price}</p>
        <p>{rating}</p>
      </div>
    </article>
  );
}
