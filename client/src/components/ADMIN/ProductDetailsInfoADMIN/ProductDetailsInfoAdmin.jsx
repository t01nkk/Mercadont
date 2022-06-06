import React from "react";
import { Link } from "react-router-dom";
import accounting from "accounting";
export default function ProductDetailsInfoAdmin({
  id,
  image,
  name,
  description,
  stock,
  // rating,
  categories,
  // reviews,
  // qua,
  status,
  price,
}) {
  return (
    <div className="details-container">
      <button>
        <Link
          to={`/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/admin/edit/${id}`}
        >
          EDIT PRODUCT
        </Link>
      </button>

      <div className="img-container">
        <img src={image} alt={` ${name}`} className="product-img" />
      </div>
      <div className="product-info">
        <p className="title">{name}</p>
        <p className="title">Categories:</p>
        {categories.map((category) => (
          <p key={category.name}>{category.name}</p>
        ))}

        <p className="title">Description: </p>
        <p className="description">{description}</p>
        <p className="title">Available stock: </p>
        <p>{stock}</p>
        <p className="title">Price: </p>
        <p>{`${accounting.formatMoney(price, "U$D ", 0)}`}</p>
        {/* <p className="title">Rating: </p>
        <p>{rating}</p> */}
        {/* <p className="title">Reviews:</p>
        <p>{reviews}</p> */}
        {/* <p className="title">Q{"&"}A:</p>
        <p>{qua}</p> */}
      </div>
    </div>
  );
}
