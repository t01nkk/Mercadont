import React from "react";
import { Link } from "react-router-dom";
import "./ProductCardAdmin.css";
export default function ProductCardAdmin({
  name,
  price,
  image,
  rating,
  id,
  stock,
  status,
  description,
  categories,
}) {
  return (
    <div className="card-clothe-admin">
      <Link
        to={`/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/admin/edit/${id}`}
      >
        {" "}
        <button class="btn-edit-admin button button--atlas">
          <span>Edit</span>
          <div class="marquee" aria-hidden="true">
            <div class="marquee__inner">
              <span>Edit</span>
              <span>Edit</span>
              <span>Edit</span>
              <span>Edit</span>
            </div>
          </div>
        </button>
      </Link>
      {/* to={`/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/home/${id}`} */}

      <div className="card-body-admin">
        <img className="card-image-admin" src={`${image}`} alt={`${name}`} />
        <div className="card-info-wrapper-admin">
          <p className="card-title-admin">{name}</p>
          <div className="card-info-details-admin">
            <p>{description}</p>

            <div className="card-rating-admin">
              <div>
                <p>
                  Rating:
                  <span> 5.0{rating}</span>
                </p>
                <p>
                  Stock:
                  <span>{stock}</span>
                </p>
              </div>
              <div>
                <p>
                  U$D
                  <span>{price}</span>
                </p>
                <p>
                  Status:
                  <span>{status}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
