import React, { useState, useEffect } from 'react'
import { FaStar } from "react-icons/fa"
import { StarRating } from '../StarRating/StarRating'
// import { useLocation } from 'react-router-dom'

import "./History.css"

export const DetailsBuysHistory = ({amount,name,id,image,price,date,myUser,isReview, isOrder,updateDataText}) => {
  
  const [valueText, setValueText] = useState("")
  const [star, setStar] = useState(null)
  const [hover, setHover] = useState(null)


  // const [sendObjetc, setSendObjetc] = useState({
  //     id,
  //     text:"",
  //     rating:""
  // })
  

  const handleChange = (e)=>{
    setValueText(e.target.value)
  }

  const handleChangeStar = (e)=>{
    setStar(e.target.value)
  }

  const handleBlur = (e)=>{
    e.stopPropagation()
    // console.log("SI o puse alrevez",star, valueText, id)
    // handleChange(e)
    updateDataText({
      id,
      text:valueText,
      rating:star
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
        {!isReview && isOrder === "accepted" ?
          <div>
            <textarea name="" id="" cols="20" rows="5" value={valueText} onChange={handleChange} onBlur={handleBlur}></textarea>
            <div>
              {
              [...Array(5)].map((e,i)=>{
                  const ratingValue = i + 1
                  return (
                      <label className='container-star' key={"fostar" + ratingValue}>
                          <input type="radio" name="ratingStar" value={ratingValue} onClick={()=>setStar(ratingValue)} onBlur={handleBlur}/>
                          <FaStar
                              color={ratingValue <= (star || hover) ? "black": "grey"}
                              size={20}
                              onMouseEnter={()=> setHover(ratingValue)}
                              onMouseLeave={()=> setHover(ratingValue)}
                          />
                      </label>
                      )
              })
              }
            </div>
          </div>
        :null}
      </div>
    </div>
  )
}
