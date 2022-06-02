import React from "react";
import { Link } from "react-router-dom";
import "./ProductCardAdmin.css";
import accounting from "accounting";
export default function ProductCardAdmin({
  name,
  price,
  image,
  rating,
  id,
  stock,
}) {
  return (
    <div>
      <Link
        to={`/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/home/${id}`}
      >
        <article className="card card-style">
          <div className="img-container">
            <img src={`${image}`} alt={`${name}`} />
            <span className="price">{`${accounting.formatMoney(
              price,
              "U$D ",
              0
            )}`}</span>
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
