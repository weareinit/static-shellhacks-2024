import React from "react";
import CarouselSlides from "./CarouselSlides";
const Carousel = () => {
  const slideTitles: string[] = [
    "About Us",
    "Career Fair",
    "Workshops",
    "Projects",
  ];
  return (
    <div className="m-auto w-[80%] pt-11">
      <CarouselSlides slideTitles={slideTitles} />
    </div>
  );
};

export default Carousel;
