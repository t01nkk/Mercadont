import React, {useEffect} from "react";
import "./ListProductsBuys.scss";
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
      {/* <figure>
        <img src={image} alt={name} />
      </figure> */}
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
