import React, {useEffect} from "react";
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
    <article className="articleBuys">
      <div>
        <p>{name}</p>
        <div className="container-details-buys">
          <p>Price: <span>{`${accounting.formatMoney(price, "U$D ", 0)}`}</span></p>
          <p>Amount: <span>{amount}</span></p>
          <p>Total per Product: <span>{`${accounting.formatMoney(totalPrice, "U$D ", 0)}`}</span></p>
        </div>
      </div>
    </article>
  );
};
