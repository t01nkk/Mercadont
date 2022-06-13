import React from 'react'
import "./History.css"

export const DetailsBuysHistory = ({amount,name,id,image,price,date,myUser,orderId}) => {

  console.log("id",id, "myuser",myUser,"orderId",orderId)
  //id => por params
  //rating, text,userId,orderId => body
  return (
    <div className='container-details-cart'>
        <p>{name}</p>
        {/* <p>{date}</p> */}
        <p>{price}</p> 
        {/* <p>{amount}</p> */}
        <img src={image} alt={name} />
    </div>
  )
}
