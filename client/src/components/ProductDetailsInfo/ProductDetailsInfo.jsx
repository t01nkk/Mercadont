import React from "react";

export default function ProductDetailsInfo({ name, image, category, rating }) {
  return (
    <div>
      <img src={image} alt={` ${name}`} />
      <p>{name}</p>
      <p>{category}</p>
      <p>
        Rating:{rating.rate} Votes:{rating.count}
      </p>
    </div>
  );
}
