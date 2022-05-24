import React from "react";
import "./ProductCard.css";
import {Link} from "react-router-dom"
export default function ProductCard({ name, price, image, rating }) {
  return (
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
   
  );
}
