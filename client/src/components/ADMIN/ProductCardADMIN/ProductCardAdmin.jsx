import React from "react";
import { Link } from "react-router-dom";
import "./ProductCardAdmin.scss";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import accounting from "accounting";
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
  const { t } = useTranslation();
  return (
    <div className="card-body-admin">
      <img className="card-image-admin" src={`${image}`} alt={`${name}`} />
      <div className="card-info-wrapper-admin">
        <div className="card-info-details-admin">
          <p className="card-title-admin">{name.toUpperCase()}</p>
          <p className="description">{description}</p>
        </div>
        <div className="card-rating-admin">
          <div className="card-stats">
            <p className="stat">
              {t("adminProductCard.rating")}
              <span>{rating}</span>
            </p>
            <p className="stat">
              {`U$D `}
              <span className="price-admin">
                {accounting.formatMoney(price, "", 0)}
              </span>
            </p>
          </div>
          <div className="card-stats">
            <p className="stat">
              {t("adminProductCard.stock")}
              <span>{stock}</span>
            </p>
            <p className="stat">
              {t("adminProductCard.status")}
              <span>{" " + status}</span>
            </p>
          </div>
        </div>
      </div>
      <Link className="button-container" to={`/admin/edit/${id}`}>
        <FiEdit size={40} />
      </Link>
    </div>
  );
}
