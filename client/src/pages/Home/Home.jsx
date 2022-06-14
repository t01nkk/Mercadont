import React from "react"
import SlideMostSold from "../../components/SlideMostSold/SlideMostSold.jsx"
import SlideRating from "../../components/SlideRating/SlideRating.jsx"
import Slide from "../../components/Slide/Slide.jsx"
import "./Home.scss"
export default function Home() {


  return (

    <div className="home">
      <div className="color">
        <Slide />
        <SlideRating />
        <SlideMostSold />
      </div>


    </div>
  )
}