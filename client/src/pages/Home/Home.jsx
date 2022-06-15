import React from "react";
import SlideMostSold from "../../components/SlideMostSold/SlideMostSold.jsx";
import SlideRating from "../../components/SlideRating/SlideRating.jsx";
import SlideRecommended from "../../components/SlideRecommended/SlideRecommended";
import "./Home.scss";
export default function Home() {
  return (
    <div className="color">
      <SlideRecommended />
      <SlideRating />
      <SlideMostSold />
    </div>
  );
}
