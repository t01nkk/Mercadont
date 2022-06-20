import React from "react";

export const DetailsBuys = ({
  amount,
  name,
  id,
  image,
  price,
  date,
  amountProduct,
  cant,
}) => {
  return (
    <div className="card-body-history">
      <img src={image} alt={name} className="card-image-history" />
      <div className="history-info-wrapper">
        <div className="history-info-details">
          <p className="history-info-title">{name}</p>
          <p className="history-info-price">QUANTITY: {amountProduct}</p>
          <p className="history-info-price">Price per unit: U$D{price}</p>
        </div>
      </div>
    </div>
  );
};
