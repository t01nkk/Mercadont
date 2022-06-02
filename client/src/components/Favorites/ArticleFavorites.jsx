import React from 'react'
import { useHistory } from 'react-router-dom'

export const ArticleFavorites = ({id,name,price,rating,image}) => {
    const history = useHistory()

    const viewProduct = (id) => {
        history.push(`/home/${id}`);
      };
  return (
    <article onClick={()=> viewProduct(id)}>
        <div>
            <h4>{name}</h4>
            <p>{price}</p>
            <p>{rating}</p>
            {/* <img src={image} alt={name} /> */}
        </div>
    </article>
  )
}
