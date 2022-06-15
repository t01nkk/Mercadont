import React, { useState } from "react";
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
  setChangeSection,
}) => {
  const [valueText, setValueText] = useState("");

  const handleChange = (e) => {
    setValueText(e.target.value);
  };

  const handleBlur = (e) => {
    e.stopPropagation();
    handleChange(e);
    updateDataText({
      id,
      text: valueText,
      rating: 4,
    });
  };
  //id => por params
  //rating, text,userId,orderId => body
  return (
    <div className="card-body-history">
      <img src={image} alt={name} className="card-image-history" />
      <div className="history-info-wrapper">
        <div className="history-info-details">
          <p className="history-info-title">{name}</p>
          <p className="history-info-price">Price: U$D {price}</p>
          {!isReview && isOrder === "accepted" ? (
            <div className="history-leave-review">
              <label htmlFor="">Leave a review:</label>
              <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                value={valueText}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
