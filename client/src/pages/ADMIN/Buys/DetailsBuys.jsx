import React from 'react'

export const DetailsBuys = ({amount,name,id,image,price,date,amountProduct,cant}) => {
    return (
      <div className='container-details-cart'>
          <p>{name}</p>
          <p>{amountProduct}</p>
          {/* <p>{date}</p> */}
          <p>{price}</p> 
          {/* <p>{amount}</p> */}
          <img src={image} alt={name} />
      </div>
    )
  }
