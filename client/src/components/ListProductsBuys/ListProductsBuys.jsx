import React from "react";
import "./ListProductsBuys.css";
import accounting from "accounting";
export const ListProductsBuys = ({
  image,
  name,
  price,
  totalPrice,
  amount,
}) => {
  return (
    <article>
      <div className="articleBuys">
        <h3>{name}</h3>
        <div>
          <p>Price: {`${accounting.formatMoney(price, "U$D ", 0)}`}</p>
          <p>Amount: {amount}</p>
          <p>Total per Product:{totalPrice}</p>
        </div>
      </div>
    </article>
  );
};
