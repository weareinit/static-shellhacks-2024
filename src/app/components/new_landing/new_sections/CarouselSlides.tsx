import React, { useState } from "react";
import SlideComponent from "./SlideComponent";

interface CarouselSlidesProps {
  slideTitles: string[];
}

const CarouselSlides: React.FC<CarouselSlidesProps> = ({ slideTitles }) => {
  const [current, setCurrent] = useState<number>(0);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const previousSlide = () => {
    if (current === 0) setCurrent(slideTitles.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slideTitles.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  return (
    <div className="relative overflow-hidden">
      <div
        className={`duration-400 flex transition ease-out`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slideTitles.map((slide, index) => (
          <SlideComponent key={index} title={slide} />
        ))}
      </div>

      <div className="absolute top-0 flex w-full justify-center gap-6 py-4">
        {slideTitles.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`h-4 w-4 cursor-pointer rounded-full ${i == current ? "bg-english_walnut" : "bg-cotton_seed"}`}
            ></div>
          );
        })}
      </div>
      <div className="relative top-0 flex h-full min-w-full items-center justify-between px-10 font-zoonaji text-3xl text-english_walnut ">
        {slideTitles.map((title, index) => (
          <button
            className={`rounded-[20px] px-5 pb-3 pt-4 hover:bg-reddish_grey ${index === current ? "bg-reddish_grey" : "bg-cotton_seed"}`}
            key={index}
            onClick={() => goToSlide(index)}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarouselSlides;
