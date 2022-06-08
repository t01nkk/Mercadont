import React from "react";
import "./ProductDetailsInfo.css";
// import { Link } from "react-router-dom";
import accounting from "accounting";
import { FormQA } from "../FormQA/FormQA";
import { useTranslation } from "react-i18next";

export default function ProductDetailsInfo({
  id,
  image,
  name,
  description,
  stock,
  // rating,
  categories,
  // reviews,
  qas,
  status,
  price,
  
}) {
  const { t } = useTranslation()


  return (
    <div className="details-container">
      <div className="img-container">
        <img src={image} alt={` ${name}`} className="product-img" />
      </div>
      <div className="product-info">
        <p className="title">{name}</p>
        <p className="title">{t("productDetailsInfo.categories")}</p>
        {React.Children.toArray(categories.map((category) => (
          <p>{category.name}</p>
        )))}

        <p className="title">{t("productDetailsInfo.description")}</p>
        <p className="description">{description}</p>
        <p className="title">{t("productDetailsInfo.stock")}</p>
        <p>{stock}</p>
        <p className="title">{t("productDetailsInfo.price")}</p>
        <p>{`${accounting.formatMoney(price, "U$D ", 0)}`}</p>
        {/* <p className="title">Rating: </p>
        <p>{rating}</p> */}
        {/* <p className="title">Reviews:</p>
        <p>{reviews}</p> */}
        <p className="title">{t("productDetailsInfo.qa")}</p>
        <p>{React.Children.toArray(qas.map(qa => (
          <div>
            <p>{qa.question}</p>
            {
              qa.answer
                ? <p>{qa.answer}</p>
                : null
            }
          </div>
        )))}</p>
      </div>
      <div><FormQA productId={id} /></div>
    </div>
  );

}


