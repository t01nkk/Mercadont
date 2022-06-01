import React from 'react'
import "./ListProductsBuys.css" 

export const ListProductsBuys = ({image,name,price,totalPrice,amount}) => {
  return (
    <article>
        <div className='articleBuys'>
            <h3>{name}</h3>
            <div>
                <p>Price: {price}</p>
                <p>Amount: {amount}</p>
                <p>Total per Product:{totalPrice}</p>
            </div>
        </div>
    </article>
  )
}
