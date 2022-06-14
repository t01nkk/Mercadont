import React from "react"
import SlideMostSold from "../../components/SlideMostSold/SlideMostSold.jsx"
import SlideRating from "../../components/SlideRating/SlideRating.jsx"
import "./Home.scss"
export default function Home() {


  return (

    <div className="home">
      <div className="color">
      <SlideRating/>
      <SlideMostSold />
      </div>
      
      
    </div>
  )
}