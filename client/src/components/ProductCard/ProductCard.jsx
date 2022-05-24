import React from "react";
import "./ProductCard.css";
export default function ProductCard({ name, price, image, rating }) {
  return (
    <article className="productCard-container">
      <img src={`${image}`} />
      <div className="productCard-info">
        <p>{name}</p>
        <p>{price}</p>
        <p>{rating}</p>
      </div>
    </article>
  );
}
