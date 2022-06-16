import React from "react";
import "./promoCard.scss";
export default function PromoCard({ icon, title, subtitle }) {
  return (
    <div className="promo-card-container">
      <div className="promo-icon-container">{icon}</div>
      <div className="promo-text-container">
        <p className="promo-title">{title}</p>
        <p className="promo-subTitle">{subtitle}</p>
      </div>
    </div>
  );
}
