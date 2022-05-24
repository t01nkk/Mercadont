import React from "react";
import "./ProductCard.css";

export default function ProductCard({ name, price, image, rating, handleSaveCart }) {



  return (
    // <div></div>
    <article className="productCard-container">
      <button onClick={()=>handleSaveCart(name, price)}>agregar carrito</button>
      <img src={`${image}`} />
      <div className="productCard-info">
        <p>{name}</p>
        <p>{price}</p>
        <p>{rating}</p>
      </div>
    </article>
  );
}