import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"
import "./StarRating.css"

export const StarRating = ({ setGetStar, handleBlur }) => {

    const [star, setStar] = useState(null)
    const [hover, setHover] = useState(null)

    const handleChange = (value)=>{
        setStar(value)
        setGetStar(star)
    }
    
    const changeBlur = (e)=>{
        e.stopPropagation()
        handleChange(e)
        handleBlur(e)
    }

  return (
    <div>
    {
    [...Array(5)].map((e,i)=>{

        const ratingValue = i + 1
        return (
            <label className='container-star' key={"fostar" + ratingValue}>
                <input type="radio" name="ratingStar" value={ratingValue} onClick={()=>handleChange(ratingValue)} onBlur={changeBlur}/>
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
  )
}
