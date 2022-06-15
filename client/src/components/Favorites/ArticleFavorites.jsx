import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./Favorite.scss";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import accounting from "accounting";
export const ArticleFavorites = ({
  name,
  price,
  image,
  rating,
  id,
  stock,
  description,
  removeFavorite,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const viewProduct = (id) => {
    history.push(`/home/${id}`);
  };
  const articleStyle = {
    height: "18rem",
  };
  const divPStyle = {
    height: "11rem",
  };
  return (
    <div className="card-body-favorite">
      <img className="card-image-favorite" src={`${image}`} alt={`${name}`} />
      <div className="card-info-wrapper-favorite">
        <div className="card-info-details-favorite">
          <p className="card-title-favorite">{name}</p>
          <p className="description-favorite">{description}</p>
          <div className="favorite-btn-wrapper">
            <button
              className="btn-edit-favorite"
              onClick={() => viewProduct(id)}
            >
              {t("articleFavorites.productDetails")}
            </button>
            <button
              className="btn-edit-favorite remove"
              onClick={() => removeFavorite(id)}
            >
              {t("articleFavorites.removeFavorite")}
            </button>
          </div>
        </div>
        <div className="card-rating-favorite">
          <div className="card-stats">
            <p className="stat">
              {t("adminProductCard.rating")}
              <span>{rating}</span>
            </p>
            <p className="stat">
              {`Price: U$D `}
              <span className="price-favorite">
                {accounting.formatMoney(price, "", 0)}
              </span>
            </p>
            <p className="stat">
              {t("adminProductCard.stock")}
              <span>{stock}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
