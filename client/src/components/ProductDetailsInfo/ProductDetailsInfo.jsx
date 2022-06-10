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
     <div className="details-info">
     <div className="product-info">
        <p className="titleDetails">{name}</p>
        <p className="title">{t("productDetailsInfo.description")}</p>
        <p className="description">{description}</p>
        <div className="product-info-details">
          <div>
          <p className="title">{t("productDetailsInfo.categories")}</p>
        {React.Children.toArray(categories.map((category) => (
          <p>{category.name}</p>
        )))}  
          </div>
             <div>
             <p className="title">{t("productDetailsInfo.stock")}</p>
        <p>{stock}</p>
             </div>
      
        <div>
        <p className="title">{t("productDetailsInfo.price")}</p>
        <p>{`${accounting.formatMoney(price, "U$D ", 0)}`}</p>
        </div>
         
        </div>
        <p className="title">{t("productDetailsInfo.qa")}</p>
        {/* <p className="title">Rating: </p>
        <p>{rating}</p> */}
        {/* <p className="title">Reviews:</p>
        <p>{reviews}</p> */}
      
       <div className="scroll">
        <p>{React.Children.toArray(qas.map(qa => (
          <div className="question">
            <p >{qa.question}</p>
            {
              qa.answer
                ? <div>{qa.answer}</div>
                : null
            }
          </div>
        )))}</p></div>
         <div className="formQA"> 
          <FormQA productId={id} />
      </div>
      </div>
       
     </div>
    </div>
  );

}


