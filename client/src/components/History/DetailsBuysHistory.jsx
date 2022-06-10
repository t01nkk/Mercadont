import React from 'react'
import "./History.css"

export const DetailsBuysHistory = ({amount,name,id,image,price,date}) => {
  return (
    <div className='container-details-cart'>
        <p>{name}</p>
        <p>{date}</p>
        <p>{price}</p> 
        <p>{amount}</p>
        <img src={image} alt={name} />
    </div>
  )
}
