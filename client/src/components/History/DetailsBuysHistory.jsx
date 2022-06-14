import React, { useState } from 'react'
// import { useLocation } from 'react-router-dom'

import "./History.css"

export const DetailsBuysHistory = ({amount,name,id,image,price,date,myUser,isReview,updateDataText}) => {
  
  const [valueText, setValueText] = useState("")

  const handleChange = (e)=>{
    setValueText(e.target.value)
    
  }

  const handleBlur = (e)=>{
    e.stopPropagation()
    handleChange(e)
updateDataText({
      id,
      text:valueText,
      rating:4
    })
  }
  //id => por params
  //rating, text,userId,orderId => body
  return (
    <div>
      <div className='container-details-cart'>
          <p>{name}</p>
          <p>{price}</p> 
          <img src={image} alt={name} />
      </div>
      <div>
        {!isReview && <textarea name="" id="" cols="20" rows="5" value={valueText} onChange={handleChange} onBlur={handleBlur}></textarea>}
      </div>
    </div>
  )
}
