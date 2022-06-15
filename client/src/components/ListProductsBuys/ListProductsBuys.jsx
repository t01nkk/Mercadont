import React, {useEffect} from "react";
import "./ListProductsBuys.scss";
import accounting from "accounting";
import { useTranslation } from "react-i18next";

export const ListProductsBuys = ({
  image,
  name,
  price,
  totalPrice,
  amount,
}) => {
  const { t } = useTranslation()
  return (
    <article className="list-group-item flex-fill articleBuys">
      {/* <figure>
        <img src={image} alt={name} />
      </figure> */}
      <div>
        <p>{name}</p>
        <div className="container-details-buys">
          <p>{t("sendBuys.price")}<span>{`${accounting.formatMoney(price, "U$D ", 0)}`}</span></p>
          <p>{t("sendBuys.amount")}<span>{amount}</span></p>
          <p>{t("sendBuys.totalPerProduct")}<span>{`${accounting.formatMoney(totalPrice, "U$D ", 0)}`}</span></p>
        </div>
      </div>
    </article>
  );
};
