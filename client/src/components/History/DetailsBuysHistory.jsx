import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { StarRating } from "../StarRating/StarRating";
import { useTranslation } from "react-i18next";
// import { useLocation } from 'react-router-dom'

import "./History.scss";

export const DetailsBuysHistory = ({
  amount,
  name,
  id,
  image,
  price,
  date,
  myUser,
  isReview,
  isOrder,
  updateDataText,
}) => {
  const { t } = useTranslation()
  const [valueText, setValueText] = useState("");
  const [star, setStar] = useState(null);
  const [hover, setHover] = useState(null);

  // const [sendObjetc, setSendObjetc] = useState({
  //     id,
  //     text:"",
  //     rating:""
  // })

  const handleChange = (e) => {
    setValueText(e.target.value);
  };

  const handleChangeStar = (e) => {
    setStar(e.target.value);
  };

  const handleBlur = (e) => {
    e.stopPropagation();
    // handleChange(e)
    updateDataText({
      id,
      text: valueText,
      rating: star,
    });
  };
  return (
    <div className="card-body-history">
      <img src={image} alt={name} className="card-image-history" />
      <div className="history-info-wrapper">
        <div className="history-info-details">
          <p className="history-info-title">{name}</p>
          <p className="history-info-price">{t("dateHistory.price")} U$D {price}</p>
          {!isReview && isOrder === "accepted" ? (
            <div className="history-leave-review">
              <label htmlFor="">{t("dateHistory.review")}</label>
              <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                value={valueText}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
              <div className="history-card-stars">
                {[...Array(5)].map((e, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label
                      className="container-star"
                      key={"fostar" + ratingValue}
                    >
                      <input
                        type="radio"
                        name="ratingStar"
                        value={ratingValue}
                        onClick={() => setStar(ratingValue)}
                        onBlur={handleBlur}
                      />
                      <FaStar
                        color={
                          ratingValue <= (star || hover) ? "black" : "grey"
                        }
                        size={20}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(ratingValue)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
