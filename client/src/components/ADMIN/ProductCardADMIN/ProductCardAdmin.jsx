import React from "react";
import { Link } from "react-router-dom";
import "./ProductCardAdmin.css";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation()
  return (
    <div className="card-clothe-admin">
      <Link
        to={`/CC7E389029C4B7768A0C89DC75F304059EF9ECBA68FF02FD4BFB7FE740721F4F/admin/admin/edit/${id}`}
      >
        <button className="btn-edit-admin ">{t("adminProductCard.edit")}</button>
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
                  {t("adminProductCard.rating")}
                  <span> 5.0{rating}</span>
                </p>
                <p>
                  {t("adminProductCard.stock")}
                  <span>{stock}</span>
                </p>
              </div>
              <div>
                <p>
                  U$D
                  <span>{price}</span>
                </p>
                <p>
                  {t("adminProductCard.status")}
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
